<script>
import OrderCheckProgressComponent from "../components/OrderCheckProgressComponent.vue";
import OderCheckStep_01 from "../components/OderCheckStep_01.vue";

export default {
  components: {
    OrderCheckProgressComponent,
    OderCheckStep_01,
  },
};
</script>

<template>
  <main>
    <!-- 進度條元件 step 是 props 傳入當前第幾步驟 -->
    <OrderCheckProgressComponent :step="1" />
    <router-view></router-view>
  </main>
</template>

<style lang="scss" scoped></style>
