import { useContext } from "react";

//Material UI
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//context
import { globalContext } from "../constant/const";

function DialogOpenCapsule({ handleClose }) {
  const gContext = useContext(globalContext);
  return (
    <Dialog open={Boolean(gContext.openDialog)} onClose={handleClose}>
      <DialogTitle>{gContext.dateDialog.title}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          <p>ID капсулы: {gContext.dateDialog.id}</p>
          <p>Дата создания: {gContext.dateDialog.dateCreate}</p>
          <p>Дата открытия: {gContext.dateDialog.dateOpen}</p>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default DialogOpenCapsule;
