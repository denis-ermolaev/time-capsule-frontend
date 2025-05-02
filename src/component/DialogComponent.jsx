import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { globalContext } from "../const";

export default function DialogComponent() {
  const gContext = useContext(globalContext);

  function tryAuth(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    gContext.dispatchAccountLogin({
      type: "change authentication",
      userName: formJson.login,
      password: formJson.password,
    });
  }
  if (gContext.open === "login") {
    return (
      <Dialog
        open={Boolean(gContext.open)}
        onClose={gContext.handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: tryAuth,
          },
        }}
      >
        <DialogTitle>Логин/Регестрация</DialogTitle>
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
          <Button onClick={gContext.handleClose}>Cancel</Button>
          <Button type="submit">Войти</Button>
          <Button>Зарегестрироваться</Button>
        </DialogActions>
      </Dialog>
    );
  } else if (gContext.open === "createCapsule") {
    return (
      <Dialog
        open={Boolean(gContext.open)}
        onClose={gContext.handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event) => {
              gContext.handleClickState(event, {
                vertical: "top",
                horizontal: "center",
              });
            },
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Создать капсулу времени, для этого вам нужно заполнить данную форму
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="text"
            label="Введите название капсулы времени"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={gContext.handleClose}>Cancel</Button>
          <Button type="submit">Создать капсулу времени</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
