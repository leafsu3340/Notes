## transform


```
div {
    transform:rotate(7deg);
    -ms-transform:rotate(7deg); 	/* IE 9 */
    -moz-transform:rotate(7deg); 	/* Firefox */
    -webkit-transform:rotate(7deg); /* Safari 和 Chrome */
    -o-transform:rotate(7deg); 	/* Opera */
    }
```
语法:
```
transform: none|transform-functions;
```
[具体属性](http://www.w3school.com.cn/cssref/pr_transform.asp)
## transform-origin

设置旋转元素的==基点位置==：

```
div {
    transform: rotate(45deg);
    transform-origin:20% 40%;
    
    -ms-transform: rotate(45deg); 		/* IE 9 */
    -ms-transform-origin:20% 40%; 		/* IE 9 */
    
    -webkit-transform: rotate(45deg);	/* Safari 和 Chrome */
    -webkit-transform-origin:20% 40%;	/* Safari 和 Chrome */
    
    -moz-transform: rotate(45deg);		/* Firefox */
    -moz-transform-origin:20% 40%;		/* Firefox */
    
    -o-transform: rotate(45deg);		/* Opera */
    -o-transform-origin:20% 40%;		/* Opera */
}
```
