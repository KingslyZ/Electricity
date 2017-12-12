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
  
```
<script src="assets/artTemplate/template-native.js"></script>

```
  ② 在JS文件调用ajax请求，在回调函数内调用方法：
  
```
    template("模板ID",{数据名:数据})
```   

 数据指：ajax请求得来的数据
 模板ID指：前台页面中写的HTML标签
```
<script type="text/html" id="id">
	<% for(var i=0;i<data.length;i++) {%>
	HTML标签
<% }%>

```  
  后台页面：
    template("id",{data:result.rows})
### 登录页面
	直接调用框架，使用信息注册即可
#### 防止未登录操作
	如果失败，就先判断是不是
	result.error ==400
	400代表未登录
#### 登录超时后，再次登录回到上次离开页面
	每次调用ajax请求成功后，就先转存location.href

	在登录页的JS中，要先确定是否有location，如果有具体有就回去，没有就条会user

	知识点：
	localStorage

### 注册页面
	JS部分
	获取验证码操作：
	发送ajax请求，去后台请求，然后将返回结果显示在前台

	发送数据到后台：
		注意判断数据是否存在，以及是否合法
		最后再发送ajax请求

	判断信息：
		$.trim()方法是去除空白
		属性选择器的使用：
		
```	
$("[name=‘name’]");
```
ajax的配置项：

```	
before:function(){}
```

在请求发送之前显示
	
###  会员中心
###  收货地自管理-删除收货地址
	根据传递的id进行删除
	注意：删除操作不能使用id来获取元素
	且要使用事件委托来删除	
	因为删除的标签是通过模板引擎来添加的，异步操作时候可能还没有获取到值
### 购物车模块-删除产品
单个删除
	点击删除按钮，单个删除。
	注意：调用ajax请求，参数是数组形式
	且要在订单总额的地方做相应的减少价格
批量删除
	点击批量删除：
	首先获取到所有被选择的元素，然后加入到数组中。
	对应订单总额变为0
	
## PC端 后台管理
### 一级分类管理
循环显示数据
分页操作
添加分类操作
注意：图片信息的获取。调用插件
	
```	
$('#fileUpload').fileupload({
    dataType: 'json',
    done: function (e, data) {
	console.log(data)
	picAddr = data._response.result.picAddr;
	$("#showPic").attr("src",picAddr);
	$("#showPic").css({height:100,width:100});
    }
});

```

HTML结构
```html
<input type="file" class="form-control" id="fileUpload" data-url="/category/addSecondCategoryPic" name="file" accept="image/jpeg">
```
### 二级分类
循环显示数据
分页操作
添加分类操作
注意：图片信息的获取。调用插件
```js
$('#fileUpload').fileupload({
    dataType: 'json',
    done: function (e, data) {
	console.log(data)
	picAddr = data._response.result.picAddr;
	$("#showPic").attr("src",picAddr);
	$("#showPic").css({height:100,width:100});
    }
});

```

HTML结构
```html
<input type="file" class="form-control" id="fileUpload" data-url="/category/addSecondCategoryPic" name="file" accept="image/jpeg">
```
### 产品分类
循环显示数据
分页操作
添加分类操作
注意：图片信息的获取。调用插件
```js
$('#fileUpload').fileupload({
    dataType: 'json',
    done: function (e, data) {
	console.log(data)
	picAddr = data._response.result.picAddr;
	$("#showPic").attr("src",picAddr);
	$("#showPic").css({height:100,width:100});
    }
});

```

HTML结构
```html
<input type="file" class="form-control" id="fileUpload" data-url="/category/addSecondCategoryPic" name="pic1" accept="image/jpeg">
```
注意：多张图片使用数组存放
