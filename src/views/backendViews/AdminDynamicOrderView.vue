<script>
import adminNav from '../../components/BackendOffcanvasNav.vue'
import adminLogo from '../../components/BackendLogoComponent.vue'
import moment from 'moment-timezone'
import Swal from 'sweetalert2'

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
      order: {},
      user: {},
      create_at: '',
      products: {},
      allProducts: [],
      productsCount: 0,
      total: 0,
      productFinalTotal: 0,
      productTotal: 0
    }
  },
  components: {
    adminNav,
    adminLogo
  },
  methods: {
    openOffCanvasNav () {
      this.$refs.backendNav.openNav()
    },
    getOrder () {
      // 取得路由的訂單ID
      const id = this.$route.params.id
      if (id) {
        this.axios.get(`${host}/v2/api/${path}/order/${id}`)
          .then((res) => {
            this.order = res.data.order
            // user另外存, v-model直接抓兩層會出錯
            this.user = res.data.order.user
            this.products = res.data.order.products
            this.total = res.data.order.total
            this.productsCount = Object.keys(this.products).length
            this.create_at = moment.unix(this.order.create_at).format('YYYY年 MM月 DD日 A h時 : mm分 : ss秒')
          })
          .catch(() => {
            Swal.fire('取得訂單資料失敗')
          })
      }
    },
    backToList () {
      this.$router.push('/admin/adminOrders')
    },
    orderIsPaid () {
      Swal.fire({
        icon: 'warning',
        title: '此訂單確定結帳嗎?',
        showCancelButton: true,
        confirmButtonText: '確定',
        confirmButtonColor: '#1B8754'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('訂單已結帳', '', 'success')
          this.order.is_paid = true
          this.updateOrderApi()
        }
      })
    },
    updateOrder () {
      Swal.fire({
        icon: 'warning',
        title: '確定要修改訂單資料嗎?',
        showCancelButton: true,
        confirmButtonText: '確定',
        confirmButtonColor: '#1B8754'
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateOrderApi()
          Swal.fire('訂單已修改, 將返回列表', '', 'success')
        }
      })
    },
    updateOrderApi () {
      this.order.total = this.total
      const data = {
        data: this.order
      }
      this.axios.put(`${host}/v2/api/${path}/admin/order/${this.$route.params.id}`, data)
        .then((res) => {
          this.$router.push('/admin/adminOrders')
        })
        .catch(() => {
          Swal.fire('更新訂單資料失敗')
        })
    },
    removeProduct (id) {
      delete this.products[id]
      this.productsCount = Object.keys(this.products).length
    },
    showCoupon (code) {
      if (code === 'specialPrice60') {
        return '六折優惠'
      } else if (code === 'specialPrice80') {
        return '八折優惠'
      } else {
        return '無使用優惠'
      }
    },
    getTotal (product) {
      product.total = Math.round(product.product.price * product.qty)
      return product.total
    },
    getFinalTotal (product) {
      let percent = 1
      if (product?.coupon?.percent) {
        percent = product.coupon.percent / 100
      }
      product.final_total = Math.round(product.product.price * product.qty * percent)
      return product.final_total
    },
    getOrderTotal () {
      this.total = 0
      Object.values(this.order.products).forEach((item) => {
        this.total += item.final_total
      })
    }
  },
  watch: {
    'order.products': {
      deep: true,
      handler () {
        this.getOrderTotal()
      }
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>

<template>
  <div>
    <!-- LOGO元件 -->
    <adminLogo :open-off-canvas-nav="openOffCanvasNav"></adminLogo>
    <!-- 側邊欄位元件 -->
    <adminNav ref="backendNav"></adminNav>
  </div>
  <div class="container">
    <h2 class="text-primary mb-0 py-3">編輯訂單</h2>
    <div class="row border rounded p-3">
      <h4 class="text-primary mb-3">訂單編號 <span class="fs-5 ms-3 text-dark">{{ order.create_at }}</span></h4>
      <div class="mb-0 d-flex justify-content-between">
        <h4 class="text-primary mb-0">訂單成立時間 <span class="fs-5 ms-3 text-dark">{{ create_at }}</span></h4>
        <div class="d-flex">
          <button type="button" class="btn btn-outline-primary me-3" @click="backToList">返回列表</button>
          <button type="button" class="btn btn-outline-primary me-3" :class="{ 'disabled': order.is_paid }"
            @click="getOrder">回復初始值</button>
          <button type="button" class="btn btn-outline-success me-1"
          :class="{ 'disabled': order.is_paid }" @click="updateOrder">確認修改</button>
        </div>
      </div>
      <div class="col-6 p-3">
        <div class="row">
          <div class="mb-2 col-6">
            <h5 class="text-primary">姓名</h5>
            <input type="text" class="form-control" v-model="user.name">
          </div>
          <div class="mb-2 col-6">
            <h5 class="text-primary">連絡電話</h5>
            <input type="tel" class="form-control" v-model="user.tel">
          </div>
          <div class="mb-2 col-6">
            <h5 class="text-primary">Email</h5>
            <input type="email" class="form-control" v-model="user.email">
          </div>
          <div class="mb-2 col-6">
            <h5 class="text-primary">收件地址</h5>
            <input type="text" class="form-control" v-model="user.address">
          </div>
        </div>
      </div>
      <div class="col-6 p-3">
        <div class="mb-2">
          <h5 class="text-primary">備註</h5>
          <input type="text" class="form-control" v-model="order.message">
        </div>
        <div class="row">
          <div class="mb-2 col-3">
            <h5 class="text-primary">訂單品項</h5>
            <input type="number" class="form-control" disabled v-model="productsCount">
          </div>
          <div class="mb-2 col-3">
            <h5 class="text-primary">訂單金額</h5>
            <input type="number" class="form-control" disabled v-model="total">
          </div>
          <div class="mb-2 col-3">
            <h5 class="text-primary">訂單狀態</h5>
            <input v-if="order.is_paid" type="text" class="form-control" disabled value="已付款">
            <input v-else type="text" class="form-control text-danger" disabled value="未付款">
          </div>
          <div class="mb-2 col-3">
            <h5 class="text-primary">訂單結帳</h5>
            <button v-if="order.is_paid" type="button" class="btn btn-outline-secondary w-100" disabled>訂單已付款</button>
            <button v-else type="button" class="btn btn-outline-success w-100" @click="orderIsPaid">確認付款</button>
          </div>
        </div>
      </div>

      <hr class=" mb-0">

      <div class="p-3">
        <div v-for="product in order.products" :key="product.id" class="border p-3 rounded mt-3 row">
          <div class="d-flex mb-3 d-flex align-items-center justify-content-between">
            <h4 class="text-primary mb-0">{{ product.product.title }}</h4>
            <button class="btn btn-outline-danger" :class="{ 'disabled': productsCount === 1 || order.is_paid }" type="button"
              @click="removeProduct(product.id)">移除商品</button>
          </div>
          <div class="col-3 d-flex align-items-center">
            <h5 class="mb-0">單價 : {{ product.product.price }}</h5>
          </div>
          <div class="col-3 d-flex align-items-center">
            <button type="button" class="btn btn-outline-primary me-3"
              :class="{ 'disabled': product.qty === 1 || order.is_paid }" @click="product.qty--">-</button>
            <h5 class="mb-0">數量 : {{ product.qty }}</h5>
            <button type="button" class="btn btn-outline-primary ms-3" :class="{ 'disabled': order.is_paid }"
              @click="product.qty++">+</button>
          </div>
          <div class="col-3">
            <h5 class="mb-0">折價券 : {{ showCoupon(product?.coupon?.code) }}</h5>
          </div>
          <div class="col-3 d-flex align-items-center justify-content-end">
            <h5 v-if="product.final_total === product.total" class="mb-0">小計 : {{ getFinalTotal(product) }}</h5>
            <h5 v-else class="mb-0">小計 :
              <span class="ms-3 fs-5 text-secondary text-decoration-line-through">{{ getTotal(product) }}</span>
              <span class="ms-3 text-danger">{{ getFinalTotal(product) }} 元</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h2 {
  margin-top: 90px;
}
</style>
