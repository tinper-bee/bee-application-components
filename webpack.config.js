var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var webpack = require("webpack");
var fs = require("fs");

//


var cfg = {}
cfg.plugins = [
    new htmlWebpackPlugin({
        template: path.join(__dirname, "./src/views/index.swig"),
    }),
    new OpenBrowserPlugin({url: 'http://localhost:8080'}),
    new ExtractTextPlugin("index.css")
    //new webpack.optimize.UglifyJsPlugin({
    //    output: {
    //        comments: false  // remove all comments
    //    },
    //    compress: {
    //        warnings: false
    //    }
    //})

    //new webpack.DefinePlugin({
    //    contextRoot: 'portal'
    // })
]

//if ("true" == args.options.productcompile) {
//    console.info("begin productcompile");
//
//    cfg.plugins.push(new webpack.optimize.UglifyJsPlugin({
//        output: {
//            comments: false,  // remove all comments
//        },
//        compress: {
//            warnings: false
//        }
//    }))
//    //cfg.devtool = ""
//}

module.exports = {
    devServer: {
        historyApiFallback: true,
        //hot: true,
        //inline: true,
        //progress: true,
        contentBase: './dist',
        port: 8080,
        proxy: {
            '/portal': {
                target: 'http://developer.yyuap.com',
                pathRewrite: {'^/column' : '/column'},
                changeOrigin: true
            },
            '/fe':{
                target: 'http://developer.yyuap.com',
                pathRewrite: {'^/column' : '/column'},
                changeOrigin: true
            }
        }
    },
    entry: {
        'index': './src/index.js'
    },

    externals: {
        // 'react': 'React',
        // 'react-dom': 'ReactDOM',
        // 'tinper-bee': 'tinper-bee',
        // 'axios': 'axios'
    },
    devtool: "",

    output: {
        path: path.join(__dirname, "./dist"),
        filename: '[name].js',
        libraryTarget: 'umd',
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                include: [
                    // 只去解析运行目录下的 src 文件夹
                    path.join(process.cwd(), './src')
                ],
                loader: 'babel'
            },
            {test: /\.swig$/, loader: "swig-loader"},
            {
                test: path.resolve(path.join(__dirname), './src/trd/jquery/jquery-1.11.2.js'),
                loader: "expose?$"
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg|woff)/,
                loader: 'url?limit=10240'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpeg)$/,
                loader: 'url?limit=10240'
            }
        ]
    },

    resolve: {
        //require时省略的扩展名，如：require('module') 不需要module.js
        extension: ['', '.js', '.css'],
        //别名
        alias: {

        }
    },

    plugins:cfg.plugins

}
