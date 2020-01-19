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
  output: {
    publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
