import axios from "axios";
import { formatDateForApi } from "./time";

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
  async auth(login = null, password = null) {
    console.log("auth запущен", this.state.accountLogin);
    if (this.state.accountLogin.accessToken) {
      try {
        let response = await axios.post(`${this.url}/api/auth/token/verify/`, {
          token: this.state.accountLogin.accessToken,
        });
        console.log("auth проверка токена", response);
        if (Object.keys(response.data).length === 0) {
          response = await axios.get(`${this.url}/api/info`, {
            params: { get_user_name: true },
            headers: {
              Authorization: `Bearer ${this.state.accountLogin.accessToken}`,
            },
          });

          this.state.dispatchAccountLogin({
            type: "authentication success",
            userName: response.data.user_name,
            accessToken: this.state.accountLogin.accessToken,
            refreshToken: this.state.accountLogin.refreshToken,
          });
        }
      } catch (error) {
        console.log(error);
        this.state.dispatchAccountLogin({ type: "authentication failed" });
      }
    } else if (login && password) {
      try {
        let response = await axios.post(`${this.url}/api/auth/token/`, {
          username: login,
          password: password,
        });
        console.log("auth вход", response);
        if (response.data.access) {
          const access = response.data.access;
          const refresh = response.data.refresh;
          response = await axios.get(`${this.url}/api/info`, {
            params: { get_user_name: true },
            headers: {
              Authorization: `Bearer ${access}`,
            },
          });
          this.state.dispatchAccountLogin({
            type: "authentication success",
            userName: response.data.user_name,
            accessToken: access,
            refreshToken: refresh,
          });
          return "OK";
        }
      } catch (error) {
        console.log(error);
        this.state.dispatchAccountLogin({ type: "authentication failed" });
      }
    } else {
      this.state.dispatchAccountLogin({ type: "authentication failed" });
    }
  }
  async registration(login, password) {
    try {
      const response = await axios.post(`${this.url}/api/auth/`, {
        username: login,
        password: password,
      });
      console.log("registration", response.data);
      if (response.data.message === "success") {
        const status = await this.auth(login, password);
        if (status === "OK") {
          return "OK";
        }
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
      if (this.state.filtrationOpenCapsules) {
        console.log(
          "this.state.filtrationOpenCapsules",
          this.state.filtrationOpenCapsules
        );
        params.relative_open = this.state.filtrationOpenCapsules;
      }
      if (this.state.createdFrom || this.state.createdTo) {
        params.create_date = `${
          this.state.createdFrom.$d.toLocaleDateString()
            ? formatDateForApi(this.state.createdFrom.$d.toLocaleDateString())
            : ""
        } - ${
          this.state.createdTo.$d.toLocaleDateString()
            ? formatDateForApi(this.state.createdTo.$d.toLocaleDateString())
            : ""
        }`;
      }
      if (this.state.opensFrom || this.state.opensTo) {
        params.open_date = `${
          this.state.opensFrom.$d.toLocaleDateString()
            ? formatDateForApi(this.state.opensFrom.$d.toLocaleDateString())
            : ""
        } - ${
          this.state.opensTo.$d.toLocaleDateString()
            ? formatDateForApi(this.state.opensTo.$d.toLocaleDateString())
            : ""
        }`;
      }
      if (this.state.search) {
        params.search = this.state.search;
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
  async getStatistics() {
    try {
      const responce = await axios.get(`${this.url}/api/statistics`);
      this.state.setStatistics(responce.data);
    } catch (error) {
      console.error(error);
    }
  }
}
