const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
    main: './src/index.js'
  },
  module: {
    rules: [{
      test: /\.(jpg|png|gif|jpeg)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          limit: 204800
        }
      }
    }, {
      test: /\.css$/, use: ['style-loader', 'css-loader']
    }, { // es6转es5
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
      // options: {
      //   presets: [['@babel/preset-env', {
      //     useBuiltIns: 'usage' // 将用到的es6转为es5, 无需将没用到的es6语法转换打包
      //   }]] // es6转es5必要插件
      // }
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      template: 'public/index.html'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      // minSize: 30000, // 模块的最小体积
      // minChunks: 1, // 模块的最小被引用次数
      // maxAsyncRequests: 5, // 按需加载的最大并行请求数
      // maxInitialRequests: 3, // 一个入口最大并行请求数
      // automaticNameDelimiter: '~', // 文件名的连接符
      // name: true,
      cacheGroups: { // 缓存组
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: 'vendors.js'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          filename: 'common.js'
        }
      }
    }
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
