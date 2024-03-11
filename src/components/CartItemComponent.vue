<script>
export default {
  props: {
    item: { type: Object, require: true },
    editMode: { type: Boolean, default: true }
  },

  emits: ['cartItemClicked', 'deleteItemClicked', 'editItemClickedEmit'],
  data () {
    return {
      tempItem: { ...this.item },
      isEditMode: true,
      timer: null // 将 timer 变量定义在 data 中
    }
  },
  methods: {
    // 防手抖 debounce

    deleteItemClickedEmit () {
      if (this.editMode) {
        this.$emit('deleteItemClicked')
      }
    },
    cartItemClickedEmit () {
      if (this.editMode) {
        this.$emit('cartItemClicked')
      }
    },
    editItemClickedEmit (calculate) {
      if (this.editMode) {
        if (calculate === '+') {
          this.tempItem.qty++
          // 這邊是 debounce 的運用
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            // console.log(this.tempItem);
            this.$emit('editItemClickedEmit', this.tempItem)
          }, 500)
        } else if (calculate === '-' && this.tempItem.qty > 1) {
          this.tempItem.qty--
          // 這邊是 debounce 的運用
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            // console.log(this.tempItem);
            this.$emit('editItemClickedEmit', this.tempItem)
          }, 500)
        } else if (calculate === 'blur') {
          parseInt(this.tempItem.qty)
          if (this.tempItem.qty > 0) {
            if (this.tempItem.qty !== this.item.qty) {
              this.$emit('editItemClickedEmit', this.tempItem)
            }
          } else {
            this.tempItem.qty = this.item.qty
          }
        } else {
          console.warn('無效的計算')
        }
      }
    }
  },
  watch: {
    editMode (newVal) {
      console.log(newVal)
      this.isEditMode = newVal
    },
    item (n, o) {
      // console.log(n,o);
      this.tempItem = { ...n }
    }
  }
}
</script>

<template>
  <!-- <h6>{{ item }}</h6> -->
  <!-- <p>{{ tempItem }}</p> -->

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
        <span v-if="tempItem.product.is_recommend"
          ><i class="fa-solid fa-crown me-1 text-warning"></i
        ></span>
        <span
          ><h6 class="d-inline-block">{{ tempItem.product.title }} &nbsp;</h6>
          <p class="badge rounded-pill">
            {{ tempItem.product.category }}
          </p></span
        >
        <p>{{ tempItem.product.content }}</p>

        <p v-if="editMode" class="tempItemQty">
          選擇數量：<button @click="editItemClickedEmit('-')">-</button>
          <input
            type="number"
            v-model.lazy="tempItem.qty"
            @blur="editItemClickedEmit('blur')"
          /><button @click="editItemClickedEmit('+')">+</button>
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

// 隱藏數字輸入框的箭頭
/* Chrome, Safari, Edge, Opera */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
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
