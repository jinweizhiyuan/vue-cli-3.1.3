<template>
  <div>
    <Header class="pst_abs"></Header>
      <transition :name="direction">
        <router-view />
      </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/views/public/Header.vue";
import Footer from "@/views/public/Footer.vue";
import routeSlide from "@/assets/js/routeSlide.js";

export default {
  components: {
    Header,
    Footer
  },

  data() {
    return {};
  },

  computed: {
    ...routeSlide.computed
  },

  watch: {
    ...routeSlide.watch
  },

  ...routeSlide.lifeCycle
};
</script>

<style lang="less">
// .pst_abs {
//   width: 100%;
//   position: absolute !important;
// }
// .weui-tab__panel {
//   padding: 46px auto 53px;
// }
.weui-tab {
  height: calc(100% - 53px - 46px) !important;
}
.weui-tab__panel {
    padding-bottom: 0 !important;
}
</style>
