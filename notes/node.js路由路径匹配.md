## 路由（URL映射）
Express利用HTTP动作提供了有意义并富有表现力的URL映射API，例如我们可能想让用户帐号的URL看起来像“/user/12”的样子，下面的例子就能实现这样的路由，其中与占位标识符（本例为:id）相关的值可以被req.params获取到。

```
app.get('/user/:id', function(req, res){
    res.send('user ' + req.params.id);
});
```
路由是一个可以被内部编译成正则表达式的简单字符串，比如当/user/:id被编译后，被内部编译后的正则表达式字符串看起来会是下面的样子（简化后）：

```
\/user\/([^\/]+)\/?
```

```
app.use('/abcd', function (req, res, next) {
  next();
})

// will match paths starting with /abcd and /abd
app.use('/abc?d', function (req, res, next) {
  next();
})

// will match paths starting with /abcd, /abbcd, /abbbbbcd and so on
app.use('/ab+cd', function (req, res, next) {
  next();
})

// will match paths starting with /abcd, /abxcd, /abFOOcd, /abbArcd and so on
app.use('/ab\*cd', function (req, res, next) {
  next();
})

// will match paths starting with /ad and /abcd
app.use('/a(bc)?d', function (req, res, next) {
  next();
})

// will match paths starting with /abc and /xyz
app.use(/\/abc|\/xyz/, function (req, res, next) {
  next();
})

// will match paths starting with /abcd, /xyza, /lmn, and /pqr
app.use(['/abcd', '/xyza', /\/lmn|\/pqr/], function (req, res, next) {
  next();
})
```

```
"/user/:id"
/user/12
 
"/users/:id?"
/users/5
/users
 
"/files/*"
/files/jquery.js
/files/javascripts/jquery.js
 
"/file/*.*"
/files/jquery.js
/files/javascripts/jquery.js
 
"/user/:id/:operation?"
/user/1
/user/1/edit
 
"/products.:format"
/products.json
/products.xml
 
"/products.:format?"
/products.json
/products.xml
/products
 
"/user/:id.:format?"
/user/12
/user/12.json
```
