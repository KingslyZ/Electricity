$(function(){
	$("#searchBtn").on("tap",function(){
		// 获取关键字
		var keyword = $("#search").val();
		//去重
		
		// console.log(keyword);
		// 判断关键字是否为空
		if(!keyword){
			mui.toast("请输入搜索关键字");
			return;
		}

		//将关键字存储在本地
		if(localStorage.getItem("keywordsStr")){
			//本地存储有存储历史的情况
			//先取出来 存进去 在写到本地
			var keywordsStr = JSON.parse(localStorage.getItem("keywordsStr"));
			//去重
			if(keywordsStr.indexOf(keyword) == -1){
				keywordsStr.push(keyword);
			}
			// console.log(keywordsStr);
			//再写到本地
			localStorage.setItem("keywordsStr",JSON.stringify(keywordsStr));
		}else{
			//本地存储无存储历史的情况
			//先转换为数组，在转换为字符串。因为只能存储字符串
			
			localStorage.setItem("keywordsStr",JSON.stringify([keyword]));
		}
		location.href = "search-list.html?keyword="+keyword;
	})


	//页面一上来就显示数据
	if(localStorage.getItem("keywordsStr")){
		var html = template("historyTpl",{data:JSON.parse(localStorage.getItem("keywordsStr"))});
		$("#historyBox").html(html);

	}


	//清空历史
	$("#clearHistory").on("tap",function(){
		localStorage.removeItem("keywordsStr");
		$("#historyBox").html();
		location.reload();
	})
})