<script>
import Test_components_01 from "../components/Test_components_01.vue";
export default {
  components: {
    Test_components_01,
  },
  data() {
    return {
      test: "歡迎來到首頁",
    };
  },
  mounted() {
    console.log(this.test);
  },
};
</script>

<template>
  <main>
    <h1>{{ test }}</h1>
    <Test_components_01 />
  </main>
</template>
