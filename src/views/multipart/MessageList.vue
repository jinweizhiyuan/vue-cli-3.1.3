<template>
  <view-box class="view-box">
    <panel>
      <a
        slot="body"
        v-for="(item, index) in users" 
        :key="index"
        @click.prevent="onItemClick(item)" 
        class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd" v-if="item.portrait">
          <img class="weui-media-box__thumb" :src="item.portrait" @error="onImgError(item, $event)" alt="">
          <sup class="sup" v-if="item.msgCount"><badge :text="item.msgCount" /></sup>
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
  </view-box>

  <!-- <view-box>
    <flex-box v-for="(item, index) in list" :key="index">
      <flex-item>{{ item.src }}</flex-item>
      <flex-item>{{ item.title }}</flex-item>
    </flex-box>
  </view-box> -->
</template>

<script>
import { Panel, Badge, ViewBox } from 'vux'
import logo from "@/assets/logo.png"
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    "view-box": ViewBox,
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
    onItemClick: function(item, event){
      this.$router.push({path:'/multi-part/message/messageInfo', query:item})
    }
  },

  computed: {
    ...mapState(['socket', 'users']),
    ...mapGetters(['user_messsage_count'])
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
