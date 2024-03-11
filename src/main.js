// 外部套件
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

// 內部資源
import './assets/boostrapCustom.scss'
// import "../src/assets/_variables.scss"
// import "./assets/main.scss"

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(VueAxios, axios)
app.use(VueSweetalert2)
app.use(router)
app.component('LaodingOverlay', Loading)

app.mount('#app')
