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
    config.plugins.push(new CopyWebpackPlugin([{from:path.resolve(__dirname, 'src/assets/images'), to:path.resolve(__dirname, 'dist/images')}]))
  }
}
