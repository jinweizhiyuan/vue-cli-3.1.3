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
import { mapState } from 'vuex'

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
        ...mapState(['users'])
    },
    methods: {
        createGroup() {
            let users = Object.assign({}, this.selectUsers)
            console.log(users)
            // return
            this.axios.post('api/createGroup',{users: users}).then((result) => {
                console.log(result)
                //TODO: 跳转到群聊天页面
            })
        }
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
