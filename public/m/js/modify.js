$(function(){

	//获取验证码
	$("#getCode").on("tap",function(){
		$.ajax({
			url:"/user/vCodeForUpdatePassword",
			type:"get",
			success:function(result){
				if(result.vCode){
					alert(result.vCode);
				}else{
					alert("获取验证码失败");
				}
			}
		})
	});


	//点击修改密码
	$("#modifyBtn").on("tap",function(){
		//获取数据
		var data = {
			oldPassword:$.trim($('[name="oldPassword"]').val()),
			newPassword:$.trim($('[name="newPassword"]').val()),
			renewPwd:$.trim($('[name="renewPwd"]').val()),
			vCode:$.trim($('[name="vCode"]').val()),
		}
		//判断数据
		if(!data.oldPassword){
			mui.toast("请输入原密码");
			return;
		}
		if(!data.newPassword){
			mui.toast("请输入新密码");
			return;
		}

		if(!data.renewPwd){
			mui.toast("请再次输入新密码");
			return;
		}
		if(data.newPassword != data.renewPwd){
			mui.toast("两次密码不一致");
			return;
		}
		if(!/^\d{6}$/.test(data.vCode)){
			mui.toast("请输入正确格式的认证码");
			return;
		}
		var This = $(this);
		// 发送请求
		$.ajax({
			url:"/user/updatePassword",
			type:"post",
			data:data,
			brforeSend:function(){
				This.html("修改中...");
			},
			success:function(result){
				if(result.success){
					localStorage.setItem("returnUrl",location.href);
					location.href = "login.html";
				}else{
					//判断是否登录
					if(result.error == 400){
						mui.toast("请先登录");
						location.href = "login.html";
					}
					mui.toast(result.message);
				}
				This.html("修改密码");
			}
		})
	})
})