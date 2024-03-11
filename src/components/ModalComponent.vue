<script>
import * as bootstrap from 'bootstrap/dist/js/bootstrap.min.js'

import ToastComponent from '../components/ToastComponent.vue'
// pinia
import { mapState, mapActions } from 'pinia'
import cartStore from '../stores/CartStore.js'
// 不好意思芙蘭先拿來用嘿
export default {
  components: {
    ToastComponent
  },
  data () {
    return {
      productModal: null,
      product: {},
      img: [],
      qty: 1,
      isLoading: false
    }
  },
  methods: {
    ...mapActions(cartStore, ['addCarts']),
    modalShow (product) {
      this.product = product
      this.img = product.imagesUrl
      this.productModal.show()
      // console.log(this.img)
    },
    modalHide () {
      this.productModal.hide()
    },
    addQty () {
      this.qty++
    },
    reduceQty () {
      if (this.qty > 1) {
        this.qty--
      }
    },
    add (id, qty) {
      this.addCarts(id, qty)
      this.modalHide()
      this.qty = 1
      this.$refs.toastRef.toastShow()
      // window.location.reload();
    }
  },
  computed: {
    ...mapState(cartStore, ['isCartsLoading', 'addedToCart'])
  },
  mounted () {
    // 在內層元件建立 updateModal BS5 實體 及寫 emit 傳遞到外層
    this.productModal = new bootstrap.Modal(this.$refs.productModal, {
      keyboard: true // 按下ESC是否可以關閉
    })
  }
}
</script>

<template>

 <ToastComponent ref='toastRef' ></ToastComponent>
 <div class="modal fade text-primary" ref="productModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header row d-flex justify-content-lg-end justify-content-between mx-0 border-0">
          <div
            class="col-lg-8 d-flex flex-nowrap justify-content-between align-items-center"
          >
            <div class="modal-title d-flex align-items-center">
              <!-- <slot name="modal-title"></slot> -->
              <img
                src="../../public/coffee_meets_bagel_LogoIcon.svg"
                style="width: 32px"
              />
              <p class='h5 mb-0 ms-2'>產品細節</p>
            </div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
        </div>

        <div class="modal-body text-center">
          <!-- <slot name="modal-body"></slot> -->
          <!-- swiper區域 -->
          <div
            id="carouselExampleControls"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  :src="img[1]"
                  class="d-block w-100 rounded-3"
                  alt="產品照片"
                  style="height: 300px; object-fit: cover"
                />
              </div>
              <div class="carousel-item">
                <img
                  :src="img[0]"
                  class="d-block w-100 rounded-3"
                  alt="產品照片"
                  style="height: 300px; object-fit: cover"
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <!-- 文字敘述區域 -->
          <div class="my-3 border-bottom d-flex flex-column">
            <h5 class="text-start">{{ product.title }}</h5>
            <p class="text-start">{{ product.description }}</p>
            <div class="d-flex justify-content-between">
              <p>備註:{{ product.content }}</p>
              <p class="h5">{{ product.price }}元 / {{ product.unit }}</p>
            </div>
          </div>
          <!-- 選擇數量區域 -->
          <div class="d-flex align-items-center">
            <p class="mb-0 me-2">選擇數量</p>
            <div class="d-flex">
              <button
                type="button"
                class="btn text-light me-1"
                style="background-color: #ce3f25"
                @click="reduceQty"
              >
                -
              </button>
              <input
                type="number"
                class="form-control text-center w-50 bg-transparent"
                v-model="qty"
                disabled
              />
              <button
                type="button"
                class="btn text-light ms-1"
                style="background-color: #ce3f25"
                @click="addQty"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div class="modal-footer border-0">
          <!-- <slot name="modal-footer"></slot> -->
          <button @click='add(product.id, qty)' class='text-center w-100 btn' style='background-color:#ce3f25'><p class='mb-0 text-light'>
            <i class="fa-solid fa-cart-shopping me-1"></i>
            加入購物車</p></button>
        </div>
      </div>
    </div>
  </div>

</template>
