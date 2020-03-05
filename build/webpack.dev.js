process.env.NODE_ENV = 'develepment';
const { resolvePath } = require('./utils')
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base');

const config = merge(baseConfig, {
  devServer: {
    quiet: true,
    host: '127.0.0.1',
    hot: true,
    overlay: {
      warnings: true,
      errors: true
    },
    publicPath: '/', // 打包的文件放在的目录
    disableHostCheck: false,
    contentBase: './'
  }
})

module.exports = config;