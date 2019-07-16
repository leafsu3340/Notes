
```
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
// var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')
var fs = require('fs')
var bodyParser = require('body-parser')
// var http = require('http')
// var qs = require('querystring')
var port = process.env.PORT || config.dev.port
// var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   app.use(proxyMiddleware(context, options))
// })

//== json数据消费==
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 访问本地json数据文件
app.use('/api/*', function (Req, Res, next) {
  var params = Req.body
  var ourl = Req.originalUrl
  var str = JSON.stringify(params)
  var path1 = ourl.replace(/\//g, '')
  var path2 = str.replace(/[,:/{/}/"/']/g, '')
  var Basepath = (path1 + path2).substr(0, 100)
  var path = 'D:/TestData/' + Basepath + '.json'
  fs.readFile(path, function (err, data) {
    if (err) {
      return console.error(err)
    }
    Res.send(data)
  })
})

// 制造数据生成json数据文件
// app.use('/api/*',function(Req, Res, next){
//   var params = Req.body
//   var cookie = ''
//   var ourl = Req.originalUrl
//   var str = JSON.stringify(params)
//   if (ourl == '/api/security/login') {
//     var arr = []
//     Req.headers.cookie.split(';').forEach(function(element) {
//       var parts = element.split('=')
//       if (parts[0] !== 'JSESSIONID') {
//        arr.push(element)
//       }
//     }, this);
//     cookie = arr.join(';')
//   } else {
//     cookie = Req.headers.cookie
//   }
//   var path1 = ourl.replace(/\//g,'')
//   var path2 = str.replace(/[,:/{/}/"/']/g,'')
//   var Basepath = (path1 + path2).substr(0,100)
//   var path = 'D:/TestData/' + Basepath + '.json'
//   var content = qs.stringify(params)
//   var options = {
//     hostname: '54.222.245.159',
//     port: 8088,
//     path: ourl,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//       'cookie': cookie
//     }
//   }
//   var request = http.request(options, function(res) {
//     res.setEncoding('utf-8')
//     var data = ''
//     res.on('data', function (chunk) {
//       data += chunk
//     })
//     res.on('end', function () {
//       fs.writeFile(path, data, function(err) {
//         if (err) {
//           return console.error(err);
//         }
//       })
//       Res.writeHead(200,res.headers)
//       Res.end(data)
//     })
//   })
//   request.on('error', function (e) {
//  console.log('problem with request: ' + e.message)
//   })
//   request.write(content)
//   request.end()
// })

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})

```
