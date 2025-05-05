//Material UI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

//React
import { globalContext } from "../constant/const";

//Context
import { useContext } from "react";

//Табы для отображения капсул
import TabsCapsule from "../displayСapsules/TabsCapsule";

function MainContent() {
  function openCreateCapsuleDialog() {
    gContext.setOpenDialog("createCapsule");
  }

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
        <Button onClick={openCreateCapsuleDialog} variant="contained">
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
