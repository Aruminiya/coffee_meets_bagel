<script>
import OrderCheckProgressComponent from "../components/OrderCheckProgressComponent.vue";
import CartItemComponent from "../components/CartItemComponent.vue";

export default {
  components: { OrderCheckProgressComponent, CartItemComponent },
  data() {
    return {
      carts: {},
      updateProduct: {},
    };
  },
  mounted() {
    const host = import.meta.env.VITE_HEXAPI;
    const path = import.meta.env.VITE_USER_PATH;

    this.axios
      .get(`${host}/v2/api/${path}/cart`)
      .then((res) => {
        const { carts } = res.data.data;
        this.carts = carts;
        console.log(this.carts);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<template>
  <main>
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
              <button
                type="button"
                class="deleteBtn position-absolute end-0 badge rounded-pill text-bg-dark"
              >
                -
              </button>
              <div class="d-flex rounded shadow-sm p-3 my-3">
                <div class="imgContainer me-2">
                  <img
                    class="w-100 h-100 object-fit-cover rounded"
                    :src="item.product.imageUrl"
                    :alt="item.title"
                  />
                </div>
                <br />
                <div class="contentContainer position-relative">
                  <span
                    ><h4 class="d-inline-block">
                      {{ item.product.title }} &nbsp;
                    </h4>
                    <h6 class="badge rounded-pill text-bg-primary">
                      {{ item.product.category }}
                    </h6></span
                  >
                  <h6>{{ item.product.content }}</h6>
                  <p>選擇數量：{{ item.qty }}</p>
                </div>
                <h5 class="position-absolute bottom-0 end-0 m-2">
                  NT$ {{ item.total }}
                </h5>
              </div>
            </div>
            <!-- {{ carts }} -->
            <CartItemComponent />
          </div>
        </div>
        <div class="col-lg-6 col-12 p-5">
          <div>
            <h3>填寫訂購資訊</h3>
            <form>
              <div class="orderFrom p-5 rounded shadow-sm">
                <!-- 電子信箱 -->
                <label for="email">電子信箱:</label>
                <input
                  class="form-control"
                  type="email"
                  id="email"
                  name="email"
                  required
                /><br />

                <!-- 姓名 -->
                <label for="name">姓名:</label>
                <input
                  class="form-control"
                  type="text"
                  id="name"
                  name="name"
                  required
                /><br />

                <!-- 電話 -->
                <label for="phone">電話:</label>
                <input
                  class="form-control"
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                /><br />

                <!-- 住址 -->
                <label for="address">住址:</label>
                <input
                  class="form-control"
                  type="text"
                  id="address"
                  name="address"
                  required
                /><br />

                <!-- 備註 -->
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
              <!-- 提交按鈕 -->
              <button type="button" class="btn btn-dark w-100">
                <h5 class="m-1">送出資訊</h5>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!--自製產品 Madel-->
    <section>
      <h1>產品資訊</h1>
      {{ updateProduct }}
    </section>
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
