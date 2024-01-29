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
    };
  },
  computed: {
    ...mapState(cartStore, ["carts", "isCartsLoading"]),
    getTotal() {
      return this.carts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.total,
        0
      );
    },
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
            <h5 v-if="this.carts.length !== 0">
              合計：<span>NT${{ getTotal }}</span>
            </h5>
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
