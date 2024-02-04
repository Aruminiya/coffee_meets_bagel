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
        <h3>訂購資訊</h3>
        <div class="orderInfo shadow-sm p-5 position-relative">
          <p>Email <br />{{ orderInfo.order?.user?.email }}</p>
          <p>姓名 <br />{{ orderInfo.order?.user?.name }}</p>
          <p>電話 <br />{{ orderInfo.order?.user?.tel }}</p>
          <p>住址<br />{{ orderInfo.order?.user?.address }}</p>
          <p>
            備註<br /><span class="text-br">{{
              orderInfo.order?.message
            }}</span>
          </p>
          <img
            class="logoIcon position-absolute end-0 bottom-0 mx-4 my-3"
            src="../../public/coffee_meets_bagel_LogoIcon.svg"
            alt="coffee_meets_bagel_LogoIcon"
            width="75"
            height="59"
          />
        </div>
        <br />
        <div class="orderInfo shadow-sm p-3 position-relative">
          <h5>謝謝您！您的訂單已經成立！ <br />請至櫃檯付款並領取您的餐點</h5>
          <p>訂單號碼 {{ orderInfo.order?.id }}</p>
        </div>
        <br />
        <router-link to="/"
          ><button class="btn btn-primary w-100 m-1">
            繼續點餐
          </button></router-link
        >
        <br />
        <router-link to="/"
          ><button class="btn btn-primary btn02 w-100 m-1">
            回到首頁
          </button></router-link
        >
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.orderInfo {
  background-color: $colorChart-Gray-100;
  border-radius: 8px;
}
// 讓 /n 文字換行
.text-br {
  white-space: pre-line;
}
</style>
