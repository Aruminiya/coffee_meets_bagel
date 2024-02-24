<script>
export default {
  mounted() {
    //顯示當前環境變數 (可以刪掉 不太重要)
    console.log(import.meta.env.VITE_CURRENT_ENVIRONMENT);
  },
};
</script>

<template>
  <!-- <h1>這是根組件 App.vue</h1> -->
  <RouterView />
  <hr />
  <h1>連結都暫時放這邊 等 NavBar 完成後再刪掉</h1>
  <router-link to="/orderCheckView/step1"
    >訂單查看頁面 (暫時放在這邊)</router-link
  ><!-- 不知道要放哪邊, 先借放 -->
  <br />
  <router-link to="/admin/adminProducts">後台訂單(暫存)</router-link>
</template>

<style lang="scss">
body {
  background-color: $colorChart-bg-color;
}
</style>
