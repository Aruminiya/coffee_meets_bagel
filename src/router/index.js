import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      //首頁路由
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/order",
      name: "order",
      component: () => import("../views/OrderView.vue"),
    },
    {
      path: "/orderCheckView",
      name: "orderCheckView",
      component: () => import("../views/OrderCheckView.vue"),
      children: [
        {
          path: "step1",
          component: () => import("../components/OderCheckStep_01.vue"),
        },
      ],
    },
    {
      path: "/adminProducts",
      name: "adminProducts",
      component: () => import("../views/AdminProducts.vue"),
    },
  ],
});

export default router;
