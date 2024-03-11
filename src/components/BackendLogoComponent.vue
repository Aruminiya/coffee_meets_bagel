<template>
  <nav class="navbar fixed-top">
    <h1>
      <a class="navbar-brand logo m-0 p-0" role="button" @click="openOffCanvasNav">CoffeeMeetsBagel</a>
    </h1>
  </nav>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

const host = import.meta.env.VITE_HEXAPI

export default {
  // props 當作 emit
  props: ['openOffCanvasNav'],
  methods: {
    checkLogin () {
      const token = document.cookie.split('; ').find((row) => row.startsWith('florafirstapi='))?.split('=')[1]
      axios.defaults.headers.common.Authorization = token

      axios.post(`${host}/v2/api/user/check`).then((res) => {
        // eslint-disable-next-line no-unused-expressions
        this.isLogin = true
        console.log('目前狀態已登入')
      }).catch((err) => {
        console.log(this.$router)
        Swal.fire({
          title: `${err.response.data.message}`,
          confirmButtonText: '確定'
        })
          .then((result) => {
          // 驗證失敗轉回登入頁面
            this.$router.push('/admin/adminLogin')
          })
      })
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>

<style scoped lang="scss">
// logo
.logo {
  display: block;
  width: 256px;
  height: 64px;
  background-image: url('../../public/coffee_meets_bagel_Logo.svg');
  background-repeat: no-repeat;
  text-indent: 101%;
  overflow: hidden;
  white-space: nowrap;
}
.navbar{
  background: $colorChart-bg-color;
}
</style>
