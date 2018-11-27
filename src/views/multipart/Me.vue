<template>
  <div class="_wrap">
    <group>
      <panel>
        <a
          slot="body"
          :href="item.url" 
          @click.prevent="onItemClick(item)" 
          class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" :src="item.icon" @error="onImgError(item, $event)" alt="">
            <sup class="sup"><badge text="1" /></sup>
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title" v-html="item.title"></h4>
            <p class="weui-media-box__desc" v-html="item.desc"></p>
          </div>
          <div class="weui-media-box__hd">
            <img :src="item.qrcode" class="qrcode" />
          </div>
        </a>
      </panel>
    </group>
    <group>
      <cell title="钱包" link="/"><i slot="icon" class="fa fa-google-wallet"></i></cell>
      <cell title="收藏" link="/"><i slot="icon" class="fa fa-pie-chart"></i></cell>
      <cell title="卡包" link="/"><i slot="icon" class="fa fa-credit-card"></i></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, Panel } from 'vux'
import icon from '@/assets/icon.jpg'

export default {
  components: {
    Group,
    Cell,
    Panel
  },

  data() {
    return {
      icon,
      item: {
        title: '宗辉',
        desc: 'qw31asde1dwe_1ss1d',
        icon: icon,
        qrcode: icon
      }
    }
  }
}
</script>

<style lang="less" scoped>
._wrap > * {
  background-color: #fff;

  .icon {
    width: 100%;
    vertical-align: middle;
  }

  .fa {
    margin-right: 0.5em;
  }

  .qrcode {
    width: 2.5em;
    vertical-align: middle;
  }
}
</style>
