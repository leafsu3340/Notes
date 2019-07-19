# 1.项目准备
大屏项目前端页面基于vue编写页面，项目基于vue-cli构建，需要先安装node.js[Vue CLI 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)]。

安装node.js:  http://nodejs.cn/，下载稳定版的msi安装包安装。

安装node.js时会自动安装npm(JavaScript包管理工具)，可使用npm或使用yarn安装vue-cli
```
npm install -g @vue/cli
```
# OR
```
yarn global add @vue/cli
```
附：yarn—— JavaScript 包管理工具。参考：https://yarn.bootcss.com/docs/
安装成功后使用"vue -V"查看版本。无报错则说明安装成功。

创建项目:
```
vue create gwzjjk
```
具体使用vue-cli如何创建项目，可参考https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

创建后可以看到这样的目录：
![img](https://github.com/leafsu3340/Blogs/blob/master/img/20dd56d3-df61-4abe-a35f-9f29b88c4ea1.jpg)

这是vuecli创建web项目的基本结构，根据个人需求，可添加个性化的配置，即添加配置文件vue.config.js。

vue.config.js 是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。
# 2.项目搭建
## 2.1项目结构
![img](https://github.com/leafsu3340/Blogs/blob/master/img/20dd56d3-df61-4abe-a35f-9f29b88c4ea1.jpg)

项目目录如图所示，mat项目内创建matcloud-gwzjjk-dp-web服务，于resources创建同级目录websrc，我们在这创建大屏的前端项目工程。

为满足需求，基于vuecli创建的基本目录结构，增添vue.config.js配置文件和deploy.js部署文件。另外package.json中添加页面开发需要的依赖包：
```
"dependencies": {
    "axios": "^0.18.0",         // 用于包装ajax请求
    "echarts": "^4.2.0-rc.2",   // 用于开发数据可视化图表
    "element-ui": "^2.6.1",     // 引用封装好的vue组件
    "jquery": "^3.3.1",         // JavaScript 函数库
    "lodash": "^4.17.11",       // 降低 array、number、objects、string 等等的使用难度
    "moment": "^2.23.0",        // JavaScript 日期处理类库
    "numeral": "^2.0.6",        // 用于格式化和操作数字的 JavaScript 库
    "qs": "^6.6.0",             // 查询字符串解析和序列化字符串的库
    "swiper": "^4.4.6",         // 内容滑动js插件
    "vue": "^2.5.21",           // 构建用户界面的渐进式框架
    "vue-easytable": "^1.7.1",  // vue封装的表格组件
    "vuex": "^3.1.0"            //  Vue.js 应用程序的状态管理器
  },
```
## 2.2 vue.config.js配置
基于vue-cli创建的项目，根据需要可修改vue.config.js的配置，具体配置参考https://cli.vuejs.org/zh/config/#vue-config-js

vue.config.js 是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。
因我们要输出两个页面，分别为国家电网有限公司资金调控平台和国家电网有限公司资金调控平台控制台，vue.config.js作如下配置：
```
module.exports = {
  baseUrl: "./", // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
  outputDir: "dist", // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  assetsDir: "public", //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  indexPath: "index.html", //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  pages: {
    //pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
    index: {
      //除了 entry 之外都是可选的
      entry: "src/main.js", // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
      template: "public/index.html", // 模板来源
      filename: "index.html", // 在 dist/index.html 的输出
      title: "国家电网有限公司资金调控平台", // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ["chunk-vendors", "chunk-common", "index"] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
    },
    admin: {
      //除了 entry 之外都是可选的
      entry: "src/admin.js", // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
      template: "public/admin.html", // 模板来源
      filename: "admin.html", // 在 dist/index.html 的输出
      title: "国家电网有限公司资金调控平台控制台", // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ["chunk-vendors", "chunk-common", "admin"] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
    }
  },
  lintOnSave: true, // 是否在保存的时候检查
  productionSourceMap: true, // 生产环境是否生成 sourceMap 文件
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps
    loaderOptions: {}, // css预设器配置项
    modules: false // 启用 CSS modules for all css / pre-processor files.
  },
  //反向代理
  devServer: {
    // 环境配置
    host: "0.0.0.0",
    port: 8080,
    disableHostCheck: true,
    https: false,
    hotOnly: false,
    open: false, //配置自动启动浏览器
    proxy: {
      // 可配置多个代理(配置一个 proxy: 'http://localhost:4000' )
      "/rest": {
        //target: "http://10.51.103.126:28090",
        target: "http://localhost:28090",
        secure: false
      }
    }
  },
  pluginOptions: {
    // 第三方插件配置
    // ...
  },
  chainWebpack: config => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => {
        options.fallback.options.name = options.fallback.options.name.replace(
          "[name].",
          ""
        );
        return options;
      });
  }
};
```
## 2.3 deploy.js部署
由于页面是采用mat平台portal加载，需要将页面的静态资源部署到matcloud-gwzjjk-dp-web/src/resources/static/src/module下，需将webpack打包的dist资源包复制到该目录下。

在根目录下，添加deploy.js文件，使用node模块“fs-extra”：
```
/* eslint-disable */
const fse = require('fs-extra')
const app = require("./package.json")
const source = './dist'
const target = '../../resources/static/src/module/' + app.name

fse.emptyDir(target).then(function(err) {
  if (err) console.error(err)
  return fse.copy(source, target, function (err) {
      if (err) console.error(err)
      else console.info("编译部署成功。")
  })
})
```
package.json/scripts 中添加脚本“"deploy": "yarn build && node deploy.js"”

运行“npm run deploy”实现项目的打包、部署。

## 2.4 页面开发
如vue.config.js配置所示，我们设置两个入口文件src/main.js，src/admin.js，分别为国家电网有限公司资金调控平台和国家电网有限公司资金调控平台控制台的入口文件。

基于这两个入口文件我们可以创建vue实例并编写前端页面了。目录结构：
![img](https://github.com/leafsu3340/Blogs/blob/master/img/0bdc0a35-dba0-4fc0-94ac-bed10b75d5ac.jpg)

开发页面前需要了解：

vue组件开发：https://cn.vuejs.org/v2/guide/

vuex: https://vuex.vuejs.org/zh/

axios: https://github.com/axios/axios

elementUI: https://github.com/ElemeFE/element

less: http://lesscss.cn/#download-options-cdn

## 2.5 页面调试
vue.config.js中的 devServer.proxy中可配置代理的服务器地址，

执行“npm run serve”:

![img](https://github.com/leafsu3340/Blogs/blob/master/img/41b5ee7a-345b-474b-940b-4de4d38d7ceb.jpg)

访问本地地址即可访问页面：
![img](https://github.com/leafsu3340/Blogs/blob/master/img/ee0b8cb6-9c2e-4657-b9a2-f1aa9364b181.jpg)

基于webpack的前端页面自带热更新功能，更改的代码将会直接反应到调试页面上。












