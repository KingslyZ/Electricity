$(function(){
	$("#loginBtn").on("click",function(){
		//获取数据
		var data={
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val())
		}
		// console.log(data);
		if(!data.username){
			alert("用户名不能为空");
			return;
		}
		if(!data.password){
			alert("密码不能为空");
			return;
		}
		//发送请求
		$.ajax({
			url:'/employee/employeeLogin',
			type:'post',
			data:data,
			beforeSend:function(){
				$("#loginBtn").html("登录中....");
			},
			success:function(result){
				if(result.success){
					location.href="user.html";
				}else{
					alert(result.message);
				}
				$("#loginBtn").html("登录");
			}
		})

	})
})
