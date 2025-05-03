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
  // console.log("MainInterface", gContext.accountLogin.status);
  function logOut() {
    gContext.dispatchAccountLogin({ type: "log out" });
  }
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={Boolean(gContext.openDrawer)}
        className={`navmenu ${gContext.trigger ? "plusopacity" : ""}`}
      >
        <Toolbar>
          <Button
            color="inherit"
            disabled={gContext.accountLogin.status === "Auth" ? false : true}
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
          {gContext.accountLogin.status === "Auth" ? (
            <>
              <p>Привет {gContext.accountLogin.userName}</p>
              <Button color="inherit" onClick={logOut}>
                Выйти
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={gContext.openDialogLogin}>
              Login
            </Button>
          )}
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
        <DrawerHeader sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Меню фильтрации</Typography>
          <Button onClick={() => gContext.handleDrawerClose()}>Закрыть</Button>
        </DrawerHeader>
        <List>
          <ListItem key={"Капсулы которые открываются сегодня"} disablePadding>
            <ListItemButton
              className={
                gContext.filtrationOpenCapsules === "day" ? "activeButton" : ""
              }
              onClick={() => {
                gContext.setFiltrationOpenCapsules((prev) => {
                  if (prev === "day") {
                    return null;
                  } else {
                    return "day";
                  }
                });
              }}
            >
              <ListItemText primary={"Капсулы которые открываются сегодня"} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem
            key={"Капсулы которые открываются на этой недели"}
            disablePadding
          >
            <ListItemButton
              className={
                gContext.filtrationOpenCapsules === "week" ? "activeButton" : ""
              }
              onClick={() => {
                gContext.setFiltrationOpenCapsules((prev) => {
                  if (prev === "week") {
                    return null;
                  } else {
                    return "week";
                  }
                });
              }}
            >
              <ListItemText
                primary={"Капсулы которые открываются на этой недели"}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem
            key={"Капсулы которые открываются в этом месяце"}
            disablePadding
          >
            <ListItemButton
              className={
                gContext.filtrationOpenCapsules === "month"
                  ? "activeButton"
                  : ""
              }
              onClick={() => {
                gContext.setFiltrationOpenCapsules((prev) => {
                  if (prev === "month") {
                    return null;
                  } else {
                    return "month";
                  }
                });
              }}
            >
              <ListItemText
                primary={"Капсулы которые открываются в этом месяце"}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <p>Капсула, созданная в пределах этих дат:</p>
          </ListItem>
          <ListItem>
            <div style={{ display: "flex" }}>
              <Input id="standard-adornment-password" type="date"></Input>
              <p style={{ marginLeft: "10px", marginRight: "10px" }}> - </p>
              <Input id="standard-adornment-password" type="date"></Input>
            </div>
          </ListItem>
          <Divider />
          <ListItem>
            <p>Капсула, которая открывается в пределах этих дат:</p>
          </ListItem>
          <ListItem>
            <div style={{ display: "flex" }}>
              <Input id="standard-adornment-password" type="date"></Input>
              <p style={{ marginLeft: "10px", marginRight: "10px" }}> - </p>
              <Input id="standard-adornment-password" type="date"></Input>
            </div>
          </ListItem>
          <Divider />
          <ListItem sx={{ marginTop: "10px" }}>
            <Autocomplete
              disablePortal
              size="small"
              sx={{ width: "200px", marginRight: "auto" }}
              options={["имени", "id", "дате создания", "дате открытия"]}
              renderInput={(params) => (
                <TextField {...params} label="Поиск по" />
              )}
            />
          </ListItem>
          <ListItem>
            <TextField
              id="standard-adornment-password"
              type="search"
              fullWidth
              size="small"
              variant="outlined"
            />
            <Button>Найти</Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default MainInterface;
