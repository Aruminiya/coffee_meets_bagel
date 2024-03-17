<script>
import axios from 'axios'
import NavBarComponent from '../../components/NavBarComponent.vue'
import FooterComponent from '../../components/FooterComponent.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Zoom, Pagination, Navigation } from 'swiper/modules'
import ToastComponent from '../../components/ToastComponent.vue'
// pinia
import { mapActions } from 'pinia'
import cartStore from '../../stores/CartStore.js'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/zoom'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const VITE_HEXAPI = import.meta.env.VITE_HEXAPI
const VITE_USER_PATH = import.meta.env.VITE_USER_PATH

export default {
  components: {
    NavBarComponent,
    FooterComponent,
    Swiper,
    SwiperSlide,
    ToastComponent
  },
  data () {
    return {
      product: '',
      isLoading: true,
      productPhoto: [],
      modules: [Zoom, Pagination, Navigation],
      category: '',
      qty: 1,
      relativeProduct: [],
      productName: '',
      showingPhoto: ''
    }
  },
  methods: {
    ...mapActions(cartStore, ['addCarts']),
    reduceQty () {
      if (this.qty > 1) {
        this.qty--
      }
    },
    addQty () {
      this.qty++
    },
    add (id, qty) {
      this.addCarts(id, qty)
      this.qty = 1
      this.$refs.toastRef.toastShow()
    },
    fetchRelativeProducts () {
      axios.get(`${VITE_HEXAPI}/v2/api/${VITE_USER_PATH}/products?category=${this.category}`)
        .then((res) => {
          res.data.products.forEach((item) => {
            if (this.product.id !== item.id) {
              this.relativeProduct.push(item)
            }
          })
        })
    },
    reload () {
      this.isLoading = true
      setTimeout(() => {
        location.reload()
        this.isLoading = false
      }, 500)
    },
    showPhoto (url) {
      this.showingPhoto = url
    }
  },
  created () {
    const id = this.$route.params.id
    axios.get(`${VITE_HEXAPI}/v2/api/${VITE_USER_PATH}/product/${id}`)
      .then((res) => {
        this.product = res.data.product
        this.productName = res.data.product.title
        this.showingPhoto = res.data.product.imageUrl
        this.isLoading = false
        this.category = this.product.category
        this.product.imagesUrl.forEach((item) => {
          if (item !== '') {
            this.productPhoto.push(item)
          };
        })
        this.productPhoto.reverse()
        this.fetchRelativeProducts()
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

</script>

<template>
  <NavBarComponent></NavBarComponent>
  <LaodingOverlay :active="isLoading" />
    <div class="container">
      <ToastComponent ref='toastRef' ></ToastComponent>
      <nav aria-label="breadcrumb" class="pt-3">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
      <router-link to="/">首頁</router-link>
          </li>
    <li class="breadcrumb-item"><router-link :to="`/productList?category=${category}`">
      {{category}}</router-link></li>
    <li class="breadcrumb-item active">{{productName}}</li>
  </ol>
</nav>
      <div class="row ">
        <div class="col-lg-6">
          <swiper
    :slidesPerView="1"
    :zoom="true"
    :spaceBetween="50"
    :loop="true"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper  d-none d-lg-block"
  >
    <swiper-slide v-for='item in productPhoto' :key='item' class='d-flex mx-2 p-4 ps-0'>
    <img :src='item' class="w-100" style="height:400px; object-fit:cover; border-radius:24px">
    <div class='d-flex flex-column justify-content-between mb-3'></div>
    </swiper-slide>
  </swiper>

        </div>
        <div class="col-lg-6 p-4 d-flex flex-column justify-content-between" >
          <div >
            <h1><i class="fa-solid fa-crown me-1 text-warning" v-show="product.is_recommend==1"></i>{{product.title}}</h1>
            <div  class="d-flex flex-column w-100">
            <img :src='showingPhoto' class="d-lg-none " style="border-radius:24px; height:400px; object-fit:cover">
            <div class="d-flex justify-content-start">
              <button @click='showPhoto(item)' v-for='item in productPhoto' :key='item'
              title='查看照片'
              class="border-0 bg-transparent">
              <img :src='item'
              class="d-lg-none py-2 " style="border-radius:24px; width:100px">
              </button>
            </div>
            </div>
            <p class="h5 mt-sm-3"> 售價 $ {{product.price}} / {{product.unit}}</p>
            <ul class=' py-3 mt-2 ps-0 mb-0' style="list-style:none;">
              <li><i class="fa-solid fa-mug-hot me-1"></i>{{product.description}}</li>
              <li><i class="fa-solid fa-mug-hot me-1"></i>{{product.content}}</li>
            </ul>
          </div>

            <div class="w-100">
              <p class="h5">選擇數量</p>
              <div class="d-flex my-2 ">
              <button
                type="button"
                class="btn text-light me-2 w-25"
                style="background-color: #ce3f25 "
                @click="reduceQty"
              >
                -
              </button>
              <input
                type="number"
                class="form-control text-center w-50 bg-transparent"
                v-model="qty"
                disabled
              />
              <button
                type="button"
                class="btn text-light ms-2 w-25"
                style="background-color: #ce3f25"
                @click="addQty"
              >
                +
              </button>
              </div><button @click='add(product.id, qty)' class='text-center w-100 btn' style='background-color:#ce3f25'><p class='mb-0 text-light'>
            <i class="fa-solid fa-cart-shopping me-1"></i>
            加入購物車</p></button>
            </div>
        </div>
      </div>

      <p>相關產品</p>
      <swiper :slidesPerView="3"
    :spaceBetween="30"
    :navigation="true"
    :modules="modules"
    class="mySwiper">
   <swiper-slide v-for="item in relativeProduct" :key="item.id">
   <router-link :to="'/productList/'+item.id" title="查看商品" @click='reload'
   style='text-decoration:none'>
   <img :src='item.imageUrl' class="w-100 relativeImg" style="object-fit:cover;border-radius:24px">
     <p class="d-flex justify-content-center">{{item.title}}</p>
     <p class="d-flex justify-content-center">NT$ {{item.price}}</p>
</router-link>
   </swiper-slide>
      </swiper>
    </div>
  <FooterComponent></FooterComponent>
</template>

<style lang='scss'>
.swiper-pagination{
  margin-bottom: 10px ;
}

:root{
  --primary:white;
}
.swiper-pagination-bullet{
  background: var(--primary) !important;
  width:10px;
  opacity: 1 !important;
  transition:0.5s;
 }
 /* 在active的樣式重寫border-radius與padding調整到pill形狀*/
 .swiper-pagination-bullet-active{
  padding:0 8px;
  border-radius: 6px;
  transition:0.5s ;
  width:50px
 }

 .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal {
    bottom: var(--swiper-pagination-bottom, 30px);
    }

  .swiper-button-prev{
    color:#ce3f25;
    --swiper-navigation-size:24px;
    @media (max-width: 991px) {
    display: none;
  }
  }

  .swiper-button-next{
    color:#ce3f25;
    --swiper-navigation-size:24px;
    @media (max-width: 991px) {
    display: none;
  }
  }

  .relativeImg{
    height:300px;
     @media (max-width: 991px) {
    height: 120px;
  }
  }
</style>
