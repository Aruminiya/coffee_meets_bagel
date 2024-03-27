<script>
import ModalShowImgComponent from '@/components/ModalShowImgComponent..vue'
// import * as bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
import Swal from 'sweetalert2'

const host = import.meta.env.VITE_HEXAPI
const path = import.meta.env.VITE_USER_PATH

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  }
})

export default {
  data () {
    return {
      product: {}
    }
  },
  components: {
    ModalShowImgComponent
  },
  props: [
    'products'
  ],
  methods: {
    modalShow (product) {
      this.$refs.modal.modalShow(product)
    },
    modalHide () {
      this.productModal.hide()
    },
    getThisProduct (product) {
      this.product = product
    },
    confirmDelete (id) {
      Swal.fire({
        title: '您確定要刪除嗎?',
        showCancelButton: true,
        cancelButtonText: '返回商品列表',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定刪除'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProduct(id)
        }
      })
    },
    deleteProduct (id) {
      this.axios
        .delete(`${host}/v2/api/${path}/admin/product/${id}`)
        .then((res) => {
          Swal.fire('刪除成功')
          this.getProducts()
        })
        .catch(() => {
          Swal.fire('資料刪除失敗')
        })
    },
    changeEnabledProduct (product) {
      if (product.is_enabled === 1) {
        product.is_enabled = 0
      } else {
        product.is_enabled = 1
      }
      const data = { ...product }
      this.axios
        .put(`${host}/v2/api/${path}/admin/product/${product.id}`, { data })
        .then((res) => {
          this.enableMessage(product.is_enabled)
          // 成功回傳修改狀態後再改變css樣式
          product.check_enabled = product.is_enabled
        }).catch(() => {
          // 如果錯誤產品啟用狀態恢復原值
          if (product.is_enabled === 1) {
            product.is_enabled = 0
          } else {
            product.is_enabled = 1
          }
          Swal.fire('產品編輯失敗')
        })
    },
    enableMessage (isEnabled) {
      if (isEnabled === 1) {
        Toast.fire({
          icon: 'success',
          title: '系統訊息 - 產品已啟用'
        })
      } else {
        Toast.fire({
          icon: 'warning',
          title: '系統訊息 - 產品已停用'
        })
      }
    }
  }
  // mounted () {

  // }
}
</script>

<template>
  <div v-for="product in products" :key="product.id" class="card mb-3">
    <div class="row g-0 position-relative">
      <!-- 主廚推薦的符號 -->
      <div v-if="product.is_recommend && product.check_enabled" class="position-absolute rotate">
        <i class="fa-solid fa-crown me-1 text-warning rotate__star" aria-hidden="true"></i>
      </div>
      <div class="col-md-4 p-3">
        <!-- 點圖放大 -->
        <a href="#" @click.prevent="modalShow(product), getThisProduct(product)">
          <img :src="product.imageUrl" class="img-fluid rounded-start"
            :class="{ 'product__disable': product.check_enabled !== 1 }" alt="#" />
        </a>
      </div>
      <div class="col-md-6" :class="{ 'product__disable': product.check_enabled !== 1 }">
        <div class="card-body">
          <h5 class="card-title">商品編號 : {{ product.id }}</h5>
          <h5 class="card-title">
            商品名稱 : {{ product.title }}
            <span class="badge bg-primary ms-2">{{ product.category }}</span>
            <span class="fs-6 ms-4 mb-2 fw-normal">單位 : {{ product.unit }}</span>
          </h5>
          <div class="row">
            <div class="col-6">
              <div>
                <p class="card-text mb-2">
                  原價 : {{ product.origin_price }}
                </p>
                <p class="card-text mb-2">特價 : {{ product.price }}</p>
              </div>
            </div>
            <div class="col-6">
              <p class="card-text mb-2">{{ product.content }}</p>
              <p v-if="product.check_enabled !== 1" class="card-text mb-2 text-danger">
                <span data-v-ad3f08d1="" class="material-symbols-outlined align-middle ">cancel</span>
                此商品已停售
              </p>
            </div>
          </div>
          <p class="card-text">
            <strong class="text-muted">{{ product.description }}</strong>
          </p>
        </div>
      </div>

      <div class="col-md-2 py-2">
        <div class="card-footer border-top-0 bg-white d-flex flex-column align-items-end">
          <div class="mb-3">
            <button type="button" class="btn btn-outline-success" @click="changeEnabledProduct(product)"
              v-if="product.is_enabled !== 1">
              商品啟用
              <span class="material-symbols-outlined align-middle">check_circle</span>
            </button>
            <button type="button" class="btn btn-outline-secondary" v-else @click="changeEnabledProduct(product)">
              停止販售
              <span class="material-symbols-outlined align-middle">cancel</span>
            </button>
          </div>
          <div class="mb-3">
            <router-link :to="`/admin/adminProducts/${product.id}`" v-if="product.is_enabled === 1">
              <button type="button" class="btn btn-outline-primary">編輯商品
                <span class="material-symbols-outlined align-middle"> edit </span>
              </button>
            </router-link>
            <button type="button" class="btn btn-outline-primary" disabled v-else>編輯商品
              <span class="material-symbols-outlined align-middle"> edit </span>
            </button>
          </div>
          <div class="mb-3">
            <button type="button" class="btn btn-outline-danger" @click.prevent="confirmDelete(product.id)">
              刪除商品
              <span class="material-symbols-outlined align-middle">
                delete
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- modal< 點選圖片放大顯示 -->
  <ModalShowImgComponent ref="modal">
    <template v-slot:modal-body>
      <img class="modal__img" :src="product.imageUrl" alt="#" />
    </template>
  </ModalShowImgComponent>
</template>

<style scoped lang="scss">

.img-fluid {
  width: 400px;
  height: 180px;
  object-fit: cover;
}

.modal__img {
  max-width: 100%;
  object-fit: contain;
}

.rotate {
  left: 20px;
  top: 18px;
  width: fit-content;

  ::after {
    content: "店長推薦";
    font-size: 16px;
    position: absolute;
    color: #8d2b19;
    top: 36px;
    right: 20px;
    width: 36px;
  }

  &__star {
    transform: rotate(-30deg);
    font-size: 72px;
    color: gold;
  }
}

.product__disable {
  opacity: 0.6;
}
</style>
