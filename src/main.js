import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import { ToastPlugin } from 'vux'

import 'font-awesome/css/font-awesome.min.css'
import '@/assets/css/public.css'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(ToastPlugin)

new Vue({
  router,
  store,
  created: function() {
    var vm = this
    this.axios.interceptors.response.use(function(response) {
      var data = response.data;
      if (data.code === '1000') {
        return data
      } else {
        vm.$vux.toast.show({
          text: data.message,
          type: 'warn'
        })
        return Promise.reject(data)
      }
    }, function(error) {
      return Promise.reject(error)
    })
  },
  render: h => h(App)
}).$mount('#app')
