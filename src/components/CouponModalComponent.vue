<template>
  <div class="modal fade" ref="couponModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="isNew">新增優惠卷</span>
            <span v-else>編輯優惠卷</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body lh-1 fs-2 px-5 py-15">
          {{ tempCoupon }}
          <form>
            <div class="mb-11">
              <label for="couponTitle" class="form-label mb-3">折價券名稱</label>
              <input type="text" class="form-control lh-1 fs-4" id="couponTitle" v-model="tempCoupon.title">
            </div>
            <div class="mb-11">
              <label for="couponCode" class="form-label mb-3">優惠碼</label>
              <input type="text" class="form-control lh-1 fs-4" id="couponCode" v-model="tempCoupon.code">
            </div>
            <div class="mb-11">
              <label for="couponPercent" class="form-label mb-3">折扣額度</label>
              <input type="number" min="5" max="90" class="form-control lh-1 fs-4" id="couponPercent"
                v-model="tempCoupon.percent">
            </div>
            <div class="mb-11">
              <label for="couponQuantity" class="form-label mb-3">總數量</label>
              <input type="number" min="1" max="1000" class="form-control lh-1 fs-4" id="couponQuantity"
                v-model.number="tempCoupon.is_enabled">
            </div>
            <div>
              <label for="couponDueDate" class="form-label mb-3">到期日</label>
              <input type="date" class="form-control lh-1 fs-4" id="couponDueDate" v-model="tempCoupon.due_date">
            </div>
          </form>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <button type="button" class="btn btn-primary lh-1 fs-2 px-4 py-2" @click="closeModal">取消新增</button>
          <button type="button" class="btn btn-success lh-1 fs-2 px-4 py-2"
            @click="$emit('add-coupon', this.tempCoupon)">確定新增</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";

export default {
  // 驗證外層 AdminCouponView 傳入的資料型別所以使用物件
  props: {
    // 若是編輯要使用外部傳入的物件
    coupon: Object,
    // 判斷 modal header 要顯示新增或編輯優惠券
    isNew: Boolean,
  },
  data () {
    return {
      // bs5 modal 實體
      couponModal: null,
      // 新增用的暫時coupon資料
      tempCoupon: {},

      due_date: '',
    };
  },
  methods: {
    openModal () {
      this.couponModal.show();
    },
    closeModal () {
      this.couponModal.hide();
    },
  },
  watch: {
    coupon () {
      this.tempCoupon = this.coupon;
      // 將時間格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
        .toISOString().split('T');
      [this.due_date] = dateAndTime;
    },
    due_date () {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  mounted () {
    // 在內層元件建立 BS5 Modal 實體
    this.couponModal = new bootstrap.Modal(this.$refs.couponModal, {
      backdrop: 'static'
    });

    // 讓選取日期不能小於當日
    // 抓取選擇日期 input 的 DOM
    const dateInput = document.querySelector('#couponDueDate');

    // 使用 new Date() 存取為當天日期變數 today
    const today = new Date().toISOString().split('T')[0];

    // 使用 input 屬性把 min 設為 today
    dateInput.min = today;
  },
};
</script>

<style></style>