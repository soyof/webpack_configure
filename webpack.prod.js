const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const prodConfig = {
  mode: 'production',
  // sourceMap配置 -- 映射关系,对应开发环境中的js文件
  // devtool: 'cheap-module-eval-source-map' // development
  // devtool: 'cheap-module-source-map' // production
  devtool: 'cheap-module-source-map', // production使用
  // 开启web服务器,同时配置代码变化自动刷新页面
  optimization: {
    usedExports: true // tree shaking 只支持ES Module
  }
}

module.exports = merge(commonConfig, prodConfig)
