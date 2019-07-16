# jquery的deferred对象
defer的意思是"延迟"，所以deferred对象的含义就是"延迟"到未来某个点再执行。

```
$.ajax({

　　　　url: "test.html",

　　　　success: function(){
　　　　　　alert("哈哈，成功了！");
　　　　},

　　　　error:function(){
　　　　　　alert("出错啦！");
　　　　}

　　});
```

$.ajax()操作完成后，如果使用的是低于1.5.0版本的jQuery，返回的是XHR对象，你没法进行链式操作；如果高于1.5.0版本，返回的是deferred对象，可以进行链式操作。
现在，新的写法是这样的：

```
$.ajax("test.html")

　　.done(function(){ alert("哈哈，成功了！"); })

　　.fail(function(){ alert("出错啦！"); });
```
deferred对象的另一大好处，就是它允许你为多个事件指定一个回调函数，这是传统写法做不到的。

请看下面的代码，它用到了一个新的方法$.when()：

```
$.when($.ajax("test1.html"), $.ajax("test2.html"))

　　.done(function(){ alert("哈哈，成功了！"); })

　　.fail(function(){ alert("出错啦！"); });
```
我们来看一个具体的例子。假定有一个很耗时的操作wait：


```
var wait = function(){

　　　　var tasks = function(){

　　　　　　alert("执行完毕！");

　　　　};

　　　　setTimeout(tasks,5000);

　　};
```


我们为它指定回调函数，应该怎么做呢？

很自然的，你会想到，可以使用$.when()：

```
$.when(wait())

　　.done(function(){ alert("哈哈，成功了！"); })

　　.fail(function(){ alert("出错啦！"); });
```
但是，这样写的话，done()方法会立即执行，起不到回调函数的作用。原因在于$.when()的参数只能是deferred对象，所以必须对wait()进行改写：


```
var dtd = $.Deferred(); // 新建一个Deferred对象

　　var wait = function(dtd){

　　　　var tasks = function(){

　　　　　　alert("执行完毕！");

　　　　　　dtd.resolve(); // 改变Deferred对象的执行状态

　　　　};

　　　　setTimeout(tasks,5000);

　　　　return dtd.promise(); // 返回promise对象

　　};

　　var d = wait(dtd); // 新建一个d对象，改为对这个对象进行操作

　　$.when(d)

　　.done(function(){ alert("哈哈，成功了！"); })

　　.fail(function(){ alert("出错啦！"); });

　　d.resolve(); // 此时，这个语句是无效的
```
为了避免它的执行状态可以从外部改变这种情况，jQuery提供了deferred.promise()方法。它的作用是，在原来的deferred对象上返回另一个deferred对象，后者只开放与改变执行状态无关的方法（比如done()方法和fail()方法），屏蔽与改变执行状态有关的方法（比如resolve()方法和reject()方法），从而使得执行状态不能被改变。
另一种防止执行状态被外部改变的方法，是使用deferred对象的建构函数$.Deferred()。

这时，wait函数还是保持不变，我们直接把它传入$.Deferred()：

　
```
$.Deferred(wait)

　　.done(function(){ alert("哈哈，成功了！"); })

　　.fail(function(){ alert("出错啦！"); });
```
jQuery规定，$.Deferred()可以接受一个函数名（注意，是函数名）作为参数，$.Deferred()所生成的deferred对象将作为这个函数的默认参数。

有时为了省事，可以把done()和fail()合在一起写，这就是then()方法。

```
$.when($.ajax( "/main.php" ))

　　.then(successFunc, failureFunc );
```
## 小结：deferred对象的方法

前面已经讲到了deferred对象的多种方法，下面做一个总结：

- （1） $.Deferred() 生成一个deferred对象。

- （2） deferred.done() 指定操作成功时的回调函数

- （3） deferred.fail() 指定操作失败时的回调函数

- （4） deferred.promise() 没有参数时，返回一个新的deferred对象，该对象的运行状态无法被改变；接受参数时，作用为在参数对象上部署deferred接口。

- （5） deferred.resolve() 手动改变deferred对象的运行状态为"已完成"，从而立即触发done()方法。

- （6）deferred.reject() 这个方法与deferred.resolve()正好相反，调用后将deferred对象的运行状态变为"已失败"，从而立即触发fail()方法。

- （7） $.when() 为多个操作指定回调函数。

除了这些方法以外，deferred对象还有二个重要方法，上面的教程中没有涉及到。

- （8）deferred.then()

有时为了省事，可以把done()和fail()合在一起写，这就是then()方法。

　　$.when($.ajax( "/main.php" ))

　　.then(successFunc, failureFunc );

如果then()有两个参数，那么第一个参数是done()方法的回调函数，第二个参数是fail()方法的回调方法。如果then()只有一个参数，那么等同于done()。

- （9）deferred.always()

这个方法也是用来指定回调函数的，它的作用是，不管调用的是deferred.resolve()还是deferred.reject()，最后总是执行。