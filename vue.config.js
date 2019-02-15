const vuxLoader = require('vux-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  configureWebpack: config => {
    vuxLoader.merge(config, {
      plugins: [
        'vux-ui', 
        'duplicate-style'
      ]
    })

    // 按照cli配置不生效，因此放入函数中手动加插件
    config.plugins.push(new CopyWebpackPlugin([{from:path.resolve(__dirname, 'src/assets/images'), to:path.resolve(__dirname, 'dist/images')}]))
  },
  // devServer: {
  //   proxy: 'http://localhost:3000'
  // }
}
