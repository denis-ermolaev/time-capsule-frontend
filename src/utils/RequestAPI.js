import axios from "axios";

export default class RequestAPI {
  url = "http://localhost:9000";
  /**
   * @param {Object} state
   * @param {Object} state.accountLogin
   * @param {string} state.accountLogin.userName
   * @param {string} state.accountLogin.password
   * @param {boolean} state.accountLogin.isLogin
   * @param {["FirstLoading Try", "Auth", "try", "NotAuth", "Registration"]} state.accountLogin.status
   * @param {function} state.dispatchAccountLogin
   */
  constructor(state = {}) {
    this.state = state;
    console.log("this.state", this.state);
  }
  async auth() {
    try {
      const response = await axios.get(`${this.url}/users`, {
        params: {
          name: this.state.accountLogin.userName,
          password: this.state.accountLogin.password,
        },
      });
      if (response.data.length === 0) {
        this.state.dispatchAccountLogin({ type: "authentication failed" });
        console.log("Не успешная аудентификация");
      } else if (response.data.length >= 1) {
        this.state.dispatchAccountLogin({
          type: "authentication success",
          userName: this.state.accountLogin.userName,
          password: this.state.accountLogin.password,
        });
        console.log("Успешная аудентификация", response);
      } else {
        this.state.dispatchAccountLogin({ type: "authentication failed" });
        console.log("Не успешная аудентификация");
      }
    } catch (error) {
      console.error(error);
    }
  }
  async registration() {
    try {
      const response = axios.post(`${this.url}/users`, {
        name: this.state.accountLogin.userName,
        password: this.state.accountLogin.password,
      });
      if (response.data.length !== 0) {
        this.state.dispatchAccountLogin({
          type: "change authentication",
          userName: this.state.accountLogin.userName,
          password: this.state.accountLogin.password,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
