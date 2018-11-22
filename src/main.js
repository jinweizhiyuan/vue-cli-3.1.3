import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'font-awesome/css/font-awesome.min.css'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
