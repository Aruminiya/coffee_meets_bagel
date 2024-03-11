import { defineStore } from 'pinia'
import axios from 'axios'

// 其他 Pinia Store
import cartStore from './CartStore.js'

export default defineStore('CouponStore', {
  // data, methods, computed
  // state, actions, getters
  state: () => ({
    couponData: {},
    couponUsed: false
  }),
  getters: {},
  actions: {
    // 使用優惠券
    useCoupon (code) {
      const host = import.meta.env.VITE_HEXAPI
      const path = import.meta.env.VITE_USER_PATH
      this.couponUsed = true
      // 調用 CartStore 中的 getCarts 方法
      const { getCarts } = cartStore()

      axios
        .post(`${host}/v2/api/${path}/coupon`, {
          data: {
            code
          }
        })
        .then((res) => {
          this.couponData = res
          this.couponUsed = true
          // 使用 CartStore
          getCarts()
        })
        .catch((err) => {
          this.couponData = err
          this.couponUsed = false
          console.error(err)
        })
    }
  }
})
