<script>
import BackendOffcanvasNav from '@/components/BackendOffcanvasNav.vue'
import BackendLogoComponent from '@/components/BackendLogoComponent.vue'
import UpdateProduct from '@/components/UpdateProduct.vue'

export default {
  data () {
    return {}
  },
  components: {
    BackendOffcanvasNav,
    BackendLogoComponent,
    UpdateProduct
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
    <BackendLogoComponent :open-off-canvas-nav="openOffCanvasNav" />
    <BackendOffcanvasNav ref="backendNav" />
  </div>
  <div class="container">
    <h2 class="text-primary mb-0 py-3">產品編輯</h2>
  </div>

  <!-- 編輯產品元件 -->
  <UpdateProduct />
</template>

<style scoped lang="scss">
h2 {
  margin-top: 90px;
}
</style>
