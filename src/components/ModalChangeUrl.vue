<script>
import * as bootstrap from 'bootstrap/dist/js/bootstrap.min.js'

export default {
  data () {
    return {
      changeUrlModal: null,
      imageUrl: '',
      index: 0
    }
  },
  methods: {
    modalShow (index) {
      // 抓外層傳入的index值
      this.index = index
      this.changeUrlModal.show()
    },
    modalHide () {
      this.changeUrlModal.hide()
    },
    changeUrl () {
      // 回傳輸入的圖片網址與對應的index
      this.$emit('change-url', this.imageUrl, this.index)
      this.changeUrlModal.hide()
    }
  },
  mounted () {
    // 在內層元件建立 updateModal BS5 實體 及寫 emit 傳遞到外層
    this.changeUrlModal = new bootstrap.Modal(this.$refs.changeUrlModal, {
      keyboard: true // 按下ESC是否可以關閉
    })
  }
}
</script>

<template>
  <div class="modal fade" ref="changeUrlModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body text-center">
          <h3 class="text-primary">請輸入要更換的圖片路徑</h3>
          <input type="url" class="form-control rounded-bottom-0" v-model="imageUrl">
          <button type="bottom" class="form-control btn btn-outline-primary rounded-top-0"
          @click="changeUrl">送出修改</button>
        </div>
      </div>
    </div>
  </div>
</template>
