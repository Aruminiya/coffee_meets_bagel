import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

// or via CommonJS

export default defineStore("CartStore", {
  //data, methods, computed
  //state, actions, getters
  state: () => ({
    carts: [],
    isCartsLoading: true,
  }),
  getters: {},
  actions: {
    getCarts() {
      const host = import.meta.env.VITE_HEXAPI;
      const path = import.meta.env.VITE_USER_PATH;

      axios
        .get(`${host}/v2/api/${path}/cart`)
        .then((res) => {
          const { carts } = res.data.data;
          this.carts = carts;
          this.isCartsLoading = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    addCarts(item) {
      const host = import.meta.env.VITE_HEXAPI;
      const path = import.meta.env.VITE_USER_PATH;

      axios
        .get(`${host}/v2/api/${path}/cart`)
        .then((res) => {
          const { carts } = res.data.data;
          this.carts = carts;
          this.isCartsLoading = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    deleteCarts(item) {
      const cartid = item.id;

      Swal.fire({
        title: `確定要刪除 ${item.product.title} 嗎?`,
        text: "刪除後將無法還原此操作",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "是 我要刪除",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          this.isCartsLoading = true;

          const host = import.meta.env.VITE_HEXAPI;
          const path = import.meta.env.VITE_USER_PATH;

          axios
            .delete(`${host}/v2/api/${path}/cart/${cartid}`)
            .then((res) => {
              console.log(res);
              this.getCarts();
            })
            .catch((err) => {
              console.error(err);
              Swal.fire({
                title: `刪除商品失敗嗎?`,
                icon: "error",
                confirmButtonText: "確定",
              });
            });
        }
      });
    },
  },
});
