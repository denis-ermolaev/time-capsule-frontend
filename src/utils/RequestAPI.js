import axios from "axios";

export default class RequestAPI {
  url = "http://127.0.0.1:8000";
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
    console.log("auth запущен", this.state.accountLogin);
    if (this.state.accountLogin.accessToken) {
      try {
        const response = await axios.post(
          `${this.url}/api/auth/token/verify/`,
          {
            token: this.state.accountLogin.accessToken,
          }
        );
        console.log("auth проверка токена", response);
        if (Object.keys(response.data).length === 0) {
          this.state.dispatchAccountLogin({
            type: "authentication success",
            accessToken: this.state.accountLogin.accessToken,
            refreshToken: this.state.accountLogin.refreshToken,
          });
        }
      } catch (error) {
        console.log(error);
        this.state.dispatchAccountLogin({ type: "authentication failed" });
      }
    } else if (
      this.state.accountLogin.userName &&
      this.state.accountLogin.password
    ) {
      try {
        const response = await axios.post(`${this.url}/api/auth/token/`, {
          username: this.state.accountLogin.userName,
          password: this.state.accountLogin.password,
        });
        console.log("auth вход", response);
        if (response.data.access) {
          this.state.dispatchAccountLogin({
            type: "authentication success",
            accessToken: response.data.access,
            refreshToken: response.data.refresh,
          });
        }
      } catch (error) {
        console.log(error);
        this.state.dispatchAccountLogin({ type: "authentication failed" });
      }
    } else {
      this.state.dispatchAccountLogin({ type: "authentication failed" });
    }
  }
  async registration() {
    try {
      const response = await axios.post(`${this.url}/api/auth/`, {
        username: this.state.accountLogin.userName,
        password: this.state.accountLogin.password,
      });
      console.log("registration", response.data);
      if (response.data.message === "success") {
        const response = await axios.post(`${this.url}/api/auth/token/`, {
          username: this.state.accountLogin.userName,
          password: this.state.accountLogin.password,
        });
        console.log("registration log on", response.data);
        this.state.dispatchAccountLogin({
          type: "change authentication",
          accessToken: response.data.access,
          refreshToken: response.data.refresh,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  async createCapsule(private_status, title, text, dateOpen) {
    try {
      const response = await axios.post(
        `${this.url}/api/capsules`,
        {
          private: private_status,
          title: title,
          text_bd: text,
          date_open: dateOpen,
        },
        {
          headers: {
            Authorization: `Bearer ${this.state.accountLogin.accessToken}`,
          },
        }
      );
      this.state.setUpdateCapsuleTabs(!this.state.updateCapsuleTabs);
      console.log(response);
      return "OK";
    } catch (error) {
      console.error(error);
    }
  }
  async getListCapsule() {
    try {
      const url = `${this.url}/api/capsules`;
      let params = {};
      const sigh = this.state.displayCapsuleOrder === "asc" ? "" : "-";
      const sortBy = {
        dateCreate: "date_create",
        title: "title",
        dateOpen: "date_open",
      };
      if (this.state.openTabNumber) {
        params.private = !this.state.openTabNumber;
      }
      params.sortBy = sigh + sortBy[this.state.displayCapsuleOrderBy];
      params.page = this.state.page + 1;
      params.page_size = this.state.rowsPerPage;
      const response = await axios.get(url, {
        params: params,
        headers: {
          Authorization: `Bearer ${this.state.accountLogin.accessToken}`,
        },
      });
      this.state.setCountPagination(response.data.count);
      this.state.setListCapsules(response.data.results);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}
