//登录拦截
$.ajax({
	url:'/employee/checkRootLogin',
	type:'get',
	//阻止异步操作，以为就是为了不登录就不显示页面
	async:false,
	success:function(result){
		//判断  因为成功就继续执行
		if(result.error && result.error == 400){
			location.href = "login.html";
		}
	}
})


$(function(){
	// 定义变量
	var page = 1;
	// 每页显示条数
	var count = 1;
	//总页数
	var totalPage = 0;


	//页面加载开始就先执行一次信息显示
	GetData();


	//循环显示用户信息
	function GetData(){
		$.ajax({
			url:'/user/queryUser',
			type:'get',
			data:{
				page:page,
				pageSize:count
			},
			success:function(result){
				// console.log(result);
				//模板
				if(!result.error){
					var html = template("userInfoTpl",result);
					$("#userInfoBox").html(html);
					totalPage = Math.ceil(result.total/result.size);
					console.log(result)
				}
			}
		})
	}

	//分页
	//上一页
	$("#prevBtn").on('click',function(){
		page--;
		if(page <1){
			alert("当前已是第一页");
			page = 1;
			return;
		}
		GetData();
	})
	//下一页
	$("#nextBtn").on('click',function(){
		page++;
		if(page > totalPage){
			alert("当前已是最后一页");
			page = totalPage;
			return;
		}
		GetData();
	})

	//禁用启用   在发送到后台之前就要改变状态值
	$("body").on("click",".statusBtn",function(){
		//获取值
		var data={
			id:$(this).attr("data-id"),
			isDelete:Number($(this).attr("data-status")) == 1 ? 0:1
		}
		// console.log(data);
		//发送请求
		$.ajax({
			url:'/user/updateUser',
			type:'post',
			data:data,
			success:function(result){
				if(result.success){
					location.reload();
				}else{
					alert(result.message);
				}
			}
		})
	})


})