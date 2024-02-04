<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import Test_components_01 from "../../components/Test_components_01.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    Test_components_01,
  },
  data() {
    return {
      test: "歡迎來到首頁",
      modules: [Autoplay, Pagination, Navigation],
    };
  },
  mounted() {
    console.log(this.test);
  },
};
</script>

<template>
  <main>
    <h1>{{ test }}</h1>
    <Test_components_01 />
    <swiper
      :spaceBetween="30"
      :centeredSlides="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide
        ><img src="https://picsum.photos/800/500?seed=1" alt="隨機圖片1"
      /></swiper-slide>
      <swiper-slide
        ><img src="https://picsum.photos/800/500?seed=2" alt="隨機圖片2"
      /></swiper-slide>
      <swiper-slide
        ><img src="https://picsum.photos/800/500?seed=3" alt="隨機圖片3"
      /></swiper-slide>
      <swiper-slide
        ><img src="https://picsum.photos/800/500?seed=4" alt="隨機圖片4"
      /></swiper-slide>
      <swiper-slide
        ><img src="https://picsum.photos/800/500?seed=5" alt="隨機圖片5"
      /></swiper-slide>
      <swiper-slide
        ><img src="https://picsum.photos/800/500?seed=6" alt="隨機圖片6"
      /></swiper-slide>
      <swiper-slide
        ><img src="https://picsum.photos/800/500?seed=7" alt="隨機圖片7"
      /></swiper-slide>
      <swiper-slide
        ><img src="https://picsum.photos/800/500?seed=8" alt="隨機圖片8"
      /></swiper-slide>
      <swiper-slide
        ><img src="https://picsum.photos/800/500?seed=9" alt="隨機圖片9"
      /></swiper-slide>
    </swiper>
  </main>
</template>

<style lang="scss" scoped>
.swiper {
  width: 600px;
  height: 300px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
