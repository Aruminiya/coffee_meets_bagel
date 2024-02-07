import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 參考 https://ithelp.ithome.com.tw/articles/10301528
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/main.scss";`,
      },
    },
  },
  base: "coffee_meets_bagel/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
