<template>
<div>
    <x-header :title="user.userName" :left-options="{backText:''}" :right-options="{showMore:true}" @click-click-more="moreHandler" />
    <view-box class="chat-body max-view-box" ref="chatBody">
        <ul class="chat-list">
            <!-- <li>
                <span class="icon"><img :src="icon1" /></span>
                <div>今天吃了吗</div>
            </li>
            <li class="self">
                <span class="icon"><img :src="icon2" /></span>
                <div>刚刚吃过行饭</div>
            </li> -->

            <li v-for="(obj, index) in receiveMsg" :key="index" :class="{self: obj.self}">
                <span class="icon"><img :src="obj.self ? currentUser.portrait : user.portrait" /></span>
                <div>{{ printMsg(obj) }}</div>
            </li>
        </ul>
    </view-box>
    <group class="footer">
        <x-input type="text" placeholder="请输入消息后回车" v-model="msg" @on-enter="sendMsg"></x-input>
    </group>
</div>
</template>

<script>
import { ViewBox, XHeader, XInput, Group } from "vux";
import { mapState, mapGetters, mapMutations } from 'vuex'
import { TweenLite } from 'gsap/TweenLite'
// import icon1 from '@/assets/logo.png'
// import icon2 from '@/assets/icon.jpg'

export default {
    components: {
        'view-box': ViewBox,
        'x-header': XHeader,
        XInput,
        Group
    },

    data() {
        return {
           user:'',
           msg:''
        }
    },

    computed: {
        ...mapState(['broadcast', 'currentUser', 'socket']),
        ...mapGetters(['get_user_by_name']),
        receiveMsg() {
            return this.broadcast[this.user.userName]
        }
    },

    methods: {
        ...mapMutations(['add_message', 'update_user']),
        moreHandler() {
            
        },
        sendMsg(val) {
            let msg = {
                from: this.currentUser.userName,
                to: this.user.userName,
                message:val,
                isRead: false
            }
            this.socket.send(msg)
            this.add_message(msg)
            this.msg = '';
        },
        printMsg(o) {
            o.isRead = true
            return o.message
        }
    },
    created(){
        let userName = this.$route.query.userName
        this.user = this.get_user_by_name(userName)
        this.user.msgCount = 0
        this.update_user(this.user)
    },
    watch: {
        receiveMsg(){
            let userName = this.$route.query.userName
            this.user = this.get_user_by_name(userName)
            this.user.msgCount = 0
            this.update_user(this.user)

            //消息列表向下滚动
            let $chatBody = this.$refs.chatBody.$el.firstElementChild
            let scroll = $chatBody.scrollHeight - $chatBody.offsetHeight
            TweenLite.to($chatBody, 1, {scrollTop: scroll})
        }
    }
};
</script>

<style lang="less" scoped>
.chat-list {
    li {
        list-style: none;
        margin-top: 1em;
        margin-left: 1em;
        margin-right: 1em;

        &.self {
            direction: rtl;
            text-align: right;
        }

        >.icon img {
            width: 3em;
            vertical-align: middle;
        }

        >div {
            margin-left: 0.5em;
            position: relative;
            display: inline-block;
            background-color: white;
            padding: 0.5em;
            border-radius: 0.5em;
        }
        > div:nth-child(even) {
            margin-right: 0.5em;
            margin-left: auto;
        }

         & > div::before {
            content: "";
            position: absolute;
            left: -1em;
            top: calc((100% - 1em) / 2);
            border-width: 0.5em;
            border-color: transparent;
            border-right-color: white;
            border-style: solid;
        }
        &.self > div:before {
            left: auto;
            right: -1em;
            border-color: transparent;
            border-left-color: white;
        }
        &.self > div {
            background-color: #A1E760;
        }
    }
}
// .weui-tabbar {
//     display:block;;
// }

</style>

<style lang="less">
.footer {
    height: 53px;
    overflow: hidden;
    & > div {
        margin: 0
    }
}
</style>

