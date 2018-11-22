<template>
    <div>
        <x-header title="微信" :left-options="{backText:''}" :right-options="{showMore:false}">
            <!-- <icon slot="right" type="ios-plus-empty"></icon> -->
            <!-- {{text}} -->
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


