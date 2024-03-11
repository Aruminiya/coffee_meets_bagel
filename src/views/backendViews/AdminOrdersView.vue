<script>
import showProductsModal from '../../components/OrdersProductsTable.vue'
import pagination from '../../components/PaginationComponent.vue'
import adminNav from '../../components/BackendOffcanvasNav.vue'
import adminLogo from '../../components/BackendLogoComponent.vue'
import Swal from 'sweetalert2'
import moment from 'moment-timezone'
import axios from 'axios'

const host = import.meta.env.VITE_HEXAPI
const path = import.meta.env.VITE_USER_PATH

// 設定時區
moment.locale('zh-tw')
// 自定義繁體中文語言檔
moment.updateLocale('zh-tw', {
  meridiem: function (hour) {
    if (hour < 12) {
      return '上午'
    } else {
      return '下午'
    }
  }
})

export default {
  data () {
    return {
      orders: [],
      allOrders: [],
      pagination: {},
      searchStr: '',
      checkAll: true
    }
  },
  components: {
    pagination,
    adminNav,
    adminLogo,
    showProductsModal
  },
  methods: {
    getAllOrders () {
      // 建立promise陣列
      const promises = []
      axios.get(`${host}/v2/api/${path}/admin/orders`).then((res) => {
        // 先抓第一頁訂單資料
        this.allOrders = res.data.orders
        const pages = res.data.pagination.total_pages
        for (let i = 2; i <= pages; i++) {
          // 每跑一次迴圈就建立一個promise物件
          const promise = axios.get(
            `${host}/v2/api/${path}/admin/orders?page=${i}`
          )
          promise.then((res) => {
            // 繼續將第二頁後的訂單資料推入this.orders
            res.data.orders.forEach((item) => {
              this.allOrders.push(item)
            })
          })
          // 將請求物件推進陣列
          promises.push(promise)
        }
        // 確保迴圈的請求都跑完
        Promise.all(promises)
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            // Swal.fire("取得資料失敗");
            console.error(err)
          })
      })
    },
    checkLogin () {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('florafirstapi='))
        ?.split('=')[1]
      axios.defaults.headers.common.Authorization = token

      axios
        .post(`${host}/v2/api/user/check`)
        .then((res) => {
          // eslint-disable-next-line no-unused-expressions
          this.isLogin = true
          console.log('目前狀態已登入')
        })
        .catch((err) => {
          console.log(this.$router)
          Swal.fire({
            title: `${err.response.data.message}`,
            confirmButtonText: '確定'
          }).then((result) => {
            // 驗證失敗轉回登入頁面
            this.$router.push('/admin/adminLogin')
          })
        })
    },
    getOrders (page = 1) {
      axios
        .get(`${host}/v2/api/${path}/admin/orders?page=${page}`)
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
        })
        .catch(() => {
          Swal.fire('資料取得失敗')
        })
    },
    openOffCanvasNav () {
      this.$refs.backendNav.openNav()
    },
    openProductsTable (products) {
      this.$refs.showProductModal.modalShow(products)
    },
    deleteOrder (id) {
      Swal.fire({
        icon: 'warning',
        title: '確定要刪除此訂單嗎?',
        showCancelButton: true,
        confirmButtonText: '確定',
        confirmButtonColor: '#1B8754'
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${host}/v2/api/${path}/admin/order/${id}`)
            .then((res) => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '訂單已刪除',
                showConfirmButton: false,
                timer: 1500
              })
              this.getOrders()
              this.getAllOrders()
            })
            .catch(() => {
              Swal.fire('刪除訂單失敗')
            })
        }
      })
    },
    getDate (date) {
      return moment.unix(date).format('YYYY年 MM月 DD日')
    },
    searchOrder (str) {
      this.checkAll = false
      this.orders = this.allOrders.filter((item) => {
        return JSON.stringify(item).match(str)
      })
    },
    isOrderPaid (value) {
      if (value === '檢視全部') {
        this.checkAll = true
        this.getOrders()
      } else if (value === '未付款') {
        this.checkAll = false
        this.orders = this.allOrders.filter((item) => {
          return item.is_paid === false
        })
      }
    },
    goOrderPage (id) {
      this.$router.push(`/admin/adminOrders/${id}`)
    }
  },
  mounted () {
    this.checkLogin()
    this.getOrders()
    this.getAllOrders()
  }
}
</script>

<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
  />

  <div>
    <div>
      <!-- LOGO元件 -->
      <adminLogo :open-off-canvas-nav="openOffCanvasNav"></adminLogo>
      <!-- 側邊欄位元件 -->
      <adminNav ref="backendNav"></adminNav>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-3 p-3">
          <h2 class="text-primary mb-0">訂單列表</h2>
        </div>
        <div class="col-3 py-3">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="請輸入搜尋資料"
              v-model="searchStr"
            />
            <button
              type="button"
              class="btn btn-outline-primary d-flex align-items-center"
              @click="searchOrder(searchStr)"
            >
              <span class="material-symbols-outlined"> search </span>
            </button>
          </div>
        </div>
        <div class="col-3 py-3">
          <select
            class="form-select form-select"
            aria-label=".form-select-sm example"
            @change="isOrderPaid($event.target.value)"
          >
            <!-- 只查詢未付款與全部 -->
            <option selected>請選擇訂單狀態</option>
            <option value="檢視全部">檢視全部</option>
            <option value="未付款">未付款</option>
          </select>
        </div>
        <div class="border rounded p-3 pb-0 mb-8">
          <div v-for="order in orders" :key="order.id" class="card mb-3">
            <div class="row g-0 position-relative">
              <div class="col-5 p-3">
                <h6 class="d-flex justify-content-between text-primary">
                  <span>訂單編號 :</span>
                  <span class="text-dark">{{ order.id }}</span>
                </h6>
                <h6 class="d-flex justify-content-between text-primary">
                  <span>下單日期 :</span>
                  <span class="text-dark">{{ getDate(order.create_at) }}</span>
                </h6>
                <h6 class="d-flex justify-content-between text-primary">
                  <span>姓名 :</span>
                  <span class="text-dark">{{ order.user.name }}</span>
                </h6>
                <h6 class="d-flex justify-content-between text-primary">
                  <span>連絡電話 :</span>
                  <span class="text-dark">{{ order.user.tel }}</span>
                </h6>
              </div>
              <div class="col-5 p-3">
                <h6 class="d-flex justify-content-between text-primary">
                  <span>Email :</span>
                  <span class="text-dark">{{ order.user.email }}</span>
                </h6>
                <h6 class="d-flex justify-content-between text-primary">
                  <span>收件地址 :</span>
                  <span class="text-dark">{{ order.user.address }}</span>
                </h6>
                <h6 class="d-flex justify-content-between text-primary">
                  <span>備註 :</span>
                  <span class="text-dark">{{
                    order.message === undefined ? "無特別備註" : order.message
                  }}</span>
                </h6>
                <div class="row">
                  <div class="col-6">
                    <h6 class="d-flex justify-content-between text-primary">
                      <span>訂單金額 :</span>
                      <span class="text-dark">{{ order.total }}</span>
                    </h6>
                  </div>
                  <div class="col-6">
                    <h6 class="d-flex justify-content-between text-primary">
                      <span>訂單狀態 :</span>
                      <span class="text-success" v-if="order.is_paid"
                        >已付款</span
                      >
                      <span class="text-danger" v-else>未付款</span>
                    </h6>
                  </div>
                </div>
              </div>
              <div class="col-2 p-3">
                <div
                  class="border-top-0 bg-white d-flex flex-column align-items-end"
                >
                  <button
                    class="btn btn-outline-primary mb-2"
                    type="button"
                    @click="openProductsTable(order.products)"
                  >
                    <span class="material-symbols-outlined align-middle">
                      view_list </span
                    >查看明細
                  </button>
                  <button
                    class="btn btn-outline-primary mb-2"
                    type="button"
                    :class="{ disabled: order.is_paid }"
                    @click="goOrderPage(order.id)"
                  >
                    <span class="material-symbols-outlined align-middle">
                      edit </span
                    >編輯訂單
                  </button>
                  <button
                    class="btn btn-outline-danger"
                    type="button"
                    :class="{ disabled: order.is_paid }"
                    @click="deleteOrder(order.id)"
                  >
                    <span class="material-symbols-outlined align-middle">
                      delete </span
                    >刪除訂單
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分頁元件, 若是分類結果只有一頁不顯示分頁資訊 -->
      <pagination
        v-if="checkAll"
        :pagination="pagination"
        @emit-pages="getOrders"
      ></pagination>

      <!-- modal -->
      <showProductsModal ref="showProductModal"></showProductsModal>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  margin-top: 90px;
}
</style>
