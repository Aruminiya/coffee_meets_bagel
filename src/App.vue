<script>
import NavBarComponent from "./components/NavBarComponent.vue";

export default {
  components: { NavBarComponent },
  mounted() {
    //顯示當前環境變數 (可以刪掉 不太重要)
    console.log(import.meta.env.VITE_CURRENT_ENVIRONMENT);
  },
};
</script>

<template>
  <NavBarComponent />
  <h1>這是根組件 App.vue</h1>
  <RouterView />
</template>

<style lang="scss" scoped></style>
