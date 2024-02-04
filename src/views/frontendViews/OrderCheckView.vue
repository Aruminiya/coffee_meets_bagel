<script>
import NavBarComponent from "../../components/NavBarComponent.vue";
import OrderCheckProgressComponent from "../../components/OrderCheckProgressComponent.vue";
import OderCheckStep_01 from "../../components/OderCheckStep_01.vue";

export default {
  components: {
    NavBarComponent,
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
  <NavBarComponent />
  <main class="OrderCheckView">
    <!-- 進度條元件 step 是 props 傳入當前第幾步驟 -->
    <OrderCheckProgressComponent :step="showOrderCheckProgressComponent" />
    <router-view></router-view>
  </main>
</template>

<style lang="scss">
h1,
h2,
h3,
h4,
h5,
h6,
p {
  color: $colorChart-Accessory-200;
}
input {
  color: $colorChart-Accessory-200 !important;
  border: solid 1px $colorChart-Accessory-200 !important;
  background-color: transparent !important;
  &:focus {
    border-color: $colorChart-Accessory-200 !important; /* 替換為你想要的邊框顏色 */
    box-shadow: 0 0 0px $colorChart-Primary-200 !important; /* 替換為你想要的陰影效果 */
    background-color: transparent !important;
  }
}
.btn {
  background-color: $colorChart-Logo-Red !important;
  border-color: $colorChart-Logo-Red !important;
  &:hover {
    background-color: darken($colorChart-Logo-Red, 10%) !important;
    border-color: darken($colorChart-Logo-Red, 10%) !important;
  }
  &:active {
    background-color: darken($colorChart-Logo-Red, 10%) !important;
    border-color: darken($colorChart-Logo-Red, 10%) !important;
  }
}
.btn02 {
  background-color: $colorChart-Primary-100 !important;
  border-color: $colorChart-Primary-100 !important;
}
.is-invalid {
  border-color: $colorChart-Primary-200 !important; /* 替換為你想要的邊框顏色 */
  box-shadow: 10 10 0px $colorChart-Primary-200 !important; /* 替換為你想要的陰影效果 */
  &:focus {
    border-color: $colorChart-Primary-200 !important;
  }
}
body {
  height: 100vh;
  background-image: url("../../../public/BG_03.png");
}
</style>
