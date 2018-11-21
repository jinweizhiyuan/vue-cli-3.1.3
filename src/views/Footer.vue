<template>
    <tabbar>
        <tab-item>
            <i slot="icon" class="fa fa-comments-o" />
            <span slot="label">微信</span>
        </tab-item>
        <tab-item>
            <i slot="icon" class="fa fa-address-book-o" />
            <span slot="label">通讯录</span>
        </tab-item>
        <tab-item>
            <i slot="icon" class="fa fa-compass" />
            <span slot="label">发现</span>
        </tab-item>
        <tab-item>
            <i slot="icon" class="fa fa-user-o" />
            <span slot="label">我</span>
        </tab-item>
    </tabbar>
</template>

<script>
import {Tabbar, TabbarItem} from 'vux'

export default {
    components: {
        Tabbar,
        'tab-item': TabbarItem
    }
}
</script>
