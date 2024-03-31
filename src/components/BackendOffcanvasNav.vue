<template>
  <!-- Google font -->
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

  <!-- 側展開視窗 -->
  <div class="offcanvas offcanvas-start bg-warning" tabindex="-1" id="offcanvasNavbar"
    aria-labelledby="offcanvasNavbarLabel" ref="offcanvasNav">
    <div class="offcanvas-header">
      <a role="button"><img src="../../public/coffee_meets_bagel_Logo.svg" alt="coffee_meets_bagel_Logo" width="256"
          height="64" /></a>
    </div>
    <div class="offcanvas-body">
      <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
        <li class="nav-item">
          <router-link to="/admin" class="nav-link text-decoration-none" @click="closeNav">
            <div class="d-flex align-items-center fs-2 text-colorChart-Accessory-200 ms-14 mb-4">
              <span class="material-symbols-outlined me-2"> grid_view </span>
              <h3 class="fw-bold lh-1 m-0">後台首頁</h3>
            </div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/adminOrders" class="nav-link text-decoration-none" @click="closeNav">
            <div class="d-flex align-items-center fs-2 text-colorChart-Accessory-200 ms-14 mb-4">
              <span class="material-symbols-outlined me-2"> list_alt </span>
              <h3 class="fw-bold lh-1 m-0">訂單管理</h3>
            </div>
          </router-link>
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
          <router-link to="/admin/adminCoupon" class="nav-link text-decoration-none" href="#" @click="closeNav">
            <div class="d-flex align-items-center fs-2 text-colorChart-Accessory-200 ms-14 mb-4">
              <span class="material-symbols-outlined me-2">
                sell
              </span>
              <h3 class="fw-bold lh-1 m-0">折扣管理</h3>
            </div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/analysisReport" class="nav-link text-decoration-none" href="#" @click="closeNav">
            <div class="d-flex align-items-center fs-2 text-colorChart-Accessory-200 ms-14 mb-4">
              <span class="material-symbols-outlined me-2"> equalizer </span>
              <h3 class="fw-bold lh-1 m-0">營收分析</h3>
            </div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link text-decoration-none" href="#" @click="closeNav">
            <div class="d-flex align-items-center fs-2 text-colorChart-Accessory-200 ms-14 mb-4">
              <span class="material-symbols-outlined me-2"> reply </span>
              <h3 class="fw-bold lh-1 m-0">前往前台</h3>
            </div>
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link text-decoration-none" @click.prevent="confirmLogout" href="#">
            <div class="d-flex align-items-center fs-2 text-colorChart-Accessory-200 ms-14 mb-4">
              <span class="material-symbols-outlined me-2"> logout </span>
              <h3 class="fw-bold lh-1 m-0">登出</h3>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
import Swal from 'sweetalert2'

const host = import.meta.env.VITE_HEXAPI

export default {
  data () {
    return {
      offcanvasNav: null
    }
  },
  methods: {
    // 打開 canvas
    openNav () {
      this.offcanvasNav.show()
    },
    // 關閉 canvas -> 尚未用到
    closeNav () {
      this.offcanvasNav.hide()
    },
    confirmLogout () {
      Swal.fire({
        title: '確定要登出嗎?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定登出'
      }).then((result) => {
        this.logout()
      })
    },
    logout () {
      this.axios(`${host}`)
        .then(() => {
          Swal.fire({
            title: '已成功登出',
            icon: 'success'
          })
          this.offcanvasNav.hide()
          this.$router.push('/admin/adminLogin')
        }).catch(() => {
          // 強制將cookie的值改掉
          document.cookie = 'florafirstapi=\'\';'
          this.offcanvasNav.hide()
          this.$router.push('/admin/adminLogin')
        })
    }
  },
  mounted () {
    // 用 ref 抓取 offcanvas DOM
    // 如果要移除 backdrop，就不能把畫面的叉叉移除，不然沒地方關閉 offcanvas
    this.offcanvasNav = new bootstrap.Offcanvas(this.$refs.offcanvasNav, {
      scroll: true
    })
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
