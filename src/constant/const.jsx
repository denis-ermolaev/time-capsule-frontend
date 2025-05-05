//react
import { createContext } from "react";

//Material UI
import { ruRU } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";

// ContextAPI
export const globalContext = createContext();

//Настройка тем для материал UI
export let darkTheme = createTheme(
  {
    palette: {
      mode: "dark",
      primary: {
        main: "#FF5733",
      },
    },
  },
  ruRU
);

//Ширина правой панели,
//TODO: почему здесь ?
export const drawerWidth = 400;
