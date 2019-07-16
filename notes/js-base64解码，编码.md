
```
window.btoa(字符串);//base64->ascii

window.atob(字符串);//ascii->base64
```


### 一.我们来看看，在javascript中如何使用Base64转码
```
var str = 'javascript';

window.btoa(str)
//转码结果 "amF2YXNjcmlwdA=="

window.atob("amF2YXNjcmlwdA==")
//解码结果 "javascript"
```
### 二.对于转码来说，Base64转码的对象只能是字符串，因此来说，对于其他数据还有这一定的局限性，在此特别需要注意的是对Unicode转码。

```
var str = "China，中国"
window.btoa(str)
```

Uncaught DOMException: Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.
很明显，这种方式是不行的，那么如何让他支持汉字呢，这就要使用window.encodeURIComponent和window.decodeURIComponent

var str = "China，中国";


```
window.btoa(window.encodeURIComponent(str))
//"Q2hpbmElRUYlQkMlOEMlRTQlQjglQUQlRTUlOUIlQkQ="

window.decodeURIComponent(window.atob('Q2hpbmElRUYlQkMlOEMlRTQlQjglQUQlRTUlOUIlQkQ='))
//"China，中国"
```
