<script>
const host = import.meta.env.VITE_HEXAPI;
const path = import.meta.env.VITE_USER_PATH;

import modal from './ModalComponent.vue';
import Swal from "sweetalert2";

export default {
  data() {
    return {
      product: {},
      defaultImageUrl: 'https://www.ils.com.tw/zh/Up_files/webskin/RWD/include/images/type3album_blank.png',
      newImageUrl: '',  // https://i.ytimg.com/vi/snCH79g4AHk/maxresdefault.jpg
      showImageUrl: '',
      newImagesUrl: [],
      defaultProduct: {
        'category': '',
        'content': '',
        'description': '',
        'imageUrl': 'https://www.ils.com.tw/zh/Up_files/webskin/RWD/include/images/type3album_blank.png',
        'imagesUrl': [
          'https://www.ils.com.tw/zh/Up_files/webskin/RWD/include/images/type3album_blank.png',
        ],
        'is_enabled': 0,
        'origin_price': 0,
        'price': 0,
        'title': '',
        'unit': ''
      }
    }
  },
  components: {
    modal
  },
  methods: {
    openOffCanvasNav() {
      this.$refs.backendNav.openNav();
    },
    modalShow(url) {
      this.$refs.modal.modalShow(url)
    },
    addNewImage() {
      this.showImageUrl = this.newImageUrl
      this.newImagesUrl.push(this.showImageUrl)
      // 新圖推到陣列後回復到預設圖片
      this.showImageUrl = this.defaultImageUrl
      // input清空
      this.newImageUrl = ''
      // console.log(this.newImagesUrl);
    },
    getProduct() {
      // 取得路由的產品ID
      const id = this.$route.params.id;

      if(id){
        this.axios.get(`${host}/v2/api/${path}/product/${id}`)
          .then((res) => {
            // console.log(res.data);
            this.product = res.data.product
            // 避免抓到空值, 先過濾多圖陣列
            this.newImagesUrl = this.product.imagesUrl.filter(item => {
              return item !== ''
            })
          })
          .catch(() => {
            Swal.fire("取得產品資料失敗");
          });
      }else {
        this.product = this.defaultProduct;
      }
    },
    enabledProduct() {
      if(this.product.is_enabled === 0){
        this.product.is_enabled = 1
      }else if(this.product.is_enabled === 1) {
        this.product.is_enabled = 0
      }
    },
    backToList() {
      this.$router.push('/admin/adminProducts');
    },
    updateProduct() {
      // 取得路由的產品ID
      const id = this.$route.params.id;
      // 將新的副圖片陣列指向原本產品物件的副圖片陣列
      this.product.imagesUrl = this.newImagesUrl;
      const data = this.product;

      this.axios.put(`${host}/v2/api/${path}/admin/product/${id}`, { data })
        .then(() => {
          Swal.fire({
            title: "系統訊息",
            text: "產品內容已更新, 將返回產品列表",
            icon: "success"
          });
          this.$router.push('/admin/adminProducts')
        }).catch(() => {
          Swal.fire("系統更新失敗");
        });
    },
    confirmUpdate() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: true
      });
      swalWithBootstrapButtons.fire({
        title: "系統訊息",
        text: "確定要更新產品資訊嗎?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "確定更新",
        cancelButtonText: "取消更新",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateProduct()
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "取消更新",
            text: "系統將不會儲存您的變更",
            icon: "warning"
          });
        }
      });
    }
  },
  mounted() {
    this.getProduct();
    this.showImageUrl = this.defaultImageUrl;
  },
}
</script>

<template>
  <div class="container main">
    <div class="row border rounded p-3">
      <div class="col-4 overflow-scroll p-3">
        <h3 class="text-primary">商品主圖</h3>
        <div class="text-center mb-2">
          <a href="#" @click.prevent="modalShow(product.imageUrl)">
            <img class="main__pic rounded-top" :src="product.imageUrl" alt="商品主圖">
          </a>
          <input type="text" class="form-control rounded-0 rounded-bottom" v-model="product.imageUrl">
        </div>
        <div class="row main__sub__pics__block">
          <h3 class="text-primary align-self-start">產品副圖片</h3>
          <div v-for="(url, index) in newImagesUrl" :key="url" class="col-6 text-center">
            <div v-if="url" class="mb-3">
              <a href="#" @click.prevent="modalShow(url)">
                <img :src="url" alt="商品副圖片" class="main__sub__pics rounded-top">
              </a>
              <input type="text" class="form-control rounded-0 rounded-bottom" v-model="newImagesUrl[index]">
            </div>
          </div>
          <div class="col-6">
            <div>
              <img class="main__sub__pics rounded-top" :src="showImageUrl">
              <input type="text" class="form-control rounded-0" v-model="newImageUrl">
              <!-- 優化時改用先判斷url是否正確 -->
              <button class="btn btn-outline-primary form-control rounded-0 rounded-bottom" type="button"
                :class="{ 'disabled': newImageUrl === '' }" @click="addNewImage">新增圖片</button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-8 p-3 position-relative">
        <div class="mb-2">
          <h3 class="text-primary">產品編號</h3>
          <input type="text" class="form-control rounded-top" disabled v-model="product.id">
        </div>
        <div class="mb-2">
          <h3 class="text-primary">產品名稱</h3>
          <input type="text" class="form-control rounded-top" v-model="product.title">
        </div>
        <div class="mb-2 row">
          <div class="col-6 mb-2">
            <h3 class="text-primary">產品分類</h3>
            <input type="text" class="form-control rounded-top" v-model="product.category">
          </div>
          <div class="col-6">
            <h3 class="text-primary">單位</h3>
            <input type="text" class="form-control rounded-top" v-model="product.unit">
          </div>
          <div class="col-6">
            <h3 class="text-primary">原價</h3>
            <input type="text" class="form-control rounded-top" v-model="product.origin_price">
          </div>
          <div class="col-6">
            <h3 class="text-primary">售價</h3>
            <input type="text" class="form-control rounded-top" v-model="product.price">
          </div>
        </div>
        <div class="mb-2">
          <h3 class="text-primary">產品描述</h3>
          <textarea v-model="product.content" class="w-100" rows="3"></textarea>
          <h3 class="text-primary">說明內容</h3>
          <textarea v-model="product.description" class="w-100" rows="3"></textarea>
        </div>
        <div class="position-absolute bottom-0 start-0 p-3">
          <div class="d-flex">
            <h3 class="mb-0 text-primary">商品狀態</h3>
            <button type="button" class="btn btn-outline-primary bottom-0 start-0 ms-3"
            v-if="product.is_enabled" @click="enabledProduct">已啟用</button>
            <button type="button" class="btn btn-outline-secondary bottom-0 start-0 ms-3"
            v-else @click="enabledProduct" >未啟用</button>
          </div>
        </div>
        <div class="position-absolute bottom-0 end-0 p-3">
          <button type="button" class="btn btn-outline-warning ms-3" @click="backToList">返回產品列表</button>
          <button type="button" class="btn btn-outline-success ms-3" @click="getProduct">回復初始值</button>
          <button type="button" class="btn btn-outline-primary ms-3" @click="confirmUpdate">確定修改</button>
        </div>
      </div>
    </div>
  </div>

  <!-- modal< 點選圖片放大顯示 -->
  <modal ref="modal">
    <template v-slot:modal-body>
      <img :src="product.imageUrl" alt="#" class="modal__img">
    </template>
  </modal>
</template>

<style scoped lang="scss">
.main {
  // margin-top: 100px;

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