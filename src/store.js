import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    direction: 'slide-left',
    histories: [],
    currentUser: null,
    users:[],
    socket: null,
    portraits:['images/boy1.jpg', 'images/boy2.jpg', 'images/boy3.jpg', 'images/boy4.jpg', 'images/girl1.jpg', 'images/girl2.jpg', 'images/girl3.jpg', 'images/girl4.jpg'],
    broadcast:{} // {messages:[{from:'',to'',message:''}], msgCount:0, userName:''}
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
      if (payload instanceof Array) {
        payload.forEach(function (user) {
          let isExist = state.users.findIndex(u => {
            return u.userName == user.userName
          });
          if (isExist == -1)
            state.users.push(user)
        })
      } else {
        let isExist = state.users.findIndex(u => {
          return u.userName == payload.userName
        });
        if (isExist == -1)
          state.users.push(payload)
      }
    },
    remove_user(state, payload) {
      let index = state.users.findIndex((value) => {
        return value.userName == payload.userName
      })

      if (index > -1) {
        state.users.splice(index, 1)
      }
    },
    add_message(state, payload) {
      // 自己发送的消息也加入被接收消息
      if (payload.from == state.currentUser.userName) {
        let _from = payload.from
        payload.from = payload.to
        payload.to = _from
        payload.self = true
      }
      
      let from = payload.from,
          broadcast = state.broadcast
      if (!broadcast[from]) {
        // 触发响应式属性
        Vue.set(state.broadcast, from, [])
      }
      broadcast[from].push(payload)

      let index = state.users.findIndex(u => {
        if (u.userName == from) return true
      })

      let user= state.users[index]

      if (user) {
        if (!user.msgCount) {
          user.msgCount = 1
        } else [
          user.msgCount++
        ]
      }

      // 触发响应式属性
      Vue.set(state.users, index, user)
    }
  },
  getters: {
    get_user_by_name(state) {
      return function(name) {
        return state.users.find(u => {
          if (u.userName == name) return true
        })
      }
      
    },
    user_messsage_count(state, getter) {
      return function(userName) {
        let userObj = getter.get_user_by_name(userName)
  
        return userObj && userObj.msgCount || 0
      }
      
    },

    message_count(state) {
      let count = 0;
      state.users.forEach(user => {
        count += user.msgCount || 0
      })
      return count ? count + '' : ''
    },
  },
  actions: {

  }
})
