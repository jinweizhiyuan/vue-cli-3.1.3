<template>
  <box gap="10px">
    <group title="用户注册">
      <x-input label-width="3em" placeholder="用户名" v-model.trim="userName"></x-input>
      <x-input label-width="3em" placeholder="密码" type="password" v-model.trim="pwd"></x-input>
    </group>
    <div class="c-f">
        <router-link class="forget" to="/regist">注册用户</router-link>
        <!-- <router-link class="forget" to="">忘记密码</router-link> -->
    </div>
    <x-button type="primary" @click.native="login">注册</x-button>
  </box>
</template>

<script>
import { XInput, Group, XButton, AlertModule, Box, CellBox } from "vux";
import io from "socket.io-client";

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
      if (this.userName && this.pwd) {
        this.axios.post('http://localhost:3000/api/regist', {
            userName: this.userName,
            password: this.pwd
        }).then(function(response) {
            console.log(response);
            this.$route.push('/login')
        })
      } else {
        AlertModule.show({
          title: "提示",
          content: "请输入用户名和密码"
        });
      }
    }
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
