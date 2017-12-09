$(function(){
	var page = 1;
	var count = 2;
	var totalPage = 0;
	GetData();
	//分页
	$("#prevBtn").on('click',function(){
		page--;
		if(page<1){
			page=1;
			alert("当前是第一页");
			return;
		}
		GetData();
	})
	$("#nextBtn").on('click',function(){
		page++;
		if(page>totalPage){
			page=totalPage;
			alert("当前是最后一页");
			return;
		}
		GetData();
	})
	//显示数据
	function GetData(){
		$.ajax({
			url:'/category/querySecondCategoryPaging',
			type:'get',
			data:{
				page:page,
				pageSize:count
			},
			success:function(result){
				if(!result.error){
					$("#categoryBox").html(template("categoryTpl",result));
					totalPage = Math.ceil(result.total/result.size);
				}else{
					console.log(result.error);
				}
				console.log(result);
			}
		})
	}


	//循环显示一级分类
	$.ajax({
			url:'/category/queryTopCategoryPaging',
			type:'get',
			data:{
				page:1,
				pageSize:100
			},
			success:function(result){
				if(!result.error){
					var html = template("categoryFirstTpl",result);
					$("#categoryFirstBox").html(html);
					console.log(result);
				}else{
					alert(result.error);
				}
				
			}
	})
	//新增二级分类
	var picAddr = '';
	//文件展示
	$('#fileUpload').fileupload({
	    dataType: 'json',
	    done: function (e, data) {
	    	console.log(data)
	    	picAddr = data._response.result.picAddr;
	    	$("#showPic").attr("src",picAddr);
	    	$("#showPic").css({height:100,width:100});
	    }
	});
	//保存数据，发送请求
	$("#save").on('click',function(){
		//收集数据
		var data={
			brandName:$.trim($('[name="brandName"]').val()),
			categoryId:$.trim($('#categoryFirstBox').val()),
			brandLogo:$.trim(picAddr),
			hot:1
		}
		// console.log(data);
		//判断数据
		if(data.categoryId == -1){
			alert("请选择品牌");
			return;
		}

		if(!data.brandName){
			alert("请填写商品名称");
			return;
		}
		
		if(!data.brandLogo){
			alert("请上传商品图片");
			return;
		}


		//发送请求
		$.ajax({
			url:"/category/addSecondCategory",
			type:'post',
			data:data,
			success:function(result){
				if(result.success){
					location.reload();
				}else{
					alert(result.message);
				}
				// console.log(result);
			}
		})
	})


	//修改
	$("body").on('click',"#editCateory",function(){
		var id= $(this).attr('data-id');
		location.href = "editSecond.html?id="+id;
	})

})