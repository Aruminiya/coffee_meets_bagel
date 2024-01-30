<script>
const host = import.meta.env.VITE_HEXAPI;
const path = import.meta.env.VITE_USER_PATH;

export default {
  data() {
    return {
      text: '純測試',
      allProducts: [],
      products: [],
      pagination: {},
      categories: []
    }
  },
  methods: {
    checkAdmin() {
      this.axios.post(`${host}/v2/api/user/check`).then((res) => {
        // 驗證完畢後取得產品列表
        // 要渲染的資料
        this.getProducts();
        // 所有資料, 以及所有分類
        this.getAllProducts();
      }).catch((err) => {
        console.log(err);
      })
    },
    // 先取得所有商品, 以及所有分類
    getAllProducts() {
      this.axios.get(`${host}/v2/api/${path}/admin/products/all`)
        .then((response) => {
          // console.log("資料取得成功");
          // console.log(response.data);
          // 存入所有產品
          this.allProducts = Object.values(response.data.products);
          // 取得分類
          this.getCategories();
          // console.log(this.categories, 111);
          // console.log([...this.categories], 222);
          // 取完所有資料再取要渲染的資料
          this.getProducts();
        })
        .catch((error) => {
          console.log("資料取得失敗");
          console.error(error);
        });
    },
    // 預設取得第一頁資料
    getProducts(page = 1) {
      this.axios.get(`${host}/v2/api/${path}/admin/products?page=${page}`)
        .then((response) => {
          // console.log("資料取得成功");
          // console.log(response.data);
          this.products = response.data.products;
          this.pagination = response.data.pagination;
          // console.log(this.pagination);
        })
        .catch((error) => {
          console.log("資料取得失敗");
          console.error(error);
        });
    },
    // 變更分類時取得分類資料 (卡關)
    getProductsByCategory(category) {
      // console.log(category);
      if (category === '檢視全部') {
        this.getProducts();
      } else {
        // const encodedCategory = encodeURIComponent(category);
        // console.log(encodedCategory);
                                          //  /admin/products?category=
        this.axios.get(`${host}/v2/api/${path}/admin/products?page=1&category=${category}`)
          .then((response) => {
            console.log(response.data);
            console.log(category);
            // console.log(this.products);
            this.products = response.data.products;
            // console.log(this.products);
          })
          .catch((error) => {
            console.log("資料取得失敗");
            console.error(error);
          });
      }
    },
    // 測試用, 如果需要token再從這邊抓
    testLogin() {
      const user = {
        username: 'tingyu1112@gmail.com',
        password: 'cmbSideProject'
      };
      this.axios.post(`${host}/v2/admin/signin`, user)
        .then((res) => {
          const { token, expired } = res.data;
          // 將 token 與 expired 設定好到期時間存入cookie
          document.cookie = `florafirstapi=${token}; expired=${new Date(expired)}; path=/`;
        })
        .catch((error) => {
          console.log("資料取得失敗");
          console.error(error);
        });
    },
    getCategories() {
      this.categories = Array.from(new Set(this.allProducts.map(item => item.category)));
      // console.log(this.categories, 111);
    }
  },
  mounted() {
    // 從cookie取出登入時存入的token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)florafirstapi\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // 將token設定到axios的預設header裡
    this.axios.defaults.headers.common.Authorization = token;
    // 確認登入狀態
    this.checkAdmin();
    // this.testLogin()
  },
}
</script>

<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

  <div class="d-flex">
    <!-- 後台側邊欄位, 之後拆元件 -->
    <div class="sidebar">
      {{ text }}
    </div>
    <div class="container">
      <div class="row">
        <!-- 搜尋欄, 之後拆 -->
        <div class="col-3 py-3 my-3">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="請輸入搜尋資料">
            <button type="button" class="btn btn-outline-success d-flex align-items-center">
              <span class="material-symbols-outlined">
                search
              </span>
            </button>
          </div>
        </div>
        <div class="col-3 py-3 my-3">
          <select class="form-select form-select" aria-label=".form-select-sm example"
            @change="getProductsByCategory($event.target.value)">
            <!-- 設計稿以販售狀態分類, 先改類別 -->
            <option selected>依商品類別檢視</option>
            <option value="檢視全部">檢視全部</option>
            <option v-for="category in categories" :key="category" :value="category">{{category}}</option>
          </select>
        </div>
        <div class="col-6 py-3 my-3 text-end">
          <button type="button" class="btn btn-outline-success">新增商品</button>
        </div>

      </div>
      <div class="border rounded p-3 product__list mb-4">
        <!-- 依設計稿調整至顯示三欄 -->
        <div v-for="product in products" :key="product.id" class="card mb-3 ">
          <div class="row g-0">
            <div class="col-md-4 p-3">
              <img :src="product.imageUrl" class="img-fluid rounded-start" alt="#">
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h5 class="card-title">商品編號 : {{ product.id }}</h5>
                <h5 class="card-title">商品名稱 : {{ product.title }} <span class="badge bg-info text-dark ms-2">{{
                  product.category }}</span></h5>
                <div class="row">
                  <div class="col-6">
                    <div>
                      <p class="card-text mb-2">原價 : {{ product.origin_price }}</p>
                      <p class="card-text mb-2">特價 : {{ product.price }}</p>
                    </div>
                  </div>
                  <div class="col-6">
                    <p class="card-text mb-2">單位 : {{ product.unit }}</p>
                    <p v-if="product.is_enabled === 1" class="card-text mb-2">狀態 : <span class="text-success">販售中</span>
                    </p>
                    <p v-else class="card-text mb-2">狀態 : <span class="text-danger">暫停販售</span></p>
                  </div>
                </div>
                <p class="card-text mb-2">{{ product.content }}</p>
                <p class="card-text"><strong class="text-muted">{{ product.description }}</strong></p>
              </div>
            </div>
            <div class="col-md-2 py-2">
              <div class="card-footer border-top-0 bg-white text-end">
                <a href="#" class="text-warning" @click.prevent="">
                  <span class="material-symbols-outlined fs-1">
                    edit
                  </span>
                </a>
                <a href="#" class="text-danger ms-4" @click.prevent="">
                  <span class="material-symbols-outlined fs-1">
                    delete
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分頁, 之後也要拆 -->
      <div class="d-flex justify-content-center">
        <nav aria-label="navigation">
          <ul class="pagination">
            <li class="page-item disabled">
              <a class="page-link">前一頁</a>
            </li>

            <li v-for="(page, key) in pagination.total_pages" :key="key + 999" class="page-item">
              <a class="page-link" href="#">{{ key + 1 }}</a>
            </li>

            <!-- <li class="page-item " aria-current="page">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">3</a></li> -->

            <li class="page-item">
              <a class="page-link" href="#">下一頁</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>


  </div>
</template>

<style scoped lang="scss">
.sidebar {
  width: 300px;
  height: 100vh;
  background: #D9D9D9;
}

::placeholder {
  color: rgb(179, 175, 175);
}

.img-fluid {
  width: 420px;
  height: 200px;
  object-fit: cover; // 或是 contain 但圖會顯小
}

.product__list {
  height: 720px;
  overflow: auto;
}
</style>