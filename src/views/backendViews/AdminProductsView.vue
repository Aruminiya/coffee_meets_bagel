<script>
import PaginationComponent from '@/components/PaginationComponent.vue'
import BackendOffcanvasNav from '@/components/BackendOffcanvasNav.vue'
import BackendLogoComponent from '@/components/BackendLogoComponent.vue'
import BackendProductsListComponent from '@/components/BackendProductsListComponent.vue'
import BackendNotFoundComponent from '../../components/BackendNotFoundComponent.vue'
import Swal from 'sweetalert2'

const host = import.meta.env.VITE_HEXAPI
const path = import.meta.env.VITE_USER_PATH

export default {
  data () {
    return {
      allProducts: [],
      products: [],
      pagination: {},
      categories: [],
      search: '',
      product: {},
      showCategory: false,
      category: '',
      isLoading: true
    }
  },
  components: {
    PaginationComponent,
    BackendOffcanvasNav,
    BackendLogoComponent,
    BackendProductsListComponent,
    BackendNotFoundComponent
  },
  methods: {
    searchProduct () {
      const result = this.allProducts.filter((product) => {
        // 比對標題內容與產品描述對應搜尋關鍵字
        return [product.title, product.content, product.description]
          .toString()
          .match(this.search)
      })
      // 搜尋結果暫時先不處理分頁, 強制隱藏分頁
      this.pagination = false
      // console.log(result)

      this.products = result
      // 清空搜尋欄字串
      this.search = ''
    },
    // 先取得所有商品, 以及所有分類
    getAllProducts () {
      this.isLoading = true
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
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
          Swal.fire('資料取得失敗, 請重新整理')
        })
    },
    // 預設取得第一頁資料
    getProducts (page = 1) {
      this.isLoading = true
      this.axios
        .get(`${host}/v2/api/${path}/admin/products?page=${page}`)
        .then((response) => {
          this.products = response.data.products
          this.pagination = response.data.pagination
          // 新增自訂屬性判斷是否啟用(避免送出停用時API尚未回傳就直接反應)
          this.products.forEach((item) => {
            item.check_enabled = item.is_enabled
          })
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
          Swal.fire('資料取得失敗, 請重新整理')
        })
    },
    setCategory (category) {
      this.category = category
      this.getProductsByCategory()
    },
    // 變更分類時取得分類資料
    getProductsByCategory (page = 1) {
      if (this.category === '檢視全部') {
        this.showCategory = true
        this.getProducts(1)
      } else {
        this.showCategory = false
        this.isLoading = true
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
            this.isLoading = false
          })
          .catch(() => {
            this.isLoading = false
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
    openOffCanvasNav () {
      this.$refs.backendNav.openNav()
    },
    addNewProduct () {
      this.$router.push('/admin/addProduct')
    }
  },
  computed: {
    getSearch () {
      return this.allProducts.filter((product) => {
        // 比對標題內容與產品描述對應搜尋關鍵字
        return [product.title, product.content, product.description]
          .toString()
          .match(this.search)
      })
    }
  },
  watch: {
    search () {
      if (this.search.trim() !== '') {
        this.pagination = false
      } else {
        this.getProducts()
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
      <BackendLogoComponent :open-off-canvas-nav="openOffCanvasNav" />
      <BackendOffcanvasNav ref="backendNav" />
      <LaodingOverlay :active="isLoading" />
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
            <option disabled>依商品類別檢視</option>
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
        <div v-if="search === ''">
          <BackendProductsListComponent :products="products" />
        </div>
        <div v-else>
          <BackendProductsListComponent v-if="products.length === 0" :products="getSearch" />
          <div v-else>
            <BackendNotFoundComponent />
          </div>
        </div>
      </div>

      <!-- 分頁元件, 若是分類結果只有一頁不顯示分頁資訊 -->
      <div v-if="pagination">
        <PaginationComponent v-if="showCategory" :pagination="pagination" @emit-pages="getProducts" />
        <PaginationComponent v-else :pagination="pagination" @emit-pages="getProductsByCategory" />
      </div>
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
</style>
