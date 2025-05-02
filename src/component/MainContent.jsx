import { globalContext } from "../const";
import { useContext } from "react";
import Button from "@mui/material/Button";
import Pagination from "./Pagination";
import TabsCapsule from "./TabsCapsule";
import Box from "@mui/material/Box";
function MainContent() {
  const gContext = useContext(globalContext);
  return (
    <Box className="main">
      <h1>Создание капсулы времени</h1>
      <p>
        Очень длинный текст в параграфе, нажав на красную кнопку вы можете
        создать капсулу времени в отдельном меню
      </p>
      <Button onClick={gContext.handleOpen} variant="contained">
        Создать
      </Button>
      <p>Тут может быть очень много текста</p>
      <TabsCapsule />
      <Pagination />
    </Box>
  );
}

export default MainContent;
