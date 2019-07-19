/**
 * bind手写
 */

Function.prototype.my_bind = function () {
  var self = this, // 保存原函数
    context = Array.prototype.shift.call(arguments), // 保存需要绑定的this上下文
    // 上一行等价于 context = [].shift.call(arguments);
    args = Array.prototype.slice.call(arguments); // 剩余的参数转为数组
  return function () { // 返回一个新函数
    self.apply(context, Array.prototype.concat.call(args, Array.prototype.slice.call(arguments)));
    // To Answer： 参数作预留用？为何要concat为两个数组？？？
    // Array.prototype.concat.call(args, Array.prototype.slice.call(arguments))   
  }
}

function a(m, n, o) {
  console.log(this.name + ' ' + m + ' ' + n + ' ' + o);
}

var b = {
  name: 'kong'
};

a.my_bind(b, 7, 8)(9); 