<script>
import NavBarComponent from '../../components/NavBarComponent.vue'
import FooterComponent from '../../components/FooterComponent.vue'

export default {
  components: { NavBarComponent, FooterComponent }
}
</script>

<template>
  <NavBarComponent />
  <div class="container">
    <div class="row">
      <div class="col">
        <main
          class="d-flex flex-column flex-lg-row justify-content-center align-items-center"
        >
          <div>
            <h1 class="d-none d-md-block">404 未找到頁面</h1>
            <h2 class="d-block d-md-none">404 未找到頁面</h2>
            <br />
            <h6>很抱歉，我們無法找到您所要求的頁面。</h6>
            <h6>這可能是由於鏈接已過期、頁面已移除，或者您輸入的網址有誤。</h6>
            <h6>請嘗試以下方法：</h6>
            <ol>
              <li>檢查您的網址是否正確輸入。</li>
              <li>
                返回<router-link to="/" class="text">首頁</router-link
                >，然後尋找您需要的內容。
              </li>
              <li>
                如果您認為這是我們的錯誤，請聯繫我們，我們將竭誠為您服務。
              </li>
            </ol>
            <h6>謝謝您的理解與支持。</h6>
          </div>

          <img
            class="img-fluid"
            src="../../../public/404Icon.gif"
            alt="404Icon"
            width="500"
            height="500"
          />
          <!-- <img
            class="img-fluid"
            src="https://github.com/Aruminiya/coffee_meets_bagel/blob/main/public/404Icon.gif?raw=true"
            alt="404Icon"
            width="500"
            height="500"
          /> -->
        </main>
      </div>
    </div>
  </div>

  <FooterComponent />
</template>

<style lang="scss" scoped>
h1,
h2,
h3,
h4,
h5,
h6,
p,
li {
  color: $colorChart-Accessory-200;
}
text {
  border: solid 1px;
  color: $colorChart-Logo-Red;
}

h1 {
  font-size: 60px;
}

main {
  height: 100vh;
}
</style>
