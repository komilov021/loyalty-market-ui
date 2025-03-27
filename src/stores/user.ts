import request from "../utils/request";
import { defineStore } from "pinia";
import type { ILoginInfo } from "../modules/backend";
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from "../utils/cookies";

export const useUserStore = defineStore("usersInfo", {
  state: (): any => ({
    token: getAccessToken() || "",
    user: null,
    users: {
      page: 1,
      limit: 30,
      total: 0,
      data: [],
    },
    menu: [],
    loading: false,
  }),
  actions: {
    async login(data: ILoginInfo) {
      let response = await request.post(
        "https://admin.eduplus.uz/api/auth/login",
        data
      );
      this.token = response.access_token;
      setAccessToken(response.access_token);
    },
    async getToken(user_id: string) {
      let response = await request.post(
        "https://admin.eduplus.uz/api/auth/get-token",
        user_id
      );
      this.token = response.access_token;
    },
    resetToken() {
      removeAccessToken();
      this.token = "";
      this.user = null;
    },
    async getUserInfo() {
      const user = await request.post(
        "https://admin.eduplus.uz/api/auth/get-user"
      );
      this.user = user;
    },
  },
  getters: {
    getUser: (state) => state.user,
    getTokenn: (state) => state.token,
  },
});
