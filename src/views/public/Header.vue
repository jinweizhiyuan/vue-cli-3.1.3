<template>
    <div>
        <x-header title="微信" :left-options="{backText:text, preventGoBack:true}" :right-options="{showMore:false}" @on-click-back="back">
            <div slot="right" @click="rightHandler">
                <x-icon type="ios-search"></x-icon>
                <x-icon type="ios-plus-empty"></x-icon>
            </div>
        </x-header>
    </div>
</template>

<script>
import { XHeader } from 'vux'

export default {
    data() {
        return {
            text:''
        }
    },

    methods: {
        rightHandler: function(e) {
            // console.log(e)
        },
        back(){
            this.$store.commit('add_direction', 'slide-right')
            this.$router.back()
        }
    },

    components: {
        XHeader
    }
}
</script>

<style lang="less" scoped>
.vux-x-icon {
  fill: white;
}
</style>


