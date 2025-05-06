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
   * @param {boolean} state.updateCapsuleTabs
   * @param {function} state.setUpdateCapsuleTabs
   */
  constructor(state = {}) {
    this.state = state;
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
  async createCapsule(private_status, title, dateCreate, dateOpen) {
    try {
      const response = await axios.post(`${this.url}/capsule`, {
        owner: this.state.accountLogin.userName,
        private: private_status,
        title: title,
        dateCreate: dateCreate,
        dateOpen: dateOpen,
      });
      this.state.setUpdateCapsuleTabs(!this.state.updateCapsuleTabs);
      console.log(response);
      return "OK";
    } catch (error) {
      console.error(error);
    }
  }
  async getListCapsule() {
    try {
      const url = `${this.url}/capsule`;
      let params = {};
      const sigh = this.state.displayCapsuleOrder === "asc" ? "" : "-";
      if (this.state.openTabNumber) {
        params.private_ne = Boolean(this.state.openTabNumber);
        params._sort = sigh + this.state.displayCapsuleOrderBy;
      } else {
        params.owner = this.state.accountLogin.userName;
        params._sort = sigh + this.state.displayCapsuleOrderBy;
      }
      params._page = this.state.page + 1;
      params._per_page = this.state.rowsPerPage;
      const response = await axios.get(url, {
        params: params,
      });
      this.state.setCountPagination(
        response.data.pages * this.state.rowsPerPage
      );
      this.state.setListCapsules(response.data.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}
