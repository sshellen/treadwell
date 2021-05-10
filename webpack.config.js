const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "./index.js"],
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js",
    publicPath: "/build/",
    chunkFilename: "chunk-[name].[chunkhash].js",
    library: "[name]",
    umdNamedDefine: false
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.csv$/,
        loader: "csv-loader",
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      }
    ]
  },
  resolve: {
    modules: ["./node_modules", "./src", "./build"]
  }
};
