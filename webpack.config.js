var path = require('path'),
    webpack = require('webpack');

module.exports = {
//    devtool: 'source-map',

    // Currently we need to add '.ts' to resolve.extensions array.
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js']
    },

    noParse : [/jqeury.*/, /d3.*/],

    output: {
        path: root('build'),
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },

    entry: {
        vendor: [
            // D3
            'd3/d3',
            'topojson/topojson'
        ],

        app: [
            './app/bootstrap'
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js'
        }),
        new webpack.DefinePlugin({
            'ENV': {
                'type': JSON.stringify('development'),
                'debug': true
            }
        })
    ],

    module: {
        loaders: [
            // Support for .ts files.
            {test: /\.ts$/, loader: 'ts'},
            {test: /\.html$/, loader: 'raw'},
            {test: /\.less$/, loader: 'style!css!less'},
            {test: /\.(png|gif)$/, loader: "url-loader?limit=100000"},
            {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader'}
        ]
    },

    context: __dirname
}

/**
 * Creates path starting from root directory
 * @return {*}
 */
function root() {
    var args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}