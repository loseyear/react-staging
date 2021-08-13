const path = require('path')
const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.NODE_ENV
const mode = env === 'development' ? 'development' : 'production'

module.exports = {
  stats: 'normal',
  target: 'web',
  mode,
  entry: {
    app: [path.resolve(__dirname, './client/client.tsx')],
  },
  output: {
    path: path.resolve(__dirname, './asset'),
    filename: 'script/[name].js',
    chunkFilename: 'script/[name].[chunkhash:5].js',
    publicPath: '/asset/',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, './client'),
        exclude: path.resolve(__dirname, './node_modules'),
        use: [
          {
            loader: 'babel-loader??cacheDirectory',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    corejs: 3,
                  },
                ],
                'babel-plugin-styled-components',
                '@babel/plugin-proposal-export-default-from',
                '@babel/plugin-syntax-dynamic-import',
                mode === 'development' && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
      }, {
        test: /\.(png|jpg|gif|md|svg)$/,
        use: ['file-loader?limit=8192&name=image/[md5:hash:base64:10].[ext]'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.jpg', '.jpeg', '.png', '.gif', '.svg'],
    alias: {},
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    mode === 'development' && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    // 热更新插件
    new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean),
}
