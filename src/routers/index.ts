import { createWebHistory, createRouter } from "vue-router";
import dashboardRoutes from "./modules/dashboard";
import authRoutes from "./modules/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...dashboardRoutes,
    ...authRoutes,
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/404/404.vue"),
    },
  ],
  strict: true,
});
router.onError((error: any, to: any) => {
  if (
    error.message.includes("Failed to fetch dynamically imported module") ||
    error.message.includes("Importing a module script failed")
  ) {
    if (!to?.fullPath) {
      window.location.reload();
    } else {
      window.location = to.fullPath;
    }
  }
});
export default router;
