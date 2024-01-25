<script>
export default {
  props: {
    isModal: { type: Boolean },
    animationShow: { type: String, default: "bottom_to_center" },
  },
  emits: ["isOpened", "isClosed"],
  methods: {
    openModal() {
      //   console.log("Modal 打開");
      this.$emit("isOpened");
      const myProductModal = this.$refs.myProductModal;
      const productModalContent = this.$refs.productModalContent;

      myProductModal.style.display = "flex";
      setTimeout(function () {
        myProductModal.style.opacity = "1";
        productModalContent.style.transform = "translateY(0)";
      }, 10);
    },
    closeModal() {
      //   console.log("Modal 關閉");
      this.$emit("isClosed");
      const myProductModal = this.$refs.myProductModal;
      const productModalContent = this.$refs.productModalContent;

      myProductModal.style.opacity = "0";

      setTimeout(function () {
        myProductModal.style.display = "none";
        productModalContent.style.transform = "translateY(100vh)";
      }, 300);
    },
  },
  watch: {
    isModal(newVal, oldVal) {
      //   console.log(newVal, oldVal);
      if (newVal === true) {
        this.openModal();
      } else if (newVal === false) {
        this.closeModal();
      }
    },
  },
};
</script>

<template>
  <!-- <button @click="openModal()">Modal</button> -->
  <div
    id="myProductModal"
    ref="myProductModal"
    class="productModal"
    @click="closeModal()"
    style="display: none; opacity: 0"
  >
    <div
      class="productModal-content"
      ref="productModalContent"
      style="transform: translateY(100vh)"
    >
      <span class="close-btn" @click="closeModal()">&times;</span>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.productModal {
  z-index: 10;
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease-in-out;
  overflow: hidden; /* 隐藏溢出部分，防止页面滚动 */
}
.productModal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  transform: translateY(100%); /* 初始位置在底部 */
  transition: transform 0.5s ease-in-out;
}
.close-btn {
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
