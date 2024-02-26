<script>
const host = import.meta.env.VITE_HEXAPI;
const path = import.meta.env.VITE_USER_PATH;

import modal from '../../components/ModalShowImgComponent..vue';
import pagination from '../../components/PaginationComponent.vue';
import adminNav from '../../components/BackendOffcanvasNav.vue';
import adminLogo from '../../components/BackendLogoComponent.vue';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      text: "純測試",
      allProducts: [],
      products: [],
      pagination: {},
      categories: [],
      search: '',
      product: {},
    };
  },
  components: {
    pagination,
    modal,
    adminNav,
    adminLogo,
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
          Swal.fire({
            title: "登入驗證失敗, 請重新登入",
            confirmButtonText: "Save",
          }).then((result) => {
            // 驗證失敗轉回登入頁面(未完成), 目前先轉回首頁
            this.$router.push("/");
          });
        });
    },
    searchProduct() {
      const result = this.allProducts.filter((product) => {
        // 比對標題內容與產品描述對應搜尋關鍵字
        return [product.title, product.content, product.description]
          .toString()
          .match(this.search);
      });
      this.products = result;
      // 搜尋結果暫時先不處理分頁
      this.pagination.total_pages = 1;
      // 清空搜尋欄字串
      this.search = "";
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
        .catch(() => {
          Swal.fire("資料取得失敗");
        });
    },
    // 預設取得第一頁資料
    getProducts(page = 1) {
      this.axios
        .get(`${host}/v2/api/${path}/admin/products?page=${page}`)
        .then((response) => {
          this.products = response.data.products;
          this.pagination = response.data.pagination;
        })
        .catch(() => {
          Swal.fire("資料取得失敗");
        });
    },
    // 變更分類時取得分類資料
    getProductsByCategory(category) {
      if (category === "檢視全部") {
        this.getProducts();
      } else {
        this.axios
          .get(
            `${host}/v2/api/${path}/admin/products?page=1&category=${category}`
          )
          .then((response) => {
            this.products = response.data.products;
            this.pagination = response.data.pagination;
          })
          .catch(() => {
            Swal.fire("取得產品分類失敗");
          });
      }
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
      this.getProducts(page);
    },
    deleteProduct(id) {
      this.axios
        .delete(`${host}/v2/api/${path}/admin/product/${id}`)
        .then((res) => {
          Swal.fire("刪除成功");
          this.getProducts();
        })
        .catch((error) => {
          Swal.fire("資料刪除失敗");
        });
    },
    confirmDelete(id) {
      Swal.fire({
        title: "您確定要刪除嗎?",
        showCancelButton: true,
        cancelButtonText: "返回商品列表",
        cancelButtonColor: "#d33",
        confirmButtonText: "確定刪除",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProduct(id);
        }
      });
    },
    modalShow(product) {
      this.$refs.modal.modalShow(product)
    },
    modalHide() {
      this.productModal.hide();
    },
    getThisProduct(product) {
      this.product = product;
    },
    openOffCanvasNav() {
      this.$refs.backendNav.openNav();
    },
    addNewProduct() {
      this.$router.push("/admin/addProduct");
    },
    changeEnabledProduct(product) {
      if (product.is_enabled === 1) {
        product.is_enabled = 0;
      } else {
        product.is_enabled = 1;
      }
      const data = { ...product };
      this.axios
        .put(`${host}/v2/api/${path}/admin/product/${product.id}`, { data })
        .then((res) => {
          this.enableMessage(product.is_enabled);
        }).catch(() => {
          // 如果錯誤產品啟用狀態恢復原值
          if (product.is_enabled === 1) {
            product.is_enabled = 0
          } else {
            product.is_enabled = 1
          }
          Swal.fire("產品編輯失敗");
        });
    },
    enableMessage(is_enabled) {
      if (is_enabled === 1) {
        Swal.fire({
          title: "系統訊息",
          text: "產品已啟用",
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "系統訊息",
          text: "產品已停用",
          icon: "warning"
        });
      }
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
  },
};
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
        <div class="col-3 mt-3 p-3">
          <h2 class="text-primary mb-0">商品列表</h2>
        </div>
        <div class="col-3 py-3 my-3">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="請輸入搜尋資料"
              v-model="search"
            />
            <button
              type="button"
              @click="searchProduct()"
              class="btn btn-outline-success d-flex align-items-center"
            >
              <span class="material-symbols-outlined"> search </span>
            </button>
          </div>
        </div>
        <div class="col-3 py-3 my-3">
          <select
            class="form-select form-select"
            aria-label=".form-select-sm example"
            @change="getProductsByCategory($event.target.value)"
          >
            <!-- 設計稿以販售狀態分類, 先改類別 -->
            <option selected>依商品類別檢視</option>
            <option value="檢視全部">檢視全部</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
        <div class="col-3 py-3 my-3 text-end">
          <button
            type="button"
            class="btn btn-outline-success"
            @click="addNewProduct"
          >
            新增商品
            <span class="material-symbols-outlined align-middle">add</span>
          </button>
        </div>
      </div>
      <div class="border rounded p-3 pb-0 product__list mb-8">
        <!-- 依設計稿調整至顯示三欄 -->
        <div v-for="product in products" :key="product.id" class="card mb-3">
          <div class="row g-0 position-relative">
            <!-- 主廚推薦的符號 -->
            <div v-if="product.is_recommend && product.is_enabled" class="position-absolute rotate">
              <i class="fa-solid fa-crown me-1 text-warning rotate__star" aria-hidden="true"></i>
            </div>
            <div class="col-md-4 p-3">
              <!-- 點圖放大 -->
              <a href="#" @click.prevent="modalShow(product), getThisProduct(product)">
                <img :src="product.imageUrl" class="img-fluid rounded-start"
                  :class="{ 'product__disable': product.is_enabled !== 1 }" alt="#" />
              </a>
            </div>
            <div class="col-md-6" :class="{ 'product__disable': product.is_enabled !== 1 }">
              <div class="card-body">
                <h5 class="card-title">商品編號 : {{ product.id }}</h5>
                <h5 class="card-title">
                  商品名稱 : {{ product.title }}
                  <span class="badge bg-info text-dark ms-2">{{
                    product.category
                  }}</span>
                  <span class="fs-6 ms-4 mb-2 fw-normal"
                    >單位 : {{ product.unit }}</span
                  >
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
                    <p class="card-text mb-2">{{ product.content }}</p>
                    <p v-if="product.is_enabled !== 1" class="card-text mb-2 text-danger">
                      <span data-v-ad3f08d1="" class="material-symbols-outlined align-middle ">cancel</span>
                      此商品已停售
                    </p>
                  </div>
                </div>
                <p class="card-text">
                  <strong class="text-muted">{{ product.description }}</strong>
                </p>
              </div>
            </div>

            <div class="col-md-2 py-2">
              <div
                class="card-footer border-top-0 bg-white d-flex flex-column align-items-end"
              >
                <div class="mb-3">
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="changeEnabledProduct(product)"
                    v-if="product.is_enabled !== 1"
                  >
                    商品啟用
                    <span class="material-symbols-outlined align-middle"
                      >check_circle</span
                    >
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    v-else
                    @click="changeEnabledProduct(product)"
                  >
                    停止販售
                    <span class="material-symbols-outlined align-middle"
                      >cancel</span
                    >
                  </button>
                </div>
                <div class="mb-3">
                  <router-link
                    :to="`/admin/adminProducts/${product.id}`"
                    v-if="product.is_enabled === 1"
                  >
                    <button type="button" class="btn btn-outline-warning">
                      編輯商品
                      <span class="material-symbols-outlined align-middle">
                        edit
                      </span>
                    </button>
                  </router-link>
                  <button
                    type="button"
                    class="btn btn-outline-warning"
                    disabled
                    v-else
                  >
                    編輯商品
                    <span class="material-symbols-outlined align-middle">
                      edit
                    </span>
                  </button>
                </div>
                <div class="mb-3">
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click.prevent="confirmDelete(product.id)"
                  >
                    刪除商品
                    <span class="material-symbols-outlined align-middle">
                      delete
                    </span>
                  </button>
                </div>
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
          <img class="modal__img" :src="product.imageUrl" alt="#" />
        </template>
      </modal>

      <!-- 分頁元件, 若是分類結果只有一頁不顯示分頁資訊 -->
      <pagination :pagination="pagination" @emit-pages="getProducts"></pagination>
    </div>
  </div>
</template>

<style scoped lang="scss">
::placeholder {
  color: rgb(179, 175, 175);
}

.img-fluid {
  width: 400px;
  height: 180px;
  object-fit: cover;
}

.product__list {
  max-height: 708px;
  overflow: auto;
}

.modal__img {
  max-width: 100%;
  object-fit: contain;
}

.rotate {
  left: 20px;
  top: 18px;
  width: fit-content;

  ::after {
    content: "店長推薦";
    font-size: 16px;
    position: absolute;
    color: #8d2b19;
    top: 36px;
    right: 20px;
    width: 36px;
  }

  &__star {
    transform: rotate(-30deg);
    font-size: 72px;
    color: gold;
  }
}

.product__disable {
  opacity: 0.6;
}
</style>
