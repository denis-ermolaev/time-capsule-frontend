export const AccountLoginInitial = {
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  userName: null,
  password: null,
  isLogin: false,
  isLoading: true,
  status: "FirstLoading Try",
};
export function reducerAccountLogin(state, action) {
  console.log(action);
  switch (action.type) {
    case "authentication failed":
      return {
        ...state,
        status: "NotAuth",
        userName: null,
        password: null,
        accessToken: null,
        refreshToken: null,
      };
    case "authentication success":
      localStorage.setItem("accessToken", action.accessToken);
      localStorage.setItem("refreshToken", action.refreshToken);
      return {
        ...state,
        status: "Auth",
        userName: null,
        password: null,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    case "change authentication":
      if (action.userName) {
        return {
          ...state,
          status: "try",
          userName: action.userName,
          password: action.password,
        };
      } else {
        return {
          ...state,
          status: "try",
          accessToken: action.accessToken,
          refreshToken: action.refreshToken,
        };
      }
    case "log out":
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        status: "NotAuth",
        userName: null,
        password: null,
        accessToken: null,
        refreshToken: null,
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
