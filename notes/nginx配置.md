# nginx配置
#### 1.重新加载配置|重启|停止|退出
```
nginx -s reload|reopen|stop|quit

#linux中
sudo /etc/init.d/nginx restart|reload|reopen|stop|quit
```
### windows指令
1、启动：
```
C:\server\nginx-1.0.2>start nginx
```
或
```
C:\server\nginx-1.0.2>nginx.exe
```
注：建议使用第一种，第二种会使你的cmd窗口一直处于执行中，不能进行其他命令操作。
2、停止：

```
C:\server\nginx-1.0.2>nginx.exe -s stop
```

或

```
C:\server\nginx-1.0.2>nginx.exe -s quit
```

注：stop是快速停止nginx，可能并不保存相关信息；quit是完整有序的停止nginx，并保存相关信息。
3、重新载入Nginx：

```
C:\server\nginx-1.0.2>nginx.exe -s reload
```

当配置信息修改，需要重新载入这些配置时使用此命令。
4、重新打开日志文件：

```
C:\server\nginx-1.0.2>nginx.exe -s reopen
```

5、查看Nginx版本：

```
C:\server\nginx-1.0.2>nginx -v
```


#### 2.https配置
```
#user  nobody;
worker_processes  1;
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
#pid        logs/nginx.pid;
events {
    worker_connections  1024;
}
# load modules compiled as Dynamic Shared Object (DSO)
#
#dso {
#    load ngx_http_fastcgi_module.so;
#    load ngx_http_rewrite_module.so;
#}
http {
    include       mime.types;
    default_type  application/octet-stream;
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    #access_log  logs/access.log  main;
    sendfile        on;
    #tcp_nopush     on;
    #keepalive_timeout  0;
    keepalive_timeout  65;
    #gzip  on;
	client_max_body_size 900m;
	
	#设置转发列表，权重
	upstream hello{
		#8088为项目的原始地址
		server 127.0.0.1:8088 weight=1; 		
	}
		
    
    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;
    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;
    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;
    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
	
	server {  
	#本地监听http端口 为nginx开启之后 代理的端口
    listen  9000;  
	#本地主机名
    server_name localhost;  
    #强制http跳转访问https
    rewrite ^(.*)$  https://$host$1 permanent;  
}  
    
    server {
        listen       443 ssl;
        server_name  localhost;
		ssl on;
		
		 ### SSL log files ###  
        access_log      logs/ssl-access.log;  
        error_log       logs/ssl-error.log;  
        ssl_certificate      ssl/ca.crt;
        ssl_certificate_key  ssl/server.key;
        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;
        
        proxy_set_header   Host             $http_host;
    	proxy_set_header   X-Real-IP        $remote_addr;
    	proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        location / {
			root   dist;   #可设为绝对路径
            index  index.html index.htm;
        }
        location /api {
			proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection keep-alive;
            proxy_cache_bypass $http_upgrade;
			
			#设置转发地址，hello为upstream配置名称
			proxy_pass  http://hello;
        }
    }
}
```
## nginx.conf配置文件
Nginx配置文件主要分成四部分：

main（全局设置）、server（主机设置）、upstream（上游服务器设置，主要为反向代理、负载均衡相关配置）和 location（URL匹配特定位置后的设置）

- 每部分包含若干个指令。
- main部分设置的指令将影响其它所有部分的设置；
- server部分的指令主要用于指定虚拟主机域名、IP和端口；
- upstream的指令用于设置一系列的后端服务器，设置反向代理及后端服务器的负载均衡；
- location部分用于匹配网页位置（比如，根目录"/","/images",等等）。
==他们之间的关系式：server继承main，location继承server；upstream既不会继承指令也不会被继承。它有自己的特殊指令，不需要在其他地方的应用==。

[nginx配置location总结及rewrite规则写法](http://seanlook.com/2015/05/17/nginx-location-rewrite/)

## nginx请求图片资源:

```
location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|flv|ico|svg|htm)$ 
{
    root  /home/ec2-user/Electic_Vue_Build_Test/public/photo;
    expires 300d;  
    access_log off;  
}
```
(root:绝对路径。)

## nginx重定向
### 1、假设要把webroot/static/index.html访问重定向到static/index.html

例如当我们通过浏览器访问http://192.168.11.210/webroot/static/index.html，实际访问的是web目录下面的static/index.html文件，也及去掉了webroot这个目录，使用alias

```
location ^~ /webroot/ {  
 alias /data/www/web/WebContent/;  
}
```
注意：
1. 使用alias时，目录名后面一定要加"/"。
2. alias可以指定任何名称。
3. alias在使用正则匹配时，必须捕捉要匹配的内容并在指定的内容处使用。
4. alias只能位于location块中。[/warning]

http://192.168.11.210/webroot/test/static/index.html

```
location ^~ /webroot/test/ {  
 alias /data/www/web/WebContent/;  
}
```
这样也是可以的，最终访问的文件跟上面是一样的。

### 2、把对webroot/static/index.html的访问重定向到web目录下面的test目录下

```
location ~ ^/webroot/ {  
 root /data/www/web/WebContent/test/;  
}
```
http://192.168.11.210/webroot/static/index.html 实际访问的是web目录下testwebroot/static/index.html
及使用root一般是把访问目录重定向到某个目录下，但是访问的路径必须在重新定位的目录下

注意区分跟alias的区别

## 重定向
访问域名 www.adc.com/image  自动跳转到  www.adc.com/make/image  
这个如何写

这种需求有多种方法可以实现：
1. 利用Nginx rewrite 内部跳转实现：       

```
location /image {
    rewrite ^/image/(.*)$     /make/image/$1 last;
}
```



2.利用alias映射

```
location  /image  {
    alias  /make/image;  #这里写绝对路径
}
```



3.利用root映射：

```
location  /image {
    root   /make;
}
```



4.利用nginx的permanent 301绝对跳转实现

```
location /image {
        rewrite ^/image/(.*)$   http://www.adc.com/make/image/$1;
}
```

   


5.判断uri实现

```
if ( $request_uri ~* ^(/image)){
    rewrite ^/image/(.*)$ /make/image/$1 last; 
}
```

