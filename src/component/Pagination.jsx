import { globalContext } from "../const";
import { useContext } from "react";
import TablePagination from "@mui/material/TablePagination";
// const [page, setPage] = useState(0);
// const [rowsPerPage, setRowsPerPage] = useState(10);
// const [countPagination, setCountPagination] = useState(0);
function Pagination() {
  const gContext = useContext(globalContext);

  return (
    <TablePagination
      component="div"
      count={gContext.countPagination}
      page={gContext.page}
      onPageChange={gContext.handleChangePage}
      rowsPerPageOptions={[5, 10, 25, 50, 100]}
      rowsPerPage={gContext.rowsPerPage}
      onRowsPerPageChange={gContext.handleChangeRowsPerPage}
    />
  );
}

export default Pagination;
