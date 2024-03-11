import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

// or via CommonJS

export default defineStore('CartStore', {
  // data, methods, computed
  // state, actions, getters
  state: () => ({
    data: {},
    useCouponPrice: null,
    isCartsLoading: true,
    couponData: {},
    cartStatus: ''
  }),
  getters: {},
  actions: {
    // 得到購物車資訊
    getCarts () {
      const host = import.meta.env.VITE_HEXAPI
      const path = import.meta.env.VITE_USER_PATH
      axios
        .get(`${host}/v2/api/${path}/cart`)
        .then((res) => {
          const { data } = res.data
          this.data = data
          this.isCartsLoading = false
        })
        .catch((err) => {
          console.error(err)
        })
    },
    // 商品加入購物車
    addCarts (id, qty) {
      this.cartStatus = ''
      const data = {
        product_id: id,
        qty
      }
      axios
        .post(
          'https://vue3-course-api.hexschool.io/v2/api/florafirstapi/cart',
          { data }
        )
        .then((res) => {
          this.cartStatus = `${res.data.data.product.title}${res.data.message}`
          this.getCarts()
        })
        .catch((err) => {
          console.error(err)
        })
    },
    // 編輯購物車商品
    editCarts (item) {
      const cartId = item.id

      this.isCartsLoading = true
      const editData = {
        data: {
          product_id: item.id,
          qty: item.qty
        }
      }

      const host = import.meta.env.VITE_HEXAPI
      const path = import.meta.env.VITE_USER_PATH

      axios
        .put(`${host}/v2/api/${path}/cart/${cartId}`, editData)
        .then((res) => {
          this.getCarts()
        })
        .catch((err) => {
          console.error(err)
          Swal.fire({
            title: '編輯商品失敗',
            icon: 'error',
            confirmButtonText: '確定'
          })
        })
    },
    // 商品刪除購物車
    deleteCarts (item) {
      const cartId = item.id

      Swal.fire({
        title: `確定要刪除 ${item.product.title} 嗎?`,
        text: '刪除後將無法還原此操作',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '是 我要刪除',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isCartsLoading = true

          const host = import.meta.env.VITE_HEXAPI
          const path = import.meta.env.VITE_USER_PATH

          axios
            .delete(`${host}/v2/api/${path}/cart/${cartId}`)
            .then((res) => {
              this.getCarts()
            })
            .catch((err) => {
              console.error(err)
              Swal.fire({
                title: '刪除商品失敗',
                icon: 'error',
                confirmButtonText: '確定'
              })
            })
        }
      })
    }
  }
})
