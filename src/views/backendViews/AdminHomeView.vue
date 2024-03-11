<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0" />

  <!-- logo 觸發 offcanvas 效果，不能放 BackendOffcanvasNav component 裡面 -->
  <adminLogo :open-off-canvas-nav="openOffCanvasNav"></adminLogo>
  <!-- 側邊選單 -->
  <adminNav ref="backendNav" />
  <!-- 主要區塊 -->
  <main>
    <div class="container mt-20 mb-5">
      <div class="row  pt-4">
        <div class="col-md-6">
          <!-- 所有訂單 -->
          <div class="colorChart-Gray-10 shadow rounded text-white p-4 mb-4">
            <div class="d-flex justify-content-between align-items-center border-bottom border-primary pb-2 mb-3">
              <h2 class="fs-2 text-colorChart-Accessory-200 lh-1">所有訂單</h2>
              <div>
                <router-link to="/admin/adminOrders">
                  <button type="button" class="btn btn-primary-2 fs-2 text-white lh-1 px-7">
                    more
                  </button>
                </router-link>
              </div>
            </div>
            <div class="card mb-3 border-0 cursor-pointer" v-for="order in renderOrders" :key="order.id">
              <div class="row g-0">
                <div class="col-lg-10 colorChart-bg-color card-detail-border-radius">
                  <div class="card-body py-6">
                    <div class="row mb-2">
                      <div class="col-6 col-lg-4">
                        <p class="card-text fs-5 lh-1 mb-0 ps-2">訂單編號</p>
                      </div>
                      <div class="col-6 col-lg-8">
                        <p class="card-text fs-5 lh-1 mb-0">{{ order.id }}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 col-lg-4">
                        <p class="card-text fs-5 lh-1 mb-0 ps-2">金額</p>
                      </div>
                      <div class="col-6 col-lg-8">
                        <p class="card-text fs-5 lh-1 mb-0">$ {{ order.total }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <template v-if="!order.is_paid">
                  <div
                    class="col-lg-2 bg-danger bg-opacity-75 d-flex justify-content-center align-items-center card-paid-border-radius">
                    <p class="fs-5 text-white m-0">未付款</p>
                  </div>
                </template>
                <template v-else>
                  <div
                    class="col-lg-2 bg-success bg-opacity-75 d-flex justify-content-center align-items-center card-paid-border-radius">
                    <p class="fs-5 text-white m-0">已付款</p>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <!-- 折價券 -->
          <div class="colorChart-Gray-10 shadow rounded text-white p-4 mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h2 class="fs-2 lh-1 text-colorChart-Accessory-200">
                折價券資訊
              </h2>
              <div>
                <router-link to="/admin/adminCoupon">
                  <button type="button" class="btn btn-primary-2 fs-2 text-white lh-1 px-7">
                    more
                  </button>
                </router-link>
              </div>
            </div>
            <table class="couponTable table table-light table-striped table-hover table-borderless">
              <tbody>
                <tr class="cursor-pointer" v-for="coupon in renderCoupons" :key="coupon.id">
                  <td class="fs-3 lh-1 p-6">{{ coupon.code }}</td>
                  <td class="fs-3 lh-1 text-end p-6">
                    {{ coupon.percent }}% OFF
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-6">
          <!-- 今日營業額 -->
          <div class="colorChart-Gray-10 shadow rounded text-bold p-9 mb-4">
            <div class="row align-items-center">
              <div class="col-md-5">
                <div class="d-flex justify-content-center align-items-center">
                  <a href="#" class="text-colorChart-Secondary-200">
                    <span class="cash-icon material-symbols-outlined">
                      paid
                    </span>
                  </a>
                </div>
              </div>
              <div class="col-md-7">
                <div class="d-flex flex-column align-items-center align-items-md-start">
                  <p class="fs-52 lh-1 text-colorChart-Gray-500 fw-bold">
                    $ {{ orderTodayTotal }}
                  </p>
                  <h2 class="fs-2 lh-1 text-colorChart-Gray-500 fw-medium">
                    今日營業額
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div class="colorChart-Gray-10 shadow rounded text-bold px-4 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h2 class="fs-2 lh-1 text-colorChart-Accessory-200">
                今日銷量榜
              </h2>
              <div>
                <router-link to="/admin/analysisReport">
                  <button type="button" class="btn btn-primary-2 fs-3 text-white lh-1 px-7">
                    more
                  </button>
                </router-link>
              </div>
            </div>
            <table class="revenueTable table table-light table-striped table-hover table-borderless fs-3">
              <thead>
                <tr>
                  <th class="fw-medium top-left-border-radius ps-3 py-4" scope="col">
                    排名
                  </th>
                  <th class="fw-medium py-4" scope="col">品項</th>
                  <th class="fw-medium top-right-border-radius py-4" scope="col">
                    銷售額
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in productRank" :key="item.title" class="cursor-pointer">
                  <td width="100" class="ps-3 py-4">{{ index + 1 }}</td>
                  <td width="200" class="py-4">{{ item.title }}</td>
                  <td width="100" class="py-4">$ {{ item.total }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import adminLogo from '../../components/BackendLogoComponent.vue'
import adminNav from '../../components/BackendOffcanvasNav.vue'
import moment from 'moment-timezone'

// 通用環境變數
const host = import.meta.env.VITE_HEXAPI
const path = import.meta.env.VITE_USER_PATH

export default {
  data () {
    return {
      // 儲存所有訂單資料
      orders: [],
      // 儲存所有折價券資料
      coupons: []
    }
  },
  components: {
    adminLogo,
    adminNav
  },
  methods: {
    // 打開側邊欄位
    openOffCanvasNav () {
      this.$refs.backendNav.openNav()
    },
    // 後台取得所有訂單
    getOrders () {
      this.axios.get(`${host}/v2/api/${path}/admin/orders`).then((res) => {
        this.orders = res.data.orders
      })
    },
    // 後台取得所有折價券
    getCoupons () {
      this.axios.get(`${host}/v2/api/${path}/admin/coupons`).then((res) => {
        this.coupons = res.data.coupons
      })
    }
  },
  computed: {
    renderCoupons () {
      const data = []
      this.coupons.forEach((item, index) => {
        if (index <= 1) {
          data.push(item)
        }
      })
      return data
    },
    renderOrders () {
      const data = []
      this.orders.forEach((item, index) => {
        if (index <= 4) {
          data.push(item)
        }
      })
      return data
    },
    orderTodayTotal () {
      // 取得目前時間
      const currentDate = new Date()

      // 設置台灣時間選項
      const options = { timeZone: 'Asia/Taipei' }

      // 將日期轉為台灣時間字串，只包含年、月、日
      const taiwanTime = currentDate.toLocaleDateString('en-US', options)

      // 計算今天訂單總額
      let todayTotal = 0
      this.orders.forEach((item) => {
        // 每筆訂單的 create_at 屬性，由於都是 unix timestamp 美國時間所以都要先轉成台灣時間
        const orderDate = new Date(item.create_at * 1000)
        const orderOptions = { timeZone: 'Asia/Taipei' }
        const orderTaiwanDate = orderDate.toLocaleDateString(
          'en-US',
          orderOptions
        )
        // 如果訂單日期等於當前日期，就把金額加入到 todayTotal
        if (orderTaiwanDate === taiwanTime) {
          todayTotal += item.total
        }
      })

      // 每三位數加一個逗號，這裡會轉成字串
      const todayTotalComma = todayTotal
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

      return todayTotalComma
    },
    // 今日銷量榜
    productRank () {
      // 1. 先過濾非當日的訂單
      // 取得目前時間
      const currentDate = new Date()
      // 設置台灣時間選項
      const options = { timeZone: 'Asia/Taipei' }
      // 將日期轉為台灣時間字串，只包含年、月、日
      currentDate.toLocaleDateString('en-US', options)

      // 把當日訂單裝進此陣列
      const todayOrder = []

      // 把 orders 陣列的項目一個個抓出來
      this.orders.forEach((item) => {
        const orderDate = new Date(item.create_at * 1000)
        const orderOptions = { timeZone: 'Asia/Taipei' }
        const orderTaiwanDate = orderDate.toLocaleDateString(
          'en-US',
          orderOptions
        )
        // 如果訂單日期等於當前日期，就把該筆訂單推進 todayOrder 陣列
        // 改比對每日當日日期
        if (orderTaiwanDate === moment().format('M/D/YYYY')) { // 先暫時抓 2/14 資料，因為目前沒有當日訂單，需要時替換回 taiwanTime
          todayOrder.push(item)
        }
      })

      // 2. 宣告一個空物件，用來裝商品 title 及當日銷售額

      // 把 product.title 當 key，product.final_total 當 value 的商品物件
      const todayProductData = {}
      // 用來裝當日訂單中，每一筆訂單的 key 值所組成的陣列
      let orderProduct = []

      todayOrder.forEach((order) => {
        // order.products 因為是物件，所以要先用 Object.keys 取得每個項目的 id 陣列
        orderProduct = Object.keys(order.products)
        // orderProduct 陣列跑 forEach 把每個商品的 id 抓出來
        orderProduct.forEach((product) => {
          // 再使用物件取值方式取得每一筆訂單中，單一商品的詳細資料
          const productTitle = order.products[product].product.title // 單一商品名稱
          const productTotal = order.products[product].final_total // 單一商品銷售額

          if (todayProductData[productTitle] === undefined) {
            todayProductData[productTitle] = productTotal
          } else {
            todayProductData[productTitle] += productTotal
          }
        })
      })

      // 為了符合此格式 [{title:xxx, total:xxx}, {title:xxx, total:xxx},] 而建立的陣列
      const todayProductArray = []

      // 暫存 todayProductData 裡所有的 key 值
      let tempProductArray = []
      tempProductArray = Object.keys(todayProductData)

      tempProductArray.forEach((item, index) => {
        // 把畫面限制為 5 筆資料
        if (index <= 4) {
          const obj = {}
          obj.title = item
          obj.total = todayProductData[item]

          todayProductArray.push(obj)
        }
      })

      // 由大到小排序
      const productSort = todayProductArray.sort((a, b) => {
        return b.total - a.total
      })

      return productSort
    }
  },
  mounted () {
    this.getOrders()
    this.getCoupons()
  }
}
</script>

<style lang="scss">
// logo
.logo {
  display: block;
  width: 256px;
  height: 64px;
  background-image: url("../../../public/coffee_meets_bagel_Logo.svg");
  background-repeat: no-repeat;
  text-indent: 101%;
  overflow: hidden;
  white-space: nowrap;
}

.lh-1 {
  line-height: 1;
}

.fs-52 {
  font-size: 52px;
}

// 四大區塊背景
.colorChart-Gray-100 {
  background: $colorChart-Gray-100;
}

// more 按鈕
.btn-primary-2 {
  background-color: $colorChart-Primary-200;

  &:hover {
    transition: 0.4s;
    background-color: $colorChart-Secondary-200;
    opacity: 0.8;
  }
}

.text-colorChart-Accessory-200 {
  color: $colorChart-Accessory-200;
}

// 所有訂單卡片效果
.card {
  &:hover {
    transition: 0.3s;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  }

  .colorChart-bg-color {
    background: $colorChart-bg-color;
  }

  .card-detail-border-radius {
    @media (min-width: 992px) {
      border-radius: 5px 0 0 5px;
    }

    border-radius: 5px 5px 0 0;
  }

  .card-paid-border-radius {
    @media (min-width: 992px) {
      border-radius: 0 5px 5px 0;
    }

    border-radius: 0 0 5px 5px;
  }
}

// 今日營業額 icon
.text-colorChart-Secondary-200 {
  color: $colorChart-Secondary-200;

  &:hover {
    transition: 0.3s;
    opacity: 0.75;
  }

  .cash-icon {
    font-size: 100px;
  }
}

// 今日營業額文字
.text-colorChart-Gray-500 {
  color: $colorChart-Gray-500;
}

.cursor-pointer {
  cursor: pointer;
}

.top-left-border-radius {
  border-radius: 5px 0 0 0;
}

.top-right-border-radius {
  border-radius: 0 5px 0 0;
}

.couponTable {
  tbody {
    tr {
      &:first-child {
        td {
          &:first-child {
            border-radius: 5px 0 0 0;
          }

          &:last-child {
            border-radius: 0 5px 0 0;
          }
        }
      }

      &:last-child {
        td {
          &:first-child {
            border-radius: 0 0 0 5px;
          }

          &:last-child {
            border-radius: 0 0 5px 0;
          }
        }
      }
    }
  }
}

.revenueTable {
  tbody {
    tr {
      &:last-child {
        td {
          &:first-child {
            border-radius: 0 0 0 5px;
          }

          &:last-child {
            border-radius: 0 0 5px 0;
          }
        }
      }
    }
  }
}
</style>
