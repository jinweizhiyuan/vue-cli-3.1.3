<template>
    <div>
        <x-header :left-options="{backText: '建群'}" :right-options="{showMore: false}">
            <div slot="right" @click="createGroup">
                <x-button type="primary" :disabled="selectUsers.length <= 0" action-type="button" mini style="line-height:30px;height:30px;top:-5px;color:white;">创建</x-button>
            </div>
        </x-header>
        <view-box>
            <checker v-model="selectUsers" type="checkbox" default-item-class="checker-item" selected-item-class="checker-item-checked" disabled-item-class="">
                <checker-item v-for="u in users" :value="u._id" :key="u.userName">
                    <img :src="u.portrait" />
                    {{ u.userName }}
                </checker-item>
            </checker>
        </view-box>
    </div>
</template>

<script>
import { XHeader, ViewBox, Checker, CheckerItem, XButton } from 'vux'
import { mapState, mapMutations } from 'vuex'
import _ from 'lodash'

export default {
    data() {
        return {
            selectUsers: []
        }
    },

    components: {
        XHeader,
        ViewBox,
        Checker,
        CheckerItem,
        XButton
    },

    computed: {
        ...mapState(['users', 'currentUser'])
    },

    methods: {
        createGroup() {
            let users = _.cloneDeep(this.selectUsers),
                vm = this
            users.push(vm.currentUser._id)
            vm.axios.post('api/createGroup',{users: users}).then((result) => {
                // 群已存在时不提示
                !result.data.length && vm.$vux.toast.show({
                    text: '创建群成功',
                    type: 'success'
                })
                vm.add_group(result.data)
                vm.$router.push({path:'/multi-part/message/groupInfo', query: result.data[0] || result.data})
            })
        },
        ...mapMutations(["add_group"])
    }
}
</script>

<style lang="less">
.checker-item {
    position: relative;
    display: block !important;
    background-color: #fff;

    img {
        width: 5em;
        vertical-align: middle;
        margin-right: 0.5em;
    }

}

.checker-item-checked::after {
    content: "\EA08";
    position: absolute;
    right: 1em;
    top: 50%;
    transform: translateY(-50%);
    font-family: weui;
    font-size: 2em;
    color: #09bb07;
}
</style>
