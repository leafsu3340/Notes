#### 如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因

ES6 引入了一种新的原始数据类型Symbol，==表示独一无二的值==。它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

对象的属性名现在可以有两种类型，
- 一种是原来就有的字符串，
- 另一种就是新增的 Symbol 类型。

凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
```
let s = Symbol();
typeof s 
// "symbol"
```
注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。

Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
```
let s1 = Symbol('foo')
let s2 = Symbol('bar')

s1.toString() // "Symbol('foo')"
s2.toString() // "Symbol('bar')"
```
s1和s2是两个 Symbol 值。如果不加参数，它们在控制台的输出都是Symbol()，不利于区分,有了参数以后，就等于为它们加上了==描述==

## 运用
### 1、作为属性名Symbol
```
let mysymbol = Symbol();
// 第一种写法
let a = {};
a[mysymbol] = "hello"

// 第二种写法
let a = {[mysymbol]:"hello"}
/* 在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。*/

// 第三种写法
let a = {};
Object.defineProperty(a,mysymbol,{value:"hello"})
```
symbol作为属性名时不能用点运算符
```
const mysymbol = Symbol();
const a = {};
a.mysymbol = 'hello'
a[mysymbol] // undefined
a['mysymbol'] // hello
```
### 2.消除魔术字符
### 3.属性名的遍历
Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。

Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

```
const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a) Symbol(b)]
```






