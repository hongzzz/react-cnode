const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env, argv = {mode: "production"}) => { // argv设置默认值, webstorm mode undefined的hack
  const isDev = (argv.mode === "development");

  return {
    entry: {
      main: path.join(__dirname, "src/index.js")
    },
    output: {
      filename: isDev ? "[name].js" : "[name].[contenthash].js",
      chunkFilename: "[name].[contenthash].js",
      path: path.join(__dirname, "build"),
    },
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
        "Com": path.join(__dirname, "src/components"),
        "Public": path.join(__dirname, "public"),
        "Redux": path.join(__dirname, "src/redux"),
      }
    },
    devtool: isDev ? "source-map" : "none",
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["eslint-loader"]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader, // 抽取css到独立文件
            "css-loader",
          ]
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader, // 抽取css到独立文件
            "css-loader",
            "less-loader"
          ]
        },
        {
          test: /\.(svg|png|gif|jpg|ico)$/,
          exclude: /node_modules/,
          use: [{
            loader: "url-loader",
            options: {
              limit: 1024 * 20, // 20KB 以下的文件采用 url-loader
              fallback: "file-loader", // 否则采用 file-loader，默认值就是 file-loader
            }
          }]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "React Demo",
        filename: "index.html",
        template: path.join(__dirname, "public/index.html"),
        favicon: path.join(__dirname, "public/favicon.ico")
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[name].[contenthash].css"
      })
    ],
    devServer: {
      port: process.env.PORT || 8080,
      historyApiFallback: true
    },
    optimization: {
      minimizer: [new OptimizeCssAssetsPlugin()], // 压缩css
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2
          },
          vendor: { // 将第三方模块提取出来
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10 // 优先
          }
        }
      }
    }
  };
};