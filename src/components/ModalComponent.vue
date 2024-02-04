<script>
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";

export default {
  data() {
    return {
      productModal: null,
      product: {},
      // imageUrl: 'imageUrl'
    };
  },
  methods: {
    modalShow(product) {
      this.product = product
      this.productModal.show();
    },
    modalHide() {
      this.productModal.hide();
    },
  },
  mounted() {
    // 在內層元件建立 updateModal BS5 實體 及寫 emit 傳遞到外層
    this.productModal = new bootstrap.Modal(this.$refs.productModal, {
      keyboard: true, // 按下ESC是否可以關閉
    });
  },
};
</script>

<template>
  <div class="modal fade" ref="productModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="modal-title">{{product.title}}</slot>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-center">
          <slot name="modal-body">
            <img class="modal__img "  :src="product.imageUrl" alt="#">
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="modal-footer">Modal Footer</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal__img{
  max-width: 100%;
  object-fit: contain;
}
</style>
