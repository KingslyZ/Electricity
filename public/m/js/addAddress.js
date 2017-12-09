$(function(){
	
	// 省市区弹出框
	var cityPicker = new mui.PopPicker({layer:3});

    cityPicker.setData(cityData);

	var showCityPickerButton = document.getElementById('showCityPicker');

	showCityPickerButton.addEventListener('tap', function(event) {

		cityPicker.show(function(items) {

			$('[name="address"]').val((items[0] || {}).text + (items[1] || {}).text + (items[2] || {}).text);

		});

	}, false);

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


	//添加页面即是添加页面也是修改页面
	//判断依据就是location.href是否携带id
	//获取id
	var id = GetId(location.href,"id");
	console.log(id);
	//判断是否有id
	if(id){
		$("#addAddressBtn").html("修改");
		var url ="/address/updateAddress";
		//显示内容
		$.ajax({
			url:"/address/queryAddress",
			type:"get",
			data:id,
			success:function(result){
				for(var i=0;i<result.length;i++){
					if(result[i].id  ==  id){
						$('[name="recipients"]').val(result[i].recipients),
						$('[name="postcode"]').val(result[i].postCode),
						$('[name="address"]').val(result[i].address),
						$('[name="addressDetail"]').val(result[i].addressDetail)
					}
				}
			}
		});
	}else{
		$("#addAddressBtn").html("添加");
		var url ="/address/addAddress";
	}
	
	$("#addAddressBtn").on("tap",function(){
		//收集数据
		var data= {
			address:$.trim($('[name="address"]').val()),
			addressDetail:$.trim($('[name="addressDetail"]').val()),
			recipients:$.trim($('[name="recipients"]').val()),
			postcode:$.trim($('[name="postcode"]').val()),
		}
		// console.log(data);
		if(!data.recipients){
			mui.toast("请输入收件人姓名");
			return;
		}
		if(!data.postcode){
			mui.toast("请输入邮编");
			return;
		}
		if(!data.address){
			mui.toast("请输入省市区");
			return;
		}
		if(!data.addressDetail){
			mui.toast("请输入详细地址");
			return;
		}
		//目的
		if(id){
			// 修改需要多传一个id
			data.id = id;
		}
		//发送请求
		$.ajax({
			url:url,
			type:"post",
			data:data,
			success:function(result){
				if(result.success){
					//存储当前地址
					localStorage.setItem("returnUrl",location.href);
					location.href = "address.html";
				}else{
					if(result.error == 400){
						//保存地址
						location.setItem("returnUrl",location.href);
						location.href = "login.html";
					}
					mui.toast(result.message);
				}
			}
		})

	})
})