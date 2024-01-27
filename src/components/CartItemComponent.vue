<script>
export default {
  props: {
    item: { type: Object, require: true },
    showDeleteItemBtn: { type: Boolean, default: true },
  },
  emits: ["cartItemClicked", "deleteItemClicked"],
};
</script>

<template>
  <div class="cartProductInfo position-relative">
    <button
      v-if="showDeleteItemBtn"
      type="button"
      class="deleteBtn position-absolute end-0 badge rounded-pill text-bg-dark"
      @click="$emit('deleteItemClicked')"
    >
      -
    </button>
    <div
      class="d-flex rounded shadow-sm p-3 my-3"
      @click="$emit('cartItemClicked')"
    >
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
</template>

<style lang="scss" scoped>
.cartProductInfo {
  cursor: pointer;
}
.imgContainer {
  width: 120px;
  height: 120px;
}
.checkProductInfo {
  width: 500px;
}
</style>
