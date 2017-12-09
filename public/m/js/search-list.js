$(function(){
	var keyWord =  GetId(location.href,"keyword");
	// console.log(keyWord);
	if(!keyWord){
		location.href="search.html";
	}
	//分页操作  调用框架
	var dataObj={};
	var pageSize = 5;
	var totalPage = 0;
	var page = 1;
	var price = 1;
	var isLast = false;
	var This = null;
	//上拉加载
	mui.init({
		pullRefresh : {
		    container:"#my-content",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
		    up : {
		      height:50,//可选.默认50.触发上拉加载拖动距离
		      auto:true,//可选,默认false.自动上拉加载一次
		      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
		      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
		      callback :GetData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		    }
		}
	});
	

	// 回调函数
	function GetData(){
		if(!This){
			This = this;
		}
		if(!isLast){
			$.ajax({
				url:"/product/queryProduct",
				type:"get",
				data:{
					page:page,
					pageSize:5,
					proName:1,
					price:price,
					proName:keyWord
				},
				success:function(result){
					if(result.data.length==0){
						mui.toast("暂无数据，试试其他关键字");
						return;
					}
					//收集两次数据
					for(var attr in result){
						if(attr != "data"){
							dataObj[attr] = result[attr];
						}else{

							//判断dataObj中是否有data
							if(dataObj[attr]){
								//循环追加
								for(var i=0;i<result[attr].length;i++){
									dataObj[attr].push(result[attr][i]);
								}
							}else{
								dataObj[attr] = result[attr];
							}
						}

					}
					//数据拼接
					var html = template("productTpl",dataObj);
					$("#productList").html(html);
					console.log(dataObj);

					This.endPullupToRefresh(false);

					page++;
					totalPage = Math.ceil(result.count/pageSize);
					if(page > totalPage){
						isLast = true;
						mui.toast("没有更多数据啦");
					}
				}

			})
		}
	}


	//价格排序
	$("#priceBtn").on("tap",function(){
		price = price== 1 ? 2 : 1;

		dataObj={};
		totalPage = 0;
		page = 1;
		isLast = false;
		//执行函数
		GetData();

	});
	//销量排序
	$(".saleBtn").on("tap",function(){
		//归零操作
		dataObj={};
		totalPage = 0;
		page = 1;
		isLast = false;
		//判断升序降序
		price  = price ==1? 2:1;
		GetData();
	})

	//接收关键字进行查询
	function GetId(path,name){
		//② 获取？的索引
		var num = path.lastIndexOf("?");
		// console.log(num);
		//③  获取？之后传过来的值，不止一个
		var value = path.substr(num+1);
		//④ 先用&符号进行分割成数组
		var arr1 = value.split("&");
		//⑤ 使用=进行分割 需要for循环
		for(var i=0;i<arr1.length;i++){
			var arr2 = arr1[i].split("=");
			if(arr2[0] == name){
				return arr2[1];
			}
			//没有就放回null
			return null;
		}
	}
})