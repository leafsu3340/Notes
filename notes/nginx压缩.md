## Nginx配置文件：

```
location ~* \.(json)$ {
    gzip_static  on;
    gzip_proxied expired no-cache no-store private auth;               

}
```

- a)  文件可以使用 gzip 命令来进行压缩，或任何其他兼容的命令。建议压缩文件和原始文件的修改日期和时间保持一致。
- b)  gzip_static配置优先级高于gzip。
- c)  开启nginx_static后，对于任何文件都会先查找是否有对应的gz文件。
- d)  gzip_types设置对gzip_static无效。
- e)  gzip static默认适用HTTP 1.1。

## 2)  Location配置规则

- a)  ~     波浪线表示执行一个正则匹配，区分大小写
- b)  ~*    表示执行一个正则匹配，不区分大小写
- c)  ^~    ^~表示普通字符匹配，如果该选项匹配，只匹配该选项，不匹配别的选项，一般用来匹配目录
- d)  =     进行普通字符精确匹配
- e)  @    "@" 定义一个命名的 location，使用在内部定向时，例如error_page, try_files
## location 匹配的优先级
- a)  = 精确匹配会第一个被处理。如果发现精确匹配，nginx停止搜索其他匹配。
- b)  普通字符匹配，正则表达式规则和长的块规则将被优先和查询匹配，也就是说如果该项匹配还需去看有没有正则表达式匹配和更长的匹配。
- c)  ^~ 则只匹配该规则，nginx停止搜索其他匹配，否则nginx会继续处理其他location指令。
- d)  最后匹配理带有"~"和"~*"的指令，如果找到相应的匹配，则nginx停止搜索其他匹配；当没有正则表达式或者没有正则表达式被匹配的情况下，那么匹配程度最高的逐字匹配指令会被使用。