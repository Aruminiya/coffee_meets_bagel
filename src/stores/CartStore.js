import { defineStore } from "pinia";
import axios from "axios";

export const cartStore = defineStore("cartStore", {
  state: () => ({
    carts: {},
  }),
  actions: {
    getCarts: () => {
      const host = import.meta.env.VITE_HEXAPI;
      const path = import.meta.env.VITE_USER_PATH;

      axios
        .get(`${host}/v2/api/${path}/cart`)
        .then((res) => {
          const { carts } = res.data.data;
          this.carts = carts;
          console.log(this.carts);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});
