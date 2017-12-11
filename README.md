# Electricity
电商全端项目，移动端显示详情，PC端进行后台管理
## 移动端 展示页面
### 首页
  布局：
  顶部轮播 调用框架
  导航区：直接使用a标签，浮动使得他们横着显示
      上下左右间距使用padding来设置
		代码结构
```html
<div>
  <a></a>
</div>
```
品牌专区：
	上面是标题
	下面用ul
	代码结构：
  ```html
<div>
  <div class='title'>
    ul>li
  </div>
</div>
```
注意：子元素浮动，父元素一定要清除浮动
### 分类页面
  使用模板引擎进行字符串的拼接
  使用步骤：
  ① 引入文件
  <script src="assets/artTemplate/template-native.js"></script>
  ② 在JS文件调用ajax请求，在回调函数内调用方法：
    template("模板ID",{数据名:数据})
    数据指：ajax请求得来的数据
    模板ID指：前台页面中写的HTML标签
    <script type="text/html" id="id">
      <% for(var i=0;i<data.length;i++) {%>
        HTML标签
      <% }%>
  后台页面：
    template("id",{data:result.rows})
### 登录页面
### 注册页面
### 会员中心
## PC端 后台管理
