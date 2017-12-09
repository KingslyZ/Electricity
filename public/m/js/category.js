$(function(){
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	// 循环显示一级目录
	$.ajax({
		url:"/category/queryTopCategory",
		type:"get",
		success:function(result){
			var html = template("leftBox",{data:result.rows});
			$("#leftListBox").html(html);

			if(result.rows !=0){
				//默认显示第一个
				getRightData(result.rows[0].id);
				$("#leftListBox li").eq(0).addClass("active");
				
			}
		}
	})

	// 点击左侧一级分类显示对应二级分类
	$("#leftListBox").on("click","li",function(){
		//获取点击时一级分类的id
		var id = $(this).attr("data-id");
		//设置对应样式
		$(this).addClass("active").siblings().removeClass("active");
		//查询二级数据
		getRightData(id);
	})

	function getRightData(id){
		$.ajax({
			url:"/category/querySecondCategory",
			type:"get",
			data:{id:id},
			success:function(result){
				$("#rightListBox").html(template("rightBox",{data:result.rows}));
			}
		})
	}



})