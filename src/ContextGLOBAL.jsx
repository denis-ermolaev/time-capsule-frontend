/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import useScrollTrigger from "@mui/material/useScrollTrigger";
// Настройка глобальный контекста
import { globalContext } from "./const";
//Функции из утилит
import { getCurrentTimeFormat } from "./utils/anyfun";
import { useReducer } from "react";

//Просто чтобы не было предупреждения об ошибки
globalContext;

const AccountLoginInitial = {
  userName: localStorage.getItem("userName"),
  password: localStorage.getItem("password"),
  isLogin: false,
  status: "FirstLoading Try",
};
function reducerAccountLogin(state, action) {
  console.log(action);
  switch (action.type) {
    case "authentication failed":
      return { ...state, status: "NotAuth" };
    case "authentication success":
      localStorage.setItem("userName", action.userName);
      localStorage.setItem("password", action.password);
      return {
        ...state,
        status: "Auth",
        userName: action.userName,
        password: action.password,
      };
    case "change authentication":
      return {
        ...state,
        status: "try",
        userName: action.userName,
        password: action.password,
      };
    case "log out":
      localStorage.removeItem("userName");
      localStorage.removeItem("password");
      return {
        ...state,
        status: "NotAuth",
        userName: null,
        password: null,
      };
    case "Registration":
      return {
        ...state,
        status: "Registration",
        userName: action.userName,
        password: action.password,
      };
  }
}
export function ContextGLOBAL({ children }) {
  async function getData() {
    console.log(accountLogin.status);
    let res = await fetch(
      `http://localhost:9000/users?name=${accountLogin.userName}&${accountLogin.password}`
    );
    res = await res.json();
    if (res.length === 0) {
      dispatchAccountLogin({ type: "authentication failed" });
      console.log("Не успешная аудентификация");
    } else if (res.length >= 1) {
      dispatchAccountLogin({
        type: "authentication success",
        userName: accountLogin.userName,
        password: accountLogin.password,
      });
      console.log("Успешная аудентификация", res);
    } else {
      dispatchAccountLogin({ type: "authentication failed" });
      console.log("Не успешная аудентификация");
    }
  }
  async function fetchRegistration() {
    let res = await fetch(`http://localhost:9000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        name: accountLogin.userName,
        password: accountLogin.password,
      }),
    });
    res = await res.json();
    if (res.length !== 0) {
      dispatchAccountLogin({
        type: "change authentication",
        userName: accountLogin.userName,
        password: accountLogin.password,
      });
    }
  }
  const [accountLogin, dispatchAccountLogin] = useReducer(
    reducerAccountLogin,
    AccountLoginInitial
  );
  useEffect(() => {
    if (
      accountLogin.status === "FirstLoading Try" ||
      accountLogin.status === "try"
    ) {
      getData();
    } else if (accountLogin.status === "Registration") {
      fetchRegistration();
    }
  }, [accountLogin.status]);
  const [ListCapsules, setListCapsules] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [countPagination, setCountPagination] = useState(0);
  const [dateNow, setDateNow] = useState(getCurrentTimeFormat());

  //Используется для фильтрации по, отрывающиеся капсулы сегодня
  //На этой недели или в этом месяце
  // day week month
  const [filtrationOpenCapsules, setFiltrationOpenCapsules] = useState(null);

  useEffect(() => {
    setInterval(() => setDateNow(getCurrentTimeFormat()), 1000);
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);
  const [updateCapsuleTabs, setUpdateCapsuleTabs] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const [state, setState] = useState({
    openMessage: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, openMessage } = state;
  const handleClickState = function (event, newState) {
    event.stopPropagation();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.text;
    console.log("Данные формы", email);
    setState({ ...newState, openMessage: true });
  };
  const handleCloseState = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ ...state, openMessage: false });
  };

  function handleClose() {
    setOpen(false);
  }
  const handleOpen = () => {
    setOpen("createCapsule");
  };
  function openDialogLogin() {
    setOpen("login");
  }

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  return (
    <globalContext.Provider
      value={{
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        dateNow,
        setDateNow,
        open,
        setOpen,
        openDrawer,
        setOpenDrawer,
        value,
        setValue,
        state,
        setState,
        handleChangePage,
        handleChangeRowsPerPage,
        handleChange,
        trigger,
        vertical,
        horizontal,
        openMessage,
        handleClickState,
        handleCloseState,
        handleClose,
        handleOpen,
        openDialogLogin,
        handleDrawerOpen,
        handleDrawerClose,
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
      }}
    >
      {children}
    </globalContext.Provider>
  );
}
