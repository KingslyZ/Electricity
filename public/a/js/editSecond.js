$(function(){
	//循环显示二级分类
		$.ajax({
			url:'/category/querySecondCategoryPaging',
			type:'get',
			data:{
				page:1,
				pageSize:100
			},
			success:function(result){
				if(!result.error){
					$("#categoryBox").html(template("categoryTpl",result));
					$("#categoryFirstBox").html(template("categoryFirstTpl",result));
				}else{
					alert(result.error);
				}
				console.log(result);
			}
		})
	//获取id
	var id = GetId(location.href,'id');
	var brandName=null;
	var categoryId=null;
	var categoryName = null;
	var isDelete=null;
	var hot=null;
	// console.log(id);
	//根据id查询信息
	$.ajax({
		url:'/category/querySecondCategoryPaging',
		type:'get',
		data:{
			page:1,
			pageSize:100
		},
		success:function(result){
			if(!result.error){
				var data = result.rows;
				for(var i=0;i<data.length;i++){
					if(data[i].id == id){
						brandName=data[i].brandName;
						categoryId=data[i].categoryId;
						categoryName = data[i].categoryName;
					}
						$('[name="brand"]').val(brandName);
						$('[name="category"]').val(categoryName);
				}
			}
			console.log(result);
		}
	})


	//提交数据
	$("#save").on("click",function(){
		//收集数据
		var data={
			id:id,
			brandName:$.trim($('[name="brand"] option:selected').text()),
			categoryId:$.trim($('[name="category"]').val()),
			categoryName:$.trim($('[name="category"] option:selected').text()),
			isDelete:$.trim($('[name="status"]').val()),
			hot:$.trim($('[name="hot"]').val())
		}
		// console.log(data)
		//判断数据
		if(!brandName){
			alert("请选择品牌");
			return;
		}
		if(!categoryName){
			alert("请选择一级分类");
			return;
		}
		if(isDelete ==''){
			alert("请选择状态");
			return;
		}
		if(hot == ''){
			alert("请选择是否热卖");
			return;
		}
		//发送请求
		$.ajax({
			url:'/category/updateSecondCategory',
			type:'post',
			data:data,
			success:function(result){
				console.log(result);
			}
		})
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