var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var basePath = __dirname;

module.exports = {

  context: path.join(basePath, "src"),

  resolve: {
    extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html']
  },

  entry: {
    app: './index.ts',
    styles: [
      './css/site.scss'
    ],
    vendor: [
      "core-js",
      "reflect-metadata",
      "zone.js",
      "@angular/core",
      "@angular/platform-browser",
      "@angular/platform-browser-dynamic",
      "@angular/common",
      "@angular/compiler",
      "rxjs"
    ]
  },

  output: {
    path: path.join(basePath, "dist"),
    filename: '[name].js'
  },

  devServer: {
    contentBase: './dist', //Content base
    inline: true, //Enable watch and live reload
    // noInfo: true,
    host: 'localhost',
    port: 8080,
    stats: 'minimal',
    historyApiFallback: true
  },

  devtool: 'source-map',

  module: {
    loaders: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
      },
      // Load globally scss styles.
      {
        test: /\.scss$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass')
      },
      // Load component styles here. When loaded with styleUrls in component, string of styles expected.
      {
        test: /\.scss$/,
        include: root('src', 'app'),
        loader: 'raw!sass'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'url?limit=10000'
      },
      {test: /\.json$/, loader: 'json-loader'},
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    })
  ]

}

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
