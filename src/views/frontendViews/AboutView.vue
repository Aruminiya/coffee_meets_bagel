<script>
import HomePageNavBarComponent from '../../components/HomePageNavBarComponent.vue'
import FooterComponent from '../../components/FooterComponent.vue'

export default {
  components: { HomePageNavBarComponent, FooterComponent }
}
</script>

<template>
  <HomePageNavBarComponent />
  <main>
    <section class="section1 position-relative">
      <div
        class="text px-2 position-absolute d-flex flex-column justify-content-center align-items-start"
      >
        <h1>#關於我們</h1>
        <h2>About Us</h2>
      </div>
    </section>
    <section class="section2 position-relative">
      <div
        class="text px-2 position-absolute d-flex flex-column justify-content-center align-items-end"
      >
        <h1>咖啡熱情之旅</h1>
        <p>
          在「Coffee meets
          Bagel」，我們追求的不僅僅是一杯咖啡，更是一場熱情洋溢的旅程。每一杯咖啡都是由我們的咖啡師傅用心調製而成，融合藝術和熱情，成就您咖啡體驗的絕妙時刻。
        </p>
      </div>
    </section>
    <section class="section3 position-relative">
      <div
        class="text px-2 position-absolute d-flex flex-column justify-content-center align-items-start"
      >
        <h1>每口都是匠心之選</h1>
        <p>
          在這裡，我們將咖啡製作提升至一種藝術。從咖啡豆的挑選，到烘焙的過程，每一個步驟都是細緻入微的工藝。我們追求的是完美，而這種追求使每一口都成為匠心之選。
        </p>
      </div>
    </section>
    <section class="section4 position-relative">
      <div
        class="text px-2 position-absolute d-flex flex-column justify-content-center align-items-end"
      >
        <h1>香氣交會的地方</h1>
        <p>
          「Coffee meets
          Bagel」不僅是一個咖啡館，更是一個讓香氣與氛圍交會的經典場所。無論您是在這裡與朋友閒聊，或是自己靜靜品味一杯咖啡，我們的環境總是充滿著那份特別的溫馨。
        </p>
      </div>
    </section>
    <section class="section5 position-relative">
      <div
        class="text px-2 position-absolute d-flex flex-column justify-content-center align-items-start"
      >
        <h1>不只有咖啡</h1>
        <p>
          我們的故事不僅止於咖啡的製作，更包含了社群的一部分。「Coffee meets
          Bagel」致力於建立一個連結人與人之間的橋樑，透過咖啡和共同的愛好，我們共同書寫著一個充滿交流和分享的社群故事。
        </p>
      </div>
    </section>
  </main>
  <FooterComponent />
</template>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100%;
  overflow: hidden; /* 隱藏垂直滾動條 */
}
.text {
  text-shadow: 3px 3px 15px rgba(0, 0, 0, 0.322);
  h1 {
    font-size: 100px;
    font-weight: 700;
  }
  h2 {
    font-size: 88px;
    font-weight: 700;
  }
  p {
    font-size: 20px;
  }
  @media screen and (max-width: 992px) {
    h1 {
      font-size: 80px;
    }
    h2 {
      font-size: 68px;
    }
    p {
      font-size: 16px;
    }
  }
  @media screen and (max-width: 768px) {
    h1 {
      font-size: 60px;
    }
    h2 {
      font-size: 48px;
    }
  }
  @media screen and (max-width: 576px) {
    h1 {
      font-size: 36px;
    }
    h2 {
      font-size: 32px;
    }
  }
}

section {
  width: 100%;
  height: 100vh;
  h1 {
    margin: 1px;
    font-size: 72px;
    color: white;
  }
  h2 {
    margin: 1px;
    color: white;
  }
  p {
    color: white;
    max-width: 600px;
  }
}

.section1 {
  background-image: url("../../../public/AboutUs_01.png");
  // background-image: url("https://i.imgur.com/Dtp0Xa5.png");
  background-repeat: no-repeat;
  background-attachment: fixed; //最關鍵的參數
  background-position: center center;
  background-size: cover;
  @media screen and (max-width: 576px) {
    background-image: url("../../../public/AboutUs_Phone_01.png");
    // background-image: url("https://i.imgur.com/IO9IiZ5.png");
  }
  .text {
    left: 10vw;
    bottom: 20vh;
    @media screen and (max-width: 576px) {
      left: 5%;
      bottom: 5%;
    }
  }
}
.section2 {
  background-image: url("../../../public/AboutUs_02.png");
  // background-image: url("https://i.imgur.com/14b9P9b.png");
  background-repeat: no-repeat;
  background-attachment: fixed; //最關鍵的參數
  background-position: center center;
  background-size: cover;
  @media screen and (max-width: 576px) {
    background-image: url("../../../public/AboutUs_Phone_02.png");
    // background-image: url("https://i.imgur.com/ozmUrNm.png");
  }
  .text {
    right: 10vw;
    bottom: 10vh;
    @media screen and (max-width: 768px) {
      p {
        max-width: 400px;
      }
    }
    @media screen and (max-width: 576px) {
      right: 0vw;
      bottom: 80vh;
    }
  }
}
.section3 {
  background-image: url("../../../public/AboutUs_03.png");
  // background-image: url("https://i.imgur.com/gZEAKkI.png");
  background-repeat: no-repeat;
  background-attachment: fixed; //最關鍵的參數
  background-position: center center;
  background-size: cover;
  @media screen and (max-width: 576px) {
    background-image: url("../../../public/AboutUs_Phone_03.png");
    // background-image: url("https://i.imgur.com/6WME0Cr.png");
  }
  .text {
    left: 8vw;
    bottom: 10vh;
    @media screen and (max-width: 768px) {
      p {
        max-width: 400px;
      }
    }
    @media screen and (max-width: 576px) {
      left: 0vw;
      bottom: 80vh;
    }
  }
}
.section4 {
  background-image: url("../../../public/AboutUs_04.png");
  // background-image: url("https://i.imgur.com/la2ZhfV.png");
  background-repeat: no-repeat;
  background-attachment: fixed; //最關鍵的參數
  background-position: center center;
  background-size: cover;
  @media screen and (max-width: 576px) {
    background-image: url("../../../public/AboutUs_Phone_04.png");
    // background-image: url("https://i.imgur.com/cUERube.png");
  }
  .text {
    right: 10vw;
    bottom: 10vh;

    p {
      max-width: 750px;
    }
    @media screen and (max-width: 768px) {
      p {
        max-width: 400px;
      }
    }
    @media screen and (max-width: 576px) {
      right: 0vw;
      bottom: 80vh;
    }
  }
}
.section5 {
  background-image: url("../../../public/AboutUs_05.png");
  // background-image: url("https://i.imgur.com/IRj3oPA.png");
  background-repeat: no-repeat;
  background-attachment: fixed; //最關鍵的參數
  background-position: center center;
  background-size: cover;
  @media screen and (max-width: 576px) {
    background-image: url("../../../public/AboutUs_Phone_05.png");
    // background-image: url("https://i.imgur.com/Y0QRIjP.png");
  }
  .text {
    // h1 {
    //   color: $colorChart-Gray-600;
    // }
    // p {
    //   color: $colorChart-Gray-600;
    // }
    left: 8vw;
    bottom: 10vh;
    @media screen and (max-width: 768px) {
      p {
        max-width: 400px;
      }
    }
    @media screen and (max-width: 576px) {
      left: 0vw;
      bottom: 80vh;
    }
  }
}
</style>
