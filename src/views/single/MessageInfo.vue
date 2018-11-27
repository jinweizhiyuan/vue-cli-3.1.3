<template>
    <view-box class="chat-body max-view-box">
        <x-header :title="title" :left-options="{backText:''}" :right-options="{showMore:true}" @click-click-more="moreHandler" />
        <ul class="chat-list">
            <li>
                <span class="icon"><img :src="icon1" /></span>
                <div>今天吃了吗</div>
            </li>
            <li class="self">
                <span class="icon"><img :src="icon2" /></span>
                <div>刚刚吃过行饭</div>
            </li>
        </ul>
    </view-box>
</template>

<script>
import { ViewBox, XHeader } from "vux";
import icon1 from '@/assets/logo.png'
import icon2 from '@/assets/icon.jpg'

export default {
    components: {
        'view-box': ViewBox,
        'x-header': XHeader
    },

    data() {
        return {
            title: '张三',
            icon1,
            icon2
        }
    },

    methods: {
        moreHandler(){
            
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
        &:nth-child(even) > div:before {
            left: auto;
            right: -1em;
            border-color: transparent;
            border-left-color: white;
        }
    }
}
</style>
