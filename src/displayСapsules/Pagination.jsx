//react
import { useContext } from "react";

//context
import { globalContext } from "../constant/const";

//Material UI
import TablePagination from "@mui/material/TablePagination";

export default function Pagination() {
  function handleChangePage(event, newPage) {
    gContext.setPage(newPage);
  }
  function handleChangeRowsPerPage(event) {
    gContext.setRowsPerPage(parseInt(event.target.value, 10));
    gContext.setPage(0);
  }
  const gContext = useContext(globalContext);

  return (
    <TablePagination
      component="div"
      count={gContext.countPagination}
      page={gContext.page}
      onPageChange={handleChangePage}
      rowsPerPageOptions={[5, 10, 25, 50, 100]}
      rowsPerPage={gContext.rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
