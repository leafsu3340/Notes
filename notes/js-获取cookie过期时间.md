### js-获取cookie过期时间
javascript和动态页无法获取cookie过期的时间，过期时间由浏览器管理，javascript和动态页只能设置过期时间，无法通过document.cookie（javascript）或者Cookie.Expires（asp.net）属性获取到。

==一定要获取过期时间，需要通过另外一个cookie值来记录对应cookie的过期时间==


```
var d = new Date();
d.setHours(d.getHours() + 1); //1小时候过期
document.cookie = 'testvalue=123;expires=' + d.toGMTString(); //存储cookie值
document.cookie = 'testexp=' + escape(d.toLocaleString()) + ';expires=' + d.toGMTString(); //存储cookie过期时间，要获取testvalue这个cookie的过期时间，通过获取testexp这个cookie来实现
```
