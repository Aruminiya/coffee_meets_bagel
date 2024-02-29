<script>
import NavBarComponent from "../../components/NavBarComponent.vue";
import FooterComponent from "../../components/FooterComponent.vue";
import OrderCheckProgressComponent from "../../components/OrderCheckProgressComponent.vue";
import OderCheckStep_01 from "../../components/OderCheckStep_01.vue";

import { mapState, mapActions } from "pinia";

import cartStore from "../../stores/CartStore.js";

export default {
  components: {
    NavBarComponent,
    FooterComponent,
    OrderCheckProgressComponent,
    OderCheckStep_01,
  },
  data() {
    return {
      nowStep: this.$route.path,
      isNavBarEditMode: true,
    };
  },
  computed: {
    // 判斷當前路由步驟給 OrderCheckProgressComponent 判斷
    showOrderCheckProgressComponent() {
      if (this.$route.path === "/orderCheckView/step1") {
        return 1;
      } else if (this.$route.path === "/orderCheckView/step2") {
        return 2;
      } else if (this.$route.path === "/orderCheckView/step3") {
        return 3;
      } else {
        return "無效的步驟";
      }
    },
  },
  methods: { ...mapActions(cartStore, ["getCarts"]) },
  beforeRouteUpdate(to) {
    //路由守位 當路由變化時啟動
    // console.log(to);
    // console.log(this.isNavBarEditMode);

    if (to.fullPath === "/orderCheckView/step2" || "/orderCheckView/step3") {
      console.log(to);
      this.isNavBarEditMode = false;
    } else {
      this.isNavBarEditMode = true;
    }
    if (to.fullPath === "/orderCheckView/step3") {
      this.getCarts();
    }
  },
};
</script>

<template>
  <NavBarComponent :isEditMode="isNavBarEditMode" />
  <main class="OrderCheckView">
    <!-- 進度條元件 step 是 props 傳入當前第幾步驟 -->
    <OrderCheckProgressComponent :step="showOrderCheckProgressComponent" />
    <router-view></router-view>
  </main>
  <FooterComponent />
</template>

<style lang="scss" scoped>
main {
  min-height: 100vh;
  background-image: url("../../../public/BG_03.png");
}
</style>
