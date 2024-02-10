<script>
const host = import.meta.env.VITE_HEXAPI;
const path = import.meta.env.VITE_USER_PATH;

// import * as bootstrap from 'bootstrap/dist/js/bootstrap.min.js';


import modal from '../../components/ModalComponent.vue';
import pagination from '../../components/PaginationComponent.vue';

// let showPicModal = null;

export default {
  data() {
    return {
      text: "純測試",
      allProducts: [],
      products: [],
      pagination: {},
      categories: [],
      search: '',
      product: {}
      // productModal: {},
      // imageUrl: ''
    };
  },
  components: {
    pagination,
    modal
  },
  methods: {
    checkAdmin() {
      this.axios
        .post(`${host}/v2/api/user/check`)
        .then((res) => {
          // 驗證完畢後取得產品列表
          // 要渲染的資料
          this.getProducts();
          // 所有資料, 以及所有分類
          this.getAllProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchProduct() {
      const result = this.allProducts.filter(product => {
        // 比對標題內容與產品描述對應搜尋關鍵字
        return [product.title, product.content, product.description].toString().match(this.search)
      })
      this.products = result;
      // 搜尋結果暫時先不處理分頁
      this.pagination.total_pages = 1;
      // 清空搜尋欄字串
      this.search = ''
    },
    // 先取得所有商品, 以及所有分類
    getAllProducts() {
      this.axios
        .get(`${host}/v2/api/${path}/admin/products/all`)
        .then((response) => {
          // 存入所有產品
          this.allProducts = Object.values(response.data.products);
          // 取得分類
          this.getCategories();
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
      this.axios
        .get(`${host}/v2/api/${path}/admin/products?page=${page}`)
        .then((response) => {
          console.log(response.data);
          this.products = response.data.products;
          this.pagination = response.data.pagination;
          // console.log(this.pagination);
        })
        .catch((error) => {
          console.log("資料取得失敗");
          console.error(error);
        });
    },
    // 變更分類時取得分類資料 
    getProductsByCategory(category) {
      if (category === "檢視全部") {
        this.getProducts();
      } else {
        this.axios.get(`${host}/v2/api/${path}/admin/products?page=1&category=${category}`)
          .then((response) => {
            console.log(response.data);
            this.products = response.data.products;
            this.pagination = response.data.pagination;
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
        username: "tingyu1112@gmail.com",
        password: "cmbSideProject",
      };
      this.axios
        .post(`${host}/v2/admin/signin`, user)
        .then((res) => {
          const { token, expired } = res.data;
          // 將 token 與 expired 設定好到期時間存入cookie
          document.cookie = `florafirstapi=${token}; expired=${new Date(
            expired
          )}; path=/`;
        })
        .catch((error) => {
          console.log("資料取得失敗");
          console.error(error);
        });
    },
    // 取得所有商品後取得所有分類
    getCategories() {
      this.categories = Array.from(
        new Set(this.allProducts.map((item) => item.category))
      );
    },
    // 上一頁
    previousPage() {
      this.pagination.current_page--;
      this.getProducts(this.pagination.current_page);
    },
    // 下一頁
    nextPage() {
      this.pagination.current_page++;
      this.getProducts(this.pagination.current_page);
    },
    goThisPage(page) {
      // console.log(page);
      this.getProducts(page);
    },


    modalShow(product) {
      // this.product = product;
      this.$refs.modal.modalShow(product)
    },
    modalHide() {
      this.productModal.hide();
    },
    getThisProduct(product) {
      this.product = product;
    },

    log() {
      console.log(this);
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
    // 確認登入狀態
    this.checkAdmin();
    // this.testLogin()


    // this.$refs.modal.modalShow()
    // console.log(this.$refs.modal.modalShow());
  },
};
</script>


<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

  <div class="d-flex">
    <!-- 後台側邊欄位, 之後拆元件 -->
    <div>
      {{ text }}
    </div>
    
    <div class="container">
      <div class="row">

        <!-- 搜尋欄, 之後拆 -->
        <div class="col-3 py-3 my-3">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="請輸入搜尋資料" v-model="search" />
            <button type="button" @click="searchProduct()" class="btn btn-outline-success d-flex align-items-center">
              <span class="material-symbols-outlined"> search </span>
            </button>
          </div>
        </div>
        <div class="col-3 py-3 my-3">
          <select class="form-select form-select" aria-label=".form-select-sm example"
            @change="getProductsByCategory($event.target.value)">
            <!-- 設計稿以販售狀態分類, 先改類別 -->
            <option selected>依商品類別檢視</option>
            <option value="檢視全部">檢視全部</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        <div class="col-6 py-3 my-3 text-end">
          <button type="button" class="btn btn-outline-success">
            新增商品
          </button>
        </div>

      </div>
      <div class="border rounded p-3 pb-0 product__list mb-4">
        <!-- 依設計稿調整至顯示三欄 -->
        <div v-for="product in products" :key="product.id" class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4 p-3">
              <!-- 點圖放大 -->
              <a href="#" @click.prevent="modalShow(product), getThisProduct(product)" >
                <img :src="product.imageUrl" class="img-fluid rounded-start" alt="#" />
              </a>
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h5 class="card-title">商品編號 : {{ product.id }}</h5>
                <h5 class="card-title">
                  商品名稱 : {{ product.title }}
                  <span class="badge bg-info text-dark ms-2">{{
                    product.category
                  }}</span>
                </h5>
                <div class="row">
                  <div class="col-6">
                    <div>
                      <p class="card-text mb-2">
                        原價 : {{ product.origin_price }}
                      </p>
                      <p class="card-text mb-2">特價 : {{ product.price }}</p>
                    </div>
                  </div>
                  <div class="col-6">
                    <p class="card-text mb-2">單位 : {{ product.unit }}</p>
                    <p v-if="product.is_enabled === 1" class="card-text mb-2">
                      狀態 : <span class="text-success">販售中</span>
                    </p>
                    <p v-else class="card-text mb-2">
                      狀態 : <span class="text-danger">暫停販售</span>
                    </p>
                  </div>
                </div>
                <p class="card-text mb-2">{{ product.content }}</p>
                <p class="card-text">
                  <strong class="text-muted">{{ product.description }}</strong>
                </p>
              </div>
            </div>
            <div class="col-md-2 py-2">
              <div class="card-footer border-top-0 bg-white text-end">
                <a href="#" class="text-warning" @click.prevent="">
                  <span class="material-symbols-outlined fs-1"> edit </span>
                </a>
                <a href="#" class="text-danger ms-4" @click.prevent="">
                  <span class="material-symbols-outlined fs-1"> delete </span>
                </a>
              </div>
            </div>
          </div>

          
        </div>
      </div>
      
      <!-- modal< 點選圖片放大顯示 -->
      <modal ref="modal">
        <template v-slot:modal-title>
          <h5 class="mb-0">{{ product.title }}</h5>
        </template>
        <template v-slot:modal-body>
          <img class="modal__img" :src="product.imageUrl" alt="#">
        </template>
      </modal>
      
      <!-- 分頁元件, 若是分類結果只有一頁不顯示分頁資訊 -->
      <pagination :pagination="pagination" @emit-pages="getProducts"></pagination>
      
    </div>
  </div>
  
</template>

<style scoped lang="scss">
.main {
  position: absolute;
  width: 70%;
  right: 0%;
  z-index: -1;
  &__bg {
    background:radial-gradient(ellipse at bottom right,
    #E69C7D 0%, white 60%);
    position: absolute;
    width: 100%;
    height: 100vh;
  }
}

::placeholder {
  color: rgb(179, 175, 175);
}

.img-fluid {
  width: 400px;
  height: 180px;
  object-fit: cover; // 或是 contain 但圖會顯小
}

.product__list {
  max-height: 726px;
  overflow: auto;
}

.modal__img{
  max-width: 100%;
  object-fit: contain;
}
</style>
