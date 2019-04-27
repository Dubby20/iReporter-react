const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');


module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: `${__dirname}/dist`,
    historyApiFallback: true,
    port: 4000,
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify('http://localhost:4000/api/v1')
      }
    })
  ]
});
