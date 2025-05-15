//react
import { useContext } from "react";

//context
import { globalContext } from "../constant/const";

//constant
import { drawerWidth } from "../constant/const";
import { AppBar, DrawerHeader } from "../constant/constComponent";

//Material UI
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

function MainInterface() {
  function logOut() {
    gContext.dispatchAccountLogin({ type: "log out" });
  }
  function handleDrawerOpen() {
    gContext.setOpenDrawer(true);
  }

  function handleDrawerClose() {
    gContext.setOpenDrawer(false);
  }
  function openDialogLogin() {
    gContext.setOpenDialog("login");
  }
  const gContext = useContext(globalContext);
  // console.log("MainInterface", gContext.accountLogin.status);

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={Boolean(gContext.openDrawer)}
        className={`navmenu ${gContext.Scrolltrigger ? "plusopacity" : ""}`}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            disabled={gContext.accountLogin.status === "Auth" ? false : true}
            onClick={handleDrawerOpen}
            sx={[
              {
                mr: 2,
              },
              gContext.openDrawer && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
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
              <p>{gContext.accountLogin.userName}</p>
              <IconButton onClick={logOut}>
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <IconButton onClick={openDialogLogin}>
              <LoginIcon />
            </IconButton>
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
        <DrawerHeader sx={{ display: "flex" }}>
          <FilterAltIcon />
          <Typography
            sx={{
              flexGrow: "1",
            }}
          >
            Фильтры
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <MenuOpenIcon />
          </IconButton>
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
            <p
              style={{ marginTop: "0px", marginBottom: "0px", padding: "0px" }}
            >
              Капсула, созданная в пределах этих дат:
            </p>
          </ListItem>
          <ListItem>
            <div style={{ display: "flex" }}>
              <DatePicker
                sx={{ maxWidth: "150px" }}
                label="От"
                slotProps={{ textField: { size: "small" } }}
              />
              <p
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  marginTop: "8px",
                  marginBottom: "5px",
                }}
              >
                {" "}
                -{" "}
              </p>
              <DatePicker
                sx={{ maxWidth: "150px" }}
                label="До"
                slotProps={{ textField: { size: "small" } }}
              />
            </div>
          </ListItem>
          <Divider />
          <ListItem>
            <p
              style={{ marginTop: "0px", marginBottom: "0px", padding: "0px" }}
            >
              Капсула, которая открывается в пределах этих дат:
            </p>
          </ListItem>
          <ListItem>
            <div style={{ display: "flex" }}>
              <DatePicker
                sx={{ maxWidth: "150px" }}
                label="От"
                slotProps={{ textField: { size: "small" } }}
              />
              <p
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  marginTop: "8px",
                  marginBottom: "5px",
                }}
              >
                {" "}
                -{" "}
              </p>
              <DatePicker
                sx={{ maxWidth: "150px" }}
                label="До"
                slotProps={{ textField: { size: "small" } }}
              />
            </div>
          </ListItem>
          <Divider sx={{ marginBottom: "8px" }} />
          <ListItem>
            <TextField
              id="standard-adornment-password"
              type="search"
              fullWidth
              size="small"
              variant="outlined"
              placeholder="поиск"
            />
          </ListItem>
          <ListItem>
            <Button
              variant="outlined"
              fullWidth
              sx={{ marginLeft: "auto", marginRight: "auto" }}
              startIcon={<FilterAltOutlinedIcon />}
            >
              Применить фильтры
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default MainInterface;
