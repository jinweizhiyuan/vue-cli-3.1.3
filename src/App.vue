<template>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/header">Header</router-link>
    </div> -->
    <drawer width="200px">
      <div slot="drawer">
        <!-- 菜单内容 -->
      </div>
      <transition :name="direction">
        <router-view class="h-100" />
      </transition>
    </drawer>
</template>

<script>
import { Drawer } from 'vux'
import routeSlide from '@/assets/js/routeSlide.js'

export default {
  components: {
    Drawer
  },

  data() {
    return {
      
    }
  },

  computed: routeSlide.computed,

  // watch: routeSlide.watch,

  ...routeSlide.lifeCycle
}
</script>


<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.h-100 {
  height: 100%;
}
</style>

<style lang="less">
@import '~vux/src/styles/reset.less';
</style>

<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
