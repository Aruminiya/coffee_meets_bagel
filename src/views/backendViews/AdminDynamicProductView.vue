<script>
import adminNav from '../../components/BackendOffcanvasNav.vue'
import adminLogo from '../../components/BackendLogoComponent.vue'
import updateProduct from '../../components/UpdateProduct.vue'

export default {
  data () {
    return {}
  },
  components: {
    adminNav,
    adminLogo,
    updateProduct
  },
  methods: {
    openOffCanvasNav () {
      this.$refs.backendNav.openNav()
    },
    modalShow (url) {
      this.$refs.modal.modalShow(url)
    }
  }
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
    <h2 class="text-primary mb-0 py-3">產品編輯</h2>
  </div>

  <!-- 產品元件 -->
  <updateProduct></updateProduct>
</template>

<style scoped lang="scss">
h2 {
  margin-top: 90px;
}
</style>
