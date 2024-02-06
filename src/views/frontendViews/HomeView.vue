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
    <div class="container-fluid">
      <div class="row block_01">
        <div class="col-12 p-0">
          <div
            class="d-flex flex-column justify-content-end justify-content-md-center banner"
          >
            <div class="bannerWord position-relative">
              <h1 class="title">Coffee meets Bagel</h1>
              <h2 class="subtitle">品味烘焙藝術的奇妙交融</h2>
              <h2 class="subtitle">共譜美好早晨的詩篇</h2>
              <button class="bannerBtn btn btn-primary">
                免排隊，立即預定點餐 <i class="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row block_02">
        <div
          class="col-5 p-0 d-flex flex-column justify-content-center align-items-center position-relative"
        >
          <br />
          <div class="title d-flex align-items-center position-absolute">
            <hr class="wordDash" />
            <h1 class="m-0">本日推薦</h1>
            <hr class="wordDash" />
          </div>
          <div class="p-5">
            <img
              class="img-fluid"
              src="../../../public/TodayRecommendation.gif"
              alt=""
            />
          </div>
        </div>
        <div class="col-7 p-0">
          <div class="d-flex flex-column justify-content-between h-100">
            <div class="h-100 d-flex justify-content-center align-items-center">
              區塊1
            </div>
            <div class="h-100 d-flex justify-content-center align-items-center">
              區塊2
            </div>
            <div class="h-100 d-flex justify-content-center align-items-center">
              區塊3
            </div>
          </div>
        </div>
      </div>
    </div>
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
.banner {
  width: 100%; /* 假設容器寬度為 300 像素 */
  aspect-ratio: 1920 / 896; /* 假設你的圖片高度與寬度的比例為 4:3 */
  background-image: url("../../../public/Banner.png");
  background-size: cover; /* 調整背景圖片大小以填充容器 */
  background-position: right; /* 調整背景圖片位置至中 */
  background-repeat: no-repeat; /* 避免背景圖片重複 */
  left: 180px;
  .bannerBtn {
    padding: 1rem 3rem;
    border-color: $colorChart-Primary-200;
    background-color: $colorChart-Primary-200;
    &:hover {
      border-color: darken($colorChart-Primary-200, 10%);
      background-color: darken($colorChart-Primary-200, 10%);
    }
  }
  .bannerWord {
    left: 180px;
    .title {
      font-size: 54px;
      font-family: "Poppins", sans-serif;
      font-weight: 800;
      color: $colorChart-Accessory-200;
    }
    .subtitle {
      font-size: 48px;
      font-weight: 700;
      letter-spacing: 2px;
      color: $colorChart-Gray-500;
    }
  }

  @media screen and (max-width: 1400px) {
    .bannerWord {
      left: 150px;
      .title {
        font-size: 42px;
        letter-spacing: 2px;
      }
      .subtitle {
        font-size: 37px;
      }
    }
  }
  @media screen and (max-width: 1200px) {
    .bannerWord {
      left: 100px;
    }
  }
  @media screen and (max-width: 992px) {
    aspect-ratio: 1920 / 1080;
    .bannerWord {
      left: 100px;
      .title {
        font-size: 36px;
      }
      .subtitle {
        font-size: 32px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    background-image: url("../../../public/BannerPhone.png");
    aspect-ratio: 768 / 1000;

    .bannerWord {
      left: 30px;
      bottom: 100px;
      .title {
        font-size: 36px;
      }
      .subtitle {
        font-size: 32px;
      }
    }
  }
  @media screen and (max-width: 456px) {
    .bannerWord {
      left: 10px;
      bottom: 50px;
      .title {
        font-size: 24px;
        letter-spacing: 0px;
      }
      .subtitle {
        font-size: 24px;
        letter-spacing: 0px;
      }
      .bannerBtn {
        font-size: 16px;
        padding: 0.5rem 1.5rem;
      }
    }
  }
}

.block_02 {
  background-color: $colorChart-bg-color;
  max-height: 1080px;
  color: $colorChart-Accessory-200;
  .title {
    top: 3rem;
    .wordDash {
      border: solid 1px $colorChart-Accessory-200;
      border-radius: 0.5rem;
      opacity: 1;
      width: 60px;
    }
  }
}

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
