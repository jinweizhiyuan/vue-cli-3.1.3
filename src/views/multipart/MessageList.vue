<template>
  <!-- <view-box> -->
    <panel>
      <a
        slot="body"
        v-for="(item, index) in users" 
        :key="index"
        :href="item.url" 
        @click.prevent="onItemClick(item)" 
        class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd" v-if="item.src">
          <img class="weui-media-box__thumb" :src="item.src" @error="onImgError(item, $event)" alt="">
          <sup class="sup"><badge text="1" /></sup>
        </div>
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title" v-html="item.userName"></h4>
          <p class="weui-media-box__desc" v-html="item.desc"></p>
        </div>
        <div class="weui-media-box__hd">
          <p class="weui-media-box__desc" v-html="item.time"></p>
        </div>
      </a>
    </panel>
  <!-- </view-box> -->

  <!-- <view-box>
    <flex-box v-for="(item, index) in list" :key="index">
      <flex-item>{{ item.src }}</flex-item>
      <flex-item>{{ item.title }}</flex-item>
    </flex-box>
  </view-box> -->
</template>

<script>
import { Panel, Badge } from "vux"
import logo from "@/assets/logo.png"
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    // "view-box": ViewBox,
    Panel,
    Badge
  },

  data() {
    return {
      list: [
        {
          title: "张三",
          desc: "领悟人生：走了啊",
          url: "",
          src: logo,
          fallbackSrc: "",
          time: '2018/11/2'
        }
      ]
    };
  },
  
  methods: {
    onItemClick: function(){
      this.$router.push('/multi-part/message/messageInfo')
    },
    ...mapMutations(['add_user'])
  },

  computed: {
    ...mapState(['socket', 'users'])
  },

  mounted() {
    this.socket.on('user-online', (data) => {
      // console.log(data)
      this.add_user(data.data)
    })
  }
};
</script>

<style lang="less" scoped>
.weui-media-box__hd {
  position: relative;
}
.sup {
  position: absolute;
  top: -0.5em;
  right: -0.5em;
  line-height: normal;
}
.weui-media-box__desc {
  overflow: visible;
}
</style>
