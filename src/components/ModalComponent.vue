<script>
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";

export default {
  props: {
    isModal: { type: Boolean },
  },
  emits: ["isOpened", "isClosed"],
  data() {
    return {
      productModal: null,
    };
  },
  methods: {
    modalShow() {
      this.productModal.show();
    },
    modalHide() {
      this.productModal.hide();
    },
  },
  mounted() {
    // console.log(this.productModal);
    // 在內層元件建立 updateModal BS5 實體 及寫 emit 傳遞到外層
    this.productModal = new bootstrap.Modal(this.$refs.productModal, {
      keyboard: true, // 按下ESC是否可以關閉
    });

    // console.log(this.productModal);
  },
};
</script>

<template>
  <div class="modal fade" ref="productModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="modal-title">Modal Title</slot>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="modal-body">Modal Body</slot>
        </div>
        <div class="modal-footer">
          <slot name="modal-footer">Modal Footer</slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
