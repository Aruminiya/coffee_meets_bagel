<script>
import Test_components_01 from "../../components/Test_components_01.vue";
import Test_components_02 from "../../components/Test_components_02.vue";
export default {
  components: {
    Test_components_01,
    Test_components_02,
  },
  data() {
    return {
      test: "歡迎來到線上點餐",
      products: [],
    };
  },
  mounted() {
    const host = import.meta.env.VITE_HEXAPI;
    const path = import.meta.env.VITE_USER_PATH;
    this.axios
      .get(`${host}/v2/api/${path}/products/all`)
      .then((response) => {
        console.log("資料取得成功");
        console.log(response.data);
        this.products = response.data;
      })
      .catch((error) => {
        console.log("資料取得失敗");
        console.error(error);
      });
  },
};
</script>

<template>
  <main>
    <h1>{{ test }}</h1>
    <h4 v-if="products.length === 0">Loading...</h4>
    <p v-else>{{ products }}</p>
    <Test_components_01 />
    <Test_components_02 />
  </main>
</template>

<style scoped lang="scss"></style>
