<script>
const host = import.meta.env.VITE_HEXAPI;
const path = import.meta.env.VITE_USER_PATH;

import adminNav from '../../components/BackendOffcanvasNav.vue';
import adminLogo from '../../components/BackendLogoComponent.vue';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      
    }
  },
  components: {
    adminNav,
    adminLogo
  },
  methods: {
    openOffCanvasNav() {
      this.$refs.backendNav.openNav();
    },
    addNewProduct() {
      this.$router.push('/admin/addProduct');
    },
  },
  mounted() {
    // 從cookie取出登入時存入的token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)florafirstapi\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // 將token設定到axios的預設header裡
    this.axios.defaults.headers.common.Authorization = token;
  },
}
</script>

<template>
  <div>
    <!-- LOGO元件 -->
    <adminLogo :open-off-canvas-nav="openOffCanvasNav"></adminLogo>
    <!-- 側邊欄位元件 -->
    <adminNav ref="backendNav"></adminNav>
  </div>
  <div class="container">

    123
  </div>
</template>

<style scoped lang="scss">

</style>