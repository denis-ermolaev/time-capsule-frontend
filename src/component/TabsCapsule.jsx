import { globalContext } from "../const";
import { useContext } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";

import EnhancedTable from "./TableCont";

// const [page, setPage] = useState(0);
// const [rowsPerPage, setRowsPerPage] = useState(10);
// const [countPagination, setCountPagination] = useState(0);

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
            <div className="CapsuleListContainer">{<EnhancedTable />}</div>
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
            <div className="CapsuleListContainer">{<EnhancedTable />}</div>
          </Box>
        )}
      </div>
    </Box>
  );
}

export default TabsCapsule;
