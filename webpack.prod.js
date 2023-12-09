const { merge } = require("webpack-merge");
const common = requite("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
});
