//react
import { useContext, useState } from "react";

//Material UI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

//context
import { globalContext } from "../constant/const";

//utils
import { getCurrentTimeFormat } from "../utils/time";

const today = dayjs().add(0, "day");

export default function DialogComponent() {
  function handleClose() {
    gContext.setOpenDialog(false);
  }
  function tryAuth(event) {
    console.log(event);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    gContext.dispatchAccountLogin({
      type: "change authentication",
      userName: formJson.login,
      password: formJson.password,
    });
  }
  function Registration(event) {
    console.log(event);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    gContext.dispatchAccountLogin({
      type: "Registration",
      userName: formJson.login,
      password: formJson.password,
    });
  }
  function createCapsule(event) {
    async function postCapsule() {
      let res = await fetch(`http://localhost:9000/capsule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          owner: gContext.accountLogin.userName,
          private: private_status,
          title: title,
          dateCreate: dateCreate,
          dateOpen: dateOpen,
        }),
      });
      res = await res.json();
      console.log("Отправка созданной капсулы времени на сервер", res);
      gContext.setUpdateCapsuleTabs(!gContext.updateCapsuleTabs);
    }
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const title = formJson.title;
    const dateCreate = getCurrentTimeFormat();
    const dateOpen =
      formJson.dataOpen.replace("T", " ").replace("-", ".") + ":00";
    const private_status = formJson.public ? false : true;
    postCapsule();
  }

  const gContext = useContext(globalContext);
  const [openRegistration, setOpenRegistration] = useState(false);

  if (gContext.openDialog === "login") {
    return (
      <Dialog
        open={Boolean(gContext.openDialog)}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: openRegistration ? Registration : tryAuth,
          },
        }}
      >
        <DialogTitle>Логин</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Чтобы использовать сайт вам нужно войти/зарегестрироваться
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="name"
            name="login"
            label="Введите логин"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="name2"
            name="password"
            label="Введите пароль"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setOpenRegistration(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit">
            {openRegistration ? "Зарегестрироваться" : "Войти"}
          </Button>
          {openRegistration ? (
            ""
          ) : (
            <Button id="reg-button" onClick={() => setOpenRegistration(true)}>
              Перейти к регистрации
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  } else if (gContext.openDialog === "createCapsule") {
    return (
      <Dialog
        open={Boolean(gContext.openDialog)}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: createCapsule,
          },
        }}
      >
        <DialogTitle>Создание Капсулы Времени</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Создать капсулу времени, для этого вам нужно заполнить данную форму
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="title"
            name="title"
            label="Введите название капсулы времени"
            type="text"
            fullWidth
            variant="standard"
          />
          <DateTimePicker
            name="dataOpen"
            sx={{ minWidth: "100%", marginTop: "10px", marginBottom: "10px" }}
            slotProps={{ textField: { size: "small" } }}
            label="Введите дату открытия"
            defaultValue={today}
          />
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography>Приватная</Typography>
            <FormControlLabel
              control={<Switch id="public" name="public" value="on" />}
            />
            <Typography>Публичная</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Создать капсулу времени</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
