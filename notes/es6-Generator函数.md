### Generator 函数是 ES6 提供的一种异步编程解决方案

语法上，首先可以把它理解成，Generator 函数是==一个状态机，封装了多个内部状态==。

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，==还是一个遍历器对象生成函数==。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

形式上，Generator 函数是一个普通函数，但是有两个特征。
- 一是，function关键字与函数名之间有一个星号；
- 二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。

```
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```
Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。

**一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield表达式。正常函数只能返回一个值，因为只能执行一次return；Generator 函数可以返回一系列的值，因为可以有任意多个yield。**

另外需要注意，yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。