$(function(){
	//显示数据
	$.ajax({
		url:"/address/queryAddress",
		type:"get",
		success:function(result){
			// console.log(result); 结果是数组
			$("#addressBox").html(template("addressTmp",{data:result}));
		}
	})
})