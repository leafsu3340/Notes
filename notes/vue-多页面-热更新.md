## 热更新

终于找到原因了，这些配置文件我是照着vue的项目生成文件写的，删掉
```
compiler.plugin('compilation', function (compilation) {
```
这一块就可以。不过这样的话更新html文件就不能自动刷新了。也不能热更新js文件，会提示你module.hot，所以需要在每个入口文件加上这么一段：

```
if (module.hot) {
  module.hot.accept()
}
```

不过感觉这样好麻烦，应该可以先判断下NODE_ENV,然后自动为每个入口文件加上这么一段，具体做法还不清楚。。。。先这样