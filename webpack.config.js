var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'app', 'index.html'),
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    context: path.join(__dirname, 'app'),
    entry: {
        javascript: "./app.jsx"
    },
    output: {
        path: __dirname + '/docs',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [HTMLWebpackPluginConfig]
};