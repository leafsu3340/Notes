1、首先上是用法上的不同 

```
module.exports和exports的用法是后面加一个等号，再接具体的导出

module.exports=...
exports=...
```



```
export和export default的用法是后面直接接具体的导出，没有等号

export ...
export default ...
```

2、exports其实是module.exports的引用 
在nodejs中，每一个js文件都被看成是一个模块，所以，nodejs会为每一个js文件生成一个module对象，这个module对象会有一个exports属性，并且这个exports属性是一个空对象，即


```
module={
    exports:{}
}
```

同时还有一个exports对象，引用的是module的exports属性，


```
exports=module.exports
```


3、export和exports的区别 
这两个看起来很容易混淆，因为实在太像了。但是二者是完全不同的概念。

- export是es6引入的语法，用于导出模块中的变量，对象，函数，类。对应的导入关键字是import。 
- exports是一个对象，不是语法。具体的含义在第二点已经说明。

4、export和export default的区别 
export和export default都是es6的导出语法。 
二者的区别有以下几点：

export default在一个模块中只能有一个，当然也可以没有。export在一个模块中可以有多个。
export default的对象、变量、函数、类，可以没有名字。export的必须有名字。
export default对应的import和export有所区别
比如


```
// test.js
export default const a = 1;
export const a = 1;
```


对应的import分别是


```
import a from 'test'
import {a} from 'test'
```

export对应的import必须加上{}

import时取别名的区别
二者都可以在import的时候取别名。但格式不同。 
比如把导入的a取名为b

// export default对应的取别名方式

```
import b from 'test'
```

// export对应的取别名方式

```
import {a as b} from 'test'
```
