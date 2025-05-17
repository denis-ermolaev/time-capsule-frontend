import { useContext, useState } from "react";

//Material UI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

//context
import { globalContext } from "../constant/const";

export default function DialogLogReg({ handleClose }) {
  function tryAuth(event) {
    console.log(event);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    gContext.requestAPI
      .auth(formJson.login, formJson.password)
      .then((result) => {
        if (result === "OK") {
          gContext.setAlertMessageState((prev) => {
            return {
              ...prev,
              openMessage: true,
              message: "Добро пожаловать!",
              typeAlert: "success",
            };
          });
          gContext.setOpenDialog(false);
        } else {
          gContext.setAlertMessageState((prev) => {
            return {
              ...prev,
              openMessage: true,
              message:
                "Ошибка при входе. Проверьте корректность логина и пароля. Или зарегестрируйтесь",
              typeAlert: "error",
            };
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function Registration(event) {
    console.log(event);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    gContext.requestAPI
      .registration(formJson.login, formJson.password)
      .then((result) => {
        if (result === "OK") {
          gContext.setAlertMessageState((prev) => {
            return {
              ...prev,
              openMessage: true,
              message: "Добро пожаловать!",
              typeAlert: "success",
            };
          });
          gContext.setOpenDialog(false);
        } else {
          gContext.setAlertMessageState((prev) => {
            return {
              ...prev,
              openMessage: true,
              message:
                "Ошибка при регистрации. Возможно пользователь с таким именем уже существует",
              typeAlert: "error",
            };
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const gContext = useContext(globalContext);
  const [openRegistration, setOpenRegistration] = useState(false);
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
}
