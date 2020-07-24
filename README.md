# toy-react

## 开发 

npm run dev

npm run pub

## 
- 第一节：jsx,渲染节点 
- 第二节：事件，setState，reRender,生命周期  
https://codepen.io/gaearon/pen/gWWZgR?editors=0010

## 学习贴

## 扫盲

- plugin-transform-react-jsx转码
```
const a = <div class="wraper" id="wraper"></div>

=>

var a = _ToyReact__WEBPACK_IMPORTED_MODULE_0__["ToyReact"].createElement("div", {
    class: "wraper",
    id: "wraper"
});
```

- DOM中的范围 Document.createRange()
- RegExp.$1 ~ RegExp.$9
```
var re = /(\w+)\s(\w+)/;
var str = 'John Smith';
str.replace(re, '$2, $1'); // "Smith, John"
RegExp.$1; // "John"
RegExp.$2; // "Smith"
```