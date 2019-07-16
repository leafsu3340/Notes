## 1.windows更新，使用命令

```
npm install npm@latest -g
```

## 2.设置代理:
把服务器上的npm，设置代理到可以访问外网的机子上（代理工具：ccproxy、fiddler等），即可解决问题！


```
npm config set proxy http://proxy.company.com:8080


npm config set https-proxy http://proxy.company.com:8080
```
搞到以后，删除代理设置：

```
npm config delete proxy
npm config delete https-proxy
```

其它详细参数：
[https://npmjs.org/doc/config.html](http://note.youdao.com/)

附：直接给linux设置网络代理：

```
export http_proxy http://proxy.company.com:8080
export https_proxy http://proxy.company.com:8080
```
设置代理实例
```
npm install npm@3.10.8 -g
npm --proxy http://10.122.4.27:808
npm --https-proxy http://10.122.4.27:808
npm set registry http://registry.npm.taobao.org
```
