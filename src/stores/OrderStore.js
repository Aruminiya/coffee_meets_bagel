import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

// or via CommonJS

export default defineStore("OrderStore", {
  //data, methods, computed
  //state, actions, getters
  state: () => ({
    OrderEstablished: false,
  }),
  getters: {},
  actions: {
    //訂單結帳
    orderCheckout(personInfo) {
      console.log("送出訂單", personInfo);

      const host = import.meta.env.VITE_HEXAPI;
      const path = import.meta.env.VITE_USER_PATH;

      axios
        .post(`${host}/v2/api/${path}/order`, personInfo)
        .then((res) => {
          localStorage.setItem("checkout", JSON.stringify(res));
          // 確認送出訂單
          this.OrderEstablished = true;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});
