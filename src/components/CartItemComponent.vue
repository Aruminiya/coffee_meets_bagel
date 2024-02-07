<script>
export default {
  props: {
    item: { type: Object, require: true },
    editMode: { type: Boolean, default: true },
  },

  emits: ["cartItemClicked", "deleteItemClicked"],
  data() {
    return {
      tempItem: { ...this.item },
    };
  },
  methods: {
    deleteItemClickedEmit() {
      if (this.editMode) {
        this.$emit("deleteItemClicked");
      }
    },
    cartItemClickedEmit() {
      if (this.editMode) {
        this.$emit("cartItemClicked");
      }
    },
  },
};
</script>

<template>
  <!-- <h6>{{ item }}</h6>
  <p>{{ tempItem }}</p> -->

  <div class="cartItem position-relative">
    <button
      v-if="editMode"
      type="button"
      class="deleteBtn position-absolute end-0 m-1 badge rounded-pill"
      @click="deleteItemClickedEmit()"
    >
      <i class="deleteIcon bi bi-x-lg"></i>
    </button>
    <div
      class="imgSection d-flex flex-sm-row rounded shadow-sm p-3 my-3"
      @click="cartItemClickedEmit()"
    >
      <div class="imgContainer me-2">
        <img
          class="w-100 h-100 object-fit-cover rounded"
          :src="tempItem.product.imageUrl"
          :alt="tempItem.title"
        />
      </div>
      <br />
      <div class="contentContainer position-relative">
        <span
          ><h6 class="d-inline-block">{{ tempItem.product.title }} &nbsp;</h6>
          <p class="badge rounded-pill">
            {{ tempItem.product.category }}
          </p></span
        >
        <p>{{ tempItem.product.content }}</p>

        <p v-if="editMode" class="tempItemQty">
          選擇數量：<button @click="tempItem.qty--">-</button>
          <input type="text" v-model="tempItem.qty" /><button
            @click="tempItem.qty++"
          >
            +
          </button>
        </p>
        <p v-else>選擇數量：{{ tempItem.qty }}</p>
      </div>
      <h6 class="position-absolute bottom-0 end-0 m-2">
        NT$ {{ tempItem.total }}
      </h6>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1,
h2,
h3,
h4,
h5,
h6,
p {
  color: $colorChart-Accessory-200;
  margin: 2px;
}
.badge {
  background-color: $colorChart-Accessory-200;
}
button {
  border: none;
}
.badge {
  color: $colorChart-Gray-100;
}
.deleteBtn {
  background-color: $colorChart-Primary-200;
  border-color: $colorChart-Primary-200;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  width: 22px;
  height: 22px;
  &:hover {
    background-color: darken($colorChart-Primary-200, 10%);
    scale: 1.1;
  }
}

.tempItemQty {
  input {
    // border: solid 1px $colorChart-Accessory-200;
    border: none;
    background: transparent;
    max-width: 2rem;
    text-align: center;
  }

  button {
    width: 1.5rem;
    color: $colorChart-Gray-100;
    background-color: $colorChart-Primary-200;
    border: solid 1px $colorChart-Primary-200;
    border-radius: 3px;
  }
}
.imgSection {
  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
  .imgContainer {
    width: 120px;
    height: 120px;
    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }
}
.checkProductInfo {
  width: 500px;
}
.cartItem {
  background-color: $colorChart-Gray-100;
  border-radius: 8px;
  transition: 0.2s;
  &:hover {
    scale: 1.03;
  }
}
</style>
