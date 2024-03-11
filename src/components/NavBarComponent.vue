<script>
import CartItemComponent from '../components/CartItemComponent.vue'

// pinia
import { mapState, mapActions } from 'pinia'
import cartStore from '../stores/CartStore.js'

export default {
  components: {
    CartItemComponent
  },
  props: { isEditMode: { type: Boolean, default: true } },
  data () {
    return {
      // 控制自製 Modal 的開關
      isShow: false
    }
  },
  computed: {
    ...mapState(cartStore, ['data', 'isCartsLoading'])
  },
  methods: {
    ...mapActions(cartStore, ['getCarts', 'editCarts', 'deleteCarts'])
  },
  mounted () {
    // 先取得購物車資訊
    this.getCarts()
    // if (this.$route.fullPath === '/orderCheckView/step2') {
    //   this.isEditMode = false;
    // }
  }
}
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
              {{ data?.carts?.length }}
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
            to="/productList"
            class="nav-link"
            aria-current="page"
            href="#"
          >
            <p class="m-0">線上點餐</p>
          </router-link>
        </div>
        <div class="navbar-nav">
          <router-link to="/fqa" class="nav-link" aria-current="page" href="#">
            <p class="m-0">常見問題</p>
          </router-link>
        </div>
      </div>
      <div class="navbar cartIconNav mx-5 d-none d-lg-block">
        <div class="cartIconContainer position-relative" @click="isShow = true">
          <p
            v-if="data?.carts?.length"
            class="cartQty badge rounded-pill text-bg-danger position-absolute end-0"
          >
            {{ data?.carts?.length }}
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

  <transition name="cartModal">
    <section v-show="isShow" class="cartModalContainer position-fixed p-3">
      <div class="d-flex flex-column h-100">
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

        <div v-if="data?.carts?.length" class="block_02 cartProductInfoAll px-2">
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
              :editMode="isEditMode"
              @deleteItemClicked="deleteCarts(item)"
              @editItemClickedEmit="editCarts($event)"
            />
          </div>
        </div>
        <div class="block_03 my-2">
          <h4 v-if="data.carts?.length === 0" class="cartTextEmpty text-center">
            購物車內尚無商品
          </h4>
          <router-link v-if="data?.carts?.length" to="/orderCheckView/step1"
            ><button
              v-if="isCartsLoading === false"
              class="goToCheck btn btn-primary w-100"
            >
              去結帳
            </button></router-link
          >
        </div>
      </div>
    </section>
  </transition>

  <transition name="cartModalBg"
    ><div
      v-show="isShow"
      class="cartModalFullBg position-fixed"
      @click="isShow = false"
    ></div>
  </transition>
</template>

<style lang="scss" scoped>
.active {
  & > * {
    color: $colorChart-Primary-200;
  }
}
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
  z-index: 8;
  background-color: $colorChart-Accessory-100;
}

p {
  color: $colorChart-Accessory-200;
}

.goToCheck {
  color: $colorChart-Gray-100;
}
.cartQty {
  font-size: 10px;
  transform: translate(8px, -3px);
}

.cartTextEmpty {
  color: $colorChart-Gray-400;
}
.cartProductInfoAll {
  overflow: scroll;
}

/* 隐藏默认的滚动条 */
::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge, Opera */
}
.cartModalContainer {
  z-index: 10;
  color: $colorChart-Accessory-200;
  width: 500px;
  height: 100vh;
  background-color: $colorChart-bg-color;
  right: 0;
  top: 0;
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

.cartModalFullBg {
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9;
  background: rgba(0, 0, 0, 0.4);
}

// 這是 Vue 提供的動畫系統
.cartModalBg-enter-active,
.cartModalBg-leave-active {
  transition: opacity 0.3s ease;
}

.cartModalBg-enter-from {
  opacity: 0;
}
.cartModalBg-enter-to {
  opacity: 1;
}
.cartModalBg-leave-from {
  opacity: 1;
}
.cartModalBg-leave-to {
  opacity: 0;
}
</style>
