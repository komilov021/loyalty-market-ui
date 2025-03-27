const dashboardRoutes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../../layouts/DashboardLayout.vue"),
    redirect: {
      path: "/main/categories/6748597629d3bd2300944bb8",
    },
    children: [
      {
        path: "main",
        component: () => import("../../views/markets/MainView.vue"),
        redirect: {
          name: "Categories",
          params: { category_id: "6748597629d3bd2300944bb8" },
        },
        children: [
          {
            path: "categories/:category_id",
            name: "Categories",
            component: () => import("../../views/markets/CategoriesView.vue"),
            meta: { title: "Categories" },
          },
          {
            path: "item/:id",
            name: "Items",
            component: () => import("../../views/markets/ItemsView.vue"),
            meta: { title: "Items" },
          },
        ],
      },
      {
        path: "transaction",
        name: "Transaction",
        component: () => import("../../views/HomeView.vue"),
        redirect: { name: "TransactionHistory" },
        children: [
          {
            path: "history",
            name: "TransactionHistory",
            component: () =>
              import("../../views/transaction-history/TransactionView.vue"),
            meta: { title: "Transaction History" },
          },
        ],
      },
    ],
  },
];

export default dashboardRoutes;
