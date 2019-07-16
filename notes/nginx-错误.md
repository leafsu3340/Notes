> nginx: [emerg] the "ssl" parameter requires ngx_http_ssl_module in /usr/local/n
## 一.开始Nginx的SSL模块
1.1 Nginx如果未开启SSL模块，配置Https时提示错误

```
nginx: [emerg] the "ssl" parameter requires ngx_http_ssl_module in /usr/local/nginx/conf/nginx.conf:37
```

- 原因也很简单，nginx缺少http_ssl_module模块，编译安装的时候带上--with-http_ssl_module配置就行了，但是现在的情况是我的nginx已经安装过了，怎么添加模块，其实也很简单，往下看： 做个说明：我的nginx的安装目录是/usr/local/nginx这个目录，我的源码包在/usr/local/src/nginx-1.6.2目录
1.2 Nginx开启SSL模块
切换到源码包：
```
cd /usr/local/src/nginx-1.11.3
```
查看nginx原有的模块

```
/usr/local/nginx/sbin/nginx -V
```
在configure arguments:后面显示的原有的configure参数如下：
```
--prefix=/usr/local/nginx --with-http_stub_status_module
```
那么我们的新配置信息就应该这样写：
```
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
```
运行上面的命令即可，等配置完
配置完成后，运行命令
```
make
```
这里不要进行make install，否则就是覆盖安装

然后备份原有已安装好的nginx
```
cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak
```
然后将刚刚编译好的nginx覆盖掉原有的nginx（这个时候nginx要停止状态）
```
cp ./objs/nginx /usr/local/nginx/sbin/
```
然后启动nginx，仍可以通过命令查看是否已经加入成功

```
/usr/local/nginx/sbin/nginx -V
```
## 二.Nginx 配置Http和Https共存
```
server {
    listen 80 default backlog=2048;
    listen 443 ssl;
    server_name wosign.com;
    root /var/www/html;

    ssl_certificate /usr/local/Tengine/sslcrt/ wosign.com.crt;
    ssl_certificate_key /usr/local/Tengine/sslcrt/ wosign.com .Key;
}
```
把ssl on；这行去掉，ssl写在443端口后面。这样http和https的链接都可以用
## 三.Nginx 配置SSL安全证书重启避免输入密码
可以用私钥来做这件事。生成一个解密的key文件，替代原来key文件。
```
openssl rsa -in server.key -out server.key.unsecure
```
## 四.Nginx SSL性能调优
```
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_ciphers ECDHE-RSA-AES256-SHA384:AES256-SHA256:RC4:HIGH:!MD5:!aNULL:!eNULL:!NULL:!DH:!EDH:!AESGCM;
ssl_prefer_server_ciphers on;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;
```
## 五.nginx [报错] 403 Forbidden
解决：权限问题:
nginx config文件头添加一句:
```
user  root;
```
即可。

