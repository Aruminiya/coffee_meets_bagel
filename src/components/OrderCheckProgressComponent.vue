<script>
export default {
  props: { step: { type: Number, default: 1 } },
  computed: {
    nowStep() {
      return this.step === 1
        ? "0%"
        : this.step === 2
        ? "50%"
        : this.step === 3
        ? "100%"
        : "無效的步驟";
    },
  },
  mounted() {},
};
</script>

<template>
  <div class="container text-center">
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
            <div class="progress-bar" :style="`width: ${nowStep}`"></div>
          </div>
          <button
            type="button"
            class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-secondary rounded-pill"
            :class="{ doneStep: step === 1 || step === 2 || step === 3 }"
            style="width: 2.5rem; height: 2.5rem"
          >
            1
          </button>
          <button
            type="button"
            class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-secondary rounded-pill"
            :class="{ doneStep: step === 2 || step === 3 }"
            style="width: 2.5rem; height: 2.5rem"
          >
            2
          </button>
          <button
            type="button"
            class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill"
            :class="{ doneStep: step === 3 }"
            style="width: 2.5rem; height: 2.5rem"
          >
            3
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 my-2 px-1">
        <div class="w-100 d-flex justify-content-between">
          <p class="">填寫資料</p>
          <p class="">確認訂單</p>
          <p class="">訂單成立</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/main.scss";

.doneStep {
  background: $TestBlue;
  border-color: $TestBlue;
}
</style>
