'use strict';

var webpack = require('webpack');

var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {

    var config = {};

    config.externals = isProd ? {
        "angular": "angular",
        "jquery": "jQuery",
        "firebase": "firebase",
    } : {};

    config.entry = isProd ? { app: './src/app/index.js' } : { app: './src/app/index.js' };

    config.output = isTest ? {} : {

        path: __dirname + '/dist',

        publicPath: isProd ? '/' : 'http://localhost:8080/',
        filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
        chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
    };

    if (isTest) { config.devtool = 'inline-source-map'; } else if (isProd) { config.devtool = 'source-map'; } else { config.devtool = 'eval-source-map'; }

    config.module = {
        rules: [
            { test: /\.scss$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }] },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: isTest ? 'null-loader' : ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: [{ loader: 'css-loader', query: { sourceMap: true } }, { loader: 'postcss-loader' }], }) },
            { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'file-loader' },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.tsx?$/, loader: "ts-loader" },
        ]
    };

    if (isTest) { config.module.rules.push({ enforce: 'pre', test: /\.js$/, exclude: [/node_modules/, /\.spec\.js$/], loader: 'istanbul-instrumenter-loader', query: { esModules: true } }) }
    config.plugins = [
        new webpack.LoaderOptionsPlugin({ test: /\.scss$/i, options: { postcss: { plugins: [autoprefixer] } } }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(ENV),
            kevinsPlugin: JSON.stringify('B26354'),
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            Util: "exports-loader?Util!bootstrap/js/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
        })
    ];

    var template = isProd ? './src/public/index.html' : './src/public/test_index.html';

    if (!isTest) {
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: template,
                inject: 'body'

            }),
            new ExtractTextPlugin({ filename: 'css/[name].css', disable: !isProd, allChunks: true }))
    }

    if (isProd) {
        config.plugins.push(
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin(),
            new CopyWebpackPlugin([{ from: __dirname + '/src/public/images', to: 'images/' }])
        )
    }

    config.devServer = { contentBase: './src/public', stats: 'minimal' };
    return config;
}();