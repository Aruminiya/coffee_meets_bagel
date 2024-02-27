<template>
  <nav class="navbar fixed-top">
    <h1>
      <a class="navbar-brand logo m-0 p-0" role="button" @click="openOffCanvasNav">CoffeeMeetsBagel</a>
    </h1>
  </nav>
</template>

<script>
export default {
  // props 當作 emit
  props: ['openOffCanvasNav']
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
  background: white;
}
</style>