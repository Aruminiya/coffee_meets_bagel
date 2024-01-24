<script>
import OrderCheckProgress from "../components/OrderCheckProgress.vue";

export default {
  components: { OrderCheckProgress },
  data() {
    return {};
  },
  mounted() {
    const host = import.meta.env.VITE_HEXAPI;
    const path = import.meta.env.VITE_USER_PATH;
  },
};
</script>

<template>
  <main>
    <OrderCheckProgress :step="1" />
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-12 p-5">
          <div><h3>確認購物車內容</h3></div>
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
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
