<script>
// 把需要的語系 驗證 驗證規則引入

import * as VeeValidate from "vee-validate";
import * as VeeValidateI18n from "@vee-validate/i18n";
import * as VeeValidateRules from "@vee-validate/rules";

// 中文語系 JSON
import zh_TW from "../assets/zh_TW.json";
console.log(VeeValidateRules);
// 表單驗證規則全部引入使用
Object.keys(VeeValidateRules).forEach((rule) => {
  VeeValidate.defineRule(rule, VeeValidateRules[rule]);
});

// 讀取外部的資源
VeeValidateI18n.localize({
  zh_TW,
});
// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize("zh_TW"),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {},
  },
};
</script>

<template>
  <v-form v-slot="{ errors }" @submit="onSubmit">
    {{ errors }}
    <v-field
      id="email"
      name="email"
      type="email"
      class="form-control"
      :class="{ 'is-invalid': errors['email'] }"
      placeholder="請輸入 Email"
      rules="email|required"
      v-model="user.email"
    ></v-field>
    <error-message name="email" class="invalid-feedback"></error-message>

    <v-field
      id="password"
      name="password"
      type="password"
      class="form-control"
      :class="{ 'is-invalid': errors['password'] }"
      placeholder="請輸入密碼"
      rules="min:8|required"
      v-model="user.password"
    ></v-field>
    <error-message name="password" class="invalid-feedback"></error-message>
  </v-form>

  <!-- <form>
    <div class="orderFrom p-5 rounded shadow-sm">
      <label for="email">電子信箱:</label>
      <input
        class="form-control"
        type="email"
        id="email"
        name="email"
        required
      /><br />
      <label for="name">姓名:</label>
      <input
        class="form-control"
        type="text"
        id="name"
        name="name"
        required
      /><br />
      <label for="phone">電話:</label>
      <input
        class="form-control"
        type="tel"
        id="phone"
        name="phone"
        required
      /><br />
      <label for="address">住址:</label>
      <input
        class="form-control"
        type="text"
        id="address"
        name="address"
        required
      /><br />
      <label for="comments">備註:</label>
      <textarea
        class="form-control"
        id="comments"
        name="comments"
        rows="4"
        cols="50"
        style="resize: none"
      ></textarea>
    </div>
    <br />
    <button type="button" class="btn btn-dark w-100">
      <h5 class="m-1">送出資訊</h5>
    </button>
  </form> -->
</template>
