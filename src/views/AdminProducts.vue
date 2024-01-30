<script>
  const host = import.meta.env.VITE_HEXAPI;
  const path = import.meta.env.VITE_USER_PATH;

export default {
  data() {
    return {
      text: '1234564789',
      products: [],
    }
  },
  methods: {
    getProducts(page = 1) {

      this.axios.get(`${host}/v2/api/${path}/products?pages=${page}`)
        .then((response) => {
          console.log("資料取得成功");
          console.log(response.data.products);
          this.products = response.data.products;
        })
        .catch((error) => {
          console.log("資料取得失敗");
          console.error(error);
        });
    },
    testLogin() {
      const user = {
        username: 'tingyu1112@gmail.com',
        password: 'cmbSideProject'

      }
      this.axios.post(`${host}/v2/admin/signin`, user)
      .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log("資料取得失敗");
          console.error(error);
        });
    }
  },
  mounted() {
    this.getProducts()
    // this.testLogin()
  },
}
</script>

<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

  <div class="d-flex">
    <!-- 後台側邊欄位, 之後拆元件 -->
    <div class="sidebar">
      {{ text }}
    </div>
    <div class="container">
      <div class="row">
        <div class="col-3 py-3 my-3">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="請輸入搜尋資料">
            <button type="button" class="btn btn-outline-success d-flex align-items-center">
              <span class="material-symbols-outlined">
                search
              </span>
            </button>
          </div>
        </div>
        <div class="col-3 py-3 my-3">
          <select class="form-select form-select" aria-label=".form-select-sm example">
            <option selected>請選擇販售狀態</option>
            <option value="1">One</option>
          </select>
        </div>

      </div>
      <div class="border rounded p-3">
        <div v-for="product in products" class="card d-flex">
          <img src="" class="card-img-top" alt="#">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
              content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>

    </div>


  </div>
</template>

<style scoped lang="scss">
.sidebar {
  width: 300px;
  height: 100vh;
  background: #D9D9D9;
}

::placeholder {
  color: rgb(179, 175, 175);
}
</style>