# Echarts自适应浏览器大小

最近做前端开发的过程中碰到Echarts自适应浏览器的大小。下面是本人在解决这个事情的过程中遇到的一些问题：
这里使用的是window.onresize = function () {…}和Echarts的resize()。

## 问题一

问题代码：


```
window.onresize = function () {
    this.chart =echarts.init(document.getElementById('id'))
    this.chart.resize()
}
```

现象：警告，There is a chart instance already initialized on the dom.

分析：在DOM上已经初始化了一个图表实例。换言之，就是您在其他地方（或页面加载或其他）已经进行过初始化。

解决办法及代码：既然dom上已经存在此实例，我们只需要从DOM上获取此实例方法即可。


```
window.onresize = function () {
   this.chart = echarts.getInstanceByDom(document.getElementById('id'))
   this.chart.resize()
}
```

## 问题二

现象：同一个页面多个echarts时，只有最后一个图表触发了window.onresize事件。
分析：window.onresize只响应一次

解决办法及代码：不要在每一个echarts实例中触发window.onresize事件。


```
window.onresize = function () {
   this.Firstchart = echarts.getInstanceByDom(document.getElementById('id'))
   this.Secondchart = echarts.getInstanceByDom(document.getElementById('id'))
   this.Firstchart.resize()
   this.Secondchart.resize()
 }
```

## 问题三

现象：当拖动浏览器改变大小时，页面及echarts适配浏览器非常的慢。
分析：这个bug花费了我好一番精力，尝试了各种方法。window.onresize事件在短时间内重复触发，那么频繁的DOM相关操作可能就会导致上述现象。此外，echarts上的点过多（几千个甚至更多），Echarts的resize()比较慢，可能也会导致上述现象。

解决办法及代码：写一个函数节流，为Echarts的resize()设置定时器。如果echarts上的点过多【这个没贴代码】，window开始resize时做一个加载动画，当echarts 执行完了，再取消动画hideloading()。


```
this.Firstchart = echarts.getInstanceByDom(document.getElementById('id'))
       this.Secondchart = echarts.getInstanceByDom(document.getElementById('id'))
       let self = this
       // 函数节流
       function throttle (method, context) {
          clearTimeout(method.tId)
          method.tId = setTimeout(function () {
          method.call(context)
         }, 300)
       }
       function handler () {
          self.Firstchart.resize()
          self.Secondchart.resize()
       }
       window.onresize = function () {
          throttle(handler, window)
       }
```
