const path = require('path');

const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
  const { NODE_ENV } = env;
  console.log(`[NODE_ENV] >>> ${NODE_ENV}`);
  if (!['production', 'development'].includes(NODE_ENV))
    throw Error('[NODE_ENV] must be production or development');

  const DEV = NODE_ENV === 'development';
  const mode = DEV ? 'development' : 'production';
  const devtool = DEV ? 'eval-source-map' : false;
  const lastCssLoader = DEV ? 'style-loader' : MiniCssExtractPlugin.loader;
  const miniCssExtractPlugin = DEV
    ? { apply: () => {} }
    : new MiniCssExtractPlugin({ filename: 'css/style.css' });
  const refreshWebpackPlugin = DEV ? new RefreshWebpackPlugin() : { apply: () => {} };
  const refreshBabel = DEV ? 'react-refresh/babel' : {};
  const BASE_URL = DEV ? '' : 'fe-vm';
  const definePlugin = new webpack.DefinePlugin({
    BASE_URL: JSON.stringify(BASE_URL),
  });

  return {
    mode,
    devtool,
    resolve: {
      fallback: { fs: false, path: false },
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
    },
    entry: {
      main: './src/index.tsx',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: { version: 3, proposals: true },
                  debug: true,
                },
              ],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [refreshBabel, 'styled-components'],
          },
        },
        {
          test: /\.(sc|c|sa)ss$/,
          use: [lastCssLoader, 'css-loader'],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
      }),
      definePlugin,
      miniCssExtractPlugin,
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
      }),
      refreshWebpackPlugin,
    ],
    devServer: {
      open: true,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'public'),
      },
      hot: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },
    output: {
      clean: true,
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      usedExports: true,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
      },
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
