<script>
import OrderCheckProgress from "../components/OrderCheckProgress.vue";

export default {
  components: { OrderCheckProgress },
  data() {
    return {};
  },
  mounted() {
    const host = import.meta.env.VITE_HEXAPI;
    const path = import.meta.env.VITE_USER_PATH;
  },
};
</script>

<template>
  <main>
    <OrderCheckProgress :step="1" />
    <div class="container">
      <div class="row">
        <div class="col"><h3>確認購物車內容</h3></div>
        <div class="col"><h3>填寫訂購資訊</h3></div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
