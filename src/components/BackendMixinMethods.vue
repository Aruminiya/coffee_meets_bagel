<script>
const host = import.meta.env.VITE_HEXAPI;
const path = import.meta.env.VITE_USER_PATH;

export default {
  methods: {
    checkAdmin() {
      this.axios
        .post(`${host}/v2/api/user/check`)
        .then((res) => {
          // 驗證完畢後取得產品列表
          // 要渲染的資料
          this.getProducts();
          // 所有資料, 以及所有分類
          this.getAllProducts();
        })
        .catch((err) => {
          Swal.fire({
            title: "登入驗證失敗, 請重新登入",
            confirmButtonText: "Save",
          }).then((result) => {
            // 驗證失敗轉回登入頁面(未完成), 目前先轉回首頁
            this.$router.push('/')
          });
        });
    },

  },
}
</script>