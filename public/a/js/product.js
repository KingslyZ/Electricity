//登录拦截
$.ajax({
	url:'/employee/checkRootLogin',
	type:'get',
	success:function(result){
		if(result.error && result.error == 400){
			location.href = "login.html";
		}
	}
})

$(function(){
	var page = 1;
	var count = 2;
	var page = 1;
	var totalPage = 0;
	GetData();

	//分页
	$("#prevBtn").on("click",function(){
		page--;
		if(page<1){
			page=1;
			alert("当前已是第一页");
			return;
		}
		GetData();
	})
	$("#nextBtn").on("click",function(){
		page++;
		if(page>totalPage){
			page=totalPage;
			alert("当前已是最后一页");
			return;
		}
		GetData();
	})
	//循环显示数据
	function GetData(){
		$.ajax({
			url:'/product/queryProductDetailList',
			type:'get',
			data:{
				page:page,
				pageSize:count
			},
			success:function(result){
				//模板显示
				console.log(result);
				if(!result.error){
					var html = template("proInfoTpl",result);
					$("#proInfoBox").html(html);
					totalPage =Math.ceil(result.total/result.size);
				}else{
					alert(result.message);
				}
				
			}
		})
	}

	//添加商品  商品属于二级分类下的商品
	//两步  循环显示商品品牌即二级分类    和上传的图片是数组形式
	//获取二级分类
	$.ajax({
		url:"/category/querySecondCategoryPaging",
		type:'get',
		data:{
			page:1,
			pageSize:100
		},
		success:function(result){
			$("#brandBox").html(template("brandTpl",result));
			console.log(result);
		}
	})
	//获取图片
	var imgArr = [];
	$('#fileUpload').fileupload({
	    dataType: 'json',
	    done: function (e, data) {
	    	var imgUrl = data._response.result.picAddr
	        imgArr.push(imgUrl);
	        if(imgArr.length >3){
	        	alert("最多不能超过三张图片");
	        	return;
	        }
	        $("#showBrand").html(template('imgTpl',{data:imgArr}));
	       
	    }
	});

	//发送请求
	$("#addProduct").on('click',function(){
		//收集数据
		var data={
			brandId:$("#brandSel").val(),
			proName:$.trim($('[name="proName"]').val()),
			oldPrice:$.trim($('[name="oldPrice"]').val()),
			price:$.trim($('[name="price"]').val()),
			proDesc:$.trim($('[name="proDesc"]').val()),
			size:$.trim($('[name="size"]').val()),
			statu:1,
			num:$.trim($('[name="num"]').val()),
			pic:imgArr
		}
		//判断数据
		if(data.brandId == -1){
			alert("请选择品牌");
			return;
		}
		if(!data.proName){
			alert("请填写产品名称");
			return;
		}
		if(!data.proDesc){
			alert("请填写产品描述");
			return;
		}
		if(!data.num){
			alert("请填写产品数量");
			return;
		}
		if(!data.size){
			alert("请填写产品尺码");
			return;
		}
		if(!data.oldPrice){
			alert("请填写产品原价");
			return;
		}
		if(!data.price){
			alert("请填写产品现价");
			return;
		}
		if(data.pic.length == 0){
			alert("请上传商品图片");
			return;
		}


		//发送请求
		$.ajax({
			url:'/product/addProduct',
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

	//修改商品信息
})