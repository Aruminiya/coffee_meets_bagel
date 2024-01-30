<script>
import OrderCheckProgressComponent from "../components/OrderCheckProgressComponent.vue";
import OderCheckStep_01 from "../components/OderCheckStep_01.vue";

export default {
  components: {
    OrderCheckProgressComponent,
    OderCheckStep_01,
  },
  data() {
    return {
      nowStep: this.$route.path,
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
};
</script>

<template>
  <main>
    <!-- 進度條元件 step 是 props 傳入當前第幾步驟 -->
    <OrderCheckProgressComponent :step="showOrderCheckProgressComponent" />
    <router-view></router-view>
  </main>
</template>

<style lang="scss" scoped></style>
