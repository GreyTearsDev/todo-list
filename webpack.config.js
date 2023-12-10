const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: "ToBeDone",
      metaDesc: "GitHub @GreyTearsDev",
      template: "./src/index.html",
      inject: "body",
    }),
  ],
  mode: "development",
  output: {
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    open: true,
  },
};
