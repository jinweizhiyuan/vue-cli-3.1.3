<template>
  <div>
    <grid :cols="1" :show-lr-borders="false" :show-vertical-line="false">
      <grid-item link="" v-for="(addr, index) in addrList" :key="index">
        <img :src="addr.icon || defaultIcon" class="_inline-block weui-grid__icon" />
        <span class="_inline-block weui-grid__label">{{ addr.userName }}</span>
      </grid-item>
    </grid>
  </div>
</template>

<script>
import { Grid, GridItem } from 'vux'
import defaultIcon from '@/assets/logo.png'

export default {
  components: {
    Grid,
    'grid-item': GridItem
  },
  data(){
    return {
      defaultIcon,
      addrList: [
        {userName:'张三', icon:''},
        {userName:'李四', icon:''},
        {userName:'王五', icon:''}
      ]
    }
  },
  
  methods: {
    
  }
};
</script>

<style lang="less" scoped>
._inline-block {
  display: inline-block;
  vertical-align: middle;
}
.weui-grid__icon + .weui-grid__label {
  margin-top: 0;
}
.weui-grids{
  background-color: #fff;
}
</style>
