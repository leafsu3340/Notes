# 1.构造函数继承
## 使用call或apply方法

```
function Cat(name,color){

　　　　Animal.apply(this, arguments);

　　　　this.name = name;

　　　　this.color = color;

　　}

　　var cat1 = new Cat("大毛","黄色");

　　alert(cat1.species); // 动物
```
## 使用prototype属性

```
Cat.prototype = new Animal();

　　Cat.prototype.constructor = Cat;

　　var cat1 = new Cat("大毛","黄色");

　　alert(cat1.species); // 动物
```

##  直接继承prototype

```
Cat.prototype = Animal.prototype;

　　Cat.prototype.constructor = Cat;

　　var cat1 = new Cat("大毛","黄色");

　　alert(cat1.species); // 动物
```
**与前一种方法相比，这样做的优点是效率比较高（不用执行和建立Animal的实例了），比较省内存。缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象，那么任何对Cat.prototype的修改，都会反映到Animal.prototype。**


## 使用空对象作为中介继承父对象prototype
**由于"直接继承prototype"存在上述的缺点，所以就有第四种方法，利用一个空对象作为中介。**

```
function extend(Child, Parent) {

　　　　var F = function(){};

　　　　F.prototype = Parent.prototype;

　　　　Child.prototype = new F();

　　　　Child.prototype.constructor = Child;

　　　　Child.uber = Parent.prototype;

　　}
```
## 拷贝继承
```
function extend2(Child, Parent) {

　　　　var p = Parent.prototype;

　　　　var c = Child.prototype;

　　　　for (var i in p) {

　　　　　　c[i] = p[i];

　　　　　　}

　　　　c.uber = p;

　　}
```
# 2.非构造函数的继承
## object()方法

```
function object(o) {

　　　　function F() {}

　　　　F.prototype = o;

　　　　return new F();

　　}
```
## 浅拷贝


```
function extendCopy(p) {

　　　　var c = {};

　　　　for (var i in p) { 
　　　　　　c[i] = p[i];
　　　　}

　　　　c.uber = p;

　　　　return c;
　　}
```
## 深拷贝
**递归调用"浅拷贝"**

```
function deepCopy(p, c) {

　　　　var c = c || {};

　　　　for (var i in p) {

　　　　　　if (typeof p[i] === 'object') {

　　　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};

　　　　　　　　deepCopy(p[i], c[i]);

　　　　　　} else {

　　　　　　　　　c[i] = p[i];

　　　　　　}
　　　　}

　　　　return c;
　　}
```
目前，jQuery库extend方法使用的就是这种继承方法。