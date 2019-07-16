## for in 和 for of

使用for in 也可以遍历数组，但是会存在以下问题：

1.index**索引**为字符串型数字，不能直接进行几何运算

2.遍历顺序有可能不是按照实际数组的内部顺序

3.使用for in会遍历数组所有的可枚举属性，包括原型。例如上栗的原型方法method和name属性

所以for in更适合遍历对象，==不要使用for in遍历数组==。

那么除了使用for循环，如何更简单的正确的遍历数组达到我们的期望呢（即不遍历method和name），ES6中的for of更胜一筹.


==遍历对象 通常用for in来遍历对象的键名==

记住，**for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值**。


```
for (var key in myObject) {
　　if（myObject.hasOwnProperty(key)){
　　　　console.log(key);
　　}
}
```

```
for (var value of myArray) {
  console.log(value);
}
```



