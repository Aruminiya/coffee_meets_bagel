<script>
const host = import.meta.env.VITE_HEXAPI;
const path = import.meta.env.VITE_USER_PATH;

import adminNav from '../../components/BackendOffcanvasNav.vue';
import adminLogo from '../../components/BackendLogoComponent.vue';
import * as d3 from 'd3';
import * as c3 from 'c3';
import 'c3/c3.min.css';
import Swal from 'sweetalert2';

import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

// import moment from 'moment';
import moment from 'moment-timezone';

export default {
  data() {
    return {
      orders: [],
      total: 0,
      times: [],
      daySelected: {
        date: '',
        orders: [],
        total: 0
      },
      selectedDate: null,
      flatpickrInstance: null,
      minDate: '',
      result: '',
      resultArray: []
    }
  },
  components: {
    adminNav,
    adminLogo
  },
  methods: {
    openOffCanvasNav() {
      this.$refs.backendNav.openNav();
    },
    addNewProduct() {
      this.$router.push('/admin/addProduct');
    },
    getSaleRankingData(orders) {
      const uniqueProducts = {};
      
      orders.forEach(function (orderItem) {
        for (const productId in orderItem.products) {
          const product = orderItem.products[productId].product;
          const qty = orderItem.products[productId].qty;

          if (!uniqueProducts[product.title]) {
            uniqueProducts[product.title] = qty;
          } else {
            uniqueProducts[product.title] += qty;
          }
        }
      });

      // 将对象转换为所需的格式（二维数组）
      const resultArray = [];
      for (const title in uniqueProducts) {
        resultArray.push([title, uniqueProducts[title]]);
      }
      console.log(resultArray);
      return resultArray
    },
    getSalePriceRankingData(orders) {
      const uniqueProducts = {};
      
      orders.forEach(function (orderItem) {
        for (const productId in orderItem.products) {
          const product = orderItem.products[productId].product;
          const total = orderItem.products[productId].total;

          if (!uniqueProducts[product.title]) {
            uniqueProducts[product.title] = total;
          } else {
            uniqueProducts[product.title] += total;
          }
        }
      });

      // 将对象转换为所需的格式（二维数组）
      const resultArray = [];
      for (const title in uniqueProducts) {
        resultArray.push([title, uniqueProducts[title]]);
      }
      console.log(resultArray);
      return resultArray
    },
    createChart() {
      // 建立圖表
      const saleRanking = c3.generate({
        bindto: '#saleRanking',
        data: {
          columns: this.getSaleRankingData(this.orders),
          type: 'donut',
        },
        donut: {
          title: "商品銷售比例"
        }
      });
      const amountRanking = c3.generate({
        bindto: '#amountRanking',
        data: {
          columns: this.getSalePriceRankingData(this.orders),
          type: 'donut',
        },
        donut: {
          title: "商品銷售金額比例"
        }
      });
    },
    getOrders() {
      this.axios
        .get(`${host}/v2/api/${path}/admin/orders`)
        .then((res) => {
          console.log(res.data.orders);
          this.orders = res.data.orders

          // 計算總金額
          this.orders.forEach((item) => {
            this.total += item.total
          })
          // 抓取依今日與昨日訂單
          this.getDayOrders();
          // 
          this.getTimes(res.data.orders);
          // 初始化日歷內訂單所存在日期
          this.initFlatpickr();
          // 抓訂單內最早的日期
          // this.minDate = moment.min(this.orders.map(order => 
          //   moment.unix(order.create_at))).tz('Asia/Taipei').format('YYYY-MM-DD');

          this.createChart() 
          
        })
        .catch((err) => {

          console.log(err);
          // Swal.fire({
          //   title: "登入驗證失敗, 請重新登入",
          //   confirmButtonText: "Save",
          // }).then((result) => {
          //   // 驗證失敗轉回登入頁面(未完成), 目前先轉回首頁
          //   this.$router.push('/')
          // });

        });
    },
    getTotal(orders) {
      let total = 0;
      orders.forEach((item) => {
        total += item.total
      })
      return total === 0 ? '本日未有訂單成立' : `共 ${total} 元`;
    },
    getDayOrders() {
      // 抓取選取日期相關資料
      this.daySelected.orders = this.orders.filter((item) => {
        const date = moment.unix(item.create_at);
        const taiwanDate = date.tz('Asia/Taipei');
        return taiwanDate.format('YYYY-MM-DD').match(this.selectedDate)
      })
      this.daySelected.total = this.getTotal(this.daySelected.orders);
    },
    getTimes(orders) {

      orders.forEach((item) => {
        const date = moment.unix(item.create_at);
        const taiwanDate = date.tz('Asia/Taipei');


        // console.log(taiwanDate.format('YYYY-MM-DD HH:mm:ss'));
        // console.log(taiwanDate.format('YYYY-MM-DD'), taiwanDate.add(-1, 'week').format('YYYY-MM-DD'));


      })

    },
    initFlatpickr() {
      this.flatpickrInstance = flatpickr(this.$refs.flatpickrInput, {
        // 設定Flatpickr相關選項
        dateFormat: 'Y-m-d',
        // 最大日期不可超過今天
        maxDate: moment().format('YYYY-MM-DD'),
        // 抓取訂單內最早的日期
        minDate: moment.min(this.orders.map(order => moment.unix(order.create_at))).tz('Asia/Taipei').format('YYYY-MM-DD'),
        // 設定跳過金額為0的日期
        disable: ['']
      });

      // 監聽日期變化事件
      // this.flatpickrInstance.config.onChange.push((selectedDates, dateStr) => {
      //   this.selectedDate = dateStr;
      // });
    },
    showMessage(message) {
      return this.selectedDate === null ? '請先選擇日期' : message;
    },



  },
  // computed: {
  // 	// 改用呼叫的方式, 邏輯寫在函式內
  //   showMessage(message) {
  //     return this.selectedDate === null? '請先選擇日期' : message;
  //   },
  // },
  watch: {
    selectedDate(newDate, oldDate) {
      this.daySelected.orders = this.orders.filter((item) => {
        return moment.unix(item.create_at).tz('Asia/Taipei').format('YYYY-MM-DD').match(newDate);
      })
      // console.log(this.daySelected);
      this.getDayOrders();
    }
  },
  mounted() {
    // 從cookie取出登入時存入的token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)florafirstapi\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // 將token設定到axios的預設header裡
    this.axios.defaults.headers.common.Authorization = token;




    // 抓取今日日期與昨日日期
    // this.today.date = moment().format('YYYY-MM-DD');
    // this.yesterday.date = moment().add(-1, 'day').format('YYYY-MM-DD');

    const currentDate = moment();

    // 获取当前日期所属的周一到周日的日期, 預設每周起使日期為週日, 改為週一
    const mondayDate = currentDate.clone().startOf('week').add(1, 'day').format('YYYY-MM-DD');
    const sundayDate = currentDate.clone().endOf('week').add(1, 'day').format('YYYY-MM-DD');

    // console.log('星期一 : ' + mondayDate, ', 星期日 : ' + sundayDate);


    this.getOrders();
    // this.createChart();
  },
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
      <h2 class="text-primary mb-3 py-3">營收分析</h2>
      <div class="border p-4 rounded row">
        <div class="col-3 mb-4">
          <div class="border border-warning rounded">
            <div class="p-3 text-center">
              <h6 class="mb-0 text-warning">{{ showMessage(selectedDate) }}</h6>
            </div>
            <div class="border-warning border-top p-3 bg-warning d-flex align-items-center">
              <span class="material-symbols-outlined text-white align-middle me-2">calendar_month</span>
              <div class="input-group input-group-sm">
                <input ref="flatpickrInput" type="text" v-model="selectedDate" placeholder="請選擇日期" class="form-control">
              </div>
            </div>
          </div>
        </div>
        <div class="col-3 mb-4">
          <div class="border border-success rounded">
            <div class="p-3 text-center">
              <h6 class="mb-0 text-success">請選取日期區間</h6>
            </div>
            <div class="border-success border-top p-3 bg-success d-flex align-items-center">
              <span class="material-symbols-outlined text-white align-middle me-2">calendar_month</span>
              <div class="input-group input-group-sm">
                <input type="text" placeholder="請選擇日期" class="form-control">
              </div>
            </div>
          </div>
        </div>
        <div class="col-3 mb-4">

          <div class="border border-primary rounded">
            <div class="p-3 text-center">
              <h6 class="mb-0 text-primary">請選取查詢月份</h6>
            </div>
            <div class="border-primary border-top p-3 bg-primary">
              <h6 class="mb-0 text-white d-flex justify-content-between align-items-center">
                <span class="material-symbols-outlined">sell</span>
                <span>尚未完成</span>
              </h6>
            </div>
          </div>

        </div>
        <div class="col-3 mb-4">
          <div class="border border-info rounded">
            <div class="p-3 text-center">
              <h6 class="mb-0 text-info">累計訂單量</h6>
            </div>
            <div class="border-info border-top p-3 bg-info">
              <h6 class="mb-0 text-white d-flex justify-content-between align-items-center">
                <span class="material-symbols-outlined">sell</span>
                <span>{{ `共 ${orders.length} 筆` }}</span>
              </h6>
            </div>
          </div>
        </div>

        <!-- 中 -->
        <div class="col-3 mb-4">

          <div class="border border-warning rounded">
            <div class="p-3 text-center">
              <h6 class="mb-0 text-warning">當日訂單總筆數</h6>
            </div>
            <div class="border-warning border-top p-3 bg-warning">
              <h6 class="mb-0 text-white d-flex justify-content-between align-items-center">
                <span class="material-symbols-outlined">sell</span>
                <span> {{ showMessage(`當日訂單共 ${daySelected.orders.length} 筆`) }} </span>
              </h6>
            </div>
          </div>

        </div>
        <div class="col-3 mb-4">

          <div class="border border-success rounded">
            <div class="p-3 text-center">
              <h6 class="mb-0 text-success">此區間總共筆數</h6>
            </div>
            <div class="border-success border-top p-3 bg-success">
              <h6 class="mb-0 text-white d-flex justify-content-between align-items-center">
                <span class="material-symbols-outlined">sell</span>
                <span>尚未完成</span>
              </h6>
            </div>
          </div>

        </div>
        <div class="col-3 mb-4">

          <div class="border border-primary rounded">
            <div class="p-3 text-center">
              <h6 class="mb-0 text-primary">當月訂單總筆數</h6>
            </div>
            <div class="border-primary border-top p-3 bg-primary">
              <h6 class="mb-0 text-white d-flex justify-content-between align-items-center">
                <span class="material-symbols-outlined">sell</span>
                <span>尚未完成</span>
              </h6>
            </div>
          </div>

        </div>
        <div class="col-3 mb-4">
          <div class="border border-info rounded">
            <div class="p-3 text-center">
              <h6 class="mb-0 text-info">平均每筆訂單金額</h6>
            </div>
            <div class="border-info border-top p-3 bg-info">
              <h6 class="mb-0 text-white d-flex justify-content-between align-items-center">
                <span class="material-symbols-outlined">sell</span>
                <span>{{ `平均每筆 ${total / orders.length} 元` }}</span>
              </h6>
            </div>
          </div>
        </div>
        <!-- 下半 -->
        <div class="col-3 mb-4">

          <div class="border border-warning rounded">
            <div class="p-3 text-center">
              <h6 class="mb-0 text-warning">當日訂單總額</h6>
            </div>
            <div class="border-warning border-top p-3 bg-warning">
              <h6 class="mb-0 text-white d-flex justify-content-between align-items-center">
                <span class="material-symbols-outlined">sell</span>
                <span>{{ showMessage(daySelected.total) }}</span>
              </h6>
            </div>
          </div>

        </div>
        <div class="col-3 mb-4">

          <div class="border border-success rounded">
            <div class="p-3 text-center">
              <h6 class="mb-0 text-success">此區間訂單總額</h6>
            </div>
            <div class="border-success border-top p-3 bg-success">
              <h6 class="mb-0 text-white d-flex justify-content-between align-items-center">
                <span class="material-symbols-outlined">sell</span>
                <span>尚未完成</span>
              </h6>
            </div>
          </div>

        </div>
        <div class="col-3 mb-4">

          <div class="border border-primary rounded">
            <div class="p-3 text-center">
              <h6 class="mb-0 text-primary">當月訂單總額</h6>
            </div>
            <div class="border-primary border-top p-3 bg-primary">
              <h6 class="mb-0 text-white d-flex justify-content-between align-items-center">
                <span class="material-symbols-outlined">sell</span>
                <span>尚未完成</span>
              </h6>
            </div>
          </div>

        </div>
        <div class="col-3 mb-4">
          <div class="border border-info rounded">
            <div class="p-3 text-center">
              <h6 class="mb-0 text-info">累計訂單總額</h6>
            </div>
            <div class="border-info border-top p-3 bg-info">
              <h6 class="mb-0 text-white d-flex justify-content-between align-items-center">
                <span class="material-symbols-outlined">sell</span>
                <span>{{ `共 ${total} 元` }}</span>
              </h6>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div id="saleRanking"></div>
        </div>
        <div class="col-6">
          <div id="amountRanking"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>