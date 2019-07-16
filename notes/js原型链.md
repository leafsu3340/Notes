虽然JavaScript里一切皆对象，但为了理解原型链系统，我们需要将JavaScript的对象分为对象和函数两大类。在此基础上，JavaScript的原型链逻辑遵从以下通用规则：

++**通用规则**:++
- ==对象有__proto__属性，函数有prototype属性；==
- ==对象由函数生成;==
- ==生成对象时，对象的__proto__属性指向函数的prototype属性。==



```
创建空对象时，实际上我们是用Object函数来生成对象的：
>var o = {}
>o.__proto__ === Object.prototype
true

我们也可以显式的使用Object函数来创建对象：
>var o = Object()
o.__proto__ === Object.prototype
true

当我们使用函数来创建自定义的对象时，上面的规则同样适用：
>function MyObj(){}
>typeof MyObj
"function"
>var mo = new MyObj()
>mo.__proto__ === MyObj.prototype
true
```


```
函数对象都是由Function函数生成的：
>function fn(){}
>fn.__proto__ === Function.prototype
true
```



```
Function函数本身作为对象时，生成它的函数是他自身！
>Function.__proto__ === Function.prototype
true
```



```
Object函数既然是函数，那生成它的函数自然是Function函数咯：
>Object.__proto__ === Function.prototype
true
```



```
一般函数默认的prototype是系统自动生成的一个对象：
>function fn(){}
>typeof fn.prototype
"object"
>fn.prototype
{constructor: ƒ}
    constructor: ƒ fn()
    __proto__: Object

>fn.prototype.constructor === fn
true
>fn.prototype.__proto__ === Object.prototype
true
```


```
>Object.prototype.__proto__
null
```
![image](https://upload-images.jianshu.io/upload_images/13902845-babea8f0cde0d791.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)










