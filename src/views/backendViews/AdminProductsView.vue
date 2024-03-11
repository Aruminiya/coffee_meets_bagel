<script>
import modal from '../../components/ModalShowImgComponent..vue'
import pagination from '../../components/PaginationComponent.vue'
import adminNav from '../../components/BackendOffcanvasNav.vue'
import adminLogo from '../../components/BackendLogoComponent.vue'
import Swal from 'sweetalert2'

const host = import.meta.env.VITE_HEXAPI
const path = import.meta.env.VITE_USER_PATH

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  }
})

export default {
  data () {
    return {
      text: '純測試',
      allProducts: [],
      products: [],
      pagination: {},
      categories: [],
      search: '',
      product: {},
      showCategory: false,
      category: ''
    }
  },
  components: {
    pagination,
    modal,
    adminNav,
    adminLogo
  },
  methods: {
    searchProduct () {
      const result = this.allProducts.filter((product) => {
        // 比對標題內容與產品描述對應搜尋關鍵字
        return [product.title, product.content, product.description]
          .toString()
          .match(this.search)
      })
      this.products = result
      // 搜尋結果暫時先不處理分頁
      this.pagination.total_pages = 1
      // 清空搜尋欄字串
      this.search = ''
    },
    // 先取得所有商品, 以及所有分類
    getAllProducts () {
      this.axios
        .get(`${host}/v2/api/${path}/admin/products/all`)
        .then((response) => {
          // 存入所有產品
          this.allProducts = Object.values(response.data.products)
          this.allProducts.forEach((item) => {
            item.check_enabled = item.is_enabled
          })
          // 取得分類
          this.getCategories()
          // 取完所有資料再取要渲染的資料
          this.getProducts()
        })
        .catch(() => {
          Swal.fire('資料取得失敗')
        })
    },
    // 預設取得第一頁資料
    getProducts (page = 1) {
      this.axios
        .get(`${host}/v2/api/${path}/admin/products?page=${page}`)
        .then((response) => {
          this.products = response.data.products
          this.pagination = response.data.pagination
          // 新增自訂屬性判斷是否啟用(避免送出停用時API尚未回傳就直接反應)
          this.products.forEach((item) => {
            item.check_enabled = item.is_enabled
          })
        })
        .catch(() => {
          Swal.fire('資料取得失敗')
        })
    },
    setCategory (category) {
      this.category = category
      this.getProductsByCategory()
    },
    // 變更分類時取得分類資料
    getProductsByCategory (page = 1) {
      if (this.category === '檢視全部') {
        this.getProducts(1)
      } else {
        this.axios
          .get(
            `${host}/v2/api/${path}/admin/products?page=${page}&category=${this.category}`
          )
          .then((response) => {
            this.products = response.data.products
            this.pagination = response.data.pagination
            this.products.forEach((item) => {
              item.check_enabled = item.is_enabled
            })
          })
          .catch(() => {
            Swal.fire('取得產品分類失敗')
          })
      }
    },
    // 取得所有商品後取得所有分類
    getCategories () {
      this.categories = Array.from(
        new Set(this.allProducts.map((item) => item.category))
      )
    },
    // 上一頁
    previousPage () {
      this.pagination.current_page--
      this.getProducts(this.pagination.current_page)
    },
    // 下一頁
    nextPage () {
      this.pagination.current_page++
      this.getProducts(this.pagination.current_page)
    },
    goThisPage (page) {
      this.getProducts(page)
    },
    deleteProduct (id) {
      this.axios
        .delete(`${host}/v2/api/${path}/admin/product/${id}`)
        .then((res) => {
          Swal.fire('刪除成功')
          this.getProducts()
        })
        .catch(() => {
          Swal.fire('資料刪除失敗')
        })
    },
    confirmDelete (id) {
      Swal.fire({
        title: '您確定要刪除嗎?',
        showCancelButton: true,
        cancelButtonText: '返回商品列表',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定刪除'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProduct(id)
        }
      })
    },
    modalShow (product) {
      this.$refs.modal.modalShow(product)
    },
    modalHide () {
      this.productModal.hide()
    },
    getThisProduct (product) {
      this.product = product
    },
    openOffCanvasNav () {
      this.$refs.backendNav.openNav()
    },
    addNewProduct () {
      this.$router.push('/admin/addProduct')
    },
    changeEnabledProduct (product) {
      if (product.is_enabled === 1) {
        product.is_enabled = 0
      } else {
        product.is_enabled = 1
      }
      const data = { ...product }
      this.axios
        .put(`${host}/v2/api/${path}/admin/product/${product.id}`, { data })
        .then((res) => {
          this.enableMessage(product.is_enabled)
          // 成功回傳修改狀態後再改變css樣式
          product.check_enabled = product.is_enabled
        }).catch(() => {
          // 如果錯誤產品啟用狀態恢復原值
          if (product.is_enabled === 1) {
            product.is_enabled = 0
          } else {
            product.is_enabled = 1
          }
          Swal.fire('產品編輯失敗')
        })
    },
    enableMessage (isEnabled) {
      if (isEnabled === 1) {
        Toast.fire({
          icon: 'success',
          title: '系統訊息 - 產品已啟用'
        })
      } else {
        Toast.fire({
          icon: 'warning',
          title: '系統訊息 - 產品已停用'
        })
      }
    }
  },
  mounted () {
    // 要渲染的資料
    this.getProducts()
    // 所有資料, 以及所有分類
    this.getAllProducts()
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
          <h2 class="text-primary mb-0">商品列表</h2>
        </div>
        <div class="col-3 py-3">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="請輸入搜尋資料" v-model="search" />
            <button type="button" @click="searchProduct()" class="btn btn-outline-primary d-flex align-items-center">
              <span class="material-symbols-outlined"> search </span>
            </button>
          </div>
        </div>
        <div class="col-3 py-3">
          <select class="form-select form-select" aria-label=".form-select-sm example"
            @change="setCategory($event.target.value)">
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
        <div class="col-3 py-3 text-end">
          <button type="button" class="btn btn-outline-success" @click="addNewProduct">
            新增商品
            <span class="material-symbols-outlined align-middle">add</span>
          </button>
        </div>
      </div>
      <div class="border rounded p-3 pb-0 mb-8">
        <div v-for="product in products" :key="product.id" class="card mb-3">
          <div class="row g-0 position-relative">
            <!-- 主廚推薦的符號 -->
            <div v-if="product.is_recommend && product.check_enabled" class="position-absolute rotate">
              <i class="fa-solid fa-crown me-1 text-warning rotate__star" aria-hidden="true"></i>
            </div>
            <div class="col-md-4 p-3">
              <!-- 點圖放大 -->
              <a href="#" @click.prevent="modalShow(product), getThisProduct(product)">
                <img :src="product.imageUrl" class="img-fluid rounded-start"
                  :class="{ 'product__disable': product.check_enabled !== 1 }" alt="#" />
              </a>
            </div>
            <div class="col-md-6" :class="{ 'product__disable': product.check_enabled !== 1 }">
              <div class="card-body">
                <h5 class="card-title">商品編號 : {{ product.id }}</h5>
                <h5 class="card-title">
                  商品名稱 : {{ product.title }}
                  <span class="badge bg-primary ms-2">{{ product.category }}</span>
                  <span class="fs-6 ms-4 mb-2 fw-normal">單位 : {{ product.unit }}</span>
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
                    <p v-if="product.check_enabled !== 1" class="card-text mb-2 text-danger">
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
                  <router-link :to="`/admin/adminProducts/${product.id}`" v-if="product.is_enabled === 1">
                    <button type="button" class="btn btn-outline-primary">編輯商品
                      <span class="material-symbols-outlined align-middle"> edit </span>
                    </button>
                  </router-link>
                  <button type="button" class="btn btn-outline-primary" disabled v-else>編輯商品
                    <span class="material-symbols-outlined align-middle"> edit </span>
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
        <template v-slot:modal-body>
          <img class="modal__img" :src="product.imageUrl" alt="#" />
        </template>
      </modal>
      <!-- 分頁元件, 若是分類結果只有一頁不顯示分頁資訊 -->
      <pagination v-if="showCategory" :pagination="pagination" @emit-pages="getProducts"></pagination>
      <pagination v-else :pagination="pagination" @emit-pages="getProductsByCategory"></pagination>
    </div>
  </div>
</template>

<style scoped lang="scss">
::placeholder {
  color: rgb(179, 175, 175);
}

.container {
  margin-top: 90px;
}

.img-fluid {
  width: 400px;
  height: 180px;
  object-fit: cover;
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
