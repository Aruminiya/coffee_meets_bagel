<script>
import OrderCheckProgressComponent from "../components/OrderCheckProgressComponent.vue";
import CartItemComponent from "../components/CartItemComponent.vue";

// pinia
import { mapState, mapActions } from "pinia";
import cartStore from "../stores/CartStore.js";
import orderStore from "../stores/OrderStore.js";

export default {
  components: {
    OrderCheckProgressComponent,
    CartItemComponent,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(orderStore, ["orderInfo", "isOrderLoading"]),
  },
  methods: {
    ...mapActions(orderStore, ["getOrder"]),
  },
  mounted() {
    //取得上一步驟在 localStorage 存放的使用者資料
    this.getOrder(JSON.parse(localStorage.getItem("orderId")));
  },
};
</script>

<template>
  <section class="container">
    <div class="row">
      <div class="col-lg-6 col-12 p-5">
        <div>
          <h3>訂單內容 <span class="text-success">(已成立)</span></h3>
          <h4 v-if="isOrderLoading">Loading...</h4>
          <div
            v-else
            class="position-relative"
            v-for="item in Object.values(orderInfo.order.products)"
            :key="item.id"
          >
            <!-- 購物車商品卡片元件 item 是 props 傳入商品物件 -->
            <CartItemComponent
              :item="item"
              :editMode="false"
              @cartItemClicked="cartItemClicked(item)"
              @deleteItemClicked="deleteCarts(item)"
            />
          </div>
        </div>
        <h5>付款金額：NT${{ orderInfo.order?.total }}</h5>
      </div>
      <!-- 訂購表單 -->

      <div class="col-lg-6 col-12 p-5">
        <div>
          <h3>訂購資訊</h3>
          <p>Email <br />{{ orderInfo.order?.user?.email }}</p>
          <p>姓名 <br />{{ orderInfo.order?.user?.name }}</p>
          <p>電話 <br />{{ orderInfo.order?.user?.tel }}</p>
          <p>住址<br />{{ orderInfo.order?.user?.address }}</p>
          <p>
            備註<br /><span class="text-br">{{
              orderInfo.order?.message
            }}</span>
          </p>
        </div>
        <div>
          <h4>謝謝您！您的訂單已經成立！ <br />請至櫃檯付款並領取您的餐點</h4>
          <h5>訂單號碼 {{ orderInfo.order?.id }}</h5>
        </div>
        <button class="btn btn-primary w-100">繼續點餐</button>
        <router-link to="/"
          ><button class="btn btn-outline-primary w-100">
            回到首頁
          </button></router-link
        >
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// 讓 /n 文字換行
.text-br {
  white-space: pre-line;
}
</style>
