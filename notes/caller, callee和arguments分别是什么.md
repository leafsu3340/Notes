参考答案: 
- caller,callee之间的关系就像是employer和employee之间的关系，就是调用与被调用的关系，二者返回的都是函数对象引用．
- arguments是函数的所有参数列表，它是一个类数组的变量．

代码演示

    
```
function parent(param1, param2, param3) {
    child(param1, param2, param3);
}

function child() {
    console.log(arguments); // { '0': 'mqin1', '1': 'mqin2', '2': 'mqin3' }
    console.log(arguments.callee); // [Function: child]
    console.log(child.caller); // [Function: parent]
}

parent('mqin1', 'mqin2', 'mqin3');
```
