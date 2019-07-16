## jQuery插件
jQuery插件是定义在jQuery构造函数的prototype对象上面的一个方法，这样做就能使得所有jQuery对象的实例都能共享这个方法

```
;(function ($){
  $.fn.myPlugin = function (){
    // Do your awesome plugin stuff here
  };
})(jQuery);
```
上面代码的最前面有一个分号，这是为了防止多个脚本文件合并时，其他脚本的结尾语句没有添加分号，造成运行时错误。
```
(function ($){
  $.fn.maxHeight = function (){
    var max = 0;
	// 下面这个this，指的是jQuery对象实例
    this.each(function() {
		// 回调函数内部，this指的是DOM对象
	    max = Math.max(max, $(this).height());
    });
    return max;
  };
})(jQuery);
```
需要注意的是，==在插件内部，this关键字指的是jQuery对象的实例==。而==在一般的jQuery回调函数之中，this关键字指的是DOM对象。==
上面这个maxHeight插件的作用是，返回一系列DOM对象中高度最高的那个对象的高度。


大多数情况下，插件应该返回jQuery对象，这样可以保持链式操作。


```
(function ($){
  $.fn.greenify = function (){
	this.css("color", "green");
	return this;
  };
})(jQuery);

$("a").greenify().addClass("greenified");
```
上面代码返回this对象，即jQuery对象实例，所以接下来可以采用链式操作。


对于包含多个jQuery对象的结果集，可以采用each方法，进行处理。
```
$.fn.myNewPlugin = function() {
    return this.each(function() {
        // 处理每个对象
    });
};
```
插件可以接受一个属性对象参数。

```
(function ($){
  $.fn.tooltip = function (options){
    var settings = $.extend( {
      'location'         : 'top',
      'background-color' : 'blue'
    }, options);
    return this.each(function (){
      // 填入插件代码
    });
  };
})(jQuery);
```

jQuery逐渐从浏览器环境，变为也可以用于服务器环境。所以，定义插件的时候，最好首先侦测一下运行环境。

```
if (typeof module === "object" && typeof module.exports === "object") {
  // CommonJS版本
} else {
  // 浏览器版本
}
```



```
<div id="myDiv"></div>
 
（function( $, window, document, undefined ){}）{
    $.fn.extend({
        test:function(){
                alert($(this).attr("id"));
        }
    });
   
}(jquery,window,document)
 
$("#myDiv").test();
 
//结果：myDiv
 
 
（function( $, window, document, undefined ){}）{
    $.extend({
        test:function(){
                alert("好好活着");
        }
    });
   
}(jquery,window,document)

$('#myDiv').test();
```

 以上代码，前者是绑定在dom元素上面的插件，后者是绑定在jQuery上的插件 

==$.fn是指jQuery的命名空间，加上fn的方法及属性，会对jQuery实例有效。==

jQuery为开发者开发插件提供了两个方法，分别是：

==1. jquery.extend(object);为扩展jquery类本身.为类添加新的方法==

==2. jquery.fn.extend(object);给jquery对象添加方法==

fn原型：查看jquery可知

```
jQuery.fn = jQuery.prototype ={ 
　　　init: function( selector, context ){//....　 
　　　//...... 
};
```

## ==**jquery**.fn = jquery.prototype==

==jquery本身就是一个封装得很好的类==，比如我们用语句 $("div")会生成一个jquery类的实例。

jquery.extend(object);为jquery类添加类方法，可以理解为添加静态方法。
```
jQuery.extend({
min: function(a, b) { return a < b ? a : b; },
max: function(a, b) { return a > b ? a : b; }
});
jQuery.min(2,3); //  2 
jQuery.max(4,5); //  5
```
$.fn.extend(object)；对jquery添加成员函数、jquery类的实例 可以使用这个成员函数。

列如 编辑被点击时，弹出当前编辑框里面的内容。

```
$.fn.extend({
    alertWhileClick:function(){
        $(this).click(function(){
            alert($(this).val());
        });        
    }
});
```


```
(function( $ ){
    $.fn.tooltip = function( options ) {
        // ...
    };
    
    //等价于
    var tooltip = {
        function(options){
            // ...
        }
    };
    
    $.fn.extend(tooltip) = $.prototype.extend(tooltip) = $.fn.tooltip
})( jQuery );
```

```
(function ($) {
    $.fn.m​​yPlugin = function () {

        //此处没有必要将this包在$号中如$(this)，因为this已经是一个jQuery对象。
        //$(this)等同于 $($('#element'));

        this.fadeIn('normal', function () {

            //此处callback函数中this关键字代表一个DOM元素

        });

    };
})(jQuery);

$('#element').myPlugin();
```


```
(function ($) {

    var methods = {
        init: function (options) {
            // this
        },
        show: function () {
            // is
        },
        hide: function () {
            // good
        },
        update: function (content) {
            // !!!
        }
    };

    $.fn.tooltip = function (method) {

        // 方法调用
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method' + method + 'does not exist on jQuery.tooltip');
        }

    };

})(jQuery);

//调用init方法
$('div').tooltip();

//调用init方法
$('div').tooltip({
    foo: 'bar'
});

// 调用hide方法
$('div').tooltip('hide');

//调用Update方法
$('div').tooltip('update', 'This is the new tooltip content!');
```



