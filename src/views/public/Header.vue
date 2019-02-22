<template>
    <x-header title="微信" :left-options="{backText:text, preventGoBack:true}" :right-options="{showMore:false}" @on-click-back="back">
        <div slot="right" @click="rightHandler">
            <!-- <x-icon type="ios-search"></x-icon> -->
            <x-icon type="ios-plus-empty"></x-icon>
        </div>
        <actionsheet v-transform-dom v-model="showAcion" :menus="menus" @on-click-menu="doAction"></actionsheet>
    </x-header>
</template>

<script>
import { XHeader, Actionsheet } from 'vux'

export default {
    data() {
        return {
            text:'',
            showAcion: false,
            menus:{createGroup:'建群'}
        }
    },

    methods: {
        rightHandler: function(e) {
            this.showAcion = true
        },
        back(){
            this.$store.commit('add_direction', 'slide-right')
            this.$router.back()
        },
        doAction(key) {
            if (key == 'createGroup') {
                this.$router.push('/create-group')
            }
        }
    },

    components: {
        XHeader,
        Actionsheet
    }
}
</script>

<style lang="less" scoped>
.vux-x-icon {
  fill: white;
}
</style>


