## 1.superagent http请求代理模块

[API](http://visionmedia.github.io/superagent/#multipart-requests)

## 2.muster中间件
[API](https://www.npmjs.com/package/multer)

后台 express  使用的multer 中间件


```
let multer  = require('multer');
let storage = multer.memoryStorage()
let upload = multer({storage: storage});
app.post('/video',upload.single('video'),(req,res)=>{
	  console.log(req.file.buffer); //在内存中保存的 录音数据
	  res.end('ok');
});
```

前台


```
let oReq = new XMLHttpRequest();
let fd = new FormData();
fd.append('video',blob);
oReq.responseType='json';
oReq.open("POST", "/video", true);
oReq.onload = function (oEvent) {
	console.log("数据翻译："+oReq.response);
};
oReq.send(fd);
```


## 3.formidable (上传处理模块)

[API](https://www.npmjs.com/package/formidable)


#### EXAMPLE:
```
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
// ... ...

// userinfo
router.post('/auth/userimg', userCtrl.forceLogin, upload.single('file'), (req, res) => {
  const sreq = superagent.request
    .post(req.originalUrl)
    .set('xx-Auth', req.session.user.token)
    .attach(req.file.fieldname, req.file.buffer, req.file.originalname)
    .use(superagent.prefix)
    .end((err, sres) => {
      if (err) {
        logger.error(err);
        return res.status(err.status).send(err.response);
      }

      res.json(sres.body);
    });
});
```
