import { useUserStore } from "./stores/index";
import type { RouteLocationNormalized } from "vue-router";
import router from "./routers/index";
import { ElMessage } from "element-plus";
import NProgress from "nprogress";
import { i18n } from "./i18n";
const title = "Eduplus";

const getPageTitle = (key: string) => {
  const { t, te } = i18n.global as any;
  const hasKey = te(`app.${key}`) as any;
  if (hasKey) {
    const pageName = t(`app.${key}`);
    return `${pageName} - ${title}`;
  }
  return `${key} - ${title}`;
};

const whiteList = ["/login", "/singin"];

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: any
  ) => {
    const store = useUserStore();
    NProgress.start();
    if (store.token) {
      if (to.path === "/login") {
        next({ path: "/main" });
        NProgress.done();
      } else {
        if (!store.user) {
          try {
            await store.getUserInfo();
            if (!store.user) {
              store.resetToken();
              next(`/login`);
            } else {
              next({ ...to, replace: true });
            }
          } catch (err: any) {
            store.resetToken();
            ElMessage({
              message: err?.message || "Has Error",
              type: "error",
              duration: 5 * 1000,
            });
            next(`/login?redirect=${to.path}`);
            NProgress.done();
          }
        } else {
          next();
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  }
);

router.afterEach((to: RouteLocationNormalized) => {
  NProgress.done();
  document.title = getPageTitle((to.name || "") as string);
});
