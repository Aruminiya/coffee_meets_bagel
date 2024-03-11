<script>
import CartItemComponent from '../components/CartItemComponent.vue'
import OrderCheckFormComponent from '../components/OrderCheckFormComponent.vue'
import ModalComponent from '../components/ModalComponent.vue'

// pinia
import { mapState, mapActions } from 'pinia'
import cartStore from '../stores/CartStore.js'
import couponStore from '../stores/CouponStore.js'

export default {
  components: {
    CartItemComponent,
    OrderCheckFormComponent,
    ModalComponent
  },
  data () {
    return {
      item: {},
      couponCode: ''
    }
  },
  computed: {
    ...mapState(cartStore, ['data', 'isCartsLoading']),
    ...mapState(couponStore, ['couponData', 'couponUsed'])
  },

  methods: {
    ...mapActions(cartStore, ['getCarts', 'editCarts', 'deleteCarts']),
    ...mapActions(couponStore, ['useCoupon']),
    cartItemClicked (item) {
      // 點擊的商品資料給 this.item
      this.item = item
      // 然後 modalComponent 打開 可以讀到 this.item
      this.$refs.modalComponent.modalShow()
    }
  },
  mounted () {
    // 先取得購物車資訊
    this.getCarts()
  },
  watch: {
    data (newVal, oldVal) {
      if (newVal.carts?.length === 0) {
        this.$router.push('/productList')
      }
    }
  }
}
</script>

<template>
  <!-- {{ data.carts?.length ? "是" : "否" }} -->
  <section class="container">
    <div class="row">
      <div class="col-lg-6 col-12 p-5">
        <div>
          <h3>確認購物車內容</h3>
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
            class="cartProductInfo position-relative"
            v-for="item in data.carts"
            :key="item.id"
          >
            <!-- 購物車商品卡片元件 item 是 props 傳入商品物件 -->
            <!-- <CartItemComponent
              :item="item"
              @cartItemClicked="cartItemClicked(item)"
              @deleteItemClicked="deleteCarts(item)"
            /> -->
            <CartItemComponent
              :item="item"
              @deleteItemClicked="deleteCarts(item)"
              @editItemClickedEmit="editCarts($event)"
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
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': couponData.response?.data?.message }"
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
                :disabled="couponUsed"
              >
                送出優惠
              </button>
            </div>
            <!-- 因為 couponData.data.message 一開始沒東西 所以要加 ?. -->
            <p :class="{ 'text-danger': couponData.response?.data?.message }">
              {{ couponData.response?.data?.message }}
            </p>
            <router-link to="/productList"
              ><button class="btn btn-primary btn02 w-100">
                我想再加點
              </button></router-link
            >
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
.cartProductInfo {
  cursor: pointer;
}
.imgContainer {
  width: 120px;
  height: 120px;
}
</style>
