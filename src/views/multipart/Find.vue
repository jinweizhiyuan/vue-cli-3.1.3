<template>
  <view-box class="max-view-box">
    <group>
      <cell title="朋友圈" is-link="false" link="/">
        <img :src="icon" slot="icon" />
      </cell>
    </group>
    <group>
      <cell title="扫一扫" link="/">
        <img :src="icon" slot="icon" />
      </cell>
      <cell title="摇一摇" link="/">
        <img :src="icon" slot="icon" />
      </cell>
    </group>
    <group>
      <cell title="附近的人" link="/">
        <img :src="icon" slot="icon" />
      </cell>
      <cell title="漂流瓶" link="/">
        <img :src="icon" slot="icon" />
      </cell>
    </group>
  </view-box>
</template>

<script>
import { ViewBox, Group, Cell } from 'vux'
import icon from '@/assets/icon.jpg'

export default {
  components: {
    'view-box': ViewBox,
    Group,
    Cell
  },

  data() {
    return {
      icon
    }
  }
}
</script>

<style lang="less" scoped>
.max-view-box img {
  width: 2em;
  height: 2em;
  vertical-align: middle;
  margin-right: 0.5em;
}
</style>
