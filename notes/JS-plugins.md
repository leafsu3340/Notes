### 1.剪切板复制文本:clipboard.js

example:
```
/*target*/
<span id="api-key" :title="apiKey">{{apiKey}}</span>

/*operation*/
<a class="copy-button" data-clipboard-target="#api-key">复制ApiKey</a>

<a class="copy-button" :data-clipboard-text="showMsgStr">复制报文</a>

/* js */
const apiClipboard = new Clipboard('.copy-button');
const self = this;
apiClipboard.on('success', (e) => {
  self.$toast.success('ApiKey已复制到剪切板');
});
apiClipboard.on('error', (e) => {
  self.$toast.error('浏览器兼容问题,请手动复制');
});
```

### 2.web编辑器:vue-codemirror\codemirror.js
[codemirror](http://codemirror.net/)

[vue-codemirror](https://surmon-china.github.io/vue-codemirror/)

### 3.滑动js插件- swiper

[swiper](https://www.swiper.com.cn/)

### 4.自定义滚动条jquery插件- perfectscrollbar

[perfect-scrollbar](https://github.com/utatti/perfect-scrollbar)
#### 主要特性：
- 不需要修改任何的元素的css
- 滚动条不影响最初的页面布局设计
- 滚动条支持完整的自定义
- 滚动条的尺寸和位置会随着容器尺寸或者内容的变化而变化
- 依赖于jQuery和相关几个类库
- 不需要定义宽度和高度。它会固定在容器的右下
- 你可以修改任何滚动条的样式，不依赖于其它脚本
- 滚动条支持'update'方法。如果你需要修改滚动条的位置和大小，只需要调用这个方法即可
- 不使用'scrollTop'和'scrollLeft'，不是用任何绝对定位
#### 使用要求：
- 必须有一个内容元素
- 容器必须拥有一个'position'的CSS样式定义
- 滚动条的position必须是'absolute'
- scrollbar-x必须拥有一个bottom的样式定义，scrollbar-必须有一个'right'的样式定义

##### 例:
```
<!DOCTYPE html>
<html>
<head>
　　<title>perfect-scrollbar</title>
　　<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
　　<link href="css/perfect-scrollbar.css" rel="stylesheet">
　　<style>
　　　　#Demo {position:relative;margin:0px auto;padding:0px;width:600px;height:400px;overflow:hidden;}
　　　　#Demo .content {background:#666;width:1280px;height:720px;padding:10px;color:#fff}
　　</style>
</head>
<body>
　　<div id='Demo'>
　　　　<div class='content'>
　　　　　　<p>
    　　　　　　不需要修改任何的元素的css
   　　　　　　 滚动条不影响最初的页面布局设计
    　　　　　　滚动条支持完整的自定义
    　　　　　　滚动条的尺寸和位置会随着容器尺寸或者内容的变化而变化
    　　　　　　依赖于jQuery和相关几个类库
   　　　　　　 不需要定义宽度和高度。它会固定在容器的右下
   　　　　　　 你可以修改任何滚动条的样式，不依赖于其它脚本
  　　　　　　  滚动条支持'update'方法。如果你需要修改滚动条的位置和大小，只需要调用这个方法即可
  　　　　　　  不使用'scrollTop'和'scrollLeft'，不是用任何绝对定位
　　　　　　</p>
　　　　</div>
　　</div>
　　<script src="http://libs.baidu.com/jquery/1.9.0/jquery.js"></script>
　　<script src="js/perfect-scrollbar.with-mousewheel.min.js"></script>
　　<script>
　　　　$(function() {
　　　　　　$('#Demo').perfectScrollbar();
　　　　});
　　</script>
</body>
</html>
```
javascript
```
$('#Demo').perfectScrollbar();
```
如果容器大小或者位置变化了，调用如下方法即可：
```
$('#Demo').perfectScrollbar('update');
```
如果你需要销毁，调用如下：
```
$('#Demo').perfectScrollbar('destroy');
```
如果你需要滚动到某一个特定位置，调用如下：
```
$("#Demo").scrollTop(0);
$("#Demo").perfectScrollbar('update');
```
### 5.lodash

lodash是一个javascript库，也是Node JS的常用模块。
[lodash](https://www.html.cn/doc/lodash/#_templatesettingsimports_)

### 6.animate.css

[animate](https://daneden.github.io/animate.css/)

### 7.

