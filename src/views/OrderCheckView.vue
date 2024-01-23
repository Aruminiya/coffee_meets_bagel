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
    <OrderCheckProgress />
  </main>
</template>

<style lang="scss"></style>
