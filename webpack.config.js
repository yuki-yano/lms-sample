const webpack = require("webpack")
const HtmlPlugin = require("html-webpack-plugin")
const mode = process.env.NODE_ENV || "development"

module.exports = {
  mode,
  entry: [__dirname + "/frontend/index.tsx"],
  output: {
    path: __dirname + "/frontend/dist",
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: "awesome-typescript-loader",
          options: {
            useBabel: true,
            babelCore: "babel-core"
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: "frontend/index.html"
    }),
    new webpack.ProvidePlugin({
      regeneratorRuntime: "regenerator-runtime/runtime"
    })
  ],
  devServer: {
    historyApiFallback: true
  }
}
