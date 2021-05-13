'use strict'
const path = require('path');

//安装
//  npm install uglifyjs-webpack-plugin  生产环境去除console
//  npm install --save babel-polyfill 
//  npm i svg-sprite-loader         配置svg-sprite-loader

//文件路径拼接  __dirname 代表当前文件路径      
function resolve(dir){
    return path.join(__dirname,dir)
}
//生产环境
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.port || process.env.npm_config_port || 9000; // dev port
const name = '后台管理系统' // page title
//插件cdn
const cdn = {
  css: [],
  js: [
      'https://cdn.bootcss.com/vue/2.5.17/vue.runtime.min.js',
      'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
      'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
      'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
  ]
}

module.exports = {
    //基本路径
    publicPath: '/',  //  history模式 '/' hash模式 './'
    //构建时输出的目录
    outputDir: 'web', 
    //放置生成的静态资源 (js、css、img、fonts) 的目录
    assetsDir: 'static',
    //html输出的路径  指定生成的 index.html 的输出路径 (相对于 outputDir)
    indexPath:'index.html',
    //文件名 hash哈希  默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
    filenameHashing:true,
    // 设置为 true 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
    lintOnSave: process.env.NODE_ENV !== 'production', //dev false  pro true
    // 如果你不需要生产环境的 CSS的 source map，可以将其设置为 false 以加速生产环境构建
    productionSourceMap: false,
    lintOnSave: false,  // 取消 eslint-loader 校验警告 （比如说引入了没调用，会出现警告）
    devServer: {
      //开发版本端口号
      port: port,
      // 是否默认自动开启在浏览器中打开   
      open: false,
      hot: true,  // 解决：vue本地项目 代码保存，浏览器不能自动更新
      //如果编译失败 浏览器 overlay 同时显示警告和错误
      overlay: {
        warnings: false, //true
        errors: true
      },
      //配置代理
      proxy: {
        '/api':{
            //接口以api开头的才要代理这台服务器
            target:'http://localhost:3000',  
            //是否需要跨域
            changeOrigin:true, 
            // pathRewrite表示路径重写，key表示一个正则，value表示别名
            pathRewrite: { 
            // 即用 ''表示'http://localhost:3000/api'     
                '^/api': ''   
            }
        },
      },
    },

    //公共样式的引入优化   scss less 配置文件  在项目上就不需要引入了直接生效（注意：必须是全局公共样式，一旦配置，全部页面都会作用）
    // css: {
    //   modules: true,
    //   sourceMap: false,
    //   // css预设器配置项
    //   loaderOptions: {
    //       // pass options to less-loader
    //       less: {
    //           // 引入全局变量样式, @ 是我们上面configureWebpack配置的绝对路径,执行src目录
    //           data: `
    //               @import "@/style/common.less";
    //           `
    //       },
    //       // pass options to sass-loader  同理
    //       sass: {
    //         // 引入全局变量样式,@使我们设置的别名,执行src目录
    //         data: `
    //             @import "@/style/common.scss";
    //         `
    //       }
    //   },
    // },
    //配置了css配置项  三方ui框架样式就会不生效!!! 
    
    chainWebpack: config=>{
      config
      .entry('index')
      .add('babel-polyfill')
      .end();
      // 配置别名  绝对路径配置 @ 比如说项目文件引入 /src/utils/common.js   配置生效后，项目里就可以直接这样引入 @/utils/common.js
      config.resolve.alias
      .set("@", resolve("src"))
      .set("@img", resolve("src/assets/images"))
      .set("@css", resolve("src/assets/styles/css"))
      .set("@scss", resolve("src/assets/styles/scss"));
       // 配置 svg-sprite-loader
       config.module
       .rule('svg')
       .exclude.add(resolve('src/icons/svg'))
       .end()
        config.module
       .rule('icons')
       .test(/\.svg$/)
       .include.add(resolve('src/icons'))
       .end()
       .use('svg-sprite-loader')
       .loader('svg-sprite-loader')
       .options({
         symbolId: 'icon-[name]'
       })
       .end()
      // 请求数增多是因为我们页面预先渲染了其它组件，会在html页面中插入像这样的东西<link rel="prefetch">
      // 移除 prefetch 插件
      config.plugins.delete('prefetch');
      // 移除 preload 插件
      config.plugins.delete('preload');
      if(isProduction){
        // 生产环境使用 cdn
        config.plugin('html')
        .tap(args => {
            args[0].cdn = cdn;
            return args;
        });
      }
    },

    //调整 webpack 配置最简单的方式就是在 vue.config.js 中的 configureWebpack 选项提供一个对象：该对象将会被 webpack-merge 合并入最终的 webpack 配置
    configureWebpack: config => {
      if (isProduction) { // 为生产环境修改配置...
        config.plugins.push(
            //生产环境自动删除console
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true,
                    },
                },
                sourceMap: false,
                parallel: true,
            })
        );

        // 用cdn方式引入
        config.externals = {
          'vue': 'Vue',
          'vuex': 'Vuex',
          'vue-router': 'VueRouter',
          'axios': 'axios'
        }

      }else{  // 为开发环境修改配置...

      }
    },



    
    


}





