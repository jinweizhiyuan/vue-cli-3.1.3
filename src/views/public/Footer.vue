<template>
    <tabbar>
        <tab-item :selected="selected == 0" :link="links[0]" :badge="message_count">
            <i slot="icon" class="fa fa-comments-o" />
            <span slot="label">微信</span>
        </tab-item>
        <tab-item :selected="selected == 1" :link="links[1]">
            <i slot="icon" class="fa fa-address-book-o" />
            <span slot="label">通讯录</span>
        </tab-item>
        <tab-item :selected="selected == 2" :link="links[2]">
            <i slot="icon" class="fa fa-compass" />
            <span slot="label">发现</span>
        </tab-item>
        <tab-item :selected="selected == 3" :link="links[3]">
            <i slot="icon" class="fa fa-user-o" />
            <span slot="label">我</span>
        </tab-item>
    </tabbar>
</template>

<script>
import {Tabbar, TabbarItem} from 'vux'
import { mapGetters } from 'vuex'

export default {
    components: {
        Tabbar,
        'tab-item': TabbarItem
    },

    data() {
        return {
            links:['message', 'addrList', 'find', 'me']
        }
    },
    
    methods: {
    },

    computed: {
        selected() {
            let curLink = this.$route.path.split('/')
            curLink = curLink[curLink.length - 1]
            let index = this.links.findIndex(v => v==curLink)
            return index;
        },
        ...mapGetters(['message_count'])
    }

    // ,watch: {
    //     $route(to) {
    //         console.log(arguments);
    //         if (to.path ==)
    //     }
    // }
}
</script>
