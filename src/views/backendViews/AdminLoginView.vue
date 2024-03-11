<script>
import Swal from 'sweetalert2'

const host = import.meta.env.VITE_HEXAPI

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.axios.post(`${host}/v2/admin/signin`, this.user)
        .then((res) => {
          // 把回傳的 token 及 expired timestamp 用解構賦值方式存成同名變數
          const { token, expired } = res.data
          // 把 token 及 expired 存到 cookie
          document.cookie = `florafirstapi=${token}; expires=${new Date(expired)}`
          // document.cookie = `floraFirstApiToken=${token}; expires=${new Date(expired)}`;
          Swal.fire('登入成功, 將前往後台首頁')
          this.$router.push('/admin')
        }).catch(() => {
          Swal.fire('登入資訊錯誤, 請檢察您的帳號密碼')
        })
    }
  }
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center login">
    <div class="border border-primary rounded-4 p-3">
      <div class="my-4 text-center">
        <h1 class="logo">CoffeeMeetsBagel</h1>
      </div>
      <h5 class="text-primary mb-4 text-center">請先登入</h5>
      <div class="d-flex flex-column align-items-center">
        <input class="form-control login__item rounded-pill mb-4" placeholder="請輸入您的帳號" v-model="user.username"
          type="text">
        <input class="form-control login__item rounded-pill mb-4" placeholder="請輸入您的密碼" v-model="user.password"
          type="password">
        <button class="form-control login__item btn btn-outline-primary rounded-pill mb-4" @click="login"
          type="submit">登入</button>
        <router-link to="/" class="nav-link text-primary text-decoration-none" href="#">
          返回前台
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  background-image: url('https://github.com/Aruminiya/coffee_meets_bagel/blob/main/public/Banner.png?raw=true');
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: contain;
  height: 100vh;

  &__item {
    width: 80%;
  }
}

img {
  width: 300px;
  height: 100px;
}

.logo {
  display: block;
  width: 256px;
  height: 64px;
  background-image: url('https://raw.githubusercontent.com/Aruminiya/coffee_meets_bagel/5877d13e0a58875cc2ff664f660742db35fcf2b1/public/coffee_meets_bagel_Logo.svg');
  background-repeat: no-repeat;
  background-position: center;
  text-indent: 101%;
  overflow: hidden;
  white-space: nowrap;
}

</style>
