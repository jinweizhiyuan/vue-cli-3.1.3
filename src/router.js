import Vue from 'vue'
import Router from 'vue-router'
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
        component: () => import('@/views/public/MainFrame.vue'),
        children: [{
            path: '',
            redirect: 'message'
        }, {
            path: 'message',
            component: () => import('@/views/Message.vue')
        }, {
            path: 'addrList',
            component: () => import('@/views/AddrList.vue')
        }, {
            path: 'find',
            component: () => import('@/views/Find.vue')
        }, {
            path: 'me',
            component: () => import('@/views/Me.vue')
        }]
    }]
})

export default router;