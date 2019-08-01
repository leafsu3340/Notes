# 概述
javascript类型的集合，可以编译成纯javascript

typescript通过类型注解提供编译时的静态类型检查

# typescript特性
typescript是一种给JavaScript添加特性的语言扩展，增加的功能包括：
- 类型批注和编译时类型检查
- 类型推断
- 接口
- 枚举
- Mixin
- 泛型编程
- 名字空间
- 元组
- Await
- 类
- 模块
- lambda 函数的箭头语法
- 可选参数以及默认参数

# 基本类型
- any
- number
- string
- void
- boolean
- null
- undefined
- 数组类型(声明：number[]或Array<number>)
```
// 另，any在数组类型中的用法
let arrayList: any[] = [1, false, 'fine'];
```
- 元组(数组对应位置的类型需要相同)
- enum(用于定义数值集合)
- never(不会出现的值)

> 注意：typescript和javascript没有整型


## never类型
never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。这意味着声明为 never 类型的变量只能被 never 类型所赋值，在函数中它通常表现为==抛出异常==或==无法执行到终止点（例如无限循环）==，示例代码如下：
```
let x: never;
let y: number;

// 运行错误，数字类型不能转为 never 类型
x = 123;

// 运行正确，never 类型可以赋值给 never类型
x = (()=>{ throw new Error('exception')})();

// 运行正确，never 类型可以赋值给 数字类型
y = (()=>{ throw new Error('exception')})();

// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
    throw new Error(message);
}

// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop(): never {
    while (true) {}
}
```



# 基本用法
## 1.类
```
class Site { 
   name():void { 
      console.log("Runoob") 
   } 
} 
var obj = new Site(); 
obj.name();
```
对象编程，编译后为：
```
var Site = /** @class */ (function () {
    function Site() {
    }
    Site.prototype.name = function () {
        console.log("Runoob");
    };
    return Site;
}());
var obj = new Site();
obj.name();
```










