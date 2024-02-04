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
    return {
      item: {},
      personInfo: "",
    };
  },
  computed: {
    ...mapState(cartStore, [
      "data",
      "couponData",
      "isCartsLoading",
      "useCouponPrice",
    ]),
    ...mapState(orderStore, ["orderEstablished"]),
  },
  methods: {
    ...mapActions(cartStore, ["getCarts", "deleteCarts", "useCoupon"]),
    ...mapActions(orderStore, ["orderCheckout"]),
  },
  mounted() {
    console.log(this.orderEstablished);
    // 先取得購物車資訊
    this.getCarts();
    //取得上一步驟在 localStorage 存放的使用者資料
    this.personInfo = JSON.parse(localStorage.getItem("personInfo"));
  },
  watch: {
    orderEstablished(newVal, oldVal) {
      if (newVal) {
        this.$router.push("/orderCheckView/step3");
      }
    },
  },
};
</script>

<template>
  <section class="container">
    <div class="row">
      <div class="col-lg-6 col-12 p-5">
        <div>
          <h3>訂單內容 <span class="text-danger">(未成立)</span></h3>
          <h4 v-if="isCartsLoading">Loading...</h4>
          <div
            v-else
            class="position-relative"
            v-for="item in data.carts"
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
            <p v-if="data.total !== data.final_total">您已使用優惠折扣</p>
            <button
              class="btn btn-primary w-100"
              @click="this.$router.push('/orderCheckView/step1')"
            >
              回上一頁
            </button>
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
        <h3>訂購資訊</h3>
        <div>
          <div class="orderInfo shadow-sm p-5">
            <p>Email <br />{{ personInfo.data?.user?.email }}</p>
            <p>姓名 <br />{{ personInfo.data?.user?.name }}</p>
            <p>電話 <br />{{ personInfo.data?.user?.tel }}</p>
            <p>住址<br />{{ personInfo.data?.user?.address }}</p>
            <p>
              備註<br /><span class="text-br">{{
                personInfo.data?.message
              }}</span>
            </p>
          </div>
        </div>
        <br />
        <button
          class="btn btn-primary w-100"
          @click="orderCheckout(personInfo)"
        >
          送出訂單
        </button>
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
