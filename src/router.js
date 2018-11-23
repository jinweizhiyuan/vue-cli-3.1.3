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
        component: () =>
            import ('@/views/public/MainFrame.vue'),
        children: [{
            path: '',
            redirect: 'message'
        }, {
            path: 'message',
            component: () =>
                import ('@/views/multipart/MessageList.vue')
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
        path: '/single/message',
        component: () => import('@/views/single/Message.vue')
    }]
})

export default router;