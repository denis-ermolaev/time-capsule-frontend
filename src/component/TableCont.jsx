import { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import Pagination from "./Pagination";
import { globalContext } from "../const";

const headCells = [
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Title",
  },
  {
    id: "dateCreate",
    numeric: true,
    disablePadding: false,
    label: "Date Create",
  },
  {
    id: "dateOpen",
    numeric: true,
    disablePadding: false,
    label: "Date Open",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  async function getAllCount() {
    console.log("!gContext.value", !gContext.value);
    const sigh = order === "asc" ? "" : "-";
    let res;
    if (gContext.value) {
      res = await fetch(
        `http://localhost:9000/capsule?private_ne=${Boolean(
          gContext.value
        )}&_sort=${sigh}${orderBy}&_page=${gContext.page + 1}&_per_page=${
          gContext.rowsPerPage
        }`
      );
    } else {
      res = await fetch(
        `http://localhost:9000/capsule?owner=${
          gContext.accountLogin.userName
        }&&_sort=${sigh}${orderBy}&_page=${gContext.page + 1}&_per_page=${
          gContext.rowsPerPage
        }`
      );
    }
    res = await res.json();
    gContext.setCountPagination(res.pages * gContext.rowsPerPage);
    gContext.setListCapsules(res.data);
    console.log(res);
  }
  const gContext = useContext(globalContext);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("dateCreate");
  //   console.log("order, orderBy", order, orderBy);
  useEffect(() => {
    getAllCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    gContext.value,
    gContext.page,
    gContext.rowsPerPage,
    order,
    orderBy,
    gContext.updateCapsuleTabs,
  ]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    gContext.ListCapsules.length < gContext.rowsPerPage
      ? gContext.rowsPerPage - gContext.ListCapsules.length
      : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={gContext.ListCapsules.length}
            />
            <TableBody>
              {gContext.ListCapsules.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row.dateCreate}</TableCell>
                    <TableCell align="right">{row.dateOpen}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination />
      </Paper>
    </Box>
  );
}

// const [page, setPage] = useState(0);
// const [rowsPerPage, setRowsPerPage] = useState(5);
// const [countPagination, setCountPagination] = useState(0);
// const [ListCapsules, setListCapsules] = useState([]);
