<template>
  <!-- Google font -->
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

  <!-- logo 觸發 offcanvas 效果，不能放 BackendOffcanvasNav component 裡面 -->
  <adminLogo :open-off-canvas-nav="openOffCanvasNav"></adminLogo>
  <!-- 側邊選單 -->
  <adminNav ref="backendNav" />
  <main>
    <div class="container my-16">
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <div class="input-group mb-3">
            <input type="text" class="form-control border-colorChart-Primary-200 border-end-0" placeholder="請輸入搜尋資料"
              aria-label="Username" aria-describedby="button-addon1">
            <button class="btn btn-outline-colorChart-Primary-200 d-flex justify-content-center align-items-center"
              type="button" id="button-addon1">
              <span class="material-symbols-outlined">
                search
              </span>
            </button>
          </div>
        </div>
      </div>

    </div>

  </main>
</template>

<script>
import adminLogo from '../../components/BackendLogoComponent.vue';
import adminNav from '../../components/BackendOffcanvasNav.vue';

export default {
  components: {
    adminLogo,
    adminNav
  },
  methods: {
    // 打開側邊欄位
    openOffCanvasNav () {
      this.$refs.backendNav.openNav();
    },
  }
}

</script>

<style lang="scss"></style>