import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    direction: 'slide-left',
    histories: [],
    currentUser: null,
    users:[],
    socket: null
  },
  mutations: {
    update_direction(state, payload) {
      state.direction = payload
    },
    add_historiy(state, payload) {
      let histories = state.histories,
          index = histories.findIndex(v => (v || '').split('/').length == payload.split('/').length)
      if (index > -1) {
        state.histories.splice(index, histories.length - index, payload)
      } else {
        state.histories.push(payload)
      }
    },
    set_socket(state, payload) {
      state.socket = payload
    },
    set_currentUser(state, payload) {
      state.currentUser = payload
    },
    add_user(state, payload) {
      state.users.push(payload)
    }
  },
  actions: {

  }
})
