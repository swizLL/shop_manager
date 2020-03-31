import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/css/global.css'
import axios from 'axios'

Vue.config.productionTip = false
//设置默认的URL
axios.defaults.baseURL = '/api/private/v1/'
//将axios封装为vue属性
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
