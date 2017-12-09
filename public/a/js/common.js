$(function(){

	//退出登录
	$(".login_out_bot").on("click",function(){
		if(confirm("您确定退出吗？")){
			$.ajax({
				url:'/employee/employeeLogout',
				type:'get',
				success:function(result){
					if(result.success){
						location.href = 'login.html';
					}else{
						alert(result.message);
					}
				}
			})
		}
	})


	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});