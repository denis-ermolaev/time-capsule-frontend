//react
import { useContext } from "react";

//Material UI
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
//Для выбора дат
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";

//context
import { globalContext } from "./constant/const";

//constant
import { darkTheme } from "./constant/const";

//constantCoponent
import { Main, DrawerHeader } from "./constant/constComponent";

//Кастомные компоненты
import MainInterface from "./component/MainInterface";
import Notifications from "./component/Notifications";
import MainContent from "./component/MainContent";
import Dialog from "./dialogues/DialogComponent";

export default function App() {
  const gContext = useContext(globalContext);

  let pageDraw;
  if (["FirstLoading Try"].includes(gContext.accountLogin.status)) {
    // console.log("App", gContext.accountLogin.status);
    pageDraw = (
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={gContext.accountLogin.status === "FirstLoading Try"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else {
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
  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        {pageDraw}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
