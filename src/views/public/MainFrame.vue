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
import { mapState } from 'vuex'

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

  computed: {
    ...mapState({
      histories: state => state.histories,
      direction: state => stte.direction
    })
  },

  watch: {
    $route(to, from) {
      let lastHistoryLen = this.histories.length
      this.$store.commit('add_historiy', to.path)
      this.transitionName = lastHistoryLen > this.histories.length ? "slide-right" : "slide-left"
      this.$store.commit('add_direction', this.transitionName)
    }
  },

  beforeMount(){
    this.$store.commit('add_historiy', this.$route.path)
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
