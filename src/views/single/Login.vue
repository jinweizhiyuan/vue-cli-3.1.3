<template>
  <box gap="10px">
    <group title="用户登录">
      <x-input label-width="3em" placeholder="用户名" v-model.trim="userName"></x-input>
      <x-input label-width="3em" placeholder="密码" type="password" v-model.trim="pwd"></x-input>
    </group>
    <div class="c-f">
        <router-link class="forget" to="/regist">注册用户</router-link>
        <!-- <router-link class="forget" to="">忘记密码</router-link> -->
    </div>
    <x-button type="primary" @click.native="login">登录</x-button>
  </box>
</template>

<script>
import { XInput, Group, XButton, AlertModule, Box, CellBox } from "vux";
import io from "socket.io-client";
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      userName: "",
      pwd: ""
    };
  },

  components: { XInput, Group, XButton, Box, CellBox },

  methods: {
    login: function() {
      var vm = this
      if (this.userName && this.pwd) {
        
        this.axios.post('http://localhost:3000/api/login', {
            userName: this.userName,
            password: this.pwd
        }).then(function(response) {
            // console.log({userName:vm.userName, password:vm.pwd});
            const socket = io("http://localhost:3000/");
            socket.on('connect', function() {
              vm.set_socket(socket)
              socket.emit('login', {userName:vm.userName, password:vm.pwd})
            })

            socket.on('init-login', (data) => {
              console.log(data)
              vm.set_currentUser(data.data)
              vm.$router.push('/multi-part')
            })
            
            socket.on('sync-user', (data) => {
              console.log(data)
              vm.add_user(data.data)
              
            })
          
            window.onbeforeunload = function () {
              return "离开后用户将自动下线！";
            };
            
            window.onunload = function() {
              socket.close()
            }
        })
      } else {
        AlertModule.show({
          title: "提示",
          content: "请输入用户名和密码"
        });
      }
    },
    ...mapMutations(['set_socket', 'set_currentUser', 'add_user'])
  }
};
</script>

<style lang="less" scoped>
.c-f {
    text-align: right;
    & .forget {
        color: .8em;
        color: grey;
    }
}
</style>
