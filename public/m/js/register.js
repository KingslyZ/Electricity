$(function(){
	//获取验证码
	$("#getCode").on("tap",function(){
		//获取验证码
		$.ajax({
			url:"/user/vCode",
			type:"get",
			success:function(result){
				// console.log(result);
				if(result.vCode){
					alert(result.vCode);
				}else{
					alert("获取验证码失败");
				}
			}
		});
	});
	//提交按钮
		$("#registerBtn").on("tap",function(){
			var data={
				username:$.trim($('[name="username"]').val()),
				mobile:$.trim($('[name="mobile"]').val()),
				password:$.trim($('[name="password"]').val()),
				rePwd:$.trim($('[name="rePassword"]').val()),
				vCode:$.trim($('[name="vCode"]').val())
			}
			// console.log(data);
			// 数据判断
			if(!data.username){
				mui.toast("请输入用户名");
				return;
			}
			if(!/^1[3458]\d{9}$/.test(data.mobile)){
				mui.toast("请输入正确格式的手机号");
				return;
			}
			if(!data.password){
				mui.toast("请输入密码");
				return;
			}
			if(!data.rePwd){
				mui.toast("请再次输入密码");
				return;
			}
			if(data.password != data.rePwd){
				mui.toast("两次密码不一致");
				return;
			}
			if(!/^\d{6}$/.test(data.vCode)){
				mui.toast("请输入正确格式的验证码");
				return;
			}
			var This = $(this);
			//发送ajax请求
			$.ajax({
				url:"/user/register",
				type:"post",
				data:data,
				beforeSend:function(){
					This.html("注册中...");
				},
				success:function(result){
					if(result.success){
						location.href = "login.html";
					}else{
						mui.toast(result.message);
					}
					This.html("注册");
				}
			})
		})

});