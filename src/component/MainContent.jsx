//Material UI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

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
    if (gContext.statistics.сolumnСhartDayCount) {
      pageDraw = (
        <>
          <p>
            На этом сайте после регестрации вы можете начать создавать капсулы
            времени.
          </p>
          <p> Посмотрите небольшую статистику по использованнию сайта:</p>
          <br></br>
          <PieChart
            hideLegend={true}
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: gContext.statistics.publicCapsules,
                    label: "Публичные капсулы времени",
                    color: "#bdb5b5",
                  },
                  {
                    id: 1,
                    value: gContext.statistics.privateCapsules,
                    label: "Приватные капсулы времени",
                    color: "#424040",
                  },
                ],
                highlightScope: { fade: "global", highlight: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            width={200}
            height={200}
          />
          <BarChart
            height={300}
            hideLegend={true}
            series={[
              {
                data: Object.values(
                  gContext.statistics.сolumnСhartDayCount
                ).reverse(),
                label: "Созданно капсул в этот день",
                id: "pvId",
                stack: "total",
                color: "#bdb5b5",
              },
            ]}
            xAxis={[
              {
                data: Object.keys(
                  gContext.statistics.сolumnСhartDayCount
                ).reverse(),
              },
            ]}
            yAxis={[{ width: 50 }]}
          />
        </>
      );
    }
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
