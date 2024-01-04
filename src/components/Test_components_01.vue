<script>
export default {
  data() {
    return {
      test: "這是測試用組件",
    };
  },
  mounted() {
    console.log(this.test);
  },
};
</script>

<template>
  <div class="test">
    <h3>{{ test }}</h3>
    <p>Test_components_01</p>
  </div>
</template>

<style lang="scss" scoped>
.test {
  border: solid 1px;
  display: inline-block;
  h3 {
    color: red;
  }
  p {
    color: blue;
  }
}
</style>
