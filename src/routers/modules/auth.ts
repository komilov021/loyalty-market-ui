const authRoutes = [
  {
    path: "/login",
    component: () => import("../../layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("../../views/auth/LoginView.vue"),
      },
    ],
  },
];

export default authRoutes;
