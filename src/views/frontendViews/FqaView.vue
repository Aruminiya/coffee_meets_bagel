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
        <h1>#常見問題</h1>
        <h2>FQA</h2>
      </div>
    </section>

    <div class="FQA container-fluid">
      <div class="row">
        <div class="col-12 my-3">
          <div class="QA container p-5">
            <h5>Q.「Coffee meets Bagel」的名稱有特殊的涵義嗎？</h5>
            <br />
            <h5>
              A.
              是的，我們的名稱反映了我們獨特的理念。「Coffee」象徵著我們對美味咖啡的熱情，而「Bagel」則代表著融合多種元素的完美組合。我們致力於為您帶來美好的咖啡體驗，同時打造一個充滿活力的社群。
            </h5>
          </div>
        </div>
        <div class="col-12 my-3">
          <div class="QA container p-5">
            <h5>Q. 「Coffee meets Bagel」的咖啡豆來自何處？</h5>
            <br />
            <h5>
              A.
              我們嚴選高品質的咖啡豆，來自全球不同的咖啡產地。我們的目標是為您呈現最新鮮且獨特風味的咖啡。
            </h5>
          </div>
        </div>
        <div class="col-12 my-3">
          <div class="QA container p-5">
            <div>
              <h5>Q. 有提供非咖啡飲品選擇嗎？</h5>
              <br />
              <h5>
                A.
                是的，我們了解每位顧客的口味獨特。除了精選咖啡外，還提供各種茶品和其他飲品選擇，以迎合不同的喜好。
              </h5>
            </div>
          </div>
        </div>
        <div class="col-12 my-3">
          <div class="QA container p-5">
            <div>
              <h5>Q. 是否有定期的活動或特別優惠？</h5>
              <br />
              <h5>
                A.
                是的，我們定期舉辦活動和特別優惠，讓您嘗試新口味，同時感受「Coffee
                meets Bagel」獨特氛圍。關注我們的網站或社群媒體以獲取最新資訊。
              </h5>
            </div>
          </div>
        </div>
        <div class="col-12 p-0">
          <div
            class="container d-flex justify-content-center align-items-center"
          >
            <img
              class="img-fluid"
              src="../../../public/CoffeeMaker.gif"
              alt="CoffeeMaker"
            />
            <!-- <img
              class="img-fluid"
              src="https://github.com/Aruminiya/coffee_meets_bagel/blob/main/public/CoffeeMaker.gif?raw=true"
              alt="CoffeeMaker"
            /> -->
          </div>
        </div>
      </div>
    </div>
  </main>
  <FooterComponent />
</template>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 100vh;
  h1 {
    margin: 1px;
    font-size: 72px;
    color: $colorChart-Gray-600;
  }
  h2 {
    margin: 1px;
    color: $colorChart-Gray-600;
  }
  p {
    color: $colorChart-Gray-600;
    max-width: 600px;
  }
}
.text {
  //   text-shadow: 3px 3px 15px rgba(0, 0, 0, 0.322);
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
.section1 {
  background-image: url("../../../public/FAQ_01.png");
  // background-image: url("https://i.imgur.com/864oX3J.png");
  background-repeat: no-repeat;
  background-attachment: fixed; //最關鍵的參數
  background-position: center center;
  background-size: cover;
  @media screen and (max-width: 576px) {
    background-image: url("../../../public/FAQ_Phone_01.png");
    // background-image: url("https://i.imgur.com/IzU3sjn.png");
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

.FQA {
  background-image: url("../../../public/BG_01.png");
  // background-image: url("https://i.imgur.com/RWJATLm.png");
  background-size: cover;
  background-position: center;
  .QA {
    background-color: $colorChart-Gray-100;
    border-radius: 1rem;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.041);
    transition: transform 0.2s ease-in-out;
    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
