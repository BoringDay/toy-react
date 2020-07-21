const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './src'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist',
    disableHostCheck: true,
    open: true,
    port: 9000
  },
  stats: {
    children: false
  },
  module: {
    rules: [
      {
        test: /\.html$/, loader: 'html-loader?minimize=false'
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-webpack-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, './src/html/index.html')
    })
  ]
}
