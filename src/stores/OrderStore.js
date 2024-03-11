import { defineStore } from 'pinia'
import axios from 'axios'

// or via CommonJS

export default defineStore('OrderStore', {
  // data, methods, computed
  // state, actions, getters
  state: () => ({
    orderEstablished: false,
    isOrderLoading: true,
    orderInfo: {}
  }),
  getters: {},
  actions: {
    // 取得訂單
    getOrder (id) {
      const host = import.meta.env.VITE_HEXAPI
      const path = import.meta.env.VITE_USER_PATH

      axios
        .get(`${host}/v2/api/${path}/order/${id}`)
        .then((res) => {
          this.orderInfo = res.data
          this.isOrderLoading = false
        })
        .catch((err) => {
          console.error(err)
        })
    },
    // 訂單結帳
    orderCheckout (personInfo, fn) {
      console.log('送出訂單', personInfo)

      const host = import.meta.env.VITE_HEXAPI
      const path = import.meta.env.VITE_USER_PATH

      axios
        .post(`${host}/v2/api/${path}/order`, personInfo)
        .then((res) => {
          localStorage.setItem('orderId', JSON.stringify(res.data.orderId))
          // 確認送出訂單
          this.orderEstablished = true
          fn()
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
})
