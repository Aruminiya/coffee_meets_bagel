<script>
export default {
  data() {
    return {
      test: "這是測試用組件 ",
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
    <p>Test_components_02</p>
  </div>
</template>

<style lang="scss" scoped>
.test {
  border: solid 1px;
  display: inline-block;
  h3 {
    color: rgb(0, 150, 7);
  }
  p {
    color: rgb(255, 94, 0);
  }
}
</style>
