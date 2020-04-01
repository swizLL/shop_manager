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
//配置请求拦截器
//axios配置请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
//将axios封装为vue属性
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
