const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        "publicPath": '/',
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },

    devServer: {
        open: true,
        port: 9000,
    },

    externals: [nodeExternals()],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.(png|gif|jpg)$/,
                use: [
                    {
                        'loader': 'file-loader',
                        options: {
                            name: 'assets/[hash].[ext]',
                        },
                    },
                ]
            },

        ]
    },
    devServer: {
        historyApiFallback: true,
    }
};