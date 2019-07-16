# apply, call和bind有什么区别?

参考答案：三者都可以把一个函数应用到其他对象上，注意不是自身对象．
- apply,call是直接执行函数调用，
- bind是绑定，执行需要再次调用．
- apply和call的区别是apply接受数组作为参数，而call是接受逗号分隔的无限多个参数列表。
- 例子：

```
function Person() {}
Person.prototype.sayName() { alert(this.name); }

var obj = {name: 'michaelqin'}; 
// 注意这是一个普通对象，它不是Person的实例
```

1) apply
    
```
Person.prototype.sayName.apply(obj, [param1, param2, param3]);
```


2) call
   
```
Person.prototype.sayName.call(obj, param1, param2, param3);
```


3) bind
    
```
var sn = Person.prototype.sayName.bind(obj);    
    sn([param1, param2, param3]); // bind需要先绑定，再执行 
    sn(param1, param2, param3); // bind需要先绑定，再执行
```
