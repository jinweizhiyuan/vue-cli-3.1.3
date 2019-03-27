<template>
  <view-box>
    <group title="用户登录">
      <x-input label-width="3em" placeholder="用户名" v-model.trim="userName" @on-enter="shortcutLogin"></x-input>
      <x-input label-width="3em" placeholder="密码" type="password" v-model.trim="pwd" @on-enter="shortcutLogin"></x-input>
    </group>
    <box gap="10px">
      <div class="c-f">
        <router-link class="forget" to="/regist">注册用户</router-link>
        <!-- <router-link class="forget" to="">忘记密码</router-link> -->
      </div>
      <x-button type="primary" @click.native="login">登录</x-button>
    </box>
  </view-box>
</template>

<script>
import { XInput, Group, XButton, AlertModule, ViewBox, Box } from 'vux'
import io from "socket.io-client"
import { mapMutations } from "vuex"
import { errHandler } from '@/assets/js/common.js'

export default {
  data() {
    return {
      userName: "",
      pwd: ""
    };
  },

  components: { XInput, Group, XButton, ViewBox, Box },

  methods: {
    shortcutLogin: function() {
      if (this.userName && this.pwd) {
        this.login()
      }
    },
    login: function(force) {
      var vm = this;
      if (this.userName && this.pwd || force) {
        this.axios
          .post("api/login", {
            userName: this.userName,
            password: this.pwd
          })
          .then(function(response) {
            // console.log({userName:vm.userName, password:vm.pwd});
            const socket = io("", { reconnection: false });
            socket.on("connect", function() {
              vm.set_socket(socket);
              socket.emit("login", { userName: vm.userName, password: vm.pwd }, function(data) {
                errHandler(data)
                /* if (data.code != '1000') {
                  vm.$vux.$toast.show({
                    text:data.message,
                    type: 'warn'
                  })
                } */
              });
            });

            socket.on("init-login", data => {
              // console.log(data)
              vm.set_currentUser(data.data);
              vm.$router.push("/multi-part");
            })

            socket.on("sync-user", data => {
              // console.log(data)
              vm.add_user(data.data)
            })

            socket.on("user-online", data => {
              // console.log(data)
              vm.add_user(data.data)
            })

            socket.on("user-offline", data => {
              vm.remove_user(data.data)
            })

            socket.on("message", data => {
              vm.add_message(data)
            })

            socket.on("init-group", groupArray => {
              vm.add_group(groupArray)
            })

            socket.on("socket-close", data => {
              vm.$vux.toast.show({
                text: data.message,
                type: 'warn'
              })
              vm.$router.push({path: '/'})
            })

            socket.on("timeout", data => {
              errHandler(data)
            })

            window.onbeforeunload = function(e) {
              (e || window.event).returnValue = "刷新页面后将自动跳转到登录页";
            }

            window.onunload = function() {
              socket.close();
              // 增加刷新标志，防止chrome重新打开时使用缓存的数据
              window.name = 'refresh'
            }
          });
      } else {
        AlertModule.show({
          title: "提示",
          content: "请输入用户名和密码"
        });
      }
    },
    ...mapMutations([
      "set_socket",
      "set_currentUser",
      "add_user",
      "add_user",
      "remove_user",
      "add_message",
      "add_group"
    ])
  },
  created() {
    if (this.$cookie.get('login') && window.name == 'refresh') {
      this.login(true)
    }
  }
};
</script>

<style lang="less" scoped>
.c-f {
  text-align: right;
  & .forget {
    color: 0.8em;
    color: grey;
  }
}
</style>
