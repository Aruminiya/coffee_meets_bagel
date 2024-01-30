<script>
import OrderCheckProgressComponent from "../components/OrderCheckProgressComponent.vue";
import CartItemComponent from "../components/CartItemComponent.vue";
import OrderCheckFormComponent from "../components/OrderCheckFormComponent.vue";
import ModalComponent from "../components/ModalComponent.vue";

// pinia
import { mapState, mapActions } from "pinia";
import cartStore from "../stores/CartStore.js";

export default {
  components: {
    OrderCheckProgressComponent,
    CartItemComponent,
    OrderCheckFormComponent,
    ModalComponent,
  },
  data() {
    return {
      item: {},
      couponCode: "",
    };
  },
  computed: {
    ...mapState(cartStore, [
      "data",
      "couponData",
      "isCartsLoading",
      "useCouponPrice",
    ]),
  },
  methods: {
    ...mapActions(cartStore, ["getCarts", "deleteCarts", "useCoupon"]),
    cartItemClicked(item) {
      // 點擊的商品資料給 this.item
      this.item = item;
      // 然後 modalComponent 打開 可以讀到 this.item
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
              v-for="item in data.carts"
              :key="item.id"
            >
              <!-- 購物車商品卡片元件 item 是 props 傳入商品物件 -->
              <CartItemComponent
                :item="item"
                @cartItemClicked="cartItemClicked(item)"
                @deleteItemClicked="deleteCarts(item)"
              />
            </div>
            <div v-if="this.data.carts">
              <h5>
                合計：
                <span
                  :class="{
                    'text-decoration-line-through':
                      data.total !== data.final_total,
                  }"
                >
                  NT${{ data.total }}
                </span>
                &nbsp;
                <span v-if="data.total !== data.final_total">
                  NT${{ data.final_total }}
                </span>
              </h5>
              <p v-if="couponData.data?.success === true">
                {{ couponData.data?.message }}
              </p>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': couponData.data?.success === false }"
                  placeholder="請輸入優惠券代碼"
                  aria-label="請輸入優惠券代碼"
                  aria-describedby="button-addon2"
                  ref="couponCodeInput"
                  v-model="couponCode"
                />
                <button
                  class="btn btn-primary"
                  type="button"
                  id="button-addon2"
                  @click="useCoupon(couponCode)"
                  :disabled="false"
                >
                  Button
                </button>
              </div>

              <!-- 因為 couponData.data.message 一開始沒東西 所以要加 ?. -->
              <p
                v-if="couponData.data?.success === false"
                :class="{ 'text-danger': couponData.data?.success === false }"
              >
                {{ couponData.data?.message }}
              </p>
            </div>
          </div>
        </div>
        <!-- 訂購表單 -->
        <div class="col-lg-6 col-12 p-5">
          <div>
            <h3>填寫訂購資訊</h3>
            <OrderCheckFormComponent />
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
