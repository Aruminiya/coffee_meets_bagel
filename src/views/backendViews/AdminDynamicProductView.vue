<script>
const host = import.meta.env.VITE_HEXAPI;
const path = import.meta.env.VITE_USER_PATH;

import adminNav from '../../components/BackendOffcanvasNav.vue';
import adminLogo from '../../components/BackendLogoComponent.vue';

export default{
  data() {
    return {
      product: {}
    }
  },
  
  components: {
    adminNav,
    adminLogo
  },
  methods: {
    openOffCanvasNav () {
      this.$refs.backendNav.openNav();
    },
  },
  mounted() {
    // this.product = product
    console.log(this.$route);
    console.log(this.$router);
    // 取得路油的產品ID
    const id = this.$route.params.id;
    this.axios.get(`${host}/v2/api/${path}/product/${id}`)
        .then((res) => {
          console.log(res.data);
          this.product = res.data.product
        })
        .catch((err) => {
          console.log(err);
        });
  },
}
</script>

<template>
  <div>
    <div>
      <!-- LOGO元件 -->
      <adminLogo :open-off-canvas-nav="openOffCanvasNav"></adminLogo>
      <!-- 側邊欄位元件 -->
      <adminNav ref="backendNav"></adminNav>
    </div>
    <div class="container">
      <pre>
        {{ product }}
      </pre>

    </div>
  </div>
</template>