const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: './dev/index.js',
    output: {
        path: path.resolve(__dirname, 'prod'),
        filename: 'bundle.js'
    },
    mode: NODE_ENV,
    watch: NODE_ENV === 'development',
    devtool: NODE_ENV === 'development' && 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            }
        ]
    }
};
