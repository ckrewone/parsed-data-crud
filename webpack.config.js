const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    externals: [nodeExternals()],
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    target: 'node',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib')
    }
};
