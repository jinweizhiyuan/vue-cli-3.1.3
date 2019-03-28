<template>
<div>
    <x-header :title="user.userName" :left-options="{backText:''}" :right-options="{showMore:false}" />
    <view-box class="view-box" ref="chatBody">
       <grid :cols="3" :show-lr-borders="true">
           <grid-item :label="u.userName" :icon="u.portrait" v-for="u in users" :key="u._id"></grid-item>
       </grid>
    </view-box>
</div>
</template>

<script>
import { ViewBox, XHeader, Grid, GridItem } from 'vux'

export default {
    components: {
        ViewBox,
        XHeader,
        Grid,
        GridItem
    },

    data() {
        return {
            user: '',
            users: ''
        }
    },

    computed: {

    },

    methods: {
    },

    created(){
        var vm = this
        this.user = this.$route.query
        this.axios.post('api/groupUserList', {id: this.$route.query._id}).then(result => {
            vm.users = result.data
        })
    }
};
</script>

<style lang="less" scoped>
.view-box {
    height: calc(100% - 46px) !important;
}
.weui-grids {
    background-color: #fff;
}
</style>
