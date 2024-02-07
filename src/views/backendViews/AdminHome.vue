<script>
// 通用環境變數
const host = import.meta.env.VITE_HEXAPI;
const path = import.meta.env.VITE_USER_PATH;

export default {
  data () {
    return {
      // 直接寫死
      user: {
        username: "tingyu1112@gmail.com",
        password: "cmbSideProject",
      },
      // 儲存所有訂單資料
      orders: [],
      // 儲存所有折價券資料
      coupons: [],
    };
  },
  methods: {
    login () {
      this.axios
        .post(`${host}/v2/admin/signin`, this.user)
        .then((res) => {
          // 把回傳的 token 及 expired timestamp 用解構賦值方式存成同名變數
          const { token, expired } = res.data;

          // 把 token 及 expired 存到 cookie
          document.cookie = `florafirstapi=${token}; expires=${new Date(
            expired
          )}`;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkLogin () {
      this.axios
        .post(`${host}/v2/api/user/check`)
        .then((res) => {
          this.getOrders();
          this.getCoupons();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 後台取得所有訂單
    getOrders () {
      this.axios.get(`${host}/v2/api/${path}/admin/orders`).then((res) => {
        this.orders = res.data.orders;
        console.log(this.orders);
      });
    },
    // 後台取得所有折價券
    getCoupons () {
      this.axios.get(`${host}/v2/api/${path}/admin/coupons`).then((res) => {
        this.coupons = res.data.coupons;
        // console.log(this.coupons);
      });
    },
  },
  computed: {
    renderOrders () {
      let data = [];
      this.orders.forEach((item, index) => {
        if (index <= 4) {
          data.push(item);
        }
      });
      return data;
    },
    orderTodayTotal () {
      // 取得目前時間
      const currentDate = new Date();

      // 設置台灣時間選項
      const options = { timeZone: "Asia/Taipei" };

      // 將日期轉為台灣時間字串，只包含年、月、日
      const taiwanTime = currentDate.toLocaleDateString("en-US", options);

      // 計算今天訂單總額
      let todayTotal = 0;
      this.orders.forEach((item) => {
        // 每筆訂單的 create_at 屬性，由於都是 unix timestamp 美國時間所以都要先轉成台灣時間
        let orderDate = new Date(item.create_at * 1000);
        const orderOptions = { timeZone: "Asia/Taipei" };
        let orderTaiwanDate = orderDate.toLocaleDateString(
          "en-US",
          orderOptions
        );
        // 如果訂單日期等於當前日期，就把金額加入到 todayTotal
        if (orderTaiwanDate === taiwanTime) {
          todayTotal += item.total;
        }
      });

      // 每三位數加一個逗號，這裡會轉成字串
      let todayTotalComma = todayTotal
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return todayTotalComma;
    },
    // 今日銷量榜
    productRank () {
      // 1. 先過濾非當日的訂單
      // 取得目前時間
      const currentDate = new Date();
      // 設置台灣時間選項
      const options = { timeZone: "Asia/Taipei" };
      // 將日期轉為台灣時間字串，只包含年、月、日
      const taiwanTime = currentDate.toLocaleDateString("en-US", options);

      // 把當日訂單裝進此陣列
      let todayOrder = [];

      // 把 orders 陣列的項目一個個抓出來
      this.orders.forEach((item) => {
        let orderDate = new Date(item.create_at * 1000);
        const orderOptions = { timeZone: "Asia/Taipei" };
        let orderTaiwanDate = orderDate.toLocaleDateString(
          "en-US",
          orderOptions
        );

        // 如果訂單日期等於當前日期，就把該筆訂單推進 todayOrder 陣列
        if (orderTaiwanDate === '2/1/2024') { // 先暫時抓 2/1 資料，因為目前沒有當日訂單
          todayOrder.push(item)
        }
      })

      // 2. 宣告一個空物件，用來裝商品 title 及當日銷售額

      // 把 product.title 當 key，product.final_total 當 value 的商品物件
      let todayProductData = {};
      // 用來裝當日訂單中，每一筆訂單的 key 值所組成的陣列
      let orderProduct = [];

      todayOrder.forEach(order => {

        // order.products 因為是物件，所以要先用 Object.keys 取得每個項目的 id 陣列
        orderProduct = Object.keys(order.products);
        // orderProduct 陣列跑 forEach 把每個商品的 id 抓出來
        orderProduct.forEach(product => {
          // 再使用物件取值方式取得每一筆訂單中，單一商品的詳細資料
          let productTitle = order.products[product].product.title // 單一商品名稱
          let productTotal = order.products[product].final_total // 單一商品銷售額

          if (todayProductData[productTitle] === undefined) {
            todayProductData[productTitle] = productTotal;
          } else {
            todayProductData[productTitle] += productTotal;
          }
        })
      });

      // 為了符合此格式 [{title:xxx, total:xxx}, {title:xxx, total:xxx},] 而建立的陣列
      let todayProductArray = [];

      // 暫存 todayProductData 裡所有的 key 值
      let tempProductArray = []
      tempProductArray = Object.keys(todayProductData)

      tempProductArray.forEach(item => {
        let obj = {}
        obj.title = item
        obj.total = todayProductData[item]

        todayProductArray.push(obj)
      })

      // 由大到小排序
      let productSort = todayProductArray.sort((a, b) => {
        return b.total - a.total
      })

      return productSort;
    },
  },
  mounted () {
    // 從 cookie 取得 token 資料
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)florafirstapi\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    // 有些 request 需要夾帶 token 才能使用，所以在發送請求時夾帶 headers 資料，mounted 就載入的話，每次發請求都會自動夾帶
    this.axios.defaults.headers.common["Authorization"] = token;

    this.checkLogin();
    this.login();
  },
};
</script>

<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

  <div class="container my-5">
    <div class="row">
      <div class="col-md-6">
        <!-- 所有訂單 -->
        <div class="bg-mild shadow rounded text-white p-4 mb-4">
          <div class="d-flex justify-content-between align-items-center border-bottom border-dark border-3 pb-2 mb-3">
            <h2 class="fs-1 text-dark">所有訂單</h2>
            <button type="button" class="btn btn-primary">
              more
            </button>
          </div>
          <div class="card mb-3 border border-0 cursor-pointer" v-for="order in renderOrders" :key="order.id">
            <div class="row g-0">
              <div class="col-md-8 bg-light shadow bg-opacity-75 rounded-start">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6">
                      <p class="card-text fs-3 mb-0">訂單編號</p>
                    </div>
                    <div class="col-md-6">
                      <p class="card-text fs-3 mb-0">{{ order.create_at }}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <p class="card-text fs-3 mb-0">金額</p>
                    </div>
                    <div class="col-md-6">
                      <p class="card-text fs-3 mb-0">$ {{ order.total }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <template v-if="!order.is_paid">
                <div
                  class="col-md-4 bg-danger bg-opacity-75 rounded-end d-flex justify-content-center align-items-center">
                  <p class="fs-2 text-white m-0">未付款</p>
                </div>
              </template>
              <template v-else>
                <div
                  class="col-md-4 bg-success bg-opacity-75 rounded-end d-flex justify-content-center align-items-center">
                  <p class="fs-2 text-white m-0">已付款</p>
                </div>
              </template>
            </div>
          </div>
        </div>
        <!-- 折價券 -->
        <div class="bg-mild shadow rounded text-white p-4 mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h2 class="fs-1 text-dark">折價券資訊</h2>
            <button type="button" class="btn btn-primary">
              more
            </button>
          </div>
          <table class="discountTable table table-light table-striped table-hover table-borderless">
            <tbody>
              <tr class="cursor-pointer" v-for="coupon in coupons" :key="coupon.id">
                <td class="fs-3 ps-2">{{ coupon.code }}</td>
                <td class="fs-3 text-end pe-2">{{ coupon.percent }}% OFF</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-6">
        <!-- 今日營業額 -->
        <div class="bg-mild shadow rounded text-bold p-5 mb-4">
          <div class="row">
            <div class="col-md-5">
              <div class="d-flex justify-content-center align-items-center">
                <a href="#" class="link-dark link-opacity-50-hover">
                  <span class="cash-icon material-symbols-outlined">
                    universal_currency_alt
                  </span>
                </a>
              </div>
            </div>
            <div class="col-md-7">
              <div class="d-flex flex-column align-items-center align-items-md-start">
                <p class="fs-1 fw-bold">$ {{ orderTodayTotal }}</p>
                <h2 class="fs-1 fw-bolder">今日營業額</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-mild shadow rounded text-bold p-4 mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h2 class="fs-1 text-dark">今日銷量榜</h2>
            <button type="button" class="btn btn-primary">
              more
            </button>
          </div>
          <table class="revenueTable table table-light table-striped table-hover table-borderless fs-2">
            <thead>
              <tr>
                <th class="top-left-border-radius ps-3 py-3" scope="col">排名</th>
                <th class="py-3" scope="col">品項</th>
                <th class="top-right-border-radius py-3" scope="col">銷售額</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in productRank" :key="item.title" class="cursor-pointer">
                <td width="100" class="ps-3 py-3">{{ index + 1 }}</td>
                <td width="200" class="py-3">{{ item.title }}</td>
                <td width="100" class="py-3">$ {{ item.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card:hover {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
}

.cursor-pointer {
  cursor: pointer;
}

.cash-icon {
  font-size: 120px;
}

.top-left-border-radius {
  border-radius: 5px 0 0 0;
}

.top-right-border-radius {
  border-radius: 0 5px 0 0;
}

.discountTable {
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
