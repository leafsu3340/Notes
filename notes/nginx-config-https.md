
```
user root;
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
		server 52.80.30.32:8088 weight=1; 		
	}
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
		
        gzip on;
		gzip_min_length  200k;
		gzip_buffers     4 16k;
		#gzip_http_version 1.0;
		gzip_comp_level 3;
		gzip_types       text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
		gzip_vary on;
		gzip_static  on;
		
        proxy_set_header   Host             $http_host;
    	proxy_set_header   X-Real-IP        $remote_addr;
    	proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        location / {
			root   E:\\Font_Workplace\\nginx-1.12.2\\dist;
            index  index.html index.htm;
        }

		location ^~ /static {
			root   E:\\Font_Workplace\\nginx-1.12.2\\dist;
            expires 24h;  
			access_log off;
        }

		location ^~ /apm/static {
			alias   E:\\Font_Workplace\\nginx-1.12.2\\dist\\static;
            expires 24h;  
			access_log off;
        }

		location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|flv|ico|svg|htm)$ 
		{
			root  E:\\Font_Workplace\\nginx-1.12.2\\dist\\photo;
			expires 24h;  
			access_log off;  
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
