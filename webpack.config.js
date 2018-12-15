const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv = {mode: "production"}) => { // argv设置默认值, webstorm mode undefined的hack
  const isDev = argv.mode === "development";

  return {
    entry: {
      main: path.join(__dirname, "src/index.js")
    },
    output: {
      publicPath: "/",
      filename: isDev ? "static/js/[name].js" : "static/js/[name].[contenthash].js",
      chunkFilename: "static/js/[name].[contenthash].js",
      path: path.join(__dirname, "build")
    },
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
        "Com": path.join(__dirname, "src/components"),
        "Public": path.join(__dirname, "public"),
        "Redux": path.join(__dirname, "src/redux"),
        "Page": path.join(__dirname, "src/pages")
      }
    },
    devtool: isDev ? "source-map" : "none",
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: ["eslint-loader"]
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader, // 抽取css到独立文件
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]--[hash:base64:5]'
              } 
            },
            "postcss-loader"
          ]
        },
        {
          test: /\.(svg|png|gif|jpg|ico)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [{
            loader: "url-loader",
            options: {
              limit: 1024 * 20, // 20KB 以下的文件采用 url-loader
              fallback: "file-loader", // 否则采用 file-loader，默认值就是 file-loader
              outputPath: "static/media"
            }
          }]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(__dirname, "public/index.html"),
        favicon: path.join(__dirname, "public/favicon.ico"),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          removeAttributeQuotes: true
        },
      }),
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash].css",
        chunkFilename: "static/css/[name].[contenthash].css"
      })
    ],
    devServer: {
      port: process.env.PORT || 8080,
      historyApiFallback: true
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          parallel: 4,
          extractComments: true
        }) // 压缩js
      ],
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