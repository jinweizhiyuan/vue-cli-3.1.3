<template>
    <div>
        <Header></Header>
        <transition :name="transitionName" mode="out-in">
            <router-view />
        </transition>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/views/public/Header.vue";
import Footer from "@/views/public/Footer.vue";

export default {
  components: {
    Header,
    Footer
  },

  data() {
    return {
      transitionName: ""
    };
  },

  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
      console.log(this.transitionName);
    }
  }
};
</script>

<style lang="less">
.slide-left-enter, .slide-left-leave-to {
    transition: all .3s ease;
}
.slide-left-enter, .slide-left-leave-to {
    transform: translateX(-100%);
}
.slide-right-enter, .slide-right-leave-to {
    transition: all .3s ease;
}
.slide-right-enter, .slide-right-leave-to {
    transform: translateX(100%);
}
</style>
