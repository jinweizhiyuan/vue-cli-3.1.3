import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    direction: 'slide-left',
    histories: [] || {
      '/': {
        'multi-part': {
          'messageList': {

          }
        },
        'single': {
          'message': {

          }
        }
      }
    }
  },
  mutations: {
    update_direction(state, palyload) {
      state.direction = palyload
    },
    add_historiy(state, palyload) {
      let histories = state.histories,
          index = histories.findIndex(v => (v || '').split('/').length == palyload.split('/').length)
      if (index > -1) {
        state.histories.splice(index, histories.length - index, palyload)
      } else {
        state.histories.push(palyload)
      }
    }
  },
  actions: {

  }
})
