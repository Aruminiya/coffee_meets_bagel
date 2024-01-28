<script>
// 把需要的語系 驗證 驗證規則引入

import * as VeeValidate from "vee-validate";
import * as VeeValidateI18n from "@vee-validate/i18n";
import * as VeeValidateRules from "@vee-validate/rules";

// 表單驗證規則全部引入使用
Object.keys(VeeValidateRules).forEach((rule) => {
  VeeValidate.defineRule(rule, VeeValidateRules[rule]);
});

console.log(VeeValidateI18n);
// 讀取外部的資源
VeeValidateI18n.localize({
  zh_TW: {
    messages: {
      alpha: "{field} 須以英文組成",
      alpha_dash: "{field} 須以英數、斜線及底線組成",
      alpha_num: "{field} 須以英數組成",
      alpha_spaces: "{field} 須以英文及空格組成",
      between: "{field} 須介於 0:{min} 至 1:{max}之間",
      confirmed: " {field} 不一致",
      digits: "{field} 須為 0:{length} 位數字",
      dimensions: "{field} 圖片尺寸不正確。須為 0:{width} x 1:{height} 像素",
      email: "{field} 須為有效的電子信箱",
      excluded: "{field} 的選項無效",
      ext: "{field} 須為有效的檔案",
      image: "{field} 須為圖片",
      one_of: "{field} 的選項無效",
      integer: "{field} 須為整數",
      length: "{field} 的長度須為 0:{length}",
      max: "{field} 不能大於 0:{length} 個字元",
      max_value: "{field} 不得大於 0:{max}",
      mimes: "{field} 須為有效的檔案類型",
      min: "{field} 不能小於 0:{length} 個字元",
      min_value: "{field} 不得小於 0:{min}",
      numeric: "{field} 須為數字",
      regex: "{field} 的格式錯誤",
      required: "{field} 為必填",
      required_if: "{field} 為必填",
      size: "{field} 的檔案須小於 0:{size}KB",
    },
  },
});
// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize("zh_TW"),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

export default {};
</script>

<template>
  <form>
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
  </form>
</template>
