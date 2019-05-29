const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require("path")
const SRC = path.resolve(__dirname, 'src/assets');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   use: [
      //     "file-loader"
      //   ]
      // },
      {
        test: /\.(jpe?g|png|gif|mp3|wav)$/i,
        include: SRC,
        loaders: ['file-loader']
    },
      {
        test: /\.css$/,
        use: [ 
            'style-loader',
            'css-loader'
        ]
      },
      {
        test: [ /\.vert$/, /\.frag$/ ],
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html"
    }),
    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
  })
  ]
}