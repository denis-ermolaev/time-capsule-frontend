import { useContext } from "react";

//Material UI
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";

//Константы и компоненты с переделаным дизайном, которые не планируется редактировать
import { globalContext, darkTheme, Main, DrawerHeader } from "./const";

//Кастомные компоненты
import MainInterface from "./component/MainInterface";
import Notifications from "./component/Notifications";
import MainContent from "./component/MainContent";
import Dialog from "./component/DialogComponent";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function App() {
  const gContext = useContext(globalContext);
  let pageDraw;
  if (["FirstLoading Try"].includes(gContext.accountLogin.status)) {
    // console.log("App", gContext.accountLogin.status);
    pageDraw = (
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={Boolean(open)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else {
    // console.log("App", gContext.accountLogin.status);
    // if (gContext.accountLogin.status === "NotAuth")
    pageDraw = (
      <Box sx={{ display: "flex" }}>
        <MainInterface />
        <Main open={Boolean(gContext.openDrawer)}>
          <DrawerHeader />
          <MainContent />
          <Dialog />
          <Notifications />
        </Main>
      </Box>
    );
  }
  return <ThemeProvider theme={darkTheme}>{pageDraw}</ThemeProvider>;
}
