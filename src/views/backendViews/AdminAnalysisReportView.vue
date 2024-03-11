<script>
import adminNav from '../../components/BackendOffcanvasNav.vue'
import adminLogo from '../../components/BackendLogoComponent.vue'
import * as c3 from 'c3'
import 'c3/c3.min.css'
import Swal from 'sweetalert2'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import moment from 'moment-timezone'

const host = import.meta.env.VITE_HEXAPI
const path = import.meta.env.VITE_USER_PATH
export default {
  data () {
    return {
      orders: [],
      total: 0,
      times: [],
      daySelected: {
        date: '',
        orders: [],
        total: 0,
        dates: [],
        minDate: '',
        maxDate: '',
        topDays: '',
        lowDays: ''
      },
      selectedDate: null,
      selectedDateArr: [],
      flatpickrInstance: null,
      flatpickrRangeInstance: null,
      minDate: '',
      maxDate: '',
      multipleDatesState: {
        all: true,
        singleDay: false,
        multipleDates: false
      },
      showRankChart: true,
      productsQty: [],
      productsAmount: []
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
    addNewProduct () {
      this.$router.push('/admin/addProduct')
    },
    // 將orders資料轉為輸出為二維陣列跑圖表
    getSaleRankingData (orders, str) {
      const uniqueProducts = {}
      // 建立品項陣列
      orders.forEach(function (orderItem) {
        for (const productId in orderItem.products) {
          const product = orderItem.products[productId].product
          const item = orderItem.products[productId][str]
          if (!uniqueProducts[product.title]) {
            uniqueProducts[product.title] = item
          } else {
            uniqueProducts[product.title] += item
          }
        }
      })
      // 依品項加入對應的值
      const resultArray = []
      for (const title in uniqueProducts) {
        resultArray.push([title, uniqueProducts[title]])
      }
      // 回傳陣列跑圖表
      return resultArray
    },
    // 建立圖表
    createChart (orders) {
      // 統計數量
      c3.generate({
        bindto: '#saleRanking',
        data: {
          columns: this.getSaleRankingData(orders, 'qty'),
          type: 'donut'
        },
        donut: {
          title: '商品銷售比例'
        }
      })
      // 統計金額
      c3.generate({
        bindto: '#saleAmountRanking',
        data: {
          columns: this.getSaleRankingData(orders, 'total'),
          type: 'donut'
        },
        donut: {
          title: '商品銷售金額比例'
        }
      })
      this.productsQty = this.getSaleRankingData(orders, 'qty')
      this.productsAmount = this.getSaleRankingData(orders, 'total')
    },
    initOrdersData () {
      this.daySelected.orders = this.orders
      this.getDayOrders(this.orders)

      // 抓訂單內最早的日期
      this.minDate = moment.min(this.orders.map(order =>
        moment.unix(order.create_at))).tz('Asia/Taipei').format('YYYY-MM-DD')
      // 抓當日日期
      this.maxDate = moment.tz('Asia/Taipei').format('YYYY-MM-DD')
      // 初始日期陣列的最初與最終日
      this.daySelected.minDate = this.minDate
      this.daySelected.maxDate = this.maxDate
      // 初始化日歷內訂單所存在日期
      this.initFlatpickr()
      this.initRangeFlatpickr()
      // 建立圖表
      this.createChart(this.orders)
    },
    getOrders () {
      // 建立promise陣列
      const promises = []
      this.axios.get(`${host}/v2/api/${path}/admin/orders`)
        .then((res) => {
          // 先抓第一頁訂單資料
          this.orders = res.data.orders
          const pages = res.data.pagination.total_pages
          for (let i = 2; i <= pages; i++) {
            // 每跑一次迴圈就建立一個promise物件
            const promise = this.axios.get(`${host}/v2/api/${path}/admin/orders?page=${i}`)
            promise.then((res) => {
              // 繼續將第二頁後的訂單資料推入this.orders
              res.data.orders.forEach((item) => {
                this.orders.push(item)
              })
            })
            // 將請求物件推進陣列
            promises.push(promise)
          }
          // 確保迴圈的請求都跑完
          Promise.all(promises)
            .then(() => {
              // 初始化資料
              this.initOrdersData()
            })
            .catch(() => {
              Swal.fire('取得資料失敗')
            })
        })
    },
    getTotal (orders) {
      let total = 0
      orders.forEach((item) => {
        total += item.total
      })
      return isNaN(total) ? 0 : total
    },
    // 計算平均值
    getTotalAverage (total, length) {
      return isNaN(total / length) ? 0 : Math.floor(total / length)
    },
    // 傳入訂單陣列計算相關數據
    getDayOrders (orders) {
      this.daySelected.orders = orders
      // this.countProductsData(this.daySelected.orders);
      this.daySelected.total = this.getTotal(this.daySelected.orders)
      // 確保可以抓到最大與最小值
      let maxTotal = 0
      let minTotal = Infinity
      // 建立最大與最小值的陣列(值可能會重複)
      let maxOrders = []
      let minOrders = []
      // 恢復預設值
      this.daySelected.topDays = ''
      this.daySelected.lowDays = ''

      orders.forEach((order) => {
        const total = order.total
        // 與前一個值比大小
        if (total > maxTotal) {
          maxTotal = total
          // 覆蓋陣列以確保最大值
          maxOrders = [order]
          // 值相等就推進去
        } else if (total === maxTotal) {
          maxOrders.push(order)
        }
        if (total < minTotal) {
          minTotal = total
          minOrders = [order]
        } else if (total === minTotal) {
          minOrders.push(order)
        }
      })
      maxOrders.forEach((item) => {
        this.daySelected.topDays += `${moment.unix(item.create_at).tz('Asia/Taipei').format('YYYY-MM-DD')}, `
      })
      minOrders.forEach((item) => {
        this.daySelected.lowDays += `${moment.unix(item.create_at).tz('Asia/Taipei').format('YYYY-MM-DD')}, `
      })
      // 如果碰到沒資料的日期回傳預設字串
      this.daySelected.topDays += maxOrders[0]?.total === undefined ? '此時段沒有訂單資料' : `共 ${maxOrders[0]?.total} 元`
      this.daySelected.lowDays += maxOrders[0]?.total === undefined ? '此時段沒有訂單資料' : `共 ${minOrders[0]?.total} 元`
    },
    // 設定Flatpickr相關選項, 選取單日
    initFlatpickr () {
      this.flatpickrInstance = flatpickr(this.$refs.flatpickrInput, {
        dateFormat: 'Y-m-d',
        // 最大日期不可超過今天
        maxDate: this.maxDate,
        // 抓取訂單內最早的日期
        minDate: this.minDate
      })
    },
    // 選取多日
    initRangeFlatpickr () {
      this.flatpickrRangeInstance = flatpickr(this.$refs.flatpickrRangeInput, {
        dateFormat: 'Y-m-d',
        // 最大日期不可超過今天
        maxDate: this.maxDate,
        // 抓取訂單內最早的日期
        minDate: this.minDate,
        // 選取範圍
        mode: 'range'
      })
    },
    // 切換日期選擇模式
    isMultipleDatesMode (str) {
      // 查看全部日期時將顯示日期改為訂單全部
      // 查看單日或多日時由watch監聽日期變化
      if (str === 'all') {
        this.daySelected.minDate = this.minDate
        this.daySelected.maxDate = this.maxDate
        this.getDayOrders(this.orders)
      }
      Object.keys(this.multipleDatesState).forEach(key => {
        this.multipleDatesState[key] = false
      })
      this.multipleDatesState[str] = true
      this.selectedDate = null
    },
    // 設定要顯示的選取日期
    showMessage (message) {
      if (this.multipleDatesState.all) {
        return '查看所有日期'
      } else if (!this.multipleDatesState.all) {
        return this.selectedDate === null ? '請先選擇日期' : message
      }
    }
  },
  watch: {
    selectedDate (newDate) {
      this.daySelected.date = newDate
      // newDate不為null及拆解日期字串抓日期頭尾
      if (newDate !== null) {
        this.selectedDateArr = newDate.split(' ')
        this.daySelected.minDate = this.selectedDateArr[0]
        this.daySelected.maxDate = this.selectedDateArr[this.selectedDateArr.length - 1]
      }
      // 取得兩個日期的相差天數(同一天則為0)
      const diffDays = moment(this.daySelected.maxDate).diff(moment(this.daySelected.minDate), 'days')

      // 重置選取的日期陣列
      this.daySelected.dates = []
      for (let i = 0; i <= diffDays; i++) {
        this.daySelected.dates.push(moment(this.daySelected.minDate).add(i, 'day').format('YYYY-MM-DD'))
      }
      const resultArray = [...new Set(this.orders.filter(itemA => {
        return this.daySelected.dates.some(itemB =>
          moment.unix(itemA.create_at).tz('Asia/Taipei').format('YYYY-MM-DD').includes(itemB))
      }))]

      // 取得切換日期後的orders後取得相關數據與建立圖表
      this.getDayOrders(resultArray)
      this.createChart(resultArray)
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>

<template>
  <div>
    <div>
      <!-- LOG件 -->
      <adminLogo :open-off-canvas-nav="openOffCanvasNav"></adminLogo>
      <!-- 側邊欄件 -->
      <adminNav ref="backendNav"></adminNav>
    </div>

    <div class="container">
      <h2 class="text-primary mb-0 py-3">營收分析</h2>
      <div class="border p-4 rounded row">
        <div class="col-5 mb-4">
          <h4 class="text-primary my-3">查詢日期銷售狀況</h4>
          <div class="col-12 mb-4">
            <div class="btn__group d-flex ">
              <button type="button" class="btn btn-outline-primary btn__1 p-3" @click="isMultipleDatesMode('singleDay')"
                :class="{ 'active': multipleDatesState.singleDay }">以日期查詢</button>
              <button type="button" class="btn btn-outline-danger btn__2 p-3"
                @click="isMultipleDatesMode('multipleDates')"
                :class="{ 'active': multipleDatesState.multipleDates }">以日期區間查詢</button>
              <button type="button" class="btn btn-outline-success btn__3 p-3" @click="isMultipleDatesMode('all')"
                :class="{ 'active': multipleDatesState.all }">查看全部</button>
            </div>
            <div class="border border-warning border-top-0 rounded-bottom">
              <div class="p-3 text-center">
                <h5 class="mb-0 text-primary">{{ showMessage(selectedDate) }}</h5>
              </div>
              <div class="border-warning border-top p-3 bg-warning d-flex align-items-center">
                <span class="material-symbols-outlined text-white align-middle me-2">calendar_month</span>
                <div class="input-group input-group-sm">
                  <input v-show="multipleDatesState.singleDay" ref="flatpickrInput" type="text" v-model="selectedDate"
                    placeholder="請選擇日期" class="form-control rounded">
                  <input v-show="multipleDatesState.multipleDates" ref="flatpickrRangeInput" type="text"
                    v-model="selectedDate" placeholder="請選擇日期區間" class="form-control rounded">
                  <input v-show="multipleDatesState.all" type="text" placeholder="查看全部日期" class="form-control rounded"
                    disabled>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-7">
          <div class="border p-2 rounded">
            <table class="table table-success table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col" class="ps-3">起始日期</th>
                  <th scope="col" class="text-end pe-3">{{ daySelected.minDate }}</th>
                  <th scope="col" class="text-start ps-3">結束日期</th>
                  <th scope="col" class="text-end pe-3">{{ daySelected.maxDate }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th colspan="2" class="ps-3">訂單總額</th>
                  <td colspan="2" class="text-end pe-3"> {{ `共 ${daySelected.total} 元` }} </td>
                </tr>
                <tr>
                  <th colspan="2" class="ps-3">訂單總筆數</th>
                  <td colspan="2" class="text-end pe-3"> {{ `共 ${daySelected.orders.length} 筆` }} </td>
                </tr>
                <tr>
                  <th colspan="2" class="ps-3">平均銷售額</th>
                  <td colspan="2" class="text-end pe-3"> {{ `平均每筆 ${getTotalAverage(daySelected.total,
                    daySelected.orders.length)} 元` }} </td>
                </tr>
                <tr>
                  <th colspan="2" class="ps-3">營收最高日與金額</th>
                  <td colspan="2" class="text-end pe-3"> {{ daySelected.topDays }} </td>
                </tr>
                <tr>
                  <th colspan="2" class="ps-3">營收最低日與金額</th>
                  <td colspan="2" class="text-end pe-3"> {{ daySelected.lowDays }} </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="col-7">
          <div class="d-flex justify-content-between">
            <h4 class="text-primary my-3">查詢品項銷售狀況</h4>
            <div>
              <div class="btn-group my-3" role="group">
                <button type="button" class="btn btn-outline-primary" @click="showRankChart = true"
                :class="{'active' : showRankChart}">查看銷售數量分析</button>
                <button type="button" class="btn btn-outline-success" @click="showRankChart = false"
                :class="{'active' : !showRankChart}">查看銷售金額分析</button>
              </div>
            </div>
          </div>
          <div class="border p-2 rounded product__table overflow-auto">
            <table class="table table-primary table-striped table-hover mb-0 ">
              <thead>
                <tr>
                  <th scope="col" class="ps-3">起始日期</th>
                  <th scope="col" class="text-end pe-3">{{ daySelected.minDate }}</th>
                  <th scope="col" class="text-start ps-3">結束日期</th>
                  <th scope="col" class="text-end pe-3">{{ daySelected.maxDate }}</th>
                </tr>
              </thead>
              <tbody v-if="showRankChart">
                <tr v-for="qty in productsQty" :key="qty">
                  <th class="ps-3">銷售品項</th>
                  <th class="pe-3 text-end">{{ qty[0] }}</th>
                  <th class="ps-3 text-start">累計數量 :</th>
                  <td class="text-end pe-3">{{ `共 ${qty[1]} 件` }}</td>
                </tr>
              </tbody>
              <tbody v-if="!showRankChart">
                <tr v-for="amount in productsAmount" :key="amount">
                  <th class="ps-3">銷售品項</th>
                  <th class="pe-3 text-end">{{ amount[0] }}</th>
                  <th class="ps-3 text-start">累計金額 :</th>
                  <td class="text-end pe-3">{{ `共 ${amount[1]} 元` }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-5 px-4">
          <div v-show="daySelected.orders.length !== 0" class="mt-3">
            <div v-show="showRankChart">
              <div id="saleRanking"></div>
            </div>
            <div v-show="!showRankChart">
              <div id="saleAmountRanking"></div>
            </div>
          </div>
          <div v-show="daySelected.orders.length === 0" class="text-center">
            <div>
              <h4 class="text-primary my-3">很抱歉, 您選取的日期沒有資料</h4>
              <img class="not-fount" src="https://github.com/Aruminiya/coffee_meets_bagel/blob/main/public/NoData.gif?raw=true" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  margin-top: 90px;
}
.btn {
  &__1 {
    border-radius: 5px 0px 0px 0px;
    width: 33%;
  }

  &__2 {
    border-radius: 0;
    width: 34%;
  }

  &__3 {
    border-radius: 0px 5px 0px 0px;
    width: 33%;
  }
}

.product__table {
  max-height: 250px;
}
.not-fount {
  width: 300px;
}
</style>
