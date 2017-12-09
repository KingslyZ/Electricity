$(function(){
	var carts = 0;
	//查询所有获取数据
	$.ajax({
		url:"/cart/queryCart",
		type:"get",
		success:function(result){
			//调用模板显示数据
			var html = template("cartTpl",{data:result});
			$("#cartBox").html(html);
			console.log(result);
			carts = result;
		}
	})

	var price = 0;
	var num = 0;
	var all = 0;
	var priceArr = [];
	var total = 0;
	//动态获取总额
	
	$("body").on("tap",".inpCheck",function(){
		price = $(this).attr("data-price");
		num = $(this).attr("data-num");
		all = (Number(price) * Number(num)).toFixed(2);
		// all.toFixed(2)
		// console.log(all);
		// console.log(Boolean(this.checked))//false
		if(!this.checked){//选中
			if(priceArr.indexOf(all) == -1){//数组中没有该元素就添加 防止取消其中一个时另一个还在的重复添加
				priceArr.push(all);
			}
			for(var i=0;i<priceArr.length;i++){
				total += Number(priceArr[i]);
			}
			//计算完了 就取消 为下一次选择做准备
			priceArr=[];
		}else{//未选中
			//没有选中 要先减去在从数组中删除
			price = $(this).attr("data-price");
			num = $(this).attr("data-num");
			all = (Number(price) * Number(num)).toFixed(2);
			
			total -= all;
			priceArr.pop(all);
		}
		// console.log(priceArr);
		// console.log(total);
		$("#total").html(total);
	});

	//单个删除购物车数据
	$("body").on("tap",".deleteCart",function(){
		//修改总额
		var id = $(this).attr("data-id");
		var idArr = [id];
		price = $(this).attr("data-price");
		num = $(this).attr("data-num");
		all = (Number(price) * Number(num)).toFixed(2);
		
		if(confirm("您确定删除该商品吗?")){
			$.ajax({
				url:"/cart/deleteCart",
				type:"get",
				data:{
					id:idArr
				},
				success:function(result){
					if(result.success){
						location.reload();
					}else{
						if(result.error == 400){
							localStorage.setItem("returnUrl",location.href);
							location.href = "login.html";
						}else{
							alert(result.message);
						}
					}
				}
			})

			//动态修改总额
			if( total == 0){
				total = 0;
			}else{
				total = total - all;
				// console.log(total);
			}
			$("#total").html(total);
			// console.log($("#total").html());
		}
	})
	
	//批量删除
	$(".deleteAll").on("tap",function(){
		if(confirm("您确定删除吗")){
			//收集数据
			var arr = $(".inpCheck:checked");
			//定义一个空数组用来放id
			var idArr = [];
			//获取id
			for(var i=0;i<arr.length;i++){
				//arr[i]是原生JS
				idArr.push($(arr[i]).attr("data-id"));
			}
			// console.log(Boolean(idArr))//true 所以不能使用! 要用length
			//判断数据
			if(idArr.length	== 0){
				mui.toast("您还未选择要删除的商品");
				return;
			}
			//发送请求
			$.ajax({
				url:"/cart/deleteCart",
				type:"get",
				data:{id:idArr},
				success:function(result){
					if(result.success){
						location.reload();
						$("#total").html(0);
					}else{
						if(result.error == 400){
							localStorage.setItem("returnUrl",location.href);
							location.href = "login.html";
						}else{
							mui.toast(result.message);
						}
					}
				}
			})
		}
	})

	//编辑购物车
	$("body").on("tap",".modifyCart",function(){
		//收集数据
		var id = $(this).attr("data-id");
		var num = $(this).attr("data-num");
		var size = $(this).attr("data-size");
		// var sArr = [];
		//获取size
		for(var i=0;i<carts.length;i++){
			if(id == carts[i].id){
				var cartInfo = carts[i];
				var sizeStr = cartInfo.productSize;
				cartInfo.sArr = [];
				// console.log(sizeStr);
				// console.log(cartInfo);
				//转换
				var sizeArr = sizeStr.split("-");
				var startSize = sizeArr[0];
				var endSize = sizeArr[1];
				// console.log(endSize);
				for(var i=startSize;i<=endSize;i++){
					cartInfo.sArr.push(Number(i));
				}
				// console.log(sArr);
			}
		}

		// console.log(sArr);
		//调用模板
		var html = template("sizeBox",cartInfo);
		var btnArray = ['确定', '取消'];
		// console.log(html)
		//弹框
		mui.confirm(html,"编辑商品",btnArray,function(e){
			if(e.index == 0){
				//点击确认
				var data={
					id:id,
					size:size,
					num:num
				}
				// console.log(data);
				//发送请求
				$.ajax({
					url:"/cart/updateCart",
					type:"post",
					data:data,
					success:function(result){
						if(result.success){
							location.href = "cart.html";
						}else{
							if(result.error == 400){
								localStorage.setItem("returnUrl",location.href);
								location.href = "login.html";
							}else{
								mui.toast(result.message);
							}
						}
					}
				})
			}else{
				//点击取消
				mui.toast("修改完毕")
			}

		});
		//修改尺寸
		$("body").on("tap",".size",function(){
			//添加样式
			$(this).addClass("active").siblings().removeClass("active");
			//获取值
			size = $(this).html();
		})
		// console.log(size);
		//减少
		$("body").on("tap",".sub",function(){
			num =Number($(".numBox").val()); 
			num--;
			if(num < 1){
				num =1;
			}
			$(".numBox").val(num);
		})
		//增加
		$("body").on("tap",".add",function(){
			num =Number($(".numBox").val()); 
			num++;
			if(num > cartInfo.productNum){
				num =cartInfo.productNum;
			}
			$(".numBox").val(num);
		})
		//手动添加
		$("body").on("blur",".numBox",function(){
			num =Number($(".numBox").val());
			if(num > cartInfo.productNum){
				num = cartInfo.productNum;
				$(".numBox").val(cartInfo.productNum);
				mui.toast("库存不足啦");
			}
			if(num < 1){
				$(".numBox").val(1);
			}
		})

	})

})