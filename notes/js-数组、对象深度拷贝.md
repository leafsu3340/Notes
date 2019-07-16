## 1. js数组深拷贝
for循环是非常好用的。如果不知道高级方法，通过for循环能够完成我们大多数的需求

```
var arr = [1,2,3,4,5]
var arr2 = copyArr(arr)
function copyArr(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
     res.push(arr[i])
    }
    return res
}
```
slice 方法实现数组的深拷贝
```
const newArray = array.slice();
```
concat 方法实现数组的深拷贝
```
const newArray = array.concat();
```
ES6扩展运算符实现数组的深拷贝




```
var [ ...arr2 ] = arr
```

## 2.对象的深度拷贝
for循环实现对象的深拷贝:

```
var obj = {
  name: 'FungLeo',
  sex: 'man',
  old: '18'
}
var obj2 = copyObj(obj)
function copyObj(obj) {
  let res = {}
  for (var key in obj) {
    res[key] = obj[key]
  }
  return res
}
```

简单粗暴法：
```
var obj2 = JSON.parse(JSON.stringify(obj))
```
 扩展运算符实现对象的深拷贝
```
var { ...obj2 } = obj
```
es6对象扩展方法Object.assign

```
const newObj = Object.assign({}, oldObj)
```
Object.assign()是浅拷贝，如果源对象的某个属性值是对象，那么目标对象拷贝到的是这个 对象的引用。

```
let source = {person: { name: 'Clearlove'}}
let target = Object.assign({}, source)

source.person.name = 'Meiko'
target.person.name  // 'Meiko'
```
对于这种嵌套的对象，一旦遇到同名属性，Object.assign()的处理方法是替换，而不是添加。

```
let source = {person: { name: 'Clearlove' }}
let target = {person: { name: 'Meiko', age: 18 }}
Object.assign(target, source) // {person: { name: 'Clearlove' }}
```
