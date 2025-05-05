import { useContext } from "react";

import dayjs from "dayjs";

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

//context
import { globalContext } from "../constant/const";

//utils
import { getCurrentTimeFormat } from "../utils/time";

const today = dayjs().add(0, "day");

export default function DialogCreateCapsule({ handleClose }) {
  function createCapsule(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const title = formJson.title;
    const dateCreate = getCurrentTimeFormat();
    const dateOpen =
      formJson.dataOpen.replace("T", " ").replace("-", ".") + ":00";
    const private_status = formJson.public ? false : true;
    gContext.requestAPI.createCapsule(
      private_status,
      title,
      dateCreate,
      dateOpen
    );
  }
  const gContext = useContext(globalContext);
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
