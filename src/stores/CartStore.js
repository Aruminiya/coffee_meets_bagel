import { defineStore } from "pinia";

export const cartStore = defineStore("cartStore", {
  state: () => ({
    data: {},
  }),
  getters: {
    showProducts: ({ data }) => {
      return data;
    },
  },
});
