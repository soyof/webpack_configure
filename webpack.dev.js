const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',
  // sourceMap配置 -- 映射关系,对应开发环境中的js文件
  // devtool: 'cheap-module-eval-source-map' // development
  // devtool: 'cheap-module-source-map' // production
  devtool: 'cheap-module-eval-source-map',
  // 开启web服务器,同时配置代码变化自动刷新页面
  devServer: {
    contentBase: './dist', // 默认的基础路径
    // open: true, // 启动时自动打开页面
    port: 8000, // 设置服务的端口
    hot: true, // 开启热更新 Hot Module ReplaceMent(HMR)
    hotOnly: true, // 即使HMR失效,浏览器也不重新加载
    proxy: { // 代理配置
      '/api': {
        target: 'http://127.0.0.1:8080', // 接口域名
        changeOrigin: true // 是否跨域
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/, use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() // HRM功能开启--热更新(样式等变动不会重新加载页面)
  ],
  output: {
    // publicPath: './',
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}

module.exports = merge(commonConfig, devConfig)
