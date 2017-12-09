$(function(){
	var page =1;
	var count = 2;
	var totalPage = 0;
	GetData();

	//分页
	$("#prevBtn").on('click',function(){
		page--;
		if(page<1){
			page=1;
			alert("当前已是第一页");
			return;
		}
		GetData();
	})

	$("#nextBtn").on('click',function(){
		page++;
		if(page >totalPage){
			page=totalPage;
			alert("当前已是最后一页");
			return;
		}
		GetData();
	})

	//显示数据
	function GetData(){
		$.ajax({
			url:'/category/queryTopCategoryPaging',
			type:'get',
			data:{
				page:page,
				pageSize:count
			},
			success:function(result){
				if(!result.error){
					var html = template("categoryTpl",result);
					$("#categoryBox").html(html);
					totalPage =Math.ceil(result.total/result.size);
					console.log(result);
				}else{
					alert(result.error);
				}
				
			}
		})
	}

	//新增
	$("#save").on("click",function(){
		//收集数据
		var categoryName = $.trim($('[name="category"]').val());
		// console.log(categoryName);
		//判断
		if(!categoryName){
			alert("分类名不能为空");
			return;
		}
		//发送请求
		$.ajax({
			url:'/category/addTopCategory',
			type:'post',
			data:{categoryName:categoryName},
			success:function(result){
				if(result.success){
					location.reload();
				}else{
					alert(result.message);
				}
			}
		})
	})


	//修改
	$("body").on('click','.editCategory',function(){
		var id=$.trim($(this).attr('data-id'));
		var categoryName=$.trim($(this).attr('data-categoryName'));
		location.href="editCategory.html?id="+id;
	})
})