## 高度没撑开，只有两种可能性：
1，浮动；
2，绝对定位

### css3
```
// 设置图片从哪里开始显示
background-origin
// 设置图片在哪里显示
background-clip
// 设置背景比例
background-size
// 水平，垂直，模糊度，阴影颜色，阴影的位置
box-shadow
// 选择图片作为边框的背景
border-image-source: url("border_image_5.jpg")
// 切割图片（九切图）
border-image-slice: 19;
// stretch 拉伸，repeat 平铺， round 铺满
border-image-repeat: round;
// 水平，垂直，模糊度，阴影颜色，阴影的位置
text-shadow

/* 属性选择器 文本*/
// p后所有的ul标签
p~ul {...}
// 具有href属性，并属性值是以E开头
a[href^="E"] {...}
// 以E结尾
a[href$="E"] {...}
// 带E字母
a[href*="E"] {...}

// 目标选择器,找锚点的p
p:target {...}

'''
<p id="four"></p>
'''
<a href="#four"></a>

// 选中选择器
p::selection {...}
// 设置第一个字符
div:first-letter {...}
// 设置第一行
div:first-line {...}

/* 渐变 */
// 线性渐变 
// 方向，开始渐变颜色，结束渐变颜色
background-image:linear-gradient(to right,yellow,green);
background-image: linear-gradient: (90deg, yellow, green);

background-image: linear-gradient: (90deg, yellow, green);

background-image:linear-gradient(to right,yellow 20%,green 20%, green 40%, red 40%);

/* 径向渐变 */
// 半径及开始的位置，开始的渐变色，结束的渐变色
background-image: radial-gradient(100px at 10px 15px,red,green);


/*2D转换*/
// 横坐标发生位移，相对于原来的位置
transform: translate(100px,100px);
// 旋转
transform: rotate(60deg);
// 缩小和放大
// 宽度倍数，高度倍数
transform: scale(0.2, 2);
// 沿着X轴方向倾斜30度，沿着Y轴方向也倾斜30度；
transform: skew(30deg, 30deg);


/* 3D转换 */
perspective: 1000px;
transform-style:preserve-3d;
transform: translateX(100px);
transform: rotateX(30deg);
transform: scaleX(2);
transform: skewX(30deg);

/* 过渡 */
transition-property
transition-delay
transition-duration
transition-timing-function
// transition简写语法
transition: property duration timing-function delay;
// 示例
transition:width 2s linear 1s;

/* 动画 */
// @keyframes 动画集的名字
@keyframes rotate {
  from {
  
  }
  to {
      
  }
}

@keyframes rotate {
  0% {
  
  }
  100% {
      
  }
}
/* animation使用 */
animation-name: rotate;
animation-duration: 2s;
animation-iteration-count: infinite; //动画的执行次数
animation-timing-funtion: linear; //设置速度
animation-direction: alternate; // 动画逆播
animation-play-state: paused; // 鼠标进入就停止
// animation简写语法
animation: name duration timing-function delay iteration-count direction;
// eg：
animation:mymove 1s ease-in-out 1s infinite alternate;

/* 伸缩布局 */
1.直接把父元素设置为伸缩元素： display: flex;
2.子元素之所以在一行显示：子元素按照主轴方式显示（只有伸缩的元素才有主轴和侧轴，主轴是水平从左向右，侧轴始终垂直于主轴）

// 伸缩
align-items: stretch;
// 换行
flex-wrap: wrap;
// 子元素换行后有空白，希望没有空白行，需要重新设置主轴方向
align-content: flex-start;

// 设置伸缩的百分比
flex: 1;
flex: 2;
flex: 3;
```
# CSS动画的两大组成部分：transition和animation

## 1. transition
```
img{
    transition: 1s height;
}
img{
    transition: 1s height, 1s width;
}
```
### transition-timing-function
transition的状态变化速度（又称timing function），默认不是匀速的，而是逐渐放慢，这叫做ease

```
img{
    transition: 1s ease;
}

```
除了ease以外，其他模式还包括
- （1）linear：匀速
- （2）ease-in：加速
- （3）ease-out：减速
- （4）cubic-bezier函数：自定义速度模式

最后那个cubic-bezier，可以使用[工具网站](http://cubic-bezier.com/#.17,.67,.83,.67)来定制。

```
img{
    transition: 1s height cubic-bezier(.83,.97,.05,1.44);
}
```
transition的完整写法如下。
```
img{
    transition: 1s 1s height ease;
}
```
这其实是一个简写形式，可以单独定义成各个属性。

```
img{
    transition-property: height;
    transition-duration: 1s;
    transition-delay: 1s;
    transition-timing-function: ease;
}
```
### transition的使用注意
- （1）目前，==各大浏览器（包括IE 10）都已经支持无前缀的transition==，所以transition已经可以很安全地==不加浏览器前缀==。
- （2）不是所有的CSS属性都支持transition，完整的列表查看[这里](http://oli.jp/2010/css-animatable-properties/)，以及具体的[效果](http://leaverou.github.io/animatable/)。
- （3）transition需要明确知道，==开始状态和结束状态的具体数值==，才能计算出中间状态。比如，height从0px变化到100px，transition可以算出中间状态。但是，transition没法算出0px到auto的中间状态，也就是说，如果开始或结束的设置是height: auto，那么就不会产生动画效果。类似的情况还有，display: none到block，background: url(foo.jpg)到url(bar.jpg)等等。
###  transition的局限
transition的优点在于简单易用，但是它有几个很大的局限。
- （1）transition需要事件触发，所以没法在网页加载时自动发生。
- （2）transition是一次性的，不能重复发生，除非一再触发。
- （3）transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。
- （4）一条transition规则，只能定义一个属性的变化，不能涉及多个属性。CSS Animation就是为了解决这些问题而提出的。
## 2. animation
首先，CSS Animation需要指定动画一个周期持续的时间，以及动画效果的名称。

```
div:hover {
  animation: 1s rainbow;
}
```
上面代码表示，当鼠标悬停在div元素上时，会产生名为rainbow的动画效果，持续时间为1秒。为此，我们还需要用==keyframes==关键字，定义rainbow效果。

```
@keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}
```
上面代码表示，rainbow效果一共有三个状态，分别为起始（0%）、中点（50%）和结束（100%）。如果有需要，完全可以插入更多状态。

默认情况下，动画只播放一次。加入==infinite==关键字，可以让动画无限次播放。

```
div:hover {
  animation: 1s rainbow infinite;
}
```
也可以指定动画具体播放的次数，比如3次。

```
div:hover {
  animation: 1s rainbow 3;
}
```
动画结束以后，会立即从结束状态跳回到起始状态。如果想让动画保持在结束状态，需要使用==animation-fill-mode==属性。


```
div:hover {
  animation: 1s rainbow forwards;
}
```


forwards表示让动画停留在结束状态
==animation-fill-mode==还可以使用下列值。
- （1）none：默认值，回到动画没开始时的状态。
- （2）backwards：让动画回到第一帧的状态。
- （3）both: 根据animation-direction（见后）轮流应用forwards和backwards规则。

动画循环播放时，每次都是从结束状态跳回到起始状态，再开始播放。==animation-direction==属性，可以改变这种行为。
下面看一个例子，来说明如何使用animation-direction。假定有一个动画是这样定义的。

```
@keyframes rainbow {
  0% { background-color: yellow; }
  100% { background: blue; }
}
```

默认情况是，animation-direction等于normal。

```
div:hover {
  animation: 1s rainbow 3 normal;
}
```
此外，还可以等于取alternate、reverse、alternate-reverse等值。
它们的含义见下图（假定动画连续播放三次）。
![image](http://image.beekka.com/blog/201402/bg2014021401.png)
同transition一样，animation也是一个简写形式。

```
div:hover {
  animation: 1s 1s rainbow linear 3 forwards normal;
}
```
这是一个简写形式，可以分解成各个单独的属性。

```
div:hover {
  animation-name: rainbow;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-delay: 1s;
    animation-fill-mode:forwards;
  animation-direction: normal;
  animation-iteration-count: 3;
}
```
## 3.keyframes的写法
keyframes关键字用来定义动画的各个状态，它的写法相当自由。
```
@keyframes rainbow {
  0% { background: #c00 }
  50% { background: orange }
  100% { background: yellowgreen }
}
```
0%可以用from代表，100%可以用to代表，因此上面的代码等同于下面的形式。

```
@keyframes rainbow {
  from { background: #c00 }
  50% { background: orange }
  to { background: yellowgreen }
}
```
如果省略某个状态，浏览器会自动推算中间状态，所以下面都是合法的写法。
```
@keyframes rainbow {
  50% { background: orange }
  to { background: yellowgreen }
}
@keyframes rainbow {
  to { background: yellowgreen }
}
```
甚至，可以把多个状态写在一行。
```
@keyframes pound {
  from，to { transform: none; }
  50% { transform: scale(1.2); }
}
```
另外一点需要注意的是，浏览器从一个状态向另一个状态过渡，是平滑过渡。==steps函数可以实现分步过渡==。
```
div:hover {
  animation: 1s rainbow infinite steps(10);
}
```
如果想让动画保持突然终止时的状态，就要使用==animation-play-state==属性。

```
div {
    animation: spin 1s linear infinite;
    animation-play-state: paused;
}

div:hover {
  animation-play-state: running;
}
```
上面的代码指定，没有鼠标没有悬停时，动画状态是暂停；一旦悬停，动画状态改为继续播放。
## 4.浏览器前缀
目前，==IE 10和Firefox（>= 16）支持没有前缀的animation==，==而chrome不支持==，所以必须使用webkit前缀。
也就是说，实际运用中，代码必须写成下面的样子。


```
div:hover {
  -webkit-animation: 1s rainbow;
  animation: 1s rainbow;  
}

@-webkit-keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}

@keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}
```

