$(function(){
	// 获取用户信息
	$.ajax({
		url:"/user/queryUserMessage",
		type:"get",
		success:function(result){
			if(result.error == 400){
				location.href = "login.html";
				return;
			}
			//拼接字符串
			$("#infoBox").html(template("infoTmp",result));
		}
	});

	//退出登录
	$("#logoutBtn").on("tap",function(){
		if(confirm("确认退出吗?")){
			$.ajax({
				url:"/user/logout",
				type:"get",
				success:function(result){
					if(result.success){
						location.href = "index.html";
					}else{
						mui.toast(result.message);
					}
				}
			})
		}
	})
})