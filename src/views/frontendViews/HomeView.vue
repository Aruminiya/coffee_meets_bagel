<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import HomePageNavBarComponent from '../../components/HomePageNavBarComponent.vue'
import FooterComponent from '../../components/FooterComponent.vue'

export default {
  components: {
    Swiper,
    SwiperSlide,
    HomePageNavBarComponent,
    FooterComponent
  },
  data () {
    return {
      test: '歡迎來到首頁',
      modules: [Autoplay, Pagination, Navigation],
      // 這邊是給 SwiperSlide 的 slidesPerView 判斷用的
      windowInnerWidth: window.innerWidth
    }
  },
  computed: {
    slidesPerViewData () {
      return this.windowInnerWidth >= 1200
        ? 5
        : this.windowInnerWidth >= 768
          ? 3
          : 1
    },
    initialSlideData () {
      return this.windowInnerWidth >= 1200
        ? 2
        : this.windowInnerWidth >= 768
          ? 1
          : 0
    }
  },
  mounted () {
    console.log(this.test)
  }
}
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
            <div class="bannerWord position-relative d-flex flex-column">
              <h1 class="title">Coffee meets Bagel</h1>
              <h2 class="subtitle">品味烘焙藝術的奇妙交融</h2>
              <h2 class="subtitle">共譜美好早晨的詩篇</h2>
              <router-link to="/productList">
                <button class="bannerBtn btn btn-primary">
                  免排隊，立即預定點餐 <i class="bi bi-arrow-right"></i>
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
            <!-- <img
              class="img-fluid"
              src="https://i.imgur.com/7jl1CcH.gif"
              alt="TodayRecommendation"
            /> -->
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
                <p class="m-0 font-weight-400">
                  彷彿是陽光和微風的交織，溫暖中帶點清新。
                </p>
                <p class="m-0 font-weight-400">
                  讓這杯獨特的風味，陪伴你的美好一天。
                </p>
              </div>
            </div>
            <div
              class="RecommendationImg Img_02 d-flex justify-content-center align-items-center"
            >
              <div
                class="my-5 text h-100 d-flex flex-column justify-content-center align-items-center"
              >
                <h2 class="m-2">挑戰你的味蕾</h2>
                <p class="m-0 font-weight-400">
                  今日的推薦咖啡散發出濃郁的巧克力風味，
                </p>
                <p class="m-0 font-weight-400">讓你感受咖啡的甜蜜誘惑。</p>
              </div>
            </div>
            <div
              class="RecommendationImg Img_03 d-flex justify-content-center align-items-center"
            >
              <div
                class="my-5 text h-100 d-flex flex-column justify-content-center align-items-center"
              >
                <h2 class="m-2">新鮮水果拿鐵</h2>
                <p class="m-0 font-weight-400">清爽的果香與濃郁咖啡的結合，</p>
                <p class="m-0 font-weight-400">讓你感受到夏日的微涼和愉悅。</p>
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
      <div class="row">
        <div class="block_04 col-12 py-3">
          <div class="Img_01">
            <div class="imgContainer h-100 position-relative">
              <img
                class="position-absolute"
                src="../../../public/ChunkIllustration_01.png"
                alt="ChunkIllustration_01"
              />
              <!-- <img
                class="position-absolute"
                src="https://i.imgur.com/XEYweQ2.png"
                alt="ChunkIllustration_01"
              /> -->
            </div>
          </div>
          <div class="Img_02">
            <div class="imgContainer h-100 position-relative">
              <img
                class="position-absolute"
                src="../../../public/ChunkIllustration_02.png"
                alt="ChunkIllustration_02"
              />
              <!-- <img
                class="position-absolute"
                src="https://i.imgur.com/iJOEVl9.png"
                alt="ChunkIllustration_02"
              /> -->
            </div>
          </div>
          <div class="Img_03">
            <div class="imgContainer h-100 position-relative">
              <img
                class="position-absolute"
                src="../../../public/ChunkIllustration_03.png"
                alt="ChunkIllustration_03"
              />
              <!-- <img
                class="position-absolute"
                src="https://i.imgur.com/o3PlSC3.png"
                alt="ChunkIllustration_03"
              /> -->
            </div>
          </div>
          <div class="Img_04">
            <div class="imgContainer h-100 position-relative">
              <img
                class="position-absolute"
                src="../../../public/ChunkIllustration_04.png"
                alt="ChunkIllustration_04"
              />
              <!-- <img
                class="position-absolute"
                src="https://i.imgur.com/ulSCWZz.png"
                alt="ChunkIllustration_04"
              /> -->
            </div>
          </div>
          <div class="Img_05">
            <div class="imgContainer h-100 position-relative">
              <img
                class="position-absolute"
                src="../../../public/ChunkIllustration_05.png"
                alt="ChunkIllustration_05"
              />
              <!-- <img
                class="position-absolute"
                src="https://i.imgur.com/gsJdCTC.png"
                alt="ChunkIllustration_05"
              /> -->
            </div>
          </div>
          <div class="Img_06">
            <div class="imgContainer h-100 position-relative">
              <img
                class="position-absolute"
                src="../../../public/ChunkIllustration_06.png"
                alt="ChunkIllustration_06"
              />
              <!-- <img
                class="position-absolute"
                src="https://i.imgur.com/l7skU1v.png"
                alt="ChunkIllustration_06"
              /> -->
            </div>
          </div>
        </div>
      </div>
      <div class="block_05_BG row">
        <div
          class="block_05 col-12 p-0 d-flex flex-column justify-content-center align-items-center position-relative"
        >
          <div class="title d-flex align-items-center m-5">
            <hr class="wordDash" />
            <div>
              <h1 class="titleWord m-0 d-none d-lg-block">系列餐品</h1>
              <h3 class="titleWord m-0 d-md-block d-lg-none">系列餐品</h3>
            </div>

            <hr class="wordDash" />
          </div>
        </div>
        <div class="block_05 col-12">
          <swiper
            ref="{swiperRef}"
            :slidesPerView="slidesPerViewData"
            :centeredSlides="true"
            :spaceBetween="30"
            :pagination="{
              type: 'fraction',
            }"
            :initialSlide="initialSlideData"
            :navigation="true"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide>
              <router-link to="/productList?category=蛋糕"
                ><div class="mealsImg d-flex flex-column rounded p-3">
                  <img
                  class="rounded"
                  src="../../../public/Meals_01.png"
                  alt="Meals_01"
                />
                  <!-- <img
                    class="rounded"
                    src="https://i.imgur.com/ba6FLIF.png"
                    alt="Meals_01"
                  /> -->
                  <h4 class="m-2">蛋糕</h4>
                </div></router-link
              >
            </swiper-slide>
            <swiper-slide>
              <router-link to="/productList?category=輕食"
                ><div class="mealsImg d-flex flex-column rounded p-3">
                  <img
                  class="rounded"
                  src="../../../public/Meals_02.png"
                  alt="Meals_02"
                />
                  <!-- <img
                    class="rounded"
                    src="https://i.imgur.com/PIOORf4.png"
                    alt="Meals_02"
                  /> -->
                  <h4 class="m-2">輕食</h4>
                </div></router-link
              >
            </swiper-slide>
            <swiper-slide>
              <router-link to="/productList?category=飲品"
                ><div class="mealsImg d-flex flex-column rounded p-3">
                  <img
                  class="rounded"
                  src="../../../public/Meals_03.png"
                  alt="Meals_03"
                />
                  <!-- <img
                    class="rounded"
                    src="https://i.imgur.com/lo0fMay.png"
                    alt="Meals_03"
                  /> -->
                  <h4 class="m-2">飲品</h4>
                </div></router-link
              >
            </swiper-slide>
            <swiper-slide>
              <router-link to="/productList?category=餅乾"
                ><div class="mealsImg d-flex flex-column rounded p-3">
                  <img
                  class="rounded"
                  src="../../../public/Meals_04.png"
                  alt="Meals_04"
                />
                  <!-- <img
                    class="rounded"
                    src="https://i.imgur.com/taoGjCY.png"
                    alt="Meals_04"
                  /> -->
                  <h4 class="m-2">餅乾</h4>
                </div></router-link
              >
            </swiper-slide>
            <swiper-slide>
              <router-link to="/productList?category=鬆餅"
                ><div class="mealsImg d-flex flex-column rounded p-3">
                  <img
                  class="rounded"
                  src="../../../public/Meals_05.png"
                  alt="Meals_05"
                />
                  <!-- <img
                    class="rounded"
                    src="https://i.imgur.com/VPTtiiR.png"
                    alt="Meals_05"
                  /> -->
                  <h4 class="m-2">鬆餅</h4>
                </div></router-link
              >
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </main>
  <FooterComponent />
</template>

<style lang="scss">
.banner {
  width: 100%; /* 假設容器寬度為 300 像素 */
  aspect-ratio: 1920 / 896; /* 假設你的圖片高度與寬度的比例為 4:3 */
  // background-image: url("https://i.imgur.com/zyX1TRR.png");
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
    width: 80%;
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
    // background-image: url("https://i.imgur.com/D8Qdiao.png");
    background-size: cover; /* 調整背景圖片大小以填充容器 */
    background-position: center; /* 調整背景圖片位置至中 */
    background-repeat: no-repeat; /* 避免背景圖片重複 */
    transition: background-size 0.2s ease-in-out; /* 添加動畫效果 */
  }
  &.Img_02 {
    background-image: url("../../../public/RecommendationImg_02.png");
    // background-image: url("https://i.imgur.com/8G5A8WC.png");
    background-size: cover; /* 調整背景圖片大小以填充容器 */
    background-position: center; /* 調整背景圖片位置至中 */
    background-repeat: no-repeat; /* 避免背景圖片重複 */
  }
  &.Img_03 {
    background-image: url("../../../public/RecommendationImg_03.png");
    // background-image: url("https://i.imgur.com/XgVbAhP.png");
    background-size: cover; /* 調整背景圖片大小以填充容器 */
    background-position: center; /* 調整背景圖片位置至中 */
    background-repeat: no-repeat; /* 避免背景圖片重複 */
  }
  .text {
    letter-spacing: 1px;
    color: $colorChart-Gray-100;
  }
}

.block_04 {
  background-color: $colorChart-bg-color;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "Img01 Img02 Img02"
    "Img03 Img03 Img04"
    "Img05 Img06 Img04";
  gap: 16px;

  .Img_01 {
    grid-area: Img01;
    .imgContainer {
      background-image: url("../../../public/ChunkImg_01.png");
      // background-image: url("https://i.imgur.com/tNSLfzc.png");
      background-size: cover; /* 調整背景圖片大小以填充容器 */
      background-position: center; /* 調整背景圖片位置至中 */
      background-repeat: no-repeat; /* 避免背景圖片重複 */
      overflow: hidden;
      border-radius: 16px;
      img {
        width: 100%;
        height: 100%;
        object-position: center;
        object-fit: cover;
        &:hover {
          transition: opacity 0.2s; /* 添加過渡效果 */
          opacity: 0;
        }
      }
      @media screen and (max-width: 768px) {
        background-image: url("../../../public/ChunkImg_Phone_01.png");
        // background-image: url("https://i.imgur.com/NsfSbBp.png");
      }
    }
  }
  .Img_02 {
    grid-area: Img02;
    .imgContainer {
      background-image: url("../../../public/ChunkImg_02.png");
      // background-image: url("https://i.imgur.com/sJ0cIWj.png");
      background-size: cover; /* 調整背景圖片大小以填充容器 */
      background-position: center; /* 調整背景圖片位置至中 */
      background-repeat: no-repeat; /* 避免背景圖片重複 */
      overflow: hidden;
      border-radius: 16px;
      img {
        width: 100%;
        height: 100%;
        object-position: center;
        object-fit: cover;
        &:hover {
          transition: opacity 0.2s; /* 添加過渡效果 */
          opacity: 0;
        }
      }
      @media screen and (max-width: 768px) {
        background-image: url("../../../public/ChunkImg_Phone_02.png");
        // background-image: url("https://i.imgur.com/T4srQ5N.png");
        img {
          object-position: 76% 50%;
        }
      }
    }
  }
  .Img_03 {
    grid-area: Img03;
    .imgContainer {
      background-image: url("../../../public/ChunkImg_03.png");
      // background-image: url("https://i.imgur.com/RmDqyYJ.png");
      background-size: cover; /* 調整背景圖片大小以填充容器 */
      background-position: 35% 50%; /* 調整背景圖片位置至中 */
      background-repeat: no-repeat; /* 避免背景圖片重複 */
      overflow: hidden;
      border-radius: 16px;
      img {
        width: 100%;
        height: 100%;
        object-position: center;
        object-fit: cover;
        &:hover {
          transition: opacity 0.2s; /* 添加過渡效果 */
          opacity: 0;
        }
      }
      @media screen and (max-width: 768px) {
        background-image: url("../../../public/ChunkImg_Phone_03.png");
        // background-image: url("https://i.imgur.com/b0pJldL.png");
      }
    }
  }
  .Img_04 {
    grid-area: Img04;
    .imgContainer {
      background-image: url("../../../public/ChunkImg_04.png");
      // background-image: url("https://i.imgur.com/sTz6Z7S.png");
      background-size: cover; /* 調整背景圖片大小以填充容器 */
      background-position: center; /* 調整背景圖片位置至中 */
      background-repeat: no-repeat; /* 避免背景圖片重複 */
      overflow: hidden;
      border-radius: 16px;
      img {
        width: 100%;
        height: 100%;
        object-position: center;
        object-fit: cover;
        &:hover {
          transition: opacity 0.2s; /* 添加過渡效果 */
          opacity: 0;
        }
      }
      @media screen and (max-width: 768px) {
        background-image: url("../../../public/ChunkImg_Phone_04.png");
        // background-image: url("https://i.imgur.com/vS1KEzB.png");
      }
    }
  }
  .Img_05 {
    grid-area: Img05;
    .imgContainer {
      background-image: url("../../../public/ChunkImg_05.png");
      // background-image: url("https://i.imgur.com/6fBuCRy.png");
      background-size: cover; /* 調整背景圖片大小以填充容器 */
      background-position: 80% 50%; /* 調整背景圖片位置至中 */
      background-repeat: no-repeat; /* 避免背景圖片重複 */
      overflow: hidden;
      border-radius: 16px;
      img {
        width: 100%;
        height: 100%;
        object-position: center;
        object-fit: cover;
        &:hover {
          transition: opacity 0.2s; /* 添加過渡效果 */
          opacity: 0;
        }
      }
      @media screen and (max-width: 768px) {
        background-image: url("../../../public/ChunkImg_Phone_05.png");
        // background-image: url("https://i.imgur.com/LEVBKda.png");
      }
    }
  }
  .Img_06 {
    grid-area: Img06;

    .imgContainer {
      background-image: url("../../../public/ChunkImg_06.png");
      // background-image: url("https://i.imgur.com/UOPuyQo.png");
      background-size: cover; /* 調整背景圖片大小以填充容器 */
      background-position: center; /* 調整背景圖片位置至中 */
      background-repeat: no-repeat; /* 避免背景圖片重複 */
      overflow: hidden;
      border-radius: 16px;
      img {
        width: 100%;
        height: 100%;
        object-position: center;
        object-fit: cover;
        &:hover {
          transition: opacity 0.2s; /* 添加過渡效果 */
          opacity: 0;
        }
      }
      @media screen and (max-width: 768px) {
        background-image: url("../../../public/ChunkImg_Phone_06.png");
        // background-image: url("https://i.imgur.com/2buE3i2.png");
      }
    }
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas:
      "Img01 Img02 "
      "Img03 Img02 "
      "Img03 Img04 "
      "Img03 Img04 "
      "Img05 Img04"
      "Img05 Img06"
      "Img05 Img06";
  }
}

.block_05_BG {
  background-image: url("../../../public/BG_02.png");
  // background-image: url("https://i.imgur.com/Lkjz2C8.png");
  background-size: cover;
  background-position: center;
}
.block_05 {
  // height: 100vh;
  color: $colorChart-Accessory-200;
  .title {
    top: 3rem;
    .wordDash {
      border: solid 1px $colorChart-Accessory-200;
      border-radius: 0.5rem;
      opacity: 1;
      width: 60px;
    }
    .titleWord {
      font-weight: 700;
    }
  }
  .swiper {
    width: 100%;
    height: 70vh;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: transparent;
    a {
      text-decoration: none;
    }
    /*  Center slide text vertically  */
    display: flex;
    justify-content: center;
    align-items: center;
    .mealsImg {
      background-color: $colorChart-Gray-100;
      transition: scale 0.2s ease-in-out;
      cursor: pointer;
      h4 {
        font-weight: 700;
      }
      &:hover {
        scale: 1.05;
      }
    }
  }
}

.swiper {
  width: 100%;
  height: 100vh;
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
  // background-image: url("https://i.imgur.com/v75C8CW.png");
  background-position: center;
  background-size: cover;
}
.swiperImg_02 {
  background-image: url("../../../public/swiperImg_02.png");
  // background-image: url("https://i.imgur.com/4Mn1j19.png");
  background-position: center;
  background-size: cover;
}
.swiperImg_03 {
  background-image: url("../../../public/swiperImg_03.png");
  // background-image: url("https://i.imgur.com/SbNWoSD.png");
  background-position: center;
  background-size: cover;
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
