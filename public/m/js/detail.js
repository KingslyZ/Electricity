$(function(){
	var id = GetId(location.href,"id");
	var kucun = 0;
	var size = 0;
	//发送请求
		$.ajax({
			url:"/product/queryProductDetail",
			type:"get",
			data:{
				id:id
			},
			success:function(result){
				kucun = result.num;

				//尺码的显示
				var sizeStr = result.size;
				//分割字符串
				var size = sizeStr.split("-");//数组中只有开始值和结束值
				//获取第一个值和最后一个  获取到的是字符串类型 需要转换为数字
				var startSize = Number(size[0]);
				var endSize = Number(size[1]);
				//创建数组 且要绑定在result上，这样才能在前面使用
				result.sizeArr=[];
				//添加内容到数组
				for(var i=startSize;i<=endSize;i++){
					result.sizeArr.push(i);
				}

				// console.log(result.sizeArr);
				console.log(result);

				//显示在详情页面
				var html = template("infoTpl",result);
				$("#infoBox").html(html);


				//图片轮播
				var gallery = mui('.mui-slider');
					gallery.slider({
					interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
				});


			}
		})

	//尺码问题
	$("body").on("tap",".size",function(){
		$(this).addClass("active").siblings().removeClass("active");
		size=$(this).html();
	})
	// 数量问题
	// 减去
	$("body").on("tap",".sub",function(){
		var num = Number($(".numBox").val());
		num--;
		if(num <=1){
			num=1;
		}
		$(".numBox").val(num);
	});

	$("body").on("tap",".add",function(){
		var num = Number($(".numBox").val());
		num++;
		if(num >= kucun){
			num=kucun;
		}
		$(".numBox").val(num);
	});
	//手动添加
	$("body").on("blur",".numBox",function(){
		if($(this).val() > kucun){
			$(this).val(kucun);
			mui.toast("库存不足");
		}
		if($(this).val() < 1){
			$(this).val(1);
			mui.toast("数量不能为零");
		}
	});

	//点击添加到购物车
	$("body").on("tap",".intoCart",function(){
		//收集数据
		var data={
			productId:id,
			num:$(".numBox").val(),
			size:size
		}
		// console.log(data);
		//判断数据
		if(!data.num){
			mui.toast("请选择数量");
			return;
		}
		if(!data.size){
			mui.toast("请选择尺码");
			return;
		}
		//发送请求
		$.ajax({
			url:"/cart/addCart",
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
						alert(result.message);
					}
				}
			}
		})
	})
















	//接收关键字进行查询
	function GetId(path,name){
		//② 获取？的索引
		var num = path.lastIndexOf("?");
		// console.log(num);
		//③  获取？之后传过来的值，不止一个
		var value = path.substr(num+1);
		//④ 先用&符号进行分割成数组
		var arr1 = value.split("&");
		//⑤ 使用=进行分割 需要for循环
		for(var i=0;i<arr1.length;i++){
			var arr2 = arr1[i].split("=");
			if(arr2[0] == name){
				return arr2[1];
			}
			//没有就放回null
			return null;
		}
	}
})