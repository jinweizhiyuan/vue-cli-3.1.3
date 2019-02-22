const vuxLoader = require('vux-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

let getIPAdress = require('./back-end/utils/ip')
let address = getIPAdress()

module.exports = {
  devServer: {
    host: address,
    proxy: {
      '/api': {
        target: 'http://' + address + ':3000/'
      },
      '/socket.io': {
        target: 'http://' + address + ':3000/',
        ws:true
      }
    }
  },
  configureWebpack: config => {
    // let _entry = config.entry
    // config.entry = Object.assign({'babel-polyfill':'babel-polyfill'}, _entry)
    // console.log(config.optimization)
    // config.optimization = {
    //   providedExports: true,
    //   usedExports: true
    // }
    
    vuxLoader.merge(config, {
      plugins: [
        'vux-ui', 
        'duplicate-style'
      ]
    })

    // 按照cli配置不生效，因此放入函数中手动加插件
    config.plugins.push(new CopyWebpackPlugin([{from:path.resolve(__dirname, 'src/assets/images'), to:path.resolve(__dirname, 'dist/images')}]))

    // config.entry.app.push('@babel/polyfill')
  },

  lintOnSave: true
}
	