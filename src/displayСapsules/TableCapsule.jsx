//react
import { useContext } from "react";

//Material UI
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

//context
import { globalContext } from "../constant/const";

//мои модули
import Pagination from "./Pagination";

const headCells = [
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Название",
  },
  {
    id: "dateCreate",
    numeric: true,
    disablePadding: false,
    label: "Дата создания",
  },
  {
    id: "dateOpen",
    numeric: true,
    disablePadding: false,
    label: "Дата открытия",
  },
];

function EnhancedTableHead(props) {
  const { displayCapsuleOrder, displayCapsuleOrderBy, onRequestSort } = props;
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
            sortDirection={
              displayCapsuleOrderBy === headCell.id
                ? displayCapsuleOrder
                : false
            }
          >
            <TableSortLabel
              active={displayCapsuleOrderBy === headCell.id}
              direction={
                displayCapsuleOrderBy === headCell.id
                  ? displayCapsuleOrder
                  : "asc"
              }
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {displayCapsuleOrderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {displayCapsuleOrder === "desc"
                    ? "sorted descending"
                    : "sorted ascending"}
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
  const gContext = useContext(globalContext);

  //   console.log("order, orderBy", order, orderBy);

  const handleRequestSort = (event, property) => {
    const isAsc =
      gContext.displayCapsuleOrderBy === property &&
      gContext.displayCapsuleOrder === "asc";
    gContext.setDisplayCapsuleOrder(isAsc ? "desc" : "asc");
    gContext.setDisplayCapsuleOrderBy(property);
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
            sx={{
              maxWidth: "100%",
              tableLayout: "fixed",
              wordWrap: "break-word",
            }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <colgroup>
              <col style={{ width: "70%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <EnhancedTableHead
              displayCapsuleOrder={gContext.displayCapsuleOrder}
              displayCapsuleOrderBy={gContext.displayCapsuleOrderBy}
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
                    sx={{
                      cursor: "pointer",
                      height: "27px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => {
                      gContext.setDateDialog({
                        id: row.id,
                        title: row.title,
                        dateCreate: row.date_create,
                        dateOpen: row.date_open,
                      });
                      gContext.setOpenDialog("openCapsule");
                    }}
                  >
                    <TableCell
                      sx={{
                        height: "27px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      component="th"
                      id={labelId}
                      scope="row"
                    >
                      {row.title}
                    </TableCell>
                    <TableCell
                      sx={{
                        height: "27px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      align="right"
                    >
                      {row.date_create}
                    </TableCell>
                    <TableCell
                      sx={{
                        height: "27px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      align="right"
                    >
                      {row.date_open}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 60 * emptyRows,
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
