import { globalContext } from "../const";
import { useContext } from "react";
import TablePagination from "@mui/material/TablePagination";

function Pagination() {
  const gContext = useContext(globalContext);
  return (
    <TablePagination
      component="div"
      count={100}
      page={gContext.page}
      onPageChange={gContext.handleChangePage}
      rowsPerPage={gContext.rowsPerPage}
      onRowsPerPageChange={gContext.handleChangeRowsPerPage}
    />
  );
}

export default Pagination;
