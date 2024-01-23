<script></script>

<template>
  <div class="container text-center">
    <div class="row position-relative">
      <div class="col-4 d-flex justify-content-center">
        <div class="step d-flex justify-content-center align-items-center m-0">
          <h3 class="m-0">1</h3>
        </div>
      </div>
      <div class="col-4 d-flex justify-content-center">
        <div class="step d-flex justify-content-center align-items-center m-0">
          <h3 class="m-0">2</h3>
        </div>
      </div>
      <div class="col-4 d-flex justify-content-center">
        <div class="step d-flex justify-content-center align-items-center m-0">
          <h3 class="m-0">3</h3>
        </div>
      </div>
      <div class="col-12 line position-absolute h-100">
        <div class="h-100 d-flex justify-content-center align-items-center">
          <hr class="m-0" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/main.scss";

hr {
  border: solid 2px;
  opacity: 1;
  z-index: -3;
  width: 70%;
}
.step {
  background-color: $TestGray;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: $white;
}
</style>
