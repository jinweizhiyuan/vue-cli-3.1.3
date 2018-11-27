<template>
    <div>
        <Header></Header>
        <transition :name="direction">
            <router-view />
        </transition>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/views/public/Header.vue";
import Footer from "@/views/public/Footer.vue";
import routeSlide from '@/assets/js/routeSlide.js'

export default {
  components: {
    Header,
    Footer
  },

  data() {
    return {
      
    };
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
</style>
