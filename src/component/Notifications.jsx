//react
import { useContext } from "react";

//context
import { globalContext } from "../constant/const";

//Material UI
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Notifications() {
  const gContext = useContext(globalContext);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: gContext.alertMessageState.vertical,
        horizontal: gContext.alertMessageState.horizontal,
      }}
      open={gContext.alertMessageState.openMessage}
      autoHideDuration={5000}
      onClose={gContext.handleCloseState}
      key={
        gContext.alertMessageState.vertical +
        gContext.alertMessageState.horizontal
      }
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
