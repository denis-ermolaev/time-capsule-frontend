import { globalContext } from "../const";
import { useContext } from "react";
import Button from "@mui/material/Button";
import Pagination from "./Pagination";
import TabsCapsule from "./TabsCapsule";
import Box from "@mui/material/Box";
function MainContent() {
  const gContext = useContext(globalContext);

  let pageDraw;
  if (["NotAuth"].includes(gContext.accountLogin.status)) {
    pageDraw = (
      <p>
        На этом сайте после регестрации вы можете начать создавать капсулы
        времени.
      </p>
    );
  } else {
    pageDraw = (
      <>
        <h1 style={{ marginTop: "5px", marginBottom: "5px" }}>
          Создание капсулы времени
        </h1>
        <p>
          Очень длинный текст в параграфе, нажав на красную кнопку вы можете
          создать капсулу времени в отдельном меню
        </p>
        <Button onClick={gContext.handleOpen} variant="contained">
          Создать
        </Button>
        <p>Тут может быть очень много текста</p>
        <TabsCapsule />
      </>
    );
  }
  return <Box className="main">{pageDraw}</Box>;
}

export default MainContent;
