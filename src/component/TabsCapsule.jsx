import { globalContext } from "../const";
import { useContext } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "@mui/material/Link";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
function TabsCapsule() {
  const gContext = useContext(globalContext);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={gContext.value}
          onChange={gContext.handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Личные капсулы" />
          <Tab label="Общественные капсулы" />
        </Tabs>
      </Box>
      <div
        role="tabpanel"
        hidden={gContext.value !== 0}
        id={`simple-tabpanel-${0}`}
        aria-labelledby={`simple-tab-${0}`}
      >
        {gContext.value === 0 && (
          <Box sx={{ p: 3 }}>
            <p style={{ display: "inline" }}>Название капсулы</p>
            <Button>По дате создания</Button>
            <Button>По дате открытия</Button>
            <Link href="#" underline="hover" style={{ display: "block" }}>
              Вот условно капсула времени, она тогда будет отрисовываться не на
              отдельном пути, а просто в всплывающем окне, там будет всё
              взаимодействие с ней
            </Link>
          </Box>
        )}
      </div>
      <div
        role="tabpanel"
        hidden={gContext.value !== 1}
        id={`simple-tabpanel-${1}`}
        aria-labelledby={`simple-tab-${1}`}
      >
        {gContext.value === 1 && (
          <Box sx={{ p: 3 }}>
            <p style={{ display: "inline" }}>Название капсулы</p>
            <Button>По дате создания</Button>
            <Button>По дате открытия</Button>
          </Box>
        )}
      </div>
    </Box>
  );
}

export default TabsCapsule;
