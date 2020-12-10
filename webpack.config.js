const path = require("path");
const findFreePort = require("find-free-port-sync");
const CopyPlugin = require("copy-webpack-plugin");

// find webpack mode
let mode = "development";
// we cannot pass --mode to `webpack serve`
// so development mode is default
for (let i = 0; i < process.argv.length; i++) {
  if (process.argv[i] == "--mode") {
    mode = process.argv[i + 1];
    break;
  }
}
console.log(`webpack.config.js: mode = ${mode}`);

// basic options
module.exports = {
  mode: mode,
	plugins: [
    new CopyPlugin({
      patterns: [
        // copy files to dist/
        { from: "src/index.html" },
        { from: "src/index.css", to: "bundle.css" },
      ],
    })
	]
};

// devel options
if (mode == "development") {
  Object.assign(module.exports, {
    devtool: "inline-source-map",
    devServer: {
      contentBase: "./dist",
      publicPath: "/",
      hot: true,
      port: findFreePort({ start: 8080 }),
    },
    optimization:{
      minimize: false,
    },

    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
  });
}
