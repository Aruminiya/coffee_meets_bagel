<script>
import OrderCheckProgressComponent from "../components/OrderCheckProgressComponent.vue";
import CartItemComponent from "../components/CartItemComponent.vue";

// pinia
import { mapState, mapActions } from "pinia";
import cartStore from "../stores/CartStore.js";

export default {
  components: { OrderCheckProgressComponent, CartItemComponent },
  data() {
    return {
      updateProduct: {},
    };
  },
  computed: {
    ...mapState(cartStore, ["carts"]),
  },
  methods: {
    ...mapActions(cartStore, ["getCarts"]),
    openModal() {
      const myProductModal = this.$refs.myProductModal;
      const productModalContent = this.$refs.productModalContent;

      myProductModal.style.display = "flex";
      setTimeout(function () {
        myProductModal.style.opacity = "1";
        productModalContent.style.transform = "translateY(0)";
      }, 10);
    },
    closeModal() {
      const myProductModal = this.$refs.myProductModal;
      const productModalContent = this.$refs.productModalContent;

      myProductModal.style.opacity = "0";

      setTimeout(function () {
        myProductModal.style.display = "none";
        productModalContent.style.transform = "translateY(100vh)";
      }, 300);
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
            <div
              class="cartProductInfo position-relative"
              v-for="item in carts"
              :key="item.id"
              @click="this.updateProduct = item"
            >
              <!-- 購物車商品卡片元件 item 是 props 傳入商品物件 -->
              <CartItemComponent :item="item" />
            </div>
          </div>
        </div>
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
    <!--自製產品 Modal-->
    <button @click="openModal()">Modal</button>
    <div
      id="myProductModal"
      ref="myProductModal"
      class="productModal"
      @click="closeModal()"
      style="display: none; opacity: 0"
    >
      <div
        class="productModal-content"
        ref="productModalContent"
        style="transform: translateY(100vh)"
      >
        <span class="close-btn" @click="closeModal()">&times;</span>
        <h1>產品資訊</h1>
        {{ updateProduct || "TEST" }}
      </div>
    </div>
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

.productModal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease-in-out;
  overflow: hidden; /* 隐藏溢出部分，防止页面滚动 */
}
.productModal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  transform: translateY(100%); /* 初始位置在底部 */
  transition: transform 0.5s ease-in-out;
}
.close-btn {
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
