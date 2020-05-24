const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const MinCssExtractPlugin = require('mini-css-extract-plugin') //抽离css
const TerserJSPlugin = require('terser-webpack-plugin')//压缩css
const OptimizCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') //压缩css
const Happypack = require('happypack') //启动多进程
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')
const { smart } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')

module.exports = smart(webpackCommonConf, {
    mode: 'production', //会自动压缩代码
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[contentHash:8].js',  // 打包代码时，加上 hash 戳
        publicPath: './'
        // publicPath: 'http://localhost:8080'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
    },
    resolve: {
        //针对npm 中第三方模块优先采用jsnext:main 中指向的  ES6 模块化语法文件
        mainFields: ['jsnext:main', 'browser', 'main']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['Happypack/loader?id=babel'],  //启动多进程
                include: srcPath,
            },
            // 图片 - 考虑 base64 编码的情况
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 小于 5kb 的图片用 base64 格式产出
                        // 否则，依然延用 file-loader 的形式，产出 url 格式
                        limit: 5 * 1024,

                        // 打包到 img 目录下
                        outputPath: 'imgs',
                        name: '[name].[ext]',
                        // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
                        publicPath: './imgs',
                        // publicPath: 'http://localhost:8080'
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MinCssExtractPlugin.loader
                    }, {
                        loader: 'css-loader',
                        // options: {
                        //     modules: true,
                        //     getLocalIdent: (context, localIdentName, localName, options) => {
                        //         return localName
                        //     }
                    
                        // }
                    },
                    {
                        loader: 'postcss-loader'
                    } // 加了 postcss
                    ]
            },
            {
                test: /\.less$/,
                // 增加 'less-loader' ，注意顺序
                loader: [MinCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MinCssExtractPlugin.loader
                    }, {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    // {
                    //     loader: 'sass-resources-loader',
                    //     options: {
                    //         resources: [
                    //             // resolve方法第二个参数为scss配置文件地址，如果有多个，就进行依次添加即可
                    //             path.resolve(__dirname, '../src/style/index.scss'),
                    //             path.resolve(__dirname, '../src/style/scss/base.scss'),
                    //         ],
                    //     }
                    // }
                ]
            }
        ],
        noParse:[/react\.mixin\.js$/] //避免重复打包, 匹配到相同路径的就直接引入,不重复打包
    },
    plugins: [
        new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify('production')
        }),
       
        // 抽离css
        new MinCssExtractPlugin({
            filename: 'css/main.[contentHash:8].css'
        }),

        new ModuleConcatenationPlugin(), //Scope Hosting

        //忽略 moment 下的 /locale 目录
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),

        //启用多进程压缩代码, 小项目不推荐使用,会增加打包时间
        new Happypack({
            id: 'babel',
            loaders: ['babel-loader?cacheDirectory']
        }),

        //使用 ParallelUglifyPlugin 并进行压缩输出的js
       new ParallelUglifyPlugin({
           //传递给
           uglifyJs: {
               beautify: false, //最紧凑的输出
               comments: false  //删除所有的注释
           },
           compress: {
               //删除所有的console语句
               drop_console: true,
               //内嵌定义了但是只用到一次的变量
               collapse_vars: false,
               //提取出出现多次但是没有定义变量去引用的静态值
               reduce_vars: true
           }
       })
    ],

    optimization: {
        // 压缩 css
        minimizer: [new TerserJSPlugin({}), new OptimizCssAssetsPlugin({})],
        //抽离公共模块及第三方模块
        // splitChunks: {
        //     chunks: 'all',
        //     cacheGroups: {
        //         //第三方模块
        //         vendor: {
        //             name: 'vendor', //chunk 名称
        //             priority: 1, //权限更高，优先抽离
        //             test: /node_modules/,
        //             minSize: 0, //大小限制 
        //             minChunks: 1, //有1次复用就抽离出来
        //         },
                
        //         //公共模块
        //         common: {
        //             name: 'common', //chunk 名称
        //             priority: 0, //权限更高，优先抽离
        //             minSize: 30000, //大小限制 , 大于这个数才会打包
        //             minChunks: 2,//有2次复用就抽离出来
        //         },
        //     }
        // }
    }
})