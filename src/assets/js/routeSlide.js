import '@/assets/css/routeSlide.css'
import { mapState } from 'vuex'

export default {
    computed: mapState({
        histories: state => state.histories,
        direction: state => state.direction
    }),

    watch: {
        $route(to, from) {
            console.log(arguments)
            // let lastHistoryLen = this.histories.length
            // this.$store.commit("add_historiy", to.path)
            // let transitionNa         me =
                // lastHistoryLen > this.histories.length ? "slide-right" : "slide-left"
            // this.$store.commit("add_direction", transitionName)
            // console.log(transitionName)
        }
    },

    lifeCycle: {
        beforeMount() {
            this.$store.commit('add_historiy', this.$route.path)
        }
    }
}
