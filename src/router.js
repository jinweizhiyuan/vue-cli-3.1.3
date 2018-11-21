import Vue from 'vue'
import Router from 'vue-router'
// import MainFrme from "./views/MainFrme.vue";

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: () => import('@/views/MainFrame.vue'),
        children: [
            {
                path: '',
                component: () => import('@/views/Message.vue')
            }
        ]
    }]
})