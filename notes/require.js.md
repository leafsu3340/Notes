## data-main属性

requirejs需要一个根来作为搜索依赖的开始，data-main用来指定这个根。


```
<script src="scripts/require.js" data-main="scripts/app.js"></script>
```

这里就指定了根是app.js,只有直接或者间接与app.js有依赖关系的模块才会被插入到html中。

## require.config() 配置

1. 通过这个函数可以对requirejs进行灵活的配置，其参数为一个配置对象，配置项及含义如下：
1. baseUrl——用于加载模块的根路径。
1. paths——用于映射不存在根路径下面的模块路径。
1. shims——配置在脚本/模块外面并没有使用RequireJS的函数依赖并且初始化函数。假设underscore并没有使用 RequireJS定义，但是你还是想通过RequireJS来使用它，那么你就需要在配置中把它定义为一个shim。
1. deps——加载依赖关系数组
 
```
require.config({
  //默认情况下从这个文件开始拉去取资源
 baseUrl:'scripts/app',
  //如果你的依赖模块以pb头，会从scripts/pb加载模块。
 paths:{
  pb:'../pb'
 },
 // load backbone as a shim，所谓就是将没有采用requirejs方式定义

//模块的东西转变为requirejs模块
 shim:{
  'backbone':{
   deps:['underscore'],
   exports:'Backbone'
  }
 }
});
```
