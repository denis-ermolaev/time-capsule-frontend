import { useContext } from "react";
import { globalContext, drawerWidth, AppBar, DrawerHeader } from "../const";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import Input from "@mui/material/Input";
import Divider from "@mui/material/Divider";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
function MainInterface() {
  const gContext = useContext(globalContext);
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={gContext.openDrawer}
        className={`navmenu ${gContext.trigger ? "plusopacity" : ""}`}
      >
        <Toolbar>
          <Button
            color="inherit"
            aria-label="open drawer"
            onClick={gContext.handleDrawerOpen}
            sx={[
              {
                mr: 2,
              },
              gContext.openDrawer && { display: "none" },
            ]}
          >
            Открыть
          </Button>
          <Typography variant="h6" noWrap component="div">
            Time Capsule
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: "14px",
              flexGrow: "1",
              marginLeft: "16px",
              marginRight: "16px",
            }}
          >
            {gContext.dateNow}
          </Typography>
          <Button color="inherit" onClick={gContext.openDialogLogin}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className="drawerMain"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={gContext.openDrawer}
      >
        <DrawerHeader>
          <Button onClick={() => gContext.handleDrawerClose()}>Закрыть</Button>
        </DrawerHeader>
        <List>
          {[
            "Капсулы которые открываются сегодня",
            "Капсулы которые открываются на этой недели",
            "Капсулы которые открываются в этом месяце",
          ].map((text) => (
            <>
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ))}
          <p>Капсула, созданная в пределах этих дат:</p>
          <div style={{ display: "flex" }}>
            <Input id="standard-adornment-password" type="date"></Input>
            <p style={{ marginLeft: "10px", marginRight: "10px" }}> - </p>
            <Input id="standard-adornment-password" type="date"></Input>
          </div>
          <Divider style={{ marginTop: "10px" }} />
          <p>Капсула, которая открывается в пределах этих дат:</p>
          <div style={{ display: "flex" }}>
            <Input id="standard-adornment-password" type="date"></Input>
            <p style={{ marginLeft: "10px", marginRight: "10px" }}> - </p>
            <Input id="standard-adornment-password" type="date"></Input>
          </div>
          <Divider style={{ marginTop: "10px" }} />
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <p>Поиск по</p>
            <Autocomplete
              disablePortal
              sx={{ width: "250px" }}
              options={[
                "По имени",
                "По id",
                "По дате создания",
                "По дате открытия",
              ]}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </div>
          <Input
            id="standard-adornment-password"
            type="search"
            placeholder="поиск"
          ></Input>
          <Button>Искать</Button>
        </List>
      </Drawer>
    </>
  );
}

export default MainInterface;
