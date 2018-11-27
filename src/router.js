import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
// import MainFrme from "./views/MainFrme.vue";

Vue.use(Router)

let router = new Router({
  routes: [{
    path: '',
    name: 'root',
    redirect: '/multi-part/message'
  }, {
    path: '/multi-part',
    name: 'multi',
    component: () =>
      import('@/views/public/MainFrame.vue'),
    children: [{
      path: '',
      redirect: 'message'
    }, {
      path: 'message',
      component: () =>
        import('@/views/multipart/MessageList.vue')
    }, {
      path: 'addrList',
      component: () =>
        import('@/views/multipart/AddrList.vue')
    }, {
      path: 'find',
      component: () =>
        import('@/views/multipart/Find.vue')
    }, {
      path: 'me',
      component: () =>
        import('@/views/multipart/Me.vue')
    }]
  }, {
    path: '/multi-part/message/messageInfo',
    component: () => import('@/views/single/MessageInfo.vue')
  }]
})

router.beforeEach((to, from, next) => {
  let toDepth = to.path.split('/').length
  let fromDepth = from.path.split('/').length
  store.commit('update_direction', toDepth < fromDepth ? 'slide-right' : 'slide-left')
  next()
})

export default router