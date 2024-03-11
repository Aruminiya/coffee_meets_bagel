<template>
  <div class="modal fade" ref="couponModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-secondary bg-opacity-25">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="isNew">新增優惠券</span>
            <span v-else>編輯優惠券</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body lh-1 fs-4 px-5">
          <form>
            <div class="mb-4">
              <label for="couponTitle" class="form-label mb-3"
                >折價券名稱</label
              >
              <input
                type="text"
                class="form-control lh-1 fs-4"
                id="couponTitle"
                v-model="tempCoupon.title"
              />
            </div>
            <div class="mb-4">
              <label for="couponCode" class="form-label mb-3">優惠碼</label>
              <input
                type="text"
                class="form-control lh-1 fs-4"
                id="couponCode"
                v-model="tempCoupon.code"
              />
            </div>
            <div class="mb-4">
              <label for="couponPercent" class="form-label mb-3"
                >折扣額度</label
              >
              <input
                type="number"
                min="5"
                max="90"
                class="form-control lh-1 fs-4"
                id="couponPercent"
                v-model="tempCoupon.percent"
              />
            </div>
            <div class="mb-4">
              <label for="couponDueDate" class="form-label mb-3">到期日</label>
              <input
                type="date"
                class="form-control lh-1 fs-4"
                id="couponDueDate"
                v-model="due_date"
              />
            </div>
            <div class="form-check d-flex align-items-center m-0">
              <input
                class="form-check-input me-3"
                type="checkbox"
                id="couponEnabled"
                v-model="tempCoupon.is_enabled"
                :true-value="1"
                :false-value="0"
              />
              <label class="form-check-label" for="couponEnabled"
                >是否啟用
              </label>
            </div>
          </form>
        </div>
        <div
          class="modal-footer d-flex justify-content-between bg-secondary bg-opacity-25"
        >
          <button
            type="button"
            class="btn btn-primary lh-1 fs-4 px-4 py-2"
            @click="closeModal"
          >
            取消新增
          </button>
          <button
            type="button"
            class="btn btn-success lh-1 fs-4 px-4 py-2"
            @click="$emit('update-coupon', tempCoupon)"
          >
            {{ isNew ? "確定新增" : "確定更新" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap/dist/js/bootstrap.min.js'

export default {
  // 驗證外層 AdminCouponView 傳入的資料型別是否使用物件
  props: {
    // 若是編輯要使用外部傳入的物件
    coupon: Object,
    // 判斷 modal header 要顯示新增或編輯優惠券
    isNew: Boolean
  },
  emits: ['update-coupon'],
  data () {
    return {
      // bs5 modal 實體
      couponModal: null,

      // 新增、編輯用的暫時 coupon 資料
      tempCoupon: {},

      due_date: ''
    }
  },
  methods: {
    openModal () {
      this.couponModal.show()
    },
    closeModal () {
      this.couponModal.hide()
    }
  },
  watch: {
    coupon () {
      // 把外層傳入的 props 存到內層 tempCoupon，用 watch 監聽外層 tempCoupon 資料的變化
      this.tempCoupon = this.coupon
      // 傳入的是時間格式是處理好的 unix Timestamp，接著要將時間格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
        .toISOString()
        .split('T')[0]

      // dateAndTime 用 split 轉成的陣列，再用 [0] 取得年月日，最後才會渲染到 input date
      this.due_date = dateAndTime
    },
    // 每當 due_date 變化，tempCoupon 的 due_date 會同步處理為 unix Timestamp 整數
    due_date () {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  },
  mounted () {
    // 在內層元件建立 BS5 Modal 實體
    this.couponModal = new bootstrap.Modal(this.$refs.couponModal, {
      backdrop: 'static'
    })

    // 讓選取日期不能小於當日
    // 抓取選擇日期 input 的 DOM
    const dateInput = document.querySelector('#couponDueDate')

    // 使用 new Date() 存取為當天日期變數 today
    const today = new Date().toISOString().split('T')[0]

    // 使用 input 屬性把 min 設為 today
    dateInput.min = today
  }
}
</script>

<style></style>
