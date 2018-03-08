function Artificial(){
	$.ajax({
		url:rootPath + "/op_exchange_rate/islogined.gsp",
		type:"post",
		dataType:"json",
		success:function(r) {
			if(r.retCode == "0000"){
				//已经登录过跳转到账户总览页面
				var sKeyType = r.data.sKeyType;
				var sCustId = r.data.sCustId;
				customerService(sKeyType,sCustId);
			}else {
				
				window.location.href="https://live.creditcard.cmbc.com.cn/kbase-dev/index.jsp?device=wap&encryptStr=";
			}
		},
		error:function(r) {
			alert("连接失败");
		}
	});
}

function customerService(sKeyType,sCustId){

	$.ajax({
		url:rootPath + "/op_exchange_rate/customerService.gsp",
		type:"post",
		data:{"sKeyType":sKeyType,"sCustId":sCustId},
		dataType:"json",
		success:function(r) {
			if(r.retCode == "0000"){
				//已经登录过跳转到账户总览页面
				var message = r.data;
				window.location.href="https://live.creditcard.cmbc.com.cn/kbase-dev/index.jsp?device=wap&encryptStr="+message;
			}else{
				return false;
				}
			},
		error:function(r) {
			alert("连接失败");
		}
	});

	
}
