import { globalContext } from "../const";
import { useContext } from "react";

import Snackbar from "@mui/material/Snackbar";

import Alert from "@mui/material/Alert";
function Notifications() {
  const gContext = useContext(globalContext);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: gContext.vertical,
        horizontal: gContext.horizontal,
      }}
      open={gContext.openMessage}
      autoHideDuration={5000}
      onClose={gContext.handleCloseState}
      key={gContext.vertical + gContext.horizontal}
    >
      <Alert
        severity="success"
        sx={{ width: "100%" }}
        onClose={gContext.handleCloseState}
      >
        This is a success Alert.
      </Alert>
    </Snackbar>
  );
}

export default Notifications;
