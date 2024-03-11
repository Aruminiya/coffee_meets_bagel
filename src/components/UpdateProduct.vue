<script>
import modal from './ModalShowImgComponent..vue'
import uploadImageModal from './ModalUploadImageFile.vue'
import changeUrlModal from './ModalChangeUrl.vue'
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
      product: {},
      defaultImageUrl: 'https://www.ils.com.tw/zh/Up_files/webskin/RWD/include/images/type3album_blank.png',
      newImageUrl: '',
      showImageUrl: '',
      newImagesUrl: [],
      defaultProduct: {
        category: '',
        content: '',
        description: '',
        imageUrl: 'https://www.ils.com.tw/zh/Up_files/webskin/RWD/include/images/type3album_blank.png',
        imagesUrl: [
          'https://www.ils.com.tw/zh/Up_files/webskin/RWD/include/images/type3album_blank.png'
        ],
        is_enabled: 0,
        origin_price: 0,
        is_recommend: 0,
        price: 0,
        title: '',
        unit: ''
      },
      showUrl: false
    }
  },
  components: {
    modal,
    uploadImageModal,
    changeUrlModal
  },
  methods: {
    openOffCanvasNav () {
      this.$refs.backendNav.openNav()
    },
    modalShow (url) {
      if (url !== this.defaultImageUrl) {
        this.$refs.modal.modalShow(url)
      }
    },
    uploadModalShow (index) {
      this.$refs.inputModal.modalShow(index)
    },
    changeUrlModalShow (index) {
      this.$refs.changeUrlModal.modalShow(index)
    },
    addNewImage () {
      this.showImageUrl = this.newImageUrl
      this.newImagesUrl.push(this.showImageUrl)
      // 新圖推到陣列後回復到預設圖片
      this.showImageUrl = this.defaultImageUrl
      // input清空
      this.newImageUrl = ''
    },
    getProduct () {
      // 取得路由的產品ID
      const id = this.$route.params.id
      if (id) {
        this.axios.get(`${host}/v2/api/${path}/product/${id}`)
          .then((res) => {
            this.product = res.data.product
            // 避免抓到空值, 先過濾多圖陣列
            if (this.product.imagesUrl) {
              this.newImagesUrl = this.product.imagesUrl.filter(item => {
                return item !== ''
              })
            }
          })
          .catch(() => {
            Swal.fire('取得產品資料失敗')
          })
      } else {
        this.product = this.defaultProduct
      }
    },
    addProduct () {
      this.product.imagesUrl = this.newImagesUrl
      const data = this.product
      this.axios.post(`${host}/v2/api/${path}/admin/product`, { data })
        .then(() => {
          Swal.fire({
            title: '產品新增成功',
            confirmButtonText: '返回產品列表'
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push('/admin/adminProducts')
            }
          })
        })
        .catch(() => {
          Swal.fire('產品新增失敗')
        })
    },
    enabledProduct () {
      if (this.product.is_enabled === 0) {
        this.product.is_enabled = 1
      } else if (this.product.is_enabled === 1) {
        this.product.is_enabled = 0
      }
    },
    enabledRecommend () {
      if (this.product.is_recommend === 0 || this.product.is_recommend === undefined) {
        this.product.is_recommend = 1
      } else if (this.product.is_recommend === 1) {
        this.product.is_recommend = 0
      }
    },
    backToList () {
      this.$router.push('/admin/adminProducts')
    },
    updateProduct () {
      // 取得路由的產品ID
      const id = this.$route.params.id
      // 將新的副圖片陣列指向原本產品物件的副圖片陣列
      this.product.imagesUrl = this.newImagesUrl
      const data = this.product
      this.axios.put(`${host}/v2/api/${path}/admin/product/${id}`, { data })
        .then(() => {
          Swal.fire({
            title: '系統訊息',
            text: '產品內容已更新, 將返回產品列表',
            icon: 'success'
          })
          this.$router.push('/admin/adminProducts')
        }).catch(() => {
          Swal.fire('系統更新失敗')
        })
    },
    deleteImage (index) {
      this.newImagesUrl.splice(index, 1)
      Toast.fire({
        icon: 'success',
        title: '系統訊息 - 圖片已刪除'
      })
    },
    changeMainImg (index) {
      const changedImg = this.product.imageUrl
      this.product.imageUrl = this.newImagesUrl[index]
      this.newImagesUrl[index] = changedImg
      Toast.fire({
        icon: 'success',
        title: '系統訊息 - 產品首圖設定成功'
      })
    },
    confirmUpdate () {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })
      swalWithBootstrapButtons.fire({
        title: '系統訊息',
        text: '確定要更新產品資訊嗎?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: '確定更新',
        cancelButtonText: '取消更新',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateProduct()
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Toast.fire({
            icon: 'warning',
            title: '取消更新 - 系統將不會儲存您的變更'
          })
        }
      })
    },
    // 根據回傳的結果修改對應圖片
    uploadSuccess (url, index) {
      if (index === -1) {
        this.product.imageUrl = url
      } else if (index === undefined) {
        this.newImagesUrl.push(url)
      } else {
        this.newImagesUrl[index] = url
      }
    },
    uploadError () {
      Swal.fire('圖片上傳失敗')
    }
  },
  mounted () {
    this.getProduct()
    this.showImageUrl = this.defaultImageUrl
  }
}
</script>
<template>
  <div class="container main">
    <div class="row border rounded p-3">
      <div class="col-4 overflow-scroll p-3">
        <h4 class="text-primary">商品主圖</h4>
        <div class="text-center mb-2">
          <a href="#" @click.prevent="modalShow(product.imageUrl)">
            <img class="main__pic rounded-top" :src="product.imageUrl" alt="商品主圖">
          </a>
          <button class="btn btn-outline-primary form-control rounded-top-0 dropdown-toggle" type="button"
            data-bs-toggle="dropdown" aria-expanded="false">編輯產品主圖</button>
          <ul class="dropdown-menu">
            <!-- 以-1代表商品主圖 -->
            <li><a class="dropdown-item" @click.prevent="uploadModalShow(-1)" href="#">上傳檔案</a></li>
            <li><a class="dropdown-item" @click.prevent="changeUrlModalShow(-1)" href="#">設定圖片路徑</a></li>
          </ul>
        </div>
        <div class="row main__sub__pics__block">
          <h4 class="text-primary align-self-start">產品副圖片</h4>
          <div v-for="(url, index) in newImagesUrl" :key="url" class="col-6 text-center">
            <div v-if="url" class="mb-3 position-relative">
              <a href="#" @click.prevent="modalShow(url)">
                <img :src="url" alt="商品副圖片" class="main__sub__pics rounded-top">
              </a>
              <div v-if="showUrl">
                <input type="text" class="form-control rounded-0 rounded-bottom" v-model="newImagesUrl[index]">
              </div>
              <div v-else>
                <button class="btn btn-outline-primary form-control rounded-top-0 dropdown-toggle" type="button"
                  data-bs-toggle="dropdown" aria-expanded="false">編輯圖片</button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" @click.prevent="changeMainImg(index)" href="#">設為主圖</a></li>
                  <li><a class="dropdown-item" @click.prevent="uploadModalShow(index)" href="#">上傳檔案</a></li>
                  <li><a class="dropdown-item" @click.prevent="changeUrlModalShow(index)" href="#">設定圖片路徑</a></li>
                  <li><a class="dropdown-item text-danger" @click.prevent="deleteImage(index)" href="#">刪除此圖片</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div>
              <img class="main__sub__pics rounded-top border border-primary border-bottom-0" :src="showImageUrl">
              <button class="btn btn-outline-primary form-control rounded-top-0 dropdown-toggle" type="button"
                data-bs-toggle="dropdown" aria-expanded="false">新增圖片</button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click.prevent="uploadModalShow()" href="#">上傳檔案</a></li>
                <li><a class="dropdown-item" @click.prevent="changeUrlModalShow()" href="#">設定圖片路徑</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8 p-3 position-relative">
        <div class="mb-2">
          <h4 class="text-primary">產品編號</h4>
          <input type="text" class="form-control rounded-top" disabled v-model="product.id">
        </div>
        <div class="mb-2">
          <h4 class="text-primary">產品名稱</h4>
          <input type="text" class="form-control rounded-top" v-model="product.title">
        </div>
        <div class="mb-2 row">
          <div class="col-6 mb-2">
            <h4 class="text-primary">產品分類</h4>
            <input type="text" class="form-control rounded-top" v-model="product.category">
          </div>
          <div class="col-6">
            <h4 class="text-primary">單位</h4>
            <input type="text" class="form-control rounded-top" v-model="product.unit">
          </div>
          <div class="col-6">
            <h4 class="text-primary">原價</h4>
            <input type="number" class="form-control rounded-top" v-model="product.origin_price">
          </div>
          <div class="col-6">
            <h4 class="text-primary">售價</h4>
            <input type="number" class="form-control rounded-top" v-model="product.price">
          </div>
        </div>
        <div class="mb-2">
          <h4 class="text-primary">產品描述</h4>
          <textarea v-model="product.content" class="w-100" rows="3"></textarea>
          <h4 class="text-primary">說明內容</h4>
          <textarea v-model="product.description" class="w-100" rows="3"></textarea>
        </div>
        <div class="position-absolute bottom-0 start-0 d-flex p-3">
          <div class="d-flex">
            <h4 class="mb-0 text-primary">商品狀態</h4>
            <button type="button" class="btn btn-outline-primary bottom-0 start-0 ms-3" v-if="product.is_enabled"
              @click="enabledProduct">已啟用</button>
            <button type="button" class="btn btn-outline-secondary bottom-0 start-0 ms-3" v-else
              @click="enabledProduct">未啟用</button>
          </div>
          <div class="d-flex ms-3">
            <h4 class="mb-0 text-primary">店長推薦</h4>
            <button type="button" class="btn btn-outline-primary bottom-0 start-0 ms-3" v-if="product.is_recommend"
              @click="enabledRecommend">採用推薦</button>
            <button type="button" class="btn btn-outline-secondary bottom-0 start-0 ms-3" v-else
              @click="enabledRecommend">未採用</button>
          </div>
        </div>
        <div class="position-absolute bottom-0 end-0 p-3">
          <button type="button" class="btn btn-outline-primary ms-3" @click="backToList">返回產品列表</button>
          <button type="button" class="btn btn-outline-primary ms-3" v-if="product.id" @click="getProduct">回復初始值</button>
          <button type="button" class="btn btn-outline-success ms-3" v-if="product.id"
            @click="confirmUpdate">確定修改</button>
          <button type="button" class="btn btn-outline-primary ms-3" v-else @click="addProduct">新增商品</button>
        </div>
      </div>
    </div>
  </div>

  <!-- modal 點選圖片放大顯示 -->
  <modal ref="modal">
    <template v-slot:modal-body>
      <img :src="product.imageUrl" alt="#" class="modal__img">
    </template>
  </modal>

  <!-- modal 上傳圖片 -->
  <uploadImageModal ref="inputModal" @upload-success="uploadSuccess" @upload-error="uploadError"></uploadImageModal>

  <!-- modal 更換圖片網址 -->
  <changeUrlModal ref="changeUrlModal" @change-url="uploadSuccess"></changeUrlModal>

</template>
<style scoped lang="scss">
.main {
  &__pic {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  &__sub__pics {
    width: 100%;
    height: 100px;
    object-fit: cover;
  }

  &__sub__pics__block {
    height: 380px;
  }
}

.modal__img {
  max-width: 100%;
  object-fit: contain;
}

textarea {
  resize: none;
}
</style>
