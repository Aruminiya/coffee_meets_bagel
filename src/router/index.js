import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      //前台根組件路由
      path: "/",
      name: "frontendViewRoot",
      component: () => import("../views/FrontendRootView.vue"),
      children: [
        {
          //首頁路由
          path: "/",
          name: "home",
          component: () => import("../views/frontendViews/HomeView.vue"),
        },
        {
          path: "about",
          name: "about",
          component: () => import("../views/frontendViews/AboutView.vue"),
        },
        {
          path: "order",
          name: "order",
          component: () => import("../views/frontendViews/OrderView.vue"),
        },
        {
          path: "orderCheckView",
          name: "orderCheckView",
          component: () => import("../views/frontendViews/OrderCheckView.vue"),
          children: [
            {
              path: "step1",
              component: () => import("../components/OderCheckStep_01.vue"),
            },
            {
              path: "step2",
              component: () => import("../components/OderCheckStep_02.vue"),
            },
            {
              path: "step3",
              component: () => import("../components/OderCheckStep_03.vue"),
            },
          ],
        },
        {
          //產品列表路由
          path: "productList",
          name: "productList",
          component: () => import("../views/frontendViews/ProductList.vue"),
        },
      ],
    },
    {
      //後台根組件路由
      path: "/admin",
      name: "backendRoot",
      component: () => import("../views/BackendRootView.vue"),
      children: [
        {
          path: "adminProducts",
          name: "adminProducts",
          component: () => import("../views/backendViews/AdminProducts.vue"),
        },
      ],
    },
  ],
});

export default router;
