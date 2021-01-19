const path = require("path");
<<<<<<< HEAD
=======
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
>>>>>>> 0afb0687a07404181f555f0c1cda5f9082505cb5
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  entry: {
<<<<<<< HEAD
    "excalidraw.min": "./entry.js",
=======
    "excalidraw.min": "./index.tsx",
    "fonts.min": "../../../public/fonts.css",
>>>>>>> 0afb0687a07404181f555f0c1cda5f9082505cb5
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "Excalidraw",
    libraryTarget: "umd",
    filename: "[name].js",
    publicPath: "/",
    chunkFilename: "excalidraw-assets/[name].js",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
<<<<<<< HEAD
        use: ["style-loader", { loader: "css-loader" }, "sass-loader"],
=======
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          "sass-loader",
        ],
>>>>>>> 0afb0687a07404181f555f0c1cda5f9082505cb5
      },
      {
        test: /\.(ts|tsx|js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              configFile: path.resolve(__dirname, "../tsconfig.prod.json"),
            },
          },
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-transform-arrow-functions",
                "transform-class-properties",
                "@babel/plugin-transform-async-to-generator",
                "@babel/plugin-transform-runtime",
              ],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "excalidraw-assets",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js($|\?)/i,
      }),
    ],
    splitChunks: {
      chunks: "async",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
        },
      },
    },
  },
  plugins: [
<<<<<<< HEAD
=======
    new MiniCssExtractPlugin({ filename: "[name].css" }),
>>>>>>> 0afb0687a07404181f555f0c1cda5f9082505cb5
    ...(process.env.ANALYZER === "true" ? [new BundleAnalyzerPlugin()] : []),
  ],
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
    },
  },
};
