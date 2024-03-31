<template>
  <nav class="position-fixed w-100">
    <div class="position-relative w-100 h-100">
      <div class="imgContainer">
        <router-link to="/"
          ><img
            class="mx-1"
            src="../../public/coffee_meets_bagel_Logo.svg"
            alt="coffee_meets_bagel_Logo"
        /></router-link>
      </div>
      <div class="linkBtn d-flex flex-column position-absolute">
        <router-link to="/productList"
          ><img
            class="my-1"
            src="../../public/OrderIcon.svg"
            alt="OrderIcon" /></router-link
        ><router-link to="/fqa"
          ><img
            class="my-1"
            src="../../public/Q&AIcon.svg"
            alt="Q&AIcon" /></router-link
        ><router-link to="/about"
          ><img class="my-1" src="../../public/AbousIcon.svg" alt="AbousIcon"
        /></router-link>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  height: 100vh;
  z-index: 10;
  pointer-events: none;
  .imgContainer {
    pointer-events: auto;
    width: 256px;
    height: 64px;
  }
  .linkBtn {
    pointer-events: auto;
    right: 0;
    bottom: 3rem;
  }
}
</style>
