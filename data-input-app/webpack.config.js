var path = require('path')
var webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: "[id].chunk.js?[hash:8]"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: ['transform-decorators-legacy','transform-decorators']
        }
      },
      {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.less$/,
        loader: extractTextWebpackPlugin.extract("style-loader", "css-loader!less-loader")
        // 配合‘extract-text-webpack-plugin'可以剥离，css
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)$/,
        loader: 'url-loader?limite=8192'  // limit 是转换base64的文件大小的阀值8兆
      },
      {
        test: /\.html$/,
        loader: 'html-loader'  // 可以用来加载模板
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js',
      '$views': path.resolve('src/views'),
      '$config': path.resolve('src/config'),
      '$services': path.resolve('src/services'),
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: '[name].[hash].js',
      chunks: ['index', 'common']  // extract commonChunk from index & common
    }),
    new htmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['index', 'common']
    }),
    new extractTextWebpackPlugin("style.css", {
      allChunks: true
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
