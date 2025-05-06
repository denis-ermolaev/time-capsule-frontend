/* eslint-disable react-hooks/exhaustive-deps */
//react
import { useState, useEffect, useReducer } from "react";

//Material UI
import useScrollTrigger from "@mui/material/useScrollTrigger";

//context
import { globalContext } from "../constant/const";

//reducer
import {
  AccountLoginInitial,
  reducerAccountLogin,
} from "../utils/reducerAccountLogin";

//utils
import { getCurrentTimeFormat } from "../utils/time";

import RequestAPI from "../utils/requestAPI";

//Просто чтобы не было предупреждения об ошибки
globalContext;

export default function ContextGLOBAL({ children }) {
  //Состояния учётной записи
  const [accountLogin, dispatchAccountLogin] = useReducer(
    reducerAccountLogin,
    AccountLoginInitial
  );
  //Хранилище капсул, их данных из БД
  const [ListCapsules, setListCapsules] = useState([]);
  //Пагинация
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [countPagination, setCountPagination] = useState(0);
  //Время на главной странице
  const [dateNow, setDateNow] = useState(getCurrentTimeFormat());
  //Используется для фильтрации по, отрывающиеся капсулы сегодня
  //На этой недели или в этом месяце
  // day week month
  // TODO: перенести в отдельный useReducer по всем фильтрам
  const [filtrationOpenCapsules, setFiltrationOpenCapsules] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dateDialog, setDateDialog] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openTabNumber, setOpenTabNumber] = useState(0);
  //Просто меняем на противоположное для отрисовки
  const [updateCapsuleTabs, setUpdateCapsuleTabs] = useState(false);
  const [alertMessageState, setAlertMessageState] = useState({
    openMessage: false,
    vertical: "bottom",
    horizontal: "center",
    message: "Notifications",
    typeAlert: "success",
  });
  const Scrolltrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });
  const [displayCapsuleOrder, setDisplayCapsuleOrder] = useState("asc");
  const [displayCapsuleOrderBy, setDisplayCapsuleOrderBy] =
    useState("dateCreate");
  const requestAPI = new RequestAPI({
    accountLogin,
    dispatchAccountLogin,
    updateCapsuleTabs,
    setUpdateCapsuleTabs,
    displayCapsuleOrder,
    setDisplayCapsuleOrder,
    displayCapsuleOrderBy,
    setDisplayCapsuleOrderBy,
    setCountPagination,
    setListCapsules,
    openTabNumber,
    rowsPerPage,
    page,
  });

  useEffect(() => {
    setInterval(() => setDateNow(getCurrentTimeFormat()), 1000);
  }, []);

  useEffect(() => {
    if (
      accountLogin.status === "FirstLoading Try" ||
      accountLogin.status === "try"
    ) {
      requestAPI.auth();
    } else if (accountLogin.status === "Registration") {
      requestAPI.registration();
    }
  }, [accountLogin.status]);

  return (
    <globalContext.Provider
      value={{
        requestAPI,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        dateNow,
        setDateNow,
        openDialog,
        setOpenDialog,
        openDrawer,
        setOpenDrawer,
        openTabNumber,
        setOpenTabNumber,
        alertMessageState,
        setAlertMessageState,
        Scrolltrigger,
        accountLogin,
        dispatchAccountLogin,
        countPagination,
        setCountPagination,
        ListCapsules,
        setListCapsules,
        updateCapsuleTabs,
        setUpdateCapsuleTabs,
        filtrationOpenCapsules,
        setFiltrationOpenCapsules,
        displayCapsuleOrder,
        setDisplayCapsuleOrder,
        displayCapsuleOrderBy,
        setDisplayCapsuleOrderBy,
        dateDialog,
        setDateDialog,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}
