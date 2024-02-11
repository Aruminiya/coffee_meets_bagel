<script>
import CartItemComponent from "../components/CartItemComponent.vue";

// pinia
import { mapState, mapActions } from "pinia";
import cartStore from "../stores/CartStore.js";

export default {
  components: {
    CartItemComponent,
  },
  props: { isEditMode: { type: Boolean, default: true } },
  data() {
    return {
      item: {},
      // 控制自製 Modal 的開關
      isShow: false,
    };
  },
  computed: {
    ...mapState(cartStore, ["data", "isCartsLoading"]),
  },
  methods: {
    ...mapActions(cartStore, ["getCarts", "editCarts", "deleteCarts"]),
  },
  mounted() {
    // 先取得購物車資訊
    this.getCarts();
    console.log("mounted啟動");
    // if (this.$route.fullPath === "/orderCheckView/step2") {
    //   this.isEditMode = false;
    // }
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <router-link to="/" class="navbar-brand" href="#"
        ><img
          class="logo"
          src="../../public/coffee_meets_bagel_Logo.svg"
          alt="coffee_meets_bagel_Logo"
          width="200"
      /></router-link>

      <div class="d-flex justify-content-center align-items-center">
        <div class="navbar-toggler cartIconNav">
          <div
            class="cartIconContainer position-relative"
            @click="isShow = true"
          >
            <p
              class="cartQty badge rounded-pill text-bg-danger position-absolute end-0"
            >
              {{ data.carts?.length }}
            </p>
            <img
              class="cartIcon"
              src="../../public/cartIcon.svg"
              alt="cartIcon"
            />
          </div>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link
            to="/about"
            class="nav-link"
            aria-current="page"
            href="#"
          >
            <p class="m-0">關於我們</p>
          </router-link>
        </div>
        <div class="navbar-nav">
          <router-link
            to="/order"
            class="nav-link"
            aria-current="page"
            href="#"
          >
            <p class="m-0">線上點餐</p>
          </router-link>
        </div>
      </div>
      <div class="navbar cartIconNav mx-5 d-none d-lg-block">
        <div class="cartIconContainer position-relative" @click="isShow = true">
          <p
            class="cartQty badge rounded-pill text-bg-danger position-absolute end-0"
          >
            {{ data.carts?.length }}
          </p>
          <img
            class="cartIcon"
            src="../../public/cartIcon.svg"
            alt="cartIcon"
          />
        </div>
      </div>
    </div>
  </nav>

  <!-- 購物車自製 Modal -->
  <section></section>
  <transition name="cartModal">
    <section
      v-show="isShow"
      class="cartModalContainer position-fixed d-flex flex-column p-3"
    >
      <div class="block_01 position-relative">
        <button
          class="position-absolute end-0 btn btn-primary"
          @click="isShow = false"
        >
          <i class="deleteIcon bi bi-x-lg"></i>
        </button>
        <h4 class="text-center">購物車</h4>
        <hr />
      </div>

      <div class="block_02 cartProductInfoAll px-2">
        <h4 v-if="isCartsLoading">Loading...</h4>

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
            :editMode="isEditMode"
            @deleteItemClicked="deleteCarts(item)"
            @editItemClickedEmit="editCarts($event)"
          />
        </div>
      </div>
      <div class="block_03 my-2">
        <button class="btn btn-primary w-100">去結帳</button>
      </div>
    </section>
  </transition>
</template>

<style lang="scss" scoped>
.cartIconNav {
  border: none;
  .cartIconContainer {
    .cartIcon {
      cursor: pointer;
      width: 30px;
    }
  }
}
.navbar {
  background-color: $colorChart-Accessory-100;
}

p {
  color: $colorChart-Accessory-200;
}
.cartQty {
  font-size: 10px;
  transform: translate(8px, -3px);
}

.cartProductInfoAll {
  overflow: scroll;
}
.cartModalContainer {
  z-index: 10;
  color: $colorChart-Accessory-200;
  width: 500px;
  height: 100vh;
  background-color: $colorChart-bg-color;
  right: 0;
  top: 0;
  transform: translateX(100%);
  @media screen and (max-width: 500px) {
    width: 100vw;
  }
}

// 這是 Vue 提供的動畫系統
.cartModal-enter-active,
.cartModal-leave-active {
  transition: transform 0.3s ease;
}
.cartModal-enter-from {
  transform: translateX(100%);
}
.cartModal-enter-to {
  transform: translateX(0%);
}
.cartModal-leave-from {
  transform: translateX(0%);
}
.cartModal-leave-to {
  transform: translateX(100%);
}
</style>
