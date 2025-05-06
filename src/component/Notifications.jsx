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
      autoHideDuration={10000}
      onClose={() => {
        gContext.setAlertMessageState((prev) => {
          return { ...prev, openMessage: false };
        });
      }}
      key={
        gContext.alertMessageState.vertical +
        gContext.alertMessageState.horizontal
      }
    >
      <Alert
        severity={gContext.alertMessageState.typeAlert}
        sx={{ width: "100%" }}
        onClose={() => {
          gContext.setAlertMessageState((prev) => {
            return { ...prev, openMessage: false };
          });
        }}
      >
        {gContext.alertMessageState.message}
      </Alert>
    </Snackbar>
  );
}

export default Notifications;
