<script>
// 把需要的語系 驗證 驗證規則引入

import * as VeeValidate from "vee-validate";
import * as VeeValidateI18n from "@vee-validate/i18n";
import * as VeeValidateRules from "@vee-validate/rules";

// 中文語系 JSON
import zh_TW from "../assets/zh_TW.json";
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
  components: {
    VForm: VeeValidate.Form,
    VField: VeeValidate.Field,
    ErrorMessage: VeeValidate.ErrorMessage,
  },
  data() {
    return {
      user: {
        email: "",
        name: "",
        tel: "",
        address: "",
        message: "",
      },
    };
  },
  methods: {
    onSubmit(event) {
      const { address, email, name, tel, message } = event;
      const personInfo = {
        data: {
          user: {
            name,
            email,
            tel,
            address,
          },
          message,
        },
      };
      console.log(personInfo);
      localStorage.setItem("personInfo", JSON.stringify(personInfo));
      this.$router.push("/orderCheckView/step2");
    },

    // 電話驗證規則
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需要正確的電話號碼";
    },
  },
};
</script>

<template>
  <v-form v-slot="{ errors }" @submit="onSubmit($event)" class="p-2">
    {{ errors }}
    <v-field
      id="email"
      name="email"
      type="email"
      class="form-control my-2"
      :class="{ 'is-invalid': errors['email'] }"
      placeholder="請輸入 Email"
      rules="email|required"
      v-model="user.email"
    ></v-field>
    <error-message name="email" class="invalid-feedback"></error-message>

    <v-field
      id="name"
      name="name"
      type="text"
      class="form-control my-2"
      :class="{ 'is-invalid': errors['name'] }"
      placeholder="請輸入姓名"
      rules="required"
      v-model="user.name"
    ></v-field>
    <error-message name="name" class="invalid-feedback"></error-message>

    <v-field
      id="tel"
      name="tel"
      type="text"
      class="form-control my-2"
      :class="{ 'is-invalid': errors['tel'] }"
      placeholder="請輸入電話"
      :rules="isPhone"
      v-model="user.tel"
    ></v-field>
    <error-message name="tel" class="invalid-feedback"></error-message>

    <v-field
      id="address"
      name="address"
      type="text"
      class="form-control my-2"
      :class="{ 'is-invalid': errors['address'] }"
      placeholder="請輸入地址"
      rules="required"
      v-model="user.address"
    ></v-field>
    <error-message name="address" class="invalid-feedback"></error-message>

    <v-field
      v-slot="{ field }"
      id="message"
      name="message"
      type="text"
      :class="{ 'is-invalid': errors['message'] }"
      v-model="user.message"
    >
      <textarea
        v-bind="field"
        class="form-control my-2"
        :class="{ 'is-invalid': errors['message'] }"
        placeholder="請輸入備註"
        name="message"
        cols="0"
        rows="5"
        v-model="user.message"
      ></textarea>
    </v-field>
    <error-message name="message" class="invalid-feedback"></error-message>
    <!-- click.stop 要阻止點擊事件被傳入 -->
    <button class="btn btn-primary w-100" type="submit">送出資訊</button>
  </v-form>

  {{ user }}
</template>
<style lang="scss" scoped></style>
