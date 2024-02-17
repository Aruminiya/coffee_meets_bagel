<template>
  <div class="modal fade" ref="discountModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body lh-1 fs-2 px-5 py-15">
          <form>
            <div class="mb-11">
              <label for="discountTitle" class="form-label mb-3">折價券名稱</label>
              <input type="text" class="form-control lh-1 fs-4" id="discountTitle">
            </div>
            <div class="mb-11">
              <label for="discountCode" class="form-label mb-3">優惠碼</label>
              <input type="text" class="form-control lh-1 fs-4" id="discountCode">
            </div>
            <div class="mb-11">
              <label for="discountPercent" class="form-label mb-3">折扣額度</label>
              <input type="number" min="5" max="90" class="form-control lh-1 fs-4" id="discountPercent">
            </div>
            <div class="mb-11">
              <label for="discountQuantity" class="form-label mb-3">總數量</label>
              <input type="number" min="1" max="1000" class="form-control lh-1 fs-4" id="discountQuantity">
            </div>
            <div class="mb-11">
              <label for="discountDueDate" class="form-label mb-3">到期日</label>
              <input type="date" class="form-control lh-1 fs-4" id="discountDueDate">
            </div>
            <div class="d-flex justify-content-between">
              <button type="button" class="btn btn-success lh-1 fs-2 px-4 py-2">確定新增</button>
              <button type="button" class="btn btn-primary lh-1 fs-2 px-4 py-2" @click="closeModal">取消新增</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";

export default {
  data () {
    return {
      discountModal: null,
      product: {},
    };
  },
  methods: {
    openModal () {
      this.discountModal.show();
    },
    closeModal () {
      this.discountModal.hide();
    },
  },
  mounted () {
    // 在內層元件建立 BS5 Modal 實體
    this.discountModal = new bootstrap.Modal(this.$refs.discountModal, {
      backdrop: 'static'
    });
  },
};
</script>

<style></style>