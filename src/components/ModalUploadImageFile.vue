<script>
import * as bootstrap from 'bootstrap/dist/js/bootstrap.min.js'

const host = import.meta.env.VITE_HEXAPI
const path = import.meta.env.VITE_USER_PATH

export default {
  data () {
    return {
      inputModal: null,
      imageUrl: '',
      apiUploadImage: `${host}/v2/api/${path}/admin/upload`,
      index: 0
    }
  },
  methods: {
    modalShow (index) {
      // 抓外層傳入的index值
      this.index = index
      this.inputModal.show()
    },
    modalHide () {
      this.inputModal.hide()
    },
    submitForm () {
      // 抓表單上傳的檔案
      const formData = new FormData()
      formData.append('file', this.$refs.fileInput.files[0])

      this.axios.post(this.apiUploadImage, formData)
        .then((res) => {
          this.imageUrl = res.data.imageUrl
          // 回傳上傳後的url路徑與對應的index
          this.$emit('upload-success', this.imageUrl, this.index)
          this.inputModal.hide()
        })
        .catch(err => {
          this.$emit('upload-error', err)
          this.inputModal.hide()
        })
    }
  },
  mounted () {
    // 圖片需要驗證後才可使用
    // 在內層元件建立 updateModal BS5 實體 及寫 emit 傳遞到外層
    this.inputModal = new bootstrap.Modal(this.$refs.inputModal, {
      keyboard: true // 按下ESC是否可以關閉
    })
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)florafirstapi\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    // 將token設定到axios的預設header裡
    this.axios.defaults.headers.common.Authorization = token
  }
}
</script>

<template>
  <div class="modal fade" ref="inputModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body text-center">
          <h3 class="text-primary">請選擇要上傳的圖片檔案</h3>
          <p class="text-danger">請注意，僅限使用 jpg、jpeg 與 png 格式， <br> 檔案大小限制為 3MB 以下。</p>
          <form :action="apiUploadImage" enctype="multipart/form-data" method="post" @submit.prevent="submitForm">
            <input type="file" name="file-to-upload" ref="fileInput"
            class="form-control rounded rounded-bottom-0 border-primary border-bottom-0">
            <input type="submit" value="上傳檔案" class="form-control btn btn-outline-primary rounded rounded-top-0">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
