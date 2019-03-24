import Vue from 'vue'
function commonErrHandler(data) {
    if (data.code === '1000') {
        return data
      } else if (data.code ===' 1302') {
        Vue.$router.replace('/')
      } else {
        Vue.$vux.toast.show({
          text: data.message,
          type: 'warn'
        })
        return Promise.reject(data)
      }
}

export {
    commonErrHandler as errHandler
}