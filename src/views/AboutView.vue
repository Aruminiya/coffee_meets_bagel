<script>
import Test_components_02 from "../components/Test_components_02.vue";
export default {
  components: {
    Test_components_02,
  },
  data() {
    return {
      test: "歡迎來到關於我們",
    };
  },
  mounted() {
    console.log(this.test);
  },
};
</script>
<template>
  <div class="about">
    <h1>{{ test }}</h1>
    <Test_components_02 />
  </div>
</template>

<style></style>
