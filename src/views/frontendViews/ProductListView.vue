<script>
import axios from 'axios'
import NavBarComponent from '../../components/NavBarComponent.vue'
import FooterComponent from '../../components/FooterComponent.vue'
import ModalComponent from '../../components/ModalComponent.vue'

// pinia
import { mapState } from 'pinia'
import cartStore from '../../stores/CartStore.js'

const VITE_HEXAPI = import.meta.env.VITE_HEXAPI
const VITE_USER_PATH = import.meta.env.VITE_USER_PATH

export default {
  components: {
    NavBarComponent,
    FooterComponent,
    ModalComponent
  },
  data () {
    return {
      currentCategory: undefined,
      categories: ['飲品', '蛋糕', '餅乾', '輕食'],
      productsList: [],
      modal: null,
      isLoading: true,
      showPagination: false,
      pages: {},
      category: '',
      search: '',
      allProducts: []
    }
  },
  watch: {
    '$route.query': {
      handler () {
        this.getProduct()
      },
      deep: true
    }
  },
  methods: {
    openModal (product) {
      // console.log(product)
      // console.log( this.$refs)
      this.$refs.productDetailModal.modalShow(product)
    },

    getProduct (page = 1) {
      // this.category = e.target.innerHTML
      this.isLoading = true
      this.showPagination = true
      // console.log(this.$route)
      const { category = '' } = this.$route.query
      axios
        .get(
          `${VITE_HEXAPI}/v2/api/${VITE_USER_PATH}/products?category=${category}&page=${page}`
        )
        .then((res) => {
          this.pages = res.data.pagination
          this.productsList = res.data.products
          console.log(this.productsList)
          this.productsList.sort(function (a, b) {
            return a.title.localeCompare(b.title, 'zh-Hans-CN')
          })
          this.isLoading = false
        })
    },
    getAllProduct () {
      this.isLoading = true
      this.showPagination = true
      this.category = '全部'
      // const category = ""
      axios
        .get(`${VITE_HEXAPI}/v2/api/${VITE_USER_PATH}/products/all`)
        .then((res) => {
          this.allProducts = res.data.products
        })
      this.getProduct()
    },

    sortRecommend (e) {
      this.findCategory(e)
      this.isLoading = true
      this.showPagination = false
      axios
        .get(`${VITE_HEXAPI}/v2/api/${VITE_USER_PATH}/products/all`)
        .then((res) => {
          const recommendArr = []
          res.data.products.forEach((item) => {
            if (item.is_recommend === 1) {
              recommendArr.push(item)
            }
            // console.log(recommendArr)
            this.productsList = recommendArr
            // console.log(this.producstList);
            this.productsList.sort(function (a, b) {
              return a.title.localeCompare(b.title, 'zh-Hans-CN')
            })
            this.isLoading = false
          })
        })
    },

    scrollBehavior () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    findCategory (e) {
      this.category = e.target.innerHTML
    }
  },
  computed: {
    ...mapState(cartStore, ['addedToCart']),
    filterProducts () {
      return this.allProducts.filter((item) => {
        // console.log(item);
        return item.title.toLowerCase().match(this.search)
      })
    }
  },
  mounted () {
    this.getProduct()
    this.getAllProduct()
    // console.log(this. allProducts)
    // console.log(this.$router.currentRoute._value.query.category)
    if (this.$router.currentRoute._value.query.category === undefined) {
      // eslint-disable-next-line no-unused-expressions
      this.category === '全部'
    } else {
      this.category = this.$router.currentRoute._value.query.category
      // console.log(this.category);
    }
  }
}
</script>

<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
  />
  <NavBarComponent></NavBarComponent>
  <LaodingOverlay :active="isLoading" />
  <ModalComponent ref="productDetailModal"></ModalComponent>

  <div class="container">
    <nav class="row pt-5 justify-content-md-center">
      <div
        class="dropdown col-lg-4 order-lg-1 order-0 border border-primary rounded-pill d-flex align-items-center"
      >
        <span
          class="material-symbols-outlined ms-3 d-block text-primary"
          style="font-size: 40px"
          >search</span
        >

        <input
          class="w-75"
          id="dropdownMenu2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style="border: none; height: 40px; background-color: transparent"
          placeholder="快速搜尋商品"
          v-model="search"
        />
        <ul
          class="dropdown-menu w-75"
          aria-labelledby="dropdownMenu2"
          v-show="search"
        >
          <li v-if="filterProducts.length == 0">
            <button class="dropdown-item" disabled>查無商品</button>
          </li>
          <li v-for="item in filterProducts" :key="item.id">
            <button
              class="dropdown-item"
              type="button"
              @click="openModal(item)"
            >
              {{ item.title }}
            </button>
          </li>
        </ul>
      </div>
      <div class="tagContainer col-lg-8 order-lg-0 order-1">
        <ul class="tags d-flex flex-wrap ps-0 mb-0 mt-2">
          <li
            style="list-style: none"
            class="tag m-1 d-flex align-items-center"
          >
            <RouterLink
              class="btn btn-primary rounded-pill"
              to="/productList"
              @click="getAllProduct"
              >全部
            </RouterLink>
          </li>

          <li
            style="list-style: none"
            class="tag m-1 d-flex align-items-center"
          >
            <a
              class="btn rounded-pill"
              style="background-color: #712214; color: white"
              @click="sortRecommend($event)"
              >推薦
            </a>
          </li>
          <li
            style="list-style: none"
            class="tag m-1 d-flex align-items-center"
          >
            <RouterLink
              class="btn btn-primary rounded-pill"
              to="/productList?category=輕食"
              @click="findCategory($event)"
            >
              輕食
            </RouterLink>
          </li>

          <li
            style="list-style: none"
            class="tag m-1 d-flex align-items-center"
          >
            <RouterLink
              class="btn btn-primary rounded-pill"
              to="/productList?category=飲品"
              @click="findCategory($event)"
              >飲品
            </RouterLink>
          </li>

          <li
            style="list-style: none"
            class="tag m-1 d-flex align-items-center"
          >
            <RouterLink
              class="btn btn-primary rounded-pill"
              to="/productList?category=蛋糕"
              @click="findCategory($event)"
              >蛋糕
            </RouterLink>
          </li>

          <li
            style="list-style: none"
            class="tag m-1 d-flex align-items-center"
          >
            <RouterLink
              class="btn btn-primary rounded-pill"
              to="/productList?category=餅乾"
              @click="findCategory($event)"
              >餅乾
            </RouterLink>
          </li>

          <li
            style="list-style: none"
            class="tag m-1 d-flex align-items-center"
          >
            <RouterLink
              class="btn btn-primary rounded-pill"
              to="/productList?category=鬆餅"
              @click="findCategory($event)"
              >鬆餅
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
    <div class="row py-5">
      <div class="col-lg-12 d-flex">
        <h1 class="text-primary">{{ category }}</h1>
        <h4 class="d-flex align-items-center text-primary">
          <i class="fa-solid fa-crown me-1 text-warning ms-5"></i>
          店長推薦
        </h4>
      </div>
    </div>
    <div>
      <ul class="row d-flex ps-0 pb-5">
        <li
          v-for="item in productsList"
          :key="item.id"
          class="col-lg-3 col-sm-6 col-12 d-flex justify-content-center productCard mb-5"
          style="list-style: none"
        >
          <div class="card border-0" style="width: 18rem">
            <div class="productsImgContainer">
              <img
                :src="item.imageUrl"
                class="productsImg"
                :alt="item.title"
                style="height: 280px; object-fit: 'none'"
              />
            </div>

            <div class="card-body cardContent">
              <div
                class="d-flex justify-content-between"
                v-if="item.is_recommend"
              >
                <p class="card-text text-primary" style="font-size: 14px">
                  <span
                    ><i class="fa-solid fa-crown me-1 text-warning"></i
                  ></span>
                  {{ item.title }}
                </p>
                <p class="text-primary" style="font-size: 14px">
                  ${{ item.price }}/{{ item.unit }}
                </p>
              </div>
              <div class="d-flex justify-content-between" v-else>
                <p class="card-text text-primary" style="font-size: 14px">
                  {{ item.title }}
                </p>
                <p class="text-primary" style="font-size: 14px">
                  ${{ item.price }}/{{ item.unit }}
                </p>
              </div>
            </div>
            <div class="card-body addToCartBtn">
              <div class="addToCartText" style="height: 80px">
                <p style="font-size: 14px">{{ item.description }}</p>
              </div>
              <button
                class="text-center w-100"
              >
              <router-link :to='`./productList/${item.id}`'
              style='text-decoration:none' >
                <p class="mb-0 text-light">加入購物車</p>
              </router-link>
              </button>
            </div>
          </div>
        </li>
      </ul>

      <nav
        aria-label="Page navigation example"
        class="d-flex justify-content-center"
        v-if="pages.total_pages !== 1 && showPagination == true"
      >
        <ul class="pagination">
          <li
            class="page-item"
            :class="{ disabled: pages.has_pre == false }"
            @click.prevent="getProduct(pages.current_page - 1)"
          >
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              @click="scrollBehavior"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          <li
            class="page-item"
            v-for="page in pages.total_pages"
            :key="page + '123'"
            @click.prevent="getProduct(page)"
          >
            <a
              class="page-link"
              :class="{ 'bg-warning': pages.current_page == page }"
              href="#"
              @click="scrollBehavior"
              >{{ page }}</a
            >
          </li>

          <li
            class="page-item"
            :class="{ disabled: pages.has_next == false }"
            @click.prevent="getProduct(pages.current_page + 1)"
          >
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click="scrollBehavior"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <FooterComponent/>
</template>

<style lang="scss">
.dropdown {
  height: 54px;
}

.tag {
  min-width: 58px;
}

.productsImgContainer {
  width: 100%;
  height: 280px;
  .productsImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.addToCartBtn {
  position: relative;
  z-index: 1;
  height: 70px;
  @media (max-width: 991px) {
    height: 120px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(222, 219, 218, 0.8);
    transform: scaleY(0);
    transition: transform 0.3s ease-in-out;
    z-index: -1;
  }
  button {
    display: block;
    background-color: #4f2413;
    color: #ffffff;
    border: 2px solid transparent;
  }
  @media (min-width: 992px) {
    button {
      display: none;
    }
  }
}

.productCard {
  position: relative;
  .card-body {
    padding: 8px;
  }

  @media (min-width: 992px) {
    .addToCartText {
      display: none;
    }
    &:hover {
      button {
        display: block;
        background-color: #4f2413;
        color: #ffffff;
        border: 2px solid transparent;
      }
      .addToCartText {
        display: block;
      }
      .cardContent {
        display: none;
      }
      .addToCartBtn::before {
        height: 130px;
        margin-top: 0px;
        transform: scaleY(1);
        transform-origin: bottom center;
      }
    }
  }
}

.card{
   @media (max-width: 992px){
     background-color: rgba(222, 219, 218, 0.8);
     padding-bottom:16px;
   }
}
</style>
