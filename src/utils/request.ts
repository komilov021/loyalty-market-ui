import { useUserStore } from "../stores/index";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const request = axios.create({
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_BASE_API
    : `${window.location.origin}/api`,
  timeout: 60000,
});
request.interceptors.request.use((config) => {
  let store = useUserStore();
  if (store.token) {
    config.headers["Authorization"] = `${store.token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const router = useRouter();
    const store = useUserStore();
    let errorResponse = JSON.parse(error.request.response);
    if (errorResponse?.statusCode === 401 || errorResponse?.error?.statusCode === 401) {
      store.resetToken(); 
      router.push("/login"); 
    } else {
      ElMessage({
        message: errorResponse?.message || errorResponse?.error?.message || "Unknown error occurred",
        type: "error",
        duration: 5 * 1000, 
      });
    }

    return Promise.reject(error);
    // console.error(error);
  }
);
export default request;
