<template>
  <!-- 側展開視窗 -->
  <div class="offcanvas offcanvas-start bg-warning" tabindex="-1" id="offcanvasNavbar"
    aria-labelledby="offcanvasNavbarLabel" ref="offcanvasNav">
    <div class="offcanvas-header">
      <a role="button"><img src="../../public/coffee_meets_bagel_Logo.svg" alt="coffee_meets_bagel_Logo" width="256"
          height="64"></a>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>

    </div>
    <div class="offcanvas-body">
      <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
        <li class="nav-item">
          <router-link to="/admin">後台首頁</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">訂單管理</a>
        </li>
        <li class="nav-item">
          <router-link to="/admin/adminProducts">商品管理</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">折扣管理</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">營收分析</a>
        </li>
        <li class="nav-item">
          <router-link to="/">前往前台</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";

export default {
  data () {
    return {
      offcanvasNav: null
    }
  },
  methods: {
    openNav () {
      this.offcanvasNav.show();
    },
    closeNav () {
      this.offcanvasNav.remove('show')
    }
  },
  mounted () {
    // 用 ref 抓取 offcanvas DOM
    this.offcanvasNav = new bootstrap.Offcanvas(this.$refs.offcanvasNav, { scroll: true });
  }
}
</script>

<style lang="scss"></style>