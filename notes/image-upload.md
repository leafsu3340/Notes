#### html片段

```

<body class="">
	Hello !
<form method="post" action="api/eventrecord/addAassay" target="cc" enctype="multipart/form-data">
    <input type="file" name="file">
    <input type="input" name="content">
    <input type="submit" value="commit">
</form>
    <iframe name="cc"></iframe>
</body>
```
#### js片段
```

// example

// input change
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files)
    },
    // 创建预览图
    createImage(files) {
      var self = this
      var reader = null
      var leng = files.length
      if ((self.images.length > 3) || (leng > 3)) {
        global.$fn.toast('err', '附加图片不可超过3张', '注意!', false)
      }
      // 读取图片文件，数据类型为base64
      for (let i = 0; i < leng; i++) {
        reader = new window.FileReader()
        reader.onload = function(e) {
          self.images.push(e.target.result)
        }
        reader.readAsDataURL(files[i])
      }
      // 直接读取图片文件，数据类型为二进制
      for (var i = 0; i < leng; i++) {
        self.imagesblob.push(files[i])
      }
    },
    // 删除所有预览图
    removeImage(e) {
      this.images = []
      this.imagesblob = []
    },
    // 删除指定预览图
    delImage(index) {
      this.images.splice(index, 1)
      this.imagesblob.splice(index, 1)
    },
    // 上传图片end
    // 发送评论
    // readAsBinaryString
    sendConnent() {
      var leng = this.imagesblob.length
      var imagesBlob = this.imagesblob
      if (this.ARecord === '') {
        global.$fn.toast('error', '操作错误', '请填写要发布的分析评论！', false)
      } else if (leng > 3) {
        global.$fn.toast('error', '操作错误', '附加图片不能超过3张!', false)
      } else {
        // 设置表单位载体传递图片等数据。
        var formdata = new window.FormData()
        for (let i = 0; i < leng; i++) {
          formdata.append('file', imagesBlob[i])
        }
        formdata.append('user', this.$store.getters.getLoginName)
        formdata.append('eventid', this.eventItem.serialNo)
        formdata.append('content', this.ARecord)
        formdata.append('relativeid', this.relativeid)
        formdata.append('describe', this.eventItem.describe)
        formdata.append('level', this.eventItem.level)
        this.$http.post('/api/eventrecord/addAassay', formdata, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then((response) => {
            if (response.body[0].status) {
              global.$fn.toast('tips', '', '发送评论成功!', false)
              this.ARecord = ''
              this.relativeid = ''
              this.images = []
              this.arlist = response.body[0].arlist
            }
          })
          .catch((response) => { this.$log(response) })
      }
    },
```
