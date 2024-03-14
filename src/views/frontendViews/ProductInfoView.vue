<script>
import axios from 'axios'
import NavBarComponent from '../../components/NavBarComponent.vue'
import FooterComponent from '../../components/FooterComponent.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Zoom, Pagination } from 'swiper/modules'

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
    SwiperSlide
  },
  data () {
    return {
      product: null,
      isLoading: true,
      productPhoto: [],
      modules: [Zoom, Pagination]
    }
  },
  created () {
    console.log(this.$route.params.id)
    const id = this.$route.params.id
    axios.get(`${VITE_HEXAPI}/v2/api/${VITE_USER_PATH}/product/${id}`)
      .then((res) => {
        console.log(res)
        this.product = res.data.product
        this.isLoading = false
        console.log(this.product.imagesUrl)
        this.product.imagesUrl.forEach((item) => {
          if (item !== '') {
            this.productPhoto.push(item)
          };
          console.log(this.productPhoto)
        })
      })
  }
}

</script>

<template>
  <NavBarComponent></NavBarComponent>
  <LaodingOverlay :active="isLoading" />
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item">
      <router-link to="/">首頁</router-link>
    </li>
    <li class="breadcrumb-item"><router-link :to="`/productList?category=${product.category}`">
      {{product.category}}</router-link></li>
    <li class="breadcrumb-item active">{{product.title}}</li>
  </ol>
</nav>
          <swiper
    :slidesPerView="1"
    :zoom="true"
    :spaceBetween="50"
    :loop="true"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper py-3 d-none d-lg-block"
  >
    <swiper-slide v-for='item in productPhoto' :key='item' class='d-flex mx-2 p-3 '>
    <img :src='item' class="w-100" style="height:400px; object-fit:cover">
    <div class='d-flex flex-column justify-content-between mb-3'></div>
    </swiper-slide>
  </swiper>

        </div>
        <div class="col-lg-6">
          <h1>{{product.title}}</h1>
        </div>
      </div>
    </div>

  <FooterComponent/>

</template>

<style lang='scss'>
.swiper-pagination{
  margin-bottom: 10px ;
}

:root{
  --primary:#8d2b19;
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
</style>
