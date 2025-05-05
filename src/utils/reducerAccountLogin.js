export const AccountLoginInitial = {
  userName: localStorage.getItem("userName"),
  password: localStorage.getItem("password"),
  isLogin: false,
  status: "FirstLoading Try",
};
export function reducerAccountLogin(state, action) {
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
