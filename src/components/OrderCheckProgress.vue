<script></script>

<template>
  <div class="container text-center">
    <div class="row position-relative">
      <div class="col-4 d-flex flex clow justify-content-center">
        <div class="step d-flex justify-content-center align-items-center m-0">
          <h3 class="m-0">1</h3>
        </div>
        123
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
    <div class="row">
      <div class="col-12">
        <div class="position-relative m-4">
          <div
            class="progress"
            role="progressbar"
            aria-label="Progress"
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
            style="height: 1px"
          >
            <div class="progress-bar" style="width: 50%"></div>
          </div>
          <button
            type="button"
            class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill"
            style="width: 2rem; height: 2rem"
          >
            1
          </button>

          <button
            type="button"
            class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill"
            style="width: 2rem; height: 2rem"
          >
            2
          </button>
          <button
            type="button"
            class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill"
            style="width: 2rem; height: 2rem"
          >
            3
          </button>
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
