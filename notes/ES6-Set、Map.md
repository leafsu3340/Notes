# Set 与 Map
### Set 本身是一个构造函数，用来生成 Set 数据结构。


Set 结构的实例有以下属性。
```
const s = new Set();
[1,2,3,3,4].forEach(x=>s.add(x));

for(let i of s) {
    console.log(x)
}
// 1,2,3,4
// 数组去重
const set = new Set([1,22,22,33,33,4])
[...set]  // [1,22,33,4]

```
向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是NaN等于自身，而精确相等运算符认为NaN不等于自身。
```
let set = new Set();
let a=NaN;
let b=NaN;
set.add(a);
set.add(b);
set // Set {NaN}
```
上面代码向 Set 实例添加了两个NaN，但是只能加入一个。这表明，在 Set 内部，两个NaN是相等。

另外，两个对象总是不相等的。
```
let set =  new Set();
set.add({});
set.add({});
set.size  // 2
```
上面代码表示，由于两个空对象不相等，所以它们被视为两个值。

### set结构有以下属性
- Set.prototype.constructor：构造函数，默认就是Set函数。
- Set.prototype.size：返回Set实例的成员总数。

Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

- add(value)：添加某个值，返回 Set 结构本身。
- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- has(value)：返回一个布尔值，表示该值是否为Set的成员。
- clear()：清除所有成员，没有返回值。
上述属性和方法实例：
```
s.add(1).add(2).add(2); 
// 2被加了两次
s.size  // 2
s.has(1)  // true
s.has(3)  // false
s.delete(2);
s.has(2)  // false
```
下面是一个对比，看看在判断是否包括一个键上面，Object结构和Set结构的写法不同。
```
const properties = {
    'width': 1,
    'height': 2,
}
if(properties[someName]) {
    // do something
}

// set写法
const properties = new Set();
properties.add('width');
properties.add('height');
if(properties.has(someName)) {
    // do something
}
```
Array.from方法可以将 Set 结构转为数组,
这就提供了去除数组重复成员的另一种方法。
```
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);

funtion dedupe(array){
    Array.from(new Set(array))
}
```
```
// (运用...扩展符)去除数组的重复成员
[...new Set(array)]
```
### 遍历操作
Set 结构的实例有四个遍历方法，可以用于遍历成员。

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员

由于Set结构没有键名，只有键值（或者说键名和键值是同一个）所以keys()方法与values()方法行为完全一致。
```
let set = new Set(['red','green','blue']);
for(let item of set.keys()) {
    console.log(item)
}
// red,green,blue

for(let item of set.values()) {
    console.log(item)
}
// red,green,blue
for(let item of set.entries()) {
    console.log(item)
}
// ['red','red']
// ['green','green']
// ['blue','blue']
```
Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
```
Set.prototype[Symbol.iterator] === Set.prototype.values   // true
```
#### forEach()
Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。
```
set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```
#### 扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构。
```
let set = new Set(['red', 'green', 'blue']);
let arr = [...set]
// ['red', 'green', 'blue']
```
而且，数组的map和filter方法也可以间接用于 Set 了。
```
let set = new Set([1,2,3]);
set = new Set([...set].map(x => x*2);
// 返回Set结构：{2, 4, 6}
set = new Set([...set].filter(x => (x%2)===0));
// 返回Set结构：{2}
```
因此使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。
```
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// 并集
let union = new Set([...a,...b]);
// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// 差集
let difference = new Set([...a].filter(x => {
!b.has(x)))
```
如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用Array.from方法。
```
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6
```
# Map的用法
含义和基本用法
JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是==传统上只能用字符串当作键==。这给它的使用带来了很大的限制。

```
const data = {};
const element = document.getElementById('myDiv');

data[element] = 'metadata';
data['[object HTMLDivElement]'] // "metadata"
```
上面代码原意是将一个 DOM 节点作为对象data的键，但是由于对象只接受字符串作为键名，所以element被自动转为字符串[object HTMLDivElement]。

为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，==Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现==。如果你需要“键值对”的数据结构，Map 比 Object 更合适。
```
const map = new Map([
['name', 'zhangshan'],
['title', 'author']
]);

map.size  // 2
map.has('name') // true
map.get('name') // zhangshan
```
上面代码在新建 Map 实例时，就指定了两个键name和title。

Map构造函数接受数组作为参数，实际上执行的是下面的算法。
```
const items = [
  ['name', '张三'],
  ['title', 'Author']
];

const map = new Map();

items.forEach(
  ([key, value]) => map.set(key, value)
);
```
事实上，不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作Map构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map。
```
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3
```
Map 结构的实例有以下属性和操作方法。
- （1）size 属性

size属性返回 Map 结构的成员总数。
- （2）set(key, value)

set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。
- （3）get(key)

get方法读取key对应的键值，如果找不到key，返回undefined。
- （4）has(key)

has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
- （5）delete(key)

delete方法删除某个键，返回true。如果删除失败，返回false。
- （6）clear()

clear方法清除所有成员，没有返回值。

遍历方法
Map 结构原生提供三个遍历器生成函数和一个遍历方法。

keys()：返回键名的遍历器。
values()：返回键值的遍历器。
entries()：返回所有成员的遍历器。
forEach()：遍历 Map 的所有成员。
需要特别注意的是，Map 的遍历顺序就是插入顺序。

```
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```
上面代码最后的那个例子，表示 Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。

```
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
```
