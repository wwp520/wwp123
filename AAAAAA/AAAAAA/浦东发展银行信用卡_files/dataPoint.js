function dataPoint(action,uid,uid_type,barcode,post_no,result){
	// 上送的业务字段
	business = {
		channel : "PC0004",
	    action : action,
	    uid : uid,
	    uid_type : uid_type,
	    login_mobile : "",
	    bsn : "",
	    barcode : barcode,
	    post_no : post_no,
	    result : result
	};
	// 数据相关选项
	dataOptions = {
	   bsn : false  // 第一个页面初始化需要将此开关置为true，其他埋点请置为false
	};
	// 发送数据的TIAP服务器地址
	serverHost = "https://tiap.spdbccc.com.cn/cirp/pc";
	// 触发埋点并发送数据
	(function() {
	   var s = document.createElement('script');
	   s.type = "text/javascript";
	   s.charset = "utf-8";
	   s.async = "true";
	   s.src = "https://tiap.spdbccc.com.cn/cigp/cigp2.js";
	   var p = document.getElementsByTagName('script')[0];
	   p.parentNode.insertBefore(s, p);
	})();
}