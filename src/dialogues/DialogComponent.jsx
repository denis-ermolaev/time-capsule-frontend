//react
import { useContext } from "react";

//context
import { globalContext } from "../constant/const";

import DialogCreateCapsule from "./DialogCreateCapsule";
import DialogLogReg from "./DialogLogReg";
import DialogOpenCapsule from "./DialogOpenCapsule";

export default function DialogComponent() {
  function handleClose() {
    gContext.setOpenDialog(false);
  }

  const gContext = useContext(globalContext);

  if (gContext.openDialog === "login") {
    return <DialogLogReg handleClose={handleClose} />;
  } else if (gContext.openDialog === "createCapsule") {
    return <DialogCreateCapsule handleClose={handleClose} />;
  } else if (gContext.openDialog === "openCapsule") {
    return <DialogOpenCapsule handleClose={handleClose} />;
  }
}
