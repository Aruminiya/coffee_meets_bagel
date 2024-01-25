<script>
import ModalComponent from "@/components/ModalComponent.vue";
export default {
  components: { ModalComponent },
  props: { item: { type: Object, require: true } },
  data() {
    return {
      isModal: false,
    };
  },
  methods: {
    // 執行打開 Modal 呈現該筆資料
    showProductModalDetail() {
      this.isModal = true;
    },
  },
};
</script>

<template>
  <div
    class="cartProductInfo position-relative"
    @click="showProductModalDetail()"
  >
    <button
      type="button"
      class="deleteBtn position-absolute end-0 badge rounded-pill text-bg-dark"
    >
      -
    </button>
    <div class="d-flex rounded shadow-sm p-3 my-3">
      <div class="imgContainer me-2">
        <img
          class="w-100 h-100 object-fit-cover rounded"
          :src="item.product.imageUrl"
          :alt="item.title"
        />
      </div>
      <br />
      <div class="contentContainer position-relative">
        <span
          ><h4 class="d-inline-block">{{ item.product.title }} &nbsp;</h4>
          <h6 class="badge rounded-pill text-bg-primary">
            {{ item.product.category }}
          </h6></span
        >
        <h6>{{ item.product.content }}</h6>
        <p>選擇數量： {{ item.qty }}</p>
      </div>
      <h5 class="position-absolute bottom-0 end-0 m-2">NT$ {{ item.total }}</h5>
    </div>
  </div>

  <!-- Modal -->

  <ModalComponent
    :isModal="isModal"
    @isClosed="isModal = false"
    @isOpened="isModal = true"
  >
    <h1>產品資訊</h1>
    {{ item }}
  </ModalComponent>
</template>

<style lang="scss" scoped>
.cartProductInfo {
  cursor: pointer;
}
.imgContainer {
  width: 120px;
  height: 120px;
}
</style>
