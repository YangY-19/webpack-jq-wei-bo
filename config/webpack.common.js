const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const glob = require('glob')
const { srcPath, pagesPath, componentPath, assetsPath } = require('./paths')

function entries () {
  let entry = {};
  const componentPaths = glob.sync(componentPath + '/**/*.js')
  const assetsPaths = glob.sync(assetsPath + '/**/.js')
  const pagePaths = glob.sync(pagesPath + '/**/*.js').concat()
  let entryFiles = [...componentPaths, ...assetsPaths, ...pagePaths ]
//   console.log(entryFiles)
  entryFiles.forEach(function (name) {
        let start = name.indexOf('src/') + 4,
            end = name.length - 3;
        let eArr = [];
        let n = name.slice(start, end);
        n = n.slice(0, n.lastIndexOf('/')); //保存各个组件的入口 
        n = n.split('pages/')[1] || n.split('html-component/')[1] || n.split('assets/')[1];
        eArr.push(name);
        entry[n] = eArr;
    });
    // const entrys = Object.assign(
    //     {
    //         assetsPublicPath: './'
    //     },
    //     entry)
    //     console.log(entrys)
    return entry;
}

function newHtmlWebpackPlugins () {
    
   let htmls = glob.sync(srcPath + '/**/**/*.html')
//    let htmlComponent = glob.sync(pagesPath + '/**/*.html')
   let plugins = []
   for(let i = 0; i < htmls.length; i++) {
      let filePath = htmls[i]
      let filename_no_extension = filePath.substring(filePath.lastIndexOf('/', filePath.lastIndexOf('/') - 1) + 1, filePath.lastIndexOf('/'));
      let filename = filename_no_extension.concat('.html')
      console.log(filename_no_extension)
      plugins.push(
          new HtmlWebpackPlugin({
              template: filePath,
              filename: filename,
              chunks: ['vendor', 'common', filename_no_extension],
              inject: true, // true：默认值，script标签位于html文件的 body 底部
              hash: true, // 在打包的资源插入html会加上hash
          })
      )
   }
  
   return plugins
}

module.exports = {
    entry: entries(),
    module: {
        rules: [
           {
               test: /\.html$/i,
               use: [
                {
                    loader: 'html-loader',
                    options: {
                       attributes: {
                           list: [
                               {
                                   tag: 'img',
                                   attribute: 'src',
                                   type: 'src'
                               }
                           ]
                       }
                    }
                }
              ]
           },
           {

            test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  name: '[name].[ext]',// 打包后的文件名称
                  outputPath: 'font', // 默认是dist目录
                  publicPath: './font', // 图片的url前面追加'../font'
                  useRelativePath: true, // 使用相对路径
                  limit: 50000 // 表示小于1K的图片会被转化成base64格式
                }
              }
    
            ]
    
          },
        ],

        
    },
    resolve: {
        extensions: ['.js', '.json'], // 解析扩展。（当我们通过路导入文件，找不到改文件时，会尝试加入这些后缀继续寻找文件）
        alias: {
            '@': path.join(__dirname, '..', "src") // 在项目中使用@符号代替src路径，导入文件路径更方便
        }
    },

    plugins: [
        ...newHtmlWebpackPlugins(),
    ],

    optimization: {
        //抽离公共模块及第三方模块
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                //第三方模块
                vendor: {
                    name: 'vendor', //chunk 名称
                    priority: 1, //权限更高，优先抽离
                    test: /node_modules/,
                    minSize: 0, //大小限制 
                    minChunks: 1, //有1次复用就抽离出来
                },
                
                //公共模块
                common: {
                    name: 'common', //chunk 名称
                    test: /src\/assets\/js/,
                    priority: 0, //权限更高，优先抽离
                    minSize: 30000, //大小限制 , 大于这个数才会打包
                    minChunks: 1,//有2次复用就抽离出来
                },
            }
        }
    }
}