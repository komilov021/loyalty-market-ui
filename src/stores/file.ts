import { defineStore } from "pinia";
import request from "../utils/request";

export const useFileStore = defineStore("file", {
  state: () => ({}),
  actions: {
    async uploadFile(file: File) {
      const formData = new FormData();
      formData.append("file", file, file.name);

      return request.post("https://admin.eduplus.uz/api/file/static", formData);
    },
  },
});
