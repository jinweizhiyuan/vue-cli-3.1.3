import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
// import MainFrme from "./views/MainFrme.vue";

Vue.use(Router)

let router = new Router({
  routes: [{
    path: '',
    name: 'root',
    redirect: '/login'
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
  }, {
    path: '/multi-part/message/groupInfo',
    component: () => import('@/views/single/GroupInfo.vue')
  }, {
    path: '/multi-part/message/groupDetail',
    component: () => import('@/views/single/GroupDetail.vue')
  }, {
    path: '/login',
    component: () => import('@/views/single/Login.vue')
  }, {
    path: '/regist',
    component: () => import('@/views/single/Regist.vue')
  }, {
    path: '/create-group',
    component: () => import('@/views/single/CreateGroup.vue')
  }]
})

router.beforeEach((to, from, next) => {
  
  let toDepth = to.path.split('/').length

  // 刷新后socket丢失
  let toPath
  if (!store.state.socket && (to.path != '/login' && to.path != '/regist')) {
    toPath = '/login'
    toDepth = toPath.split('/').length
  }

  let fromDepth = from.path.split('/').length
  store.commit('update_direction', toDepth < fromDepth ? 'slide-right' : 'slide-left')
  next(toPath)
  
})

export default router