<script>
import * as bootstrap from 'bootstrap/dist/js/bootstrap.min.js'

export default {
  data () {
    return {
      productModal: null,
      product: {}
    }
  },
  methods: {
    modalShow (product) {
      this.product = product
      this.productModal.show()
    },
    modalHide () {
      this.productModal.hide()
    },
    onlyShow () {
      this.productModal.show()
    }
  },
  mounted () {
    // 在內層元件建立 updateModal BS5 實體 及寫 emit 傳遞到外層
    this.productModal = new bootstrap.Modal(this.$refs.productModal, {
      keyboard: true // 按下ESC是否可以關閉
    })
  }
}
</script>

<template>
  <div class="modal fade" ref="productModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body text-center">
          <slot name="modal-body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
