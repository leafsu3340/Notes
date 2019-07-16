# BEM
[参考](https://www.w3cplus.com/css/bem-definitions.html)
> BEM代表块（Block），元素（Element），修饰符（Modifier）。

> css样式无作用域，作用域是全局。

## 为独立的CSS类命名
- 在一个元素的CSS类名中包含一个块名是必要的，这样可以让==级联最小化==。


- 我们在长名称中使用连字符分隔单词（例如，block-name），使用两个下划线来分隔块名和元素名（block-name__element-name）。

例如：


```
block-name__element-name
blockName-elementName
```

- 我们用一个下划线来分隔块名（或元素名）和修饰符名，再用另一个下划线来分隔修饰符名和它对应的值。

```
.menu_size_big { // CSS code to specify height } .menu_type_buttons .menu__item { // CSS code to change item's look
```

- 小结：

1. 可能得一种好方案：==尽量避免CSS级联，易于维护==
2. __双下划线代表==B和E连接== 例如 menu__item
2. _单下划线代表==B和M或E和M的连接== 例如 menu_active 或 menu__item_active
3. -中划线同==英语里做连字符==例如 mod-menu 或 mod-menu__item 这里 B或E或M需要多个单词来描述,就使用中划线


BEM的命名规矩很容易记：==block-name__element-name--modifier-name==，也就是模块名 + 元素名 + 修饰器名。

比如分页组件：

/app/components/page-btn/

那么该组件模块就名为page-btn，组件内部的元素命名都必须加上模块名，比如：

```
<div class="page-btn">
   <button type="button" class="page-btn__prev">上一页</button>
   <!-- ... -->
   <button type="button" class="page-btn__next">下一页</button>
</div>
```

BEM的命名中只包含三个部分，元素名只占其中一部分，所以==不能出现多个元素名==的情况。


#### sass中运用BEM

```
.aboutSection { 
    &__wrapper { 
    max-width 108rem; 
    padding: 3rem 0; 
        
    } 
    &__headingContainer { 
    background-color: steelblue; 
        
    } 
    &__header { 
    font-size: 2.4rem; 
    font-weight: 700; 
        
    } 
    &__subHeader { 
    font-size: 1.8rem; 
    color: green; 
    } 
}
```

```
.nav { 
    background-color: steelblue; &__container { 
        display: flex; 
        justify-content: space-between; 
    } 
    &__item { 
        color: white; 
        &--active { 
            @extend .nav__item; 
            border-bottom: 1px solid red;
        } 
    } 
}
```
