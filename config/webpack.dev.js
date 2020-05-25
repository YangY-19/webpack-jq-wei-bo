
const path = require('path')
const webpack = require('webpack')
const { smart } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')
const webpackCommon = require('./webpack.common.js')

module.exports = smart(webpackCommon, {
    mode: 'development',
    module: {
        rules: [
            {
              test: /\.js$/i,
              use: ['babel-loader', 'eslint-loader'], //cacheDirectory 开启缓存
              include: srcPath,
            },
            {

                test: /\.(jpe?g|png|gif)$/i,
                use: [
                {   
                    loader: 'file-loader',   
                    options: {
                      name: '[hash:3]_[name].[ext]',// 打包后的文件名称
                      outputPath: 'imgs',
                      publicPath: './imgs',
                      useRelativePath: true
                    }
                  }
                ]
              },
            {
                test: /\.css/i,
                loader: ['style-loader', 'css-loader', 'postcss-loader'] //postcss-loader为css3加浏览器厂名
            },
            {
                test: /\.scss/i,
                use: [
                    {
                        loader: 'style-loader' //这里塞到body里 <style></style> 里
                    }, {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.join(__dirname, '../src/assets/css/variable.scss')
                        },
                    },
                    
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // window.ENV = 'development'
            ENV: JSON.stringify('development')
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery",
            "window.jQuery": "jquery"
        })
    ],

    devServer: { //引用devServer就会自动刷新
        //自动刷新：整个网页全部刷新，速度较慢， 状态全部丢失
        //热更新： 新代码生效，网页不刷新，状态不丢失
        historyApiFallback: true, // 当找不到路径的时候，默认加载index.html文件
        overlay: true, //eslint报错,会在浏览器里弹出
        port: 8080,
        progress: true,  // 显示打包的进度条
        contentBase: distPath,  // 根目录
        open: true,  // 自动打开浏览器
        compress: true,  // 启动 gzip 压缩
        // hot: true, //热更新
        // 设置代理
        proxy: {
            '/weibo':{
                target: "http://192.168.20.116:8088",
                changeOrigin: true,
                secure: false, 
            }
        }
    }
})