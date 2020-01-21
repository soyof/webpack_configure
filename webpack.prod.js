const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const prodConfig = {
  mode: 'production',
  // sourceMap配置 -- 映射关系,对应开发环境中的js文件
  // devtool: 'cheap-module-eval-source-map' // development
  // devtool: 'cheap-module-source-map' // production
  devtool: 'cheap-module-source-map', // production使用
  module: {
    rules: [
      {
        test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  // 开启web服务器,同时配置代码变化自动刷新页面
  optimization: {
    // splitChunks: {
    //   cacheGroups: {
    //     styles: { // 将所有css文件打包到一个文件中去
    //       name: 'styles',
    //       test: /\.css$/,
    //       chunks: 'all',
    //       enforce: true
    //     }
    //   }
    // },
    usedExports: true, // tree shaking 只支持ES Module
    minimizer: [new OptimizeCSSAssetsPlugin({})] // css代码压缩
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css'
    })
  ],
  output: {
    // publicPath: './',
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  }
}

module.exports = merge(commonConfig, prodConfig)
