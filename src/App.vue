<template>
  <view-box>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/header">Header</router-link>
    </div> -->
    
    <transition :name="direction">
      <router-view/>
    </transition>
  </view-box>
</template>

<script>
import { ViewBox } from 'vux'
import routeSlide from '@/assets/js/routeSlide.js'

export default {
  components: {
    'view-box':ViewBox
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
</style>

<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
