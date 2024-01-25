import { defineStore } from "pinia";
import axios from "axios";

export default defineStore("CartStore", {
  //data, methods, computed
  //state, actions, getters
  state: () => ({
    carts: {},
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
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});
