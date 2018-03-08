function reset(){
		new TipBox({type:'confirm',headcont:'您确定注销当前账号吗',btncallback:function(){
			zhuxiao();
		},cancelBtncallback:function(){
			return false;
		}});
	}
	
	
	function zhuxiao(){
		var url1 = window.location.href;
	    	var loc = url1.split("/account/")[1].split("/")[0];
				$.ajax({
	url:rootPath + "op_exchange_rate/reset.gsp",
	type:"post",
	dataType:"json",
	success:function(r){
		if(r.retCode=="0000"){
			window.location.href="/home/cn/wap/business/account/quota/identityVerification/index.shtml?mark="+loc;
		}
	},
	error:function(e){
		alert("connection error");
		return;
		
	}
});
		
	}
	





		
		