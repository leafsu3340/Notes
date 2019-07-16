### 1.如果要拷贝一个对象，需要做到下面两件事情。
- 确保拷贝后的对象，与原对象具有同样的原型。
- 确保拷贝后的对象，与原对象具有同样的实例属性。

```
function copyObject(orig) {
  var copy = Object.create(Object.getPrototypeOf(orig));
  copyOwnPropertiesFrom(copy, orig);
  return copy;
}
```
```
function copyOwnPropertiesFrom(target, source) {
  Object
    .getOwnPropertyNames(source)
    .forEach(function (propKey) {
      var desc = Object.getOwnPropertyDescriptor(source, propKey);
      Object.defineProperty(target, propKey, desc);
    });
  return target;
}
```

另一种更简单的写法，是利用 ES2017 才引入标准的Object.getOwnPropertyDescriptors方法

```
function copyObject (orig) {
    return Object.create(
      Object.getPrototypeOf(orig),
      Object.getOwnPropertyDescriptors(orig)
    )
}
```

### 2.