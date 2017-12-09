$(function(){
	//收集数据
	//获取id
	var id = GetId(location.href,"id");
	//根据id获取categoryName
	$.ajax({
		url:"/category/queryTopCategoryPaging",
		type:'get',
		data:{
			page:1,
			pageSize:100
		},
		success:function(result){
			var data = result.rows;
			// console.log(result);
			if(!result.error){
				//获取rows
				for(var i=0;i<data.length;i++){
					if(data[i].id == id){
						$('[name="category"]').val(data[i].categoryName);
						// console.log(data[i].categoryName);
					}
					$("#save").on("click",function(){
								var data={
									id:id,
									categoryName:$.trim($('[name="category"]').val()),
									isDelete: $.trim($('[name="status"]').val())
								}
								console.log(data);
								// 判断数据
								if(!data.categoryName){
									alert("分类名称不能为空");
									return;
								}
								if(!data.isDelete){
									alert("请选择状态");
									return;
								}
								//发送请求
								$.ajax({
									url:'/category/addTopCategory',
									type:'post',
									data:data,
									success:function(result){
										if(result.success){
											location.href="category-first.html";
										}else{
											alert(result.message);
										}
										console.log(result);
									}
								})
							})
				}
			}
		}
	})


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
			}else{
				//没有就放回null
				return null;
			}
		}
	}
})