const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (_env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.[contenthash].js",
      clean: true
    },
    devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
    resolve: {
      extensions: [".ts", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: "ts-loader"
        },
        {
          test: /\.module\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html"
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public",
            to: "public",
            globOptions: {
              ignore: ["**/index.html"]
            }
          }
        ]
      }),
      ...(isProduction ? [new MiniCssExtractPlugin({ filename: "styles.[contenthash].css" })] : [])
    ],
    devServer: {
      static: [
        {
          directory: path.join(__dirname, "public"),
          publicPath: "/",
          watch: true
        }
      ],
      watchFiles: ["public/**/*"],
      hot: true,
      port: 3000,
      open: true
    }
  };
};
