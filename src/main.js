import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vux/dist/vux.min.js'
import 'vux/dist/vux.min.css'

import 'font-awesome/css/font-awesome.min.css'
import '@/assets/css/public.css'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(vux.vuxToastPlugin)

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
