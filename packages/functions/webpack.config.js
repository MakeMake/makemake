/* eslint-disable @typescript-eslint/no-var-requires,no-undef */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const { srcPath, rootPath } = require('./paths');

module.exports = {
  target: 'node',
  entry: {
    dist: path.join(srcPath, 'index.ts'),
    scripts: path.join(srcPath, 'scripts')
  },
  output: {
    filename: '[name]/index.js',
    path: rootPath,
    libraryTarget: 'this'
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.ts?$/,
        loader: 'awesome-typescript-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  externals: [
    nodeExternals({
      whitelist: [/^@makemake/]
    })
  ]
};
