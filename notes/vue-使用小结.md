### 1. mixins写法

混入 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。


```
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

### 2. Vue.extend构造器
参数：对象

用法：使用Vue构造器，创建一个“子类”，参数是一个包含组件选项的对象，其中,data选项中必须是函数

描述：Vue.extend返回的是一个“扩展实例构造器”，也就是预设了部分选项的Vue的实例构造器，它常常服务于Vue.component用来生成组件，可以简单理解为当在模板中遇到该组件作为标签的自定义元素时，会自动调用“扩展实例构造器”来生产组件实例，并挂在到自定义元素上

- 简单举例
自定义无参数标签

下面的代码中的author就是返回的“扩展实例构造器”

```
var author = Vue.extend({
 template: "<p><a :href='url'>{{author}}</a></p>",
 data : function() {
  return {
   author : 'vamous',
   url : 'http://blog.csdn.net/Dear_Mr/article/details/72614370'
  }
 }
});
```
对应的html如下：

```
<author></author>
```

此时的页面必然是没有任何效果的，因为扩展实例构造器还需要挂载，如下

```
new author().$mount('author');
```
使用propsData

```
var author = Vue.extend({
 template: "<p><a :href='url'>{{author}} & {{name}}</a></p>",
 data : function() {
  return {
   author : 'vamous',
   url : 'http://blog.csdn.net/Dear_Mr/article/details/72614370'
  }
 },
 props : ['name']
});
 
new author({propsData: {name : 'dear_mr'}}).$mount('#author');
```
可以利用propsData传递参数

挂载在普通标签上

返回的扩展实例构造器的方式和上面还是一样的，只是html里不再是自定义标签，而是一个普通标签，比如div

```
<div id="author"></div>
```

```
new author().$mount('author');
```
其实对于同一个扩展构造器而言，它的每一个实例其实是可以挂载到不同的标签上的，比如我可以这样

```
new author().$mount('#author');
new author().$mount('author');
```
这两个标签的内容会一同显示，结果一样

## 3.vue
```
this.msgContentList = this.topicList = [];
```
vue中可能会出错（指针问题，数值窜乱），应为：

```
this.msgContentList = [];
this.topicList = [];
```
### 4.计算属性的 setter

计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：

```
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```
现在再==运行 vm.fullName = 'John Doe' 时，setter 会被调用==，vm.firstName 和 vm.lastName 也会相应地被更新。
### 5.倾听器
!-- 因为 AJAX 库和通用工具的生态已经相当丰富，Vue 核心代码没有重复 -->
<!-- 提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。 -->

```
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.getAnswer()
    }
  },
  methods: {
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
    getAnswer: _.debounce(
      function () {
        if (this.question.indexOf('?') === -1) {
          this.answer = 'Questions usually contain a question mark. ;-)'
          return
        }
        this.answer = 'Thinking...'
        var vm = this
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer)
          })
          .catch(function (error) {
            vm.answer = 'Error! Could not reach the API. ' + error
          })
      },
      // 这是我们为判定用户停止输入等待的毫秒数
      500
    )
  }
})
</script>
```