import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Mint from "mint-ui"
import 'mint-ui/lib/style.css'
import "lib-flexible/flexible"
import "@/assets/reset.css"
import echarts from "echarts"
import axios from 'axios';
import {Toast} from 'mint-ui';

Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;
Vue.prototype.$toast = Toast;
Vue.prototype.$bus = new Vue();

Vue.use(Mint)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
