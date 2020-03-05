const {resolvePath} = require('./utils');
const HTMLwebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV === 'develepment';
console.log('devMOde', devMode);
// 提取css
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: resolvePath('app/render/index.js'),
  output: {
    path: resolvePath('dist'),
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.js|x$/,
        exclude: /node_modules/,
        loader: [
          'babel-loader',
          'astroturf/loader'
        ]
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
        test: /.vue$/,
        exclude: /node_modules/,
        loader: [
          'vue-loader',
        ]
      },
      {
        test: /\.vue$/,
        enforce: 'pre',
        loader: path.join(__dirname, './loader/atom.js'),
        options: {
          debug: false
        },
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: [{
          loader: 'file-loader',
          options: {}
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  plugins: [
    new HTMLwebpackPlugin({
      template: resolvePath('app/render/index.html'),
      filename: 'index.html',
      inject: true
    }),
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}