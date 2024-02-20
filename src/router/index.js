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
          path: "fqa",
          name: "fqa",
          component: () => import("../views/frontendViews/FqaView.vue"),
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
          path: "productList",
          name: "productList",
          component: () => import("../views/frontendViews/ProductListView.vue"),
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
          path: "",
          name: "adminHome",
          component: () => import("../views/backendViews/AdminHomeView.vue"),
        },
        {
          path: "adminProducts",
          name: "adminProducts",
          component: () =>
            import("../views/backendViews/AdminProductsView.vue"),
        },
        {
          path: "adminProducts/:id",
          name: "adminProductsById",
          component: () =>
            import("../views/backendViews/AdminDynamicProductView.vue"),
        },
        {
          path: "adminDiscount",
          name: "adminDiscount",
          component: () =>
            import("../views/backendViews/AdminDiscountView.vue"),
        },
        {
          path: "addProduct",
          name: "addProduct",
<<<<<<< HEAD
          component: () => 
            import("../views/backendViews/AdminDynamicProductView.vue"),
        },
        {
          path: "analysisReport",
          name: "analysisReport",
          component: () => 
            import("../views/backendViews/AdminAnalysisReportView.vue"),
=======
          component: () =>
            import("../views/backendViews/AdminAddProductView.vue"),
>>>>>>> 8aaf6e236feb9ea97f80b08f7b4b6f3f2a453c73
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

export default router;
