## 1.true or false
```
var value = JSON.parse('false' || 'false')
console.log(value)  // false

var value = JSON.parse('true' || 'false')
console.log(value)  // true
```

## 2.在js中 if(变量)
这个变量只要满足：
变量如果不为
```
0，null，undefined，false，''
```
都会被处理为true。
- 只要变量有非0的值或是某个对象，数组，字符串，都会认为true

## 3. !''

```
if(!''){
 console.log('haha')
}
// !''为true
```
## 4.0==''
```
if(0==''){
   console.log('true') 
}
// true
```
## 5.  undefined和null
```
typeof undefined             // undefined
typeof null                  // object
null === undefined           // false
null == undefined            // true
```
在 JavaScript 中 null 表示 "什么都没有"。
null是一个只有一个值的特殊类型。表示一个==空对象引用==。

在 JavaScript 中, undefined 是一个==没有设置值的变量==。
typeof 一个没有值的变量会返回 undefined。

## 6. 数据类型
JavaScript 数据类型
在 JavaScript 中有 5 种不同的数据类型：
```
string
number
boolean
object
function
```
3 种对象类型：
```
Object
Date
Array
```
2 个不包含任何值的数据类型：
```
null
undefined
```
你可以使用 typeof 操作符来查看 JavaScript 变量的数据类型
```
typeof "John"                 // 返回 string 
typeof 3.14                   // 返回 number
typeof NaN                    // 返回 number
typeof false                  // 返回 boolean
typeof [1,2,3,4]              // 返回 object
typeof {name:'John', age:34}  // 返回 object
typeof new Date()             // 返回 object
typeof function () {}         // 返回 function
typeof myCar                  // 返回 undefined (如果 myCar 没有声明)
typeof null                   // 返回 object
```
## 7.constructor 属性返回所有 JavaScript 变量的构造函数。
```
"John".constructor                 // 返回函数 String()  { [native code] }
(3.14).constructor                 // 返回函数 Number()  { [native code] }
false.constructor                  // 返回函数 Boolean() { [native code] }
[1,2,3,4].constructor              // 返回函数 Array()   { [native code] }
{name:'John', age:34}.constructor  // 返回函数 Object()  { [native code] }
new Date().constructor             // 返回函数 Date()    { [native code] }
function () {}.constructor         // 返回函数 Function(){ [native code] }
```
你可以使用 constructor 属性来查看对象是否为日期 (包含字符串 "Date"):
```
function isDate(myDate) {
    return myDate.constructor.toString().indexOf("Date") > -1;
}
```
