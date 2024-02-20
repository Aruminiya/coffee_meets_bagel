<template>
  <!-- Google font -->
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

  <!-- 側展開視窗 -->
  <div class="offcanvas offcanvas-start bg-warning" tabindex="-1" id="offcanvasNavbar"
    aria-labelledby="offcanvasNavbarLabel" ref="offcanvasNav">
    <div class="offcanvas-header">
      <a role="button"><img src="../../public/coffee_meets_bagel_Logo.svg" alt="coffee_meets_bagel_Logo" width="256"
          height="64"></a>
    </div>
    <div class="offcanvas-body">
      <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
        <li class="nav-item">
          <router-link to="/admin" class="nav-link text-decoration-none" @click="closeNav">
            <div class="d-flex align-items-center fs-2 text-colorChart-Accessory-200 ms-14 mb-4">
              <span class="material-symbols-outlined me-2">
                grid_view
              </span>
              <h3 class="fw-bold lh-1 m-0">後台首頁</h3>
            </div>
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link text-decoration-none" @click="closeNav">
            <div class="d-flex align-items-center fs-2 text-colorChart-Accessory-200 ms-14 mb-4">
              <span class="material-symbols-outlined me-2">
                local_cafe
              </span>
              <h3 class="fw-bold lh-1 m-0">訂單管理</h3>
            </div>
          </a>
        </li>
        <li class="nav-item">
          <router-link to="/admin/adminProducts" class="nav-link text-decoration-none" @click="closeNav">
            <div class="d-flex align-items-center fs-2 text-colorChart-Accessory-200 ms-14 mb-4">
              <span class="material-symbols-outlined me-2">
                assignment_turned_in
              </span>
              <h3 class="fw-bold lh-1 m-0">商品管理</h3>
            </div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/adminCoupon" class="nav-link text-decoration-none" @click="closeNav">
            <div class="d-flex align-items-center fs-2 text-colorChart-Accessory-200 ms-14 mb-4">
              <span class="material-symbols-outlined me-2">
                sell
              </span>
              <h3 class="fw-bold lh-1 m-0">折扣管理</h3>
            </div>
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link text-decoration-none" href="#">
            <div class="d-flex align-items-center fs-2 text-colorChart-Accessory-200 ms-14 mb-4">
              <span class="material-symbols-outlined me-2">
                equalizer
              </span>
              <h3 class="fw-bold lh-1 m-0">營收分析</h3>
            </div>
          </a>
        </li>
        <li class="nav-item">
          <router-link to="/" class="text-decoration-none" @click="closeNav">
            <div class="d-flex align-items-center fs-2 text-colorChart-Accessory-200 ms-14">
              <span class="material-symbols-outlined me-2">
                reply
              </span>
              <h3 class="fw-bold lh-1 m-0">前往前台</h3>
            </div>
          </router-link>
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
    // 打開 canvas
    openNav () {
      this.offcanvasNav.show();
    },
    // 關閉 canvas -> 由於切換頁面時，原先開啟的 offCanvas 實體並未被關閉所以會有黑色的 backdrop 覆蓋畫面，因此需要在每個連結綁一個 offCanvas.hide()，再切換頁面的同時關閉 OffCanvas 實體
    closeNav () {
      this.offcanvasNav.hide();
    }
  },
  mounted () {
    // 用 ref 抓取 offcanvas DOM
    // 如果要移除 backdrop，就不能把畫面的叉叉移除，不然沒地方關閉 offcanvas
    this.offcanvasNav = new bootstrap.Offcanvas(this.$refs.offcanvasNav, { scroll: true });
  }
}
</script>

<style lang="scss">
.lh-1 {
  line-height: 1;
}

.text-colorChart-Accessory-200 {
  color: $colorChart-Accessory-200;
}
</style>