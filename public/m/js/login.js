$(function(){

	$("#loginBtn").on("tap",function(){
		//获取数据
		var data = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val())
		}
		//数据判断
		if(!data.username){
			mui.toast("用户名不能为空");
			return;
		}
		if(!data.password){
			mui.toast("请输入密码");
			return;
		}
		var This = $(this);
		//发送请求
		$.ajax({
			url:"/user/login",
			type:"post",
			data:data,
			beforeSend:function(){
				This.html("登录中...");
			},
			success:function(result){
				if(result.success){
					var returnUrl = localStorage.getItem("returnUrl");
					if(returnUrl){
						//删除
						localStorage.removeItem("returnUrl");
						location.href = returnUrl;
					}else{
						location.href="user.html";
					}
					

				}else{
					mui.toast(result.message);
				}
				This.html("登录");
			}
		})
	})
});