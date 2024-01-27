<script>
import OrderCheckProgressComponent from "../components/OrderCheckProgressComponent.vue";
import CartItemComponent from "../components/CartItemComponent.vue";
import ModalComponent from "../components/ModalComponent.vue";

// 把需要的語系 驗證 驗證規則引入

import * as VeeValidate from "vee-validate";
import * as VeeValidateI18n from "@vee-validate/i18n";
import * as VeeValidateRules from "@vee-validate/rules";

// 表單驗證規則全部引入使用
Object.keys(VeeValidateRules).forEach((rule) => {
  VeeValidate.defineRule(rule, VeeValidateRules[rule]);
});

// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL("../assets/zh_TW.json");
// // Activate the locale
// VeeValidate.configure({
//   generateMessage: VeeValidateI18n.localize('zh_TW'),
//   validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
// });

// pinia
import { mapState, mapActions } from "pinia";
import cartStore from "../stores/CartStore.js";

export default {
  components: {
    OrderCheckProgressComponent,
    CartItemComponent,
    ModalComponent,
  },
  data() {
    return {
      item: {},
    };
  },
  computed: {
    ...mapState(cartStore, ["carts", "isCartsLoading"]),
  },
  methods: {
    ...mapActions(cartStore, ["getCarts", "deleteCarts"]),
    cartItemClicked(item) {
      this.item = item;
      console.log(item);
      this.$refs.modalComponent.modalShow();
    },
  },
  mounted() {
    // 先取得購物車資訊
    this.getCarts();
  },
};
</script>

<template>
  <main>
    <!-- 進度條元件 step 是 props 傳入當前第幾步驟 -->
    <OrderCheckProgressComponent :step="1" />

    <section class="container">
      <div class="row">
        <div class="col-lg-6 col-12 p-5">
          <div>
            <h3>確認購物車內容</h3>
            <h4 v-if="isCartsLoading">Loading...</h4>
            <div
              v-else
              class="cartProductInfo position-relative"
              v-for="item in carts"
              :key="item.id"
            >
              <!-- 購物車商品卡片元件 item 是 props 傳入商品物件 -->
              <CartItemComponent
                :item="item"
                @cartItemClicked="cartItemClicked(item)"
                @deleteItemClicked="deleteCarts(item)"
              />
            </div>
          </div>
        </div>
        <!-- 訂購表單 -->
        <div class="col-lg-6 col-12 p-5">
          <div>
            <h3>填寫訂購資訊</h3>
            <form>
              <div class="orderFrom p-5 rounded shadow-sm">
                <label for="email">電子信箱:</label>
                <input
                  class="form-control"
                  type="email"
                  id="email"
                  name="email"
                  required
                /><br />
                <label for="name">姓名:</label>
                <input
                  class="form-control"
                  type="text"
                  id="name"
                  name="name"
                  required
                /><br />
                <label for="phone">電話:</label>
                <input
                  class="form-control"
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                /><br />
                <label for="address">住址:</label>
                <input
                  class="form-control"
                  type="text"
                  id="address"
                  name="address"
                  required
                /><br />
                <label for="comments">備註:</label>
                <textarea
                  class="form-control"
                  id="comments"
                  name="comments"
                  rows="4"
                  cols="50"
                  style="resize: none"
                ></textarea>
              </div>
              <br />
              <button type="button" class="btn btn-dark w-100">
                <h5 class="m-1">送出資訊</h5>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!--Modal-->
    <ModalComponent ref="modalComponent">
      <!-- 這邊要用 ?. 是因為 最一開始 selectProduct 是沒資料的 所以一開始直接讀取 selectProduct.product.title 會噴錯 所以 用 ?. 來預防噴錯 -->
      <template v-slot:modal-title>{{ item.product?.title }}</template>
      <template v-slot:modal-body>{{ item }}</template>
      <template v-slot:modal-footer>按鈕區</template>
    </ModalComponent>
  </main>
</template>

<style lang="scss" scoped>
.cartProductInfo {
  cursor: pointer;
}
.imgContainer {
  width: 120px;
  height: 120px;
}
</style>
