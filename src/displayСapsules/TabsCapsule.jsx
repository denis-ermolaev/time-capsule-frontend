//react
import { useContext } from "react";

//Material UI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

//context
import { globalContext } from "../constant/const";

//Мои компоненты
import EnhancedTable from "./TableCapsule";

export default function TabsCapsule() {
  function handleChangeTab(event, newValue) {
    gContext.setPage(0);
    gContext.setOpenTabNumber(newValue);
  }
  const gContext = useContext(globalContext);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={gContext.openTabNumber}
          onChange={handleChangeTab}
          aria-label="basic tabs example"
        >
          <Tab label="Личные капсулы" />
          <Tab label="Общественные капсулы" />
        </Tabs>
      </Box>
      <div
        role="tabpanel"
        hidden={gContext.openTabNumber !== 0}
        id={`simple-tabpanel-${0}`}
        aria-labelledby={`simple-tab-${0}`}
      >
        {gContext.openTabNumber === 0 && (
          <Box sx={{ p: 0 }}>
            <div className="CapsuleListContainer">{<EnhancedTable />}</div>
          </Box>
        )}
      </div>
      <div
        role="tabpanel"
        hidden={gContext.openTabNumber !== 1}
        id={`simple-tabpanel-${1}`}
        aria-labelledby={`simple-tab-${1}`}
      >
        {gContext.openTabNumber === 1 && (
          <Box sx={{ p: 0 }}>
            <div className="CapsuleListContainer">{<EnhancedTable />}</div>
          </Box>
        )}
      </div>
    </Box>
  );
}
