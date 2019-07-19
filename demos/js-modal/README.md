# 使用js原生语法编写一个模态框插件
要求：
- 插件能以new Dialog()构建实例
- 默认参数 title:标题;okText:确定；cancelText:取消；
- 使用事件机制,满足以下目标
```
var dialog = new Dialog();
dialog.on('show', function(){
  console.log('show dialog');
})
dialog.on('off', function(){
  console.log('close dialog');
})

dialog.show();
dialog.off();
```