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
          let isExist = isExistUser(state, user)
          if (!isExist)
            state.users.push(user)
        })
      } else {
        let isExist = isExistUser(state, payload)
        if (!isExist)
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
      // 群信息直接用群ID，用户信息用两个用户ID作为会话ID
      let sessionId = payload.to.isGroup ? payload.to._id : [payload.from._id, payload.to._id].sort().join('-')
      
      // 群信息取群作为标记未读对象
      let from = payload.to.isGroup ? payload.to : payload.from,
          broadcast = state.broadcast
      if (!broadcast[sessionId]) {
        // 触发响应式属性
        Vue.set(state.broadcast, sessionId, [])
      }
      broadcast[sessionId].push(payload)

      let index = state.users.findIndex(u => {
        if (u._id == from._id) return true
      })

      let user= state.users[index]

      if (user && !payload.isRead) {
        if (!user.msgCount) {
          user.msgCount = 1
        } else [
          user.msgCount++
        ]
      }

      // 触发响应式属性
      Vue.set(state.users, index, user)
    },
    update_user(state, payload) {
      let index = state.users.findIndex(u => {
        if (u.userName == payload.userName) return true
      })
      Vue.set(state.users, index, payload)
    },

    // group 和 users混合，利用页面
    add_group(state, payload) {
      if (!(payload instanceof Array)) payload = [payload]
      payload.forEach(group => {
        let _group = {_id: group.groupId, userName: group.groupName, portrait: 'images/group.jpg', isGroup: true}
        if (!isExistUser(state, _group)) {
          state.users.push(_group)
        }
      })
    }
  },
  getters: {
    get_user_by_id(state) {
      return function(id) {
        return state.users.find(u => {
          if (u._id == id) return true
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

function isExistUser(state, user) {
  return state.users.findIndex(u => {
    return u.userName == user._id
  }) != -1
}