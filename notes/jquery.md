# 1.选择网页元素
- css选择器
- jquery特有的选择方法
```
$(document) //选择整个文档对象

$('#myId') //选择ID为myId的网页元素

$('div.myClass') // 选择class为myClass的div元素

$('input[name=first]') // 选择name属性等于first的input元素
```
```
$('a:first') //选择网页中第一个a元素

　　$('tr:odd') //选择表格的奇数行

　　$('#myForm :input') // 选择表单中的input元素

　　$('div:visible') //选择可见的div元素

　　$('div:gt(2)') // 选择所有的div元素，除了前三个

　　$('div:animated') // 选择当前处于动画状态的div元素
```
# 2.改变结果集
过滤器
```
$('div').has('p');
$('div').not('.myclass');
$('div').filter('.myclass');
$('div').first();
$('div').eq(5);
```
移动方法
```
.next();
.closet();
.parent();
.children();
.sibling();
```
# 3.链式操作
```
$('div').find('h3').eq(2).html('Hello');
// end方法
$('div')
　　　.find('h3')
　　　.eq(2)
　　　.html('Hello')

　　　.end() //退回到选中所有的h3元素的那一步
　　　.eq(0) //选中第一个h3元素
　　　.html('World'); //将它的内容改为World
```
.find()与.end()结合起来用；


# 4.元素操作（取值与赋值）
.html()   .text()   .val()    .attr()   .width()  .height()  

> 需要注意的是，如果结果集包含多个元素，那么赋值的时候，将对其中所有的元素赋值；取值的时候，则是只取出第一个元素的值（.text()例外，它取出所有元素的text内容）。

# 5.元素的移动

.insertAfter() 与 .after();
.inserBefore() 与 .before();
.appendTo()  与  .append();
.prependTo() 与  .prepend();

# 6.元素的复制、删除和创建

.clone();
.remove()  与 detach();
.empty();

# 7.工具方法
```
　$.trim() 去除字符串两端的空格。

　　$.each() 遍历一个数组或对象。

　　$.inArray() 返回一个值在数组中的索引位置。如果该值不在数组中，则返回-1。

　　$.grep() 返回数组中符合某种标准的元素。

　　$.extend() 将多个对象，合并到第一个对象。

　　$.makeArray() 将对象转化为数组。

　　$.type() 判断对象的类别（函数对象、日期对象、数组对象、正则对象等等）。

　　$.isArray() 判断某个参数是否为数组。

　　$.isEmptyObject() 判断某个对象是否为空（不含有任何属性）。

　　$.isFunction() 判断某个参数是否为函数。

　　$.isPlainObject() 判断某个参数是否为用"{}"或"new Object"建立的对象。

　　$.support() 判断浏览器是否支持某个特性。
```

# 8. 事件操作

```
　　.blur() 表单元素失去焦点。

　　.change() 表单元素的值发生变化

　　.click() 鼠标单击

　　.dblclick() 鼠标双击

　　.focus() 表单元素获得焦点

　　.focusin() 子元素获得焦点

　　.focusout() 子元素失去焦点

　　.hover() 同时为mouseenter和mouseleave事件指定处理函数

　　.keydown() 按下键盘（长时间按键，只返回一个事件）

　　.keypress() 按下键盘（长时间按键，将返回多个事件）

　　.keyup() 松开键盘

　　.load() 元素加载完毕

　　.mousedown() 按下鼠标

　　.mouseenter() 鼠标进入（进入子元素不触发）

　　.mouseleave() 鼠标离开（离开子元素不触发）

　　.mousemove() 鼠标在元素内部移动

　　.mouseout() 鼠标离开（离开子元素也触发）

　　.mouseover() 鼠标进入（进入子元素也触发）

　　.mouseup() 松开鼠标

　　.ready() DOM加载完成

　　.resize() 浏览器窗口的大小发生改变

　　.scroll() 滚动条的位置发生变化

　　.select() 用户选中文本框中的内容

　　.submit() 用户递交表单

　　.toggle() 根据鼠标点击的次数，依次运行多个函数

　　.unload() 用户离开页面
```
　　
　event.pageX 事件发生时，鼠标距离网页左上角的水平距离

　　event.pageY 事件发生时，鼠标距离网页左上角的垂直距离

　　event.type 事件的类型（比如click）

　　event.which 按下了哪一个键

　　event.data 在事件对象上绑定数据，然后传入事件处理函数

　　event.target 事件针对的网页元素

　　event.preventDefault() 阻止事件的默认行为（比如点击链接，会自动打开新页面）

　　event.stopPropagation() 停止事件向上层元素冒泡
　　
```
// 在事件处理函数中，可以用this关键字，返回事件针对的DOM元素：
$('a').click(function(e) {

　　　　if ($(this).attr('href').match('evil')) { //如果确认为有害链接

　　　　　　e.preventDefault(); //阻止打开

　　　　　　$(this).addClass('evil'); //加上表示有害的class

　　　　}

　　});
```
# 9.特殊效果

最后，jQuery允许对象呈现某些特殊效果。

　　$('h1').show(); //展现一个h1标题

常用的特殊效果如下：


```
.fadeIn() 淡入

　　.fadeOut() 淡出

　　.fadeTo() 调整透明度

　　.hide() 隐藏元素

　　.show() 显示元素

　　.slideDown() 向下展开

　　.slideUp() 向上卷起

　　.slideToggle() 依次展开或卷起某个元素

　　.toggle() 依次展示或隐藏某个元素
```


除了.show()和.hide()，所有其他特效的默认执行时间都是400ms（毫秒），但是你可以改变这个设置。


```
$('h1').fadeIn(300); // 300毫秒内淡入

　　$('h1').fadeOut('slow'); // 缓慢地淡出
```


在特效结束后，可以指定执行某个函数。

　　
```
$('p').fadeOut(300, function() { $(this).remove(); });
```


更复杂的特效，可以用.animate()自定义。

```
$('div').animate(

　　　　{

　　　　　　left : "+=50", //不断右移

　　　　　　opacity : 0.25 //指定透明度

　　　　},

　　　　300, // 持续时间

　　　　function() { alert('done!'); } //回调函数

　　);
```


.stop()和.delay()用来停止或延缓特效的执行。

$.fx.off如果设置为true，则关闭所有网页特效。