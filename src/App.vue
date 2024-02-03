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
  <!-- <h1>這是根組件 App.vue</h1> -->
  <RouterView />
  <router-link to="/orderCheckView/step1" class="nav-link"
    >訂單查看頁面 (暫時放在這邊)</router-link
  >
  <button type="button" class="btn btn-primary">Primary</button>
  <button type="button" class="btn btn-secondary">Secondary</button>
  <button type="button" class="btn btn-success">Success</button>
  <button type="button" class="btn btn-danger">Danger</button>
  <button type="button" class="btn btn-warning">Warning</button>
  <button type="button" class="btn btn-info">Info</button>
  <button type="button" class="btn btn-light">Light</button>
  <button type="button" class="btn btn-dark">Dark</button>

  <button type="button" class="btn btn-link">Link</button>
</template>

<style lang="scss"></style>
