 exports是module.exports的引用，即
```
var exports = module.exports
```
在一个模块的开头，这两个值都指向同一个空对象：
```
exports = module.exports={}
```
所以，exports只是后者的引用。这篇文章中，我们将通过三个例子，探究这两者的关系和区别。

一. 模块默认返回的是module.exports,即便你在自定义的模块中明确写出return exports，真正返回的仍然是module.exports。例如:


```
//a.js

var a =100;
exports=a;//module.exports={}, exports=a
return exports;//明确写出返回exports
```

刚开始的时候，exports和module.exports相等(值是空对象的地址），但是后来exports又被赋值了一个变量a(值等于a），这样exports和module.exports就不是一回事了
==(给对象的引用赋值，不会改变原来的对象)。==


```
//b.js

var modA = require('./a');
console.log(modA) // {}
```

返回的是空对象，说明a.js返回的值是module.exports而不是exports。

二.在exports上添加属性也同样会添加在module.exports上：


```
var a=100;
exports.a = a;//相当于给exports/module.exports添加了一个属性a
```
这时候,给exports添加a属性，也就相当于给module.exports添加了a属性。
```
var modA = require("./a");
console.log(modA) //{a:100}//可以拿到exports上的a属性
```

三.只要直接给module.exports赋值，exports上的各种赋值就会失效


```
var a =100;
exports.a =a;//exports={a:a}, module.exports = {a:a}
module.exports = function(){
console.log("can be output")
}  //module.exports指向新的内存空间,返回的是函数
```

从以上三个例子我们可以得到两点结论：

1. 模块输出默认是module.exports,

2. 一旦直接赋值给module.exports或者exports，它们就代表不同的变量，此情况下，只有对module.exports的赋值才能被正常输出。