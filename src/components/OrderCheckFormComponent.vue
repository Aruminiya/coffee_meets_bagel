<script>
// 把需要的語系 驗證 驗證規則引入
import * as VeeValidate from 'vee-validate'
import * as VeeValidateI18n from '@vee-validate/i18n'
import * as VeeValidateRules from '@vee-validate/rules'

// 中文語系 JSON
import zhTW from '../assets/zh_TW.json'
// 表單驗證規則全部引入使用
Object.keys(VeeValidateRules).forEach((rule) => {
  VeeValidate.defineRule(rule, VeeValidateRules[rule])
})

// 讀取外部的資源
VeeValidateI18n.localize({
  zhTW
})
// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zhTW'),
  validateOnInput: true // 調整為：輸入文字時，就立即進行驗證
})

export default {
  components: {
    VForm: VeeValidate.Form,
    VField: VeeValidate.Field,
    ErrorMessage: VeeValidate.ErrorMessage
  },
  data () {
    return {
      user: {
        email: '',
        name: '',
        tel: '',
        address: '',
        message: ''
      }
    }
  },
  methods: {
    onSubmit (event) {
      const { Email, 姓名, 電話, 地址, message } = event
      const personInfo = {
        data: {
          user: {
            name: 姓名,
            email: Email,
            tel: 電話,
            address: 地址
          },
          message
        }
      }
      console.log(personInfo)
      localStorage.setItem('personInfo', JSON.stringify(personInfo))
      this.$router.push('/orderCheckView/step2')
    },

    // 電話驗證規則
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    }
  }
}
</script>

<template>
  <section class="shadow-sm p-4">
    <v-form v-slot="{ errors }" @submit="onSubmit($event)" class="p-2">
      <!-- {{ errors }} -->
      <label for="Email" class="mt-2">*Email</label>
      <v-field
        id="email"
        name="Email"
        type="email"
        class="form-control my-2"
        :class="{ 'is-invalid': errors['Email'] }"
        placeholder="請輸入 Email"
        rules="email|required"
        v-model="user.email"
      ></v-field>
      <error-message name="Email" class="invalid-feedback"></error-message>

      <label for="name" class="mt-2">*姓名</label>
      <v-field
        id="name"
        name="姓名"
        type="text"
        class="form-control my-2"
        :class="{ 'is-invalid': errors['姓名'] }"
        placeholder="請輸入姓名"
        rules="required"
        v-model="user.name"
      ></v-field>
      <error-message name="姓名" class="invalid-feedback"></error-message>

      <label for="tel" class="mt-2">*電話</label>
      <v-field
        id="tel"
        name="電話"
        type="text"
        class="form-control my-2"
        :class="{ 'is-invalid': errors['電話'] }"
        placeholder="請輸入電話"
        :rules="isPhone"
        v-model="user.tel"
      ></v-field>
      <error-message name="電話" class="invalid-feedback"></error-message>

      <label for="address" class="mt-2">*地址</label>
      <v-field
        id="address"
        name="地址"
        type="text"
        class="form-control my-2"
        :class="{ 'is-invalid': errors['地址'] }"
        placeholder="請輸入地址"
        rules="required"
        v-model="user.address"
      ></v-field>
      <error-message name="地址" class="invalid-feedback"></error-message>

      <v-field
        v-slot="{ field }"
        id="message"
        name="message"
        type="text"
        :class="{ 'is-invalid': errors['message'] }"
        v-model="user.message"
      >
        <label for="message" class="mt-2">備註</label>
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
  </section>

  <!-- {{ user }} -->
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
}
input {
  color: $colorChart-Accessory-200;
  border: solid 1px $colorChart-Accessory-200;
  background-color: transparent;
  &:focus {
    border-color: $colorChart-Accessory-200; /* 替換為你想要的邊框顏色 */
    box-shadow: 0 0 0px $colorChart-Primary-200; /* 替換為你想要的陰影效果 */
    background-color: transparent;
  }
}
.btn {
  background-color: $colorChart-Logo-Red;
  border-color: $colorChart-Logo-Red;
  &:hover {
    background-color: darken($colorChart-Logo-Red, 10%);
    border-color: darken($colorChart-Logo-Red, 10%);
  }
  &:active {
    background-color: darken($colorChart-Logo-Red, 10%);
    border-color: darken($colorChart-Logo-Red, 10%);
  }
}
.btn02 {
  background-color: $colorChart-Primary-100;
  border-color: $colorChart-Primary-100;
}
.is-invalid {
  border-color: $colorChart-Primary-200; /* 替換為你想要的邊框顏色 */
  box-shadow: 10 10 0px $colorChart-Primary-200; /* 替換為你想要的陰影效果 */
  &:focus {
    border-color: $colorChart-Primary-200;
  }
}
section {
  background-color: $colorChart-Gray-100;
  border-radius: 8px;
}

textarea {
  color: $colorChart-Accessory-200;
  border: solid 1px $colorChart-Accessory-200;
  background-color: transparent;
  resize: none;
  &:focus {
    border-color: $colorChart-Accessory-200; /* 替換為你想要的邊框顏色 */
    box-shadow: 0 0 0px $colorChart-Primary-200; /* 替換為你想要的陰影效果 */
    background-color: transparent;
  }
}
</style>
