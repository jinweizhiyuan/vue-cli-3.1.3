<template>
  <box gap="10px">
    <group title="用户注册">
      <x-input label-width="3em" placeholder="用户名" v-model.trim="userName"></x-input>
      <x-input label-width="3em" placeholder="密码" type="password" v-model.trim="pwd"></x-input>
      <checker v-model="portrait" radio-required default-item-class="demo1-item weui-cell" selected-item-class="demo1-item-selected">
        <checker-item v-for="p in portraits" :key="p" :value="p">
          <img :src="p" height="60">
        </checker-item>
      </checker>
    </group>
    <div class="c-f">
        <router-link class="forget" to="/regist">注册用户</router-link>
        <!-- <router-link class="forget" to="">忘记密码</router-link> -->
    </div>
    <x-button type="primary" @click.native="login">注册</x-button>
  </box>
</template>

<script>
import { XInput, Group, AlertModule, Box, XButton, Checker, CheckerItem } from "vux"
import io from "socket.io-client"
import { mapState } from 'vuex'

export default {
  data() {
    return {
      userName: "",
      pwd: "",
      portrait: ""
    };
  },

  computed: {...mapState(['portraits'])},

  components: { XInput, Group, Box, XButton, Checker, CheckerItem },

  methods: {
    login: function() {
      var vm = this
      if (this.userName && this.pwd && this.portrait) {
        this.axios.post('http://localhost:3000/api/regist', {
            userName: this.userName,
            password: this.pwd,
            portrait: this.portrait
        }).then(function(response) {
          vm.$vux.toast.show({
            text: '注册成功',
            type: 'success'
          })
            vm.$router.push('/login')
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

.demo1-item {
  border: 1px solid #ececec;
  // padding: 5px 15px;
}
.demo1-item-selected {
  border: 1px solid green;
}
</style>
