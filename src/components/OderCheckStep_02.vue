<script>
import CartItemComponent from '../components/CartItemComponent.vue'

// pinia
import { mapState, mapActions } from 'pinia'
import cartStore from '../stores/CartStore.js'
import orderStore from '../stores/OrderStore.js'

export default {
  components: {
    CartItemComponent
  },
  data () {
    return {
      item: {},
      personInfo: ''
    }
  },
  computed: {
    ...mapState(cartStore, [
      'data',
      'couponData',
      'isCartsLoading',
      'useCouponPrice'
    ]),
    ...mapState(orderStore, ['orderEstablished'])
  },
  methods: {
    ...mapActions(cartStore, ['getCarts', 'deleteCarts', 'useCoupon']),
    ...mapActions(orderStore, ['orderCheckout']),
    toNextStep () {
      this.$router.push('/orderCheckView/step3')
    }
  },
  mounted () {
    // console.log(this.orderEstablished);
    // 先取得購物車資訊
    this.getCarts()
    // 取得上一步驟在 localStorage 存放的使用者資料
    this.personInfo = JSON.parse(localStorage.getItem('personInfo'))
  },
  watch: {
    // orderEstablished(newVal, oldVal) {
    //   if (newVal) {
    //     this.$router.push("/orderCheckView/step3");
    //   }
    // },
  }
}
</script>

<template>
  <section class="container">
    <div class="row">
      <div class="col-lg-6 col-12 p-5">
        <div>
          <h3>訂單內容 <span class="text-danger">(未成立)</span></h3>
          <div
            v-if="isCartsLoading"
            class="loading d-flex justify-content-center align-items-center h-100"
          >
            <img
              src="../../public/LoadingIcon.gif"
              alt="LoadingIcon"
              width="100"
              height="100"
            />
          </div>
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
        <div class="orderInfo shadow-sm p-5 position-relative">
          <p>Email <br />{{ personInfo.data?.user?.email }}</p>
          <p>姓名 <br />{{ personInfo.data?.user?.name }}</p>
          <p>電話 <br />{{ personInfo.data?.user?.tel }}</p>
          <p>住址<br />{{ personInfo.data?.user?.address }}</p>
          <p>
            備註<br /><span class="text-br">{{
              personInfo.data?.message
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
        <button
          class="btn btn-primary w-100"
          @click="orderCheckout(personInfo, toNextStep)"
        >
          送出訂單
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
h1,
h2,
h3,
h4,
h5,
h6,
p {
  color: $colorChart-Accessory-200;
}
input {
  color: $colorChart-Accessory-200;
  border: solid 1px $colorChart-Accessory-200;
  background-color: transparent;
  &:focus {
    border-color: $colorChart-Accessory-200; /* 替換為你想要的邊框顏色 */
    box-shadow: 0 0 0px $colorChart-Primary-200; /* 替換為你想要的陰影效果 */
    background-color: transparent;
  }
}
.btn {
  background-color: $colorChart-Logo-Red;
  border-color: $colorChart-Logo-Red;
  &:hover {
    background-color: darken($colorChart-Logo-Red, 10%);
    border-color: darken($colorChart-Logo-Red, 10%);
  }
  &:active {
    background-color: darken($colorChart-Logo-Red, 10%);
    border-color: darken($colorChart-Logo-Red, 10%);
  }
}
.btn02 {
  background-color: $colorChart-Primary-100;
  border-color: $colorChart-Primary-100;
}
.is-invalid {
  border-color: $colorChart-Primary-200; /* 替換為你想要的邊框顏色 */
  box-shadow: 10 10 0px $colorChart-Primary-200; /* 替換為你想要的陰影效果 */
  &:focus {
    border-color: $colorChart-Primary-200;
  }
}
.orderInfo {
  background-color: $colorChart-Gray-100;
  border-radius: 8px;
}
// 讓 /n 文字換行
.text-br {
  white-space: pre-line;
}
</style>
