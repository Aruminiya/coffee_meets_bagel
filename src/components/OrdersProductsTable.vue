<script>
import * as bootstrap from 'bootstrap/dist/js/bootstrap.min.js'

export default {
  data () {
    return {
      showProductModal: null,
      products: {}
    }
  },
  methods: {
    modalShow (products) {
      this.products = products
      this.showProductModal.show()
    },
    modalHide () {
      this.showProductModal.hide()
    }
  },
  mounted () {
    // 在內層元件建立 updateModal BS5 實體 及寫 emit 傳遞到外層
    this.showProductModal = new bootstrap.Modal(this.$refs.showProductModal, {
      keyboard: true // 按下ESC是否可以關閉
    })
  }
}
</script>

<template>
  <div class="modal fade " ref="showProductModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-3 rounded">
        <table class="table table-striped table-hover mb-0 border">
          <thead>
            <tr>
              <th class="text-primary" scope="col">品項</th>
              <th class="text-end" scope="col">數量</th>
              <th class="text-end" scope="col">小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td class="text-primary">{{ product.product.title }}</td>
              <td class="text-end">{{ product.qty }} 件</td>
              <td class="text-end">{{ product.total }} 元</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
