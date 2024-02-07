<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import HomePageNavBarComponent from "../../components/HomePageNavBarComponent.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    HomePageNavBarComponent,
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
  <HomePageNavBarComponent />
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="block_01 col-12 p-0">
          <div
            class="d-flex flex-column justify-content-end justify-content-md-center banner"
          >
            <div class="bannerWord position-relative">
              <h1 class="title">Coffee meets Bagel</h1>
              <h2 class="subtitle">品味烘焙藝術的奇妙交融</h2>
              <h2 class="subtitle">共譜美好早晨的詩篇</h2>
              <router-link to="/productList">
                <button class="bannerBtn btn btn-primary">
                  <a
                    href="productList.vue"
                    style="text-decoration: none"
                    class="text-light"
                  >
                    免排隊，立即預定點餐 <i class="bi bi-arrow-right"></i>
                  </a>
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="block_02 col-12 col-md-5 p-0 d-flex flex-column justify-content-center align-items-center position-relative"
        >
          <br />
          <div class="title d-flex align-items-center position-absolute">
            <hr class="wordDash" />
            <div>
              <h1 class="m-0 d-none d-lg-block">本日推薦</h1>
              <h3 class="m-0 d-md-block d-lg-none">本日推薦</h3>
            </div>

            <hr class="wordDash" />
          </div>
          <div class="px-0 pt-5 p-sm-3">
            <img
              class="img-fluid"
              src="../../../public/TodayRecommendation.gif"
              alt="TodayRecommendation"
            />
          </div>
        </div>
        <div class="col-12 col-md-7 p-0">
          <div class="h-100 d-flex flex-column justify-content-between">
            <div
              class="RecommendationImg Img_01 d-flex justify-content-center align-items-center"
            >
              <div
                class="my-5 text h-100 d-flex flex-column justify-content-center align-items-center"
              >
                <h2 class="m-2">今日的特選咖啡</h2>
                <p class="m-0">彷彿是陽光和微風的交織，溫暖中帶點清新。</p>
                <p class="m-0">讓這杯獨特的風味，陪伴你的美好一天。</p>
              </div>
            </div>
            <div
              class="RecommendationImg Img_02 d-flex justify-content-center align-items-center"
            >
              <div
                class="my-5 text h-100 d-flex flex-column justify-content-center align-items-center"
              >
                <h2 class="m-2">挑戰你的味蕾</h2>
                <p class="m-0">今日的推薦咖啡散發出濃郁的巧克力風味，</p>
                <p class="m-0">讓你感受咖啡的甜蜜誘惑。</p>
              </div>
            </div>
            <div
              class="RecommendationImg Img_03 d-flex justify-content-center align-items-center"
            >
              <div
                class="my-5 text h-100 d-flex flex-column justify-content-center align-items-center"
              >
                <h2 class="m-2">新鮮水果拿鐵</h2>
                <p class="m-0">清爽的果香與濃郁咖啡的結合，</p>
                <p class="m-0">讓你感受到夏日的微涼和愉悅。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="block_03 col-12 p-0">
          <swiper
            :spaceBetween="0"
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
              ><div
                class="swiperImg_01 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
              >
                <div class="swiperText py-4 px-3 position-relative">
                  <img
                    class="symbol position-absolute"
                    src="../../../public/symbol.svg"
                    alt="symbol"
                  />
                  <div class="d-none d-sm-block">
                    <h1>品味匠心 獨享醇香</h1>
                    <h1>選豆用心 品味獨運</h1>
                  </div>
                  <div class="d-block d-sm-none">
                    <h3>品味匠心 獨享醇香</h3>
                    <h3>選豆用心 品味獨運</h3>
                  </div>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide
              ><div
                class="swiperImg_02 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
              >
                <div class="swiperText py-4 px-3 position-relative">
                  <img
                    class="symbol position-absolute"
                    src="../../../public/symbol.svg"
                    alt="symbol"
                  />
                  <div class="d-none d-sm-block">
                    <h1>經典滋味 每杯獨特</h1>
                    <h1>心選豆香 獨享匠心</h1>
                  </div>
                  <div class="d-block d-sm-none">
                    <h3>經典滋味 每杯獨特</h3>
                    <h3>心選豆香 獨享匠心</h3>
                  </div>
                </div>
              </div></swiper-slide
            >
            <swiper-slide
              ><div
                class="swiperImg_03 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
              >
                <div class="swiperText py-4 px-3 position-relative">
                  <img
                    class="symbol position-absolute"
                    src="../../../public/symbol.svg"
                    alt="symbol"
                  />
                  <div class="d-none d-sm-block">
                    <h1>專注豆香 感受獨特</h1>
                    <h1>滋味匠心 每杯精選</h1>
                  </div>
                  <div class="d-block d-sm-none">
                    <h3>專注豆香 感受獨特</h3>
                    <h3>滋味匠心 每杯精選</h3>
                  </div>
                </div>
              </div></swiper-slide
            >
          </swiper>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
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
.RecommendationImg {
  height: 100%;
  &.Img_01 {
    background-image: url("../../../public/RecommendationImg_01.png");
    background-size: cover; /* 調整背景圖片大小以填充容器 */
    background-position: center; /* 調整背景圖片位置至中 */
    background-repeat: no-repeat; /* 避免背景圖片重複 */
  }
  &.Img_02 {
    background-image: url("../../../public/RecommendationImg_02.png");
    background-size: cover; /* 調整背景圖片大小以填充容器 */
    background-position: center; /* 調整背景圖片位置至中 */
    background-repeat: no-repeat; /* 避免背景圖片重複 */
  }
  &.Img_03 {
    background-image: url("../../../public/RecommendationImg_03.png");
    background-size: cover; /* 調整背景圖片大小以填充容器 */
    background-position: center; /* 調整背景圖片位置至中 */
    background-repeat: no-repeat; /* 避免背景圖片重複 */
  }
  .text {
    letter-spacing: 1px;
    color: $colorChart-Gray-100;
  }
}

.swiper {
  width: 100%;
  height: 960px;
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

.swiper-button-prev {
  width: 40px;
  height: 40px;
  background-image: url("../../../public/lastPageBtn.svg");
  background-size: contain; /* 調整背景圖片大小以填充容器 */
  background-position: center; /* 調整背景圖片位置至中 */
  background-repeat: no-repeat; /* 避免背景圖片重複 */
  &::after {
    content: " ";
  }
}
.swiper-button-next {
  width: 40px;
  height: 40px;
  background-image: url("../../../public/nextPageBtn.svg");
  background-size: contain; /* 調整背景圖片大小以填充容器 */
  background-position: center; /* 調整背景圖片位置至中 */
  background-repeat: no-repeat; /* 避免背景圖片重複 */
  &::after {
    content: " ";
  }
}

.swiper-pagination-bullets {
  display: none;
}

.swiperImg_01 {
  background-image: url("../../../public/swiperImg_01.png");
}
.swiperImg_02 {
  background-image: url("../../../public/swiperImg_02.png");
}
.swiperImg_03 {
  background-image: url("../../../public/swiperImg_03.png");
}
.swiperText {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
  color: $colorChart-Accessory-200;
  .symbol {
    width: 81px;
    height: 57px;
    top: -30px;
    left: -40px;
  }
  h1,
  h3 {
    font-weight: 700;
  }
}
</style>
