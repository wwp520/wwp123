var Dialog = {
	current: null,
	overlay: null,
	zIndex: 99,
	show: function (args) {
		var el = $('#' + args.id),
			w = el.outerWidth(),
			h = el.outerHeight(),
			st = $(document).scrollTop();
		Dialog.current = el;

		if (!Dialog.overlay) {
			Dialog.overlay = $('<div class="overlay"></div>').appendTo('body');
		}

		var docw = $(document).width(), doch = $(document).height();
		Dialog.overlay.css({ width: docw, height: doch }).show();
		var l = ($(window).width() - w) / 2,
			t = ($(window).height() - h) / 2 + st;

		if (args.top) {
			t = args.top
		}

		if (args.left) {
			l = args.left
		}
		Dialog.zIndex++;
		el.css({ position: 'absolute', left: l, top: t, zIndex: Dialog.zIndex }).show();
	},
	close: function () {
		Dialog.current && Dialog.current.hide();
		Dialog.overlay && Dialog.overlay.hide();
	}
	
};
var Dialog1 = {
	    current: null,
	    overlay: null,
	    zIndex: 99,
	    show: function (args) {
	        var el = $('#' + args.id),
				w = el.width(),
				h = el.height(),
				st = $(document).scrollTop();
	        Dialog.current = el;

	        if (!Dialog1.overlay) {
	            Dialog1.overlay = $('<div class="overlay1"></div>').appendTo('body');
	        }

	        var docw = $(document).width(), doch = $(document).height();
	        Dialog1.overlay.css({ width: docw, height: doch }).show();
	        var l = ($(window).width() - w) / 2,
				t = ($(window).height() - h) / 2 + st;

	        if (args.top) {
	            t = args.top
	        }

	        if (args.left) {
	            l = args.left
	        }
	        Dialog1.zIndex++;
	        el.css({ position: 'absolute', left: l, top: '0px', zIndex: Dialog1.zIndex }).show();
	    },
	    close: function () {
	        Dialog1.current && Dialog1.current.hide();
	        Dialog1.overlay && Dialog1.overlay.hide();
	        document.getElementById('div_hide').style.display = 'none';
	        
	 }
};
//分享到朋友圈
function shareTofriends( title, desc, link,img_url) {
	// 在HTML页面内嵌入这一段JS代码
	if (window.WeixinJSBridge) {
		if (typeof (img_url) == 'undefined' || img_url == "") {
			var img_url = "xxxx";
		}
		if (typeof (link) == 'undefined' || link == "") {
			var link = site_url;
		}
		if (typeof (title) == 'undefined' || title == "") {
			var title = '点开看一下吧!';
		}
		if (typeof (desc) == 'undefined' || desc == "") {
			var desc = "wendoscoo";
		}
		WeixinJSBridge.invoke('shareTimeline', {
			"img_url" : img_url,
			// "img_width": "640",
			// "img_height": "640",
			"link" : link,
			"desc" : desc,
			"title" : title
		}, function(res) {
			// 返回res.err_msg,取值
			// share_timeline:cancel 用户取消
			// share_timeline:fail 发送失败
			// share_timeline:ok 发送成功
			WeixinJSBridge.log(res.err_msg);
		});
		return false;
	} else {
		alert("WeixinJSBridge对象不存在!!");
	}
}
//发送给好友
function sendAppMessage(title,desc,link,imgUrl){
	if (window.WeixinJSBridge) {
		if (typeof (imgUrl) == 'undefined' || imgUrl == "") {
			var imgUrl = "xxxx";
		}
		if (typeof (link) == 'undefined' || link == "") {
			var link = site_url;
		}
		if (typeof (title) == 'undefined' || title == "") {
			var title = '点开看一下吧!';
		}
		if (typeof (desc) == 'undefined' || desc == "") {
			var desc = "wendoscoo";
		}
		WeixinJSBridge.invoke('sendAppMessage',{
	        //"appid":appId,
	        "img_url":imgUrl,
	        //"img_width":"640",
	        //"img_height":"640",
	        "link":link,
	        "desc":desc,
	        "title":title
	        },function(res){
	        	
	        });
	} else {
		alert("WeixinJSBridge对象不存在!!");
	}
}




/**
 * 2016-9  微信新版， 本common.js 
 * 改动涉及   手机新版申请  老版申请，高端卡申请 电子银行部
 * */
function getStrLengGBK(str){
    var realLength = 0;
    var len = str.length;
    var charCode = -1;
    for(var i = 0; i < len; i++){
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 255) {
            realLength += 1;
        }else{
            // 如果是中文则长度加2
            realLength += 2;
        }
    }
    return realLength;
}


/**
 *  包括单位地址  住宅地址  
 * 用于检测input输入特殊字符,如：<>（尖括号） ()（括号）
 */
function checkSpecial(a){	
	
	var txt = new RegExp("[\\【,\\】,\\~,\\，,\\！,\\￥,\\、,\\？,\\：,\\“,\\”,\\》,\\《,\\*,\\&,\\+,\\[,\\],\\{,\\},\\!,\\\\,\\/,\\?,\\|,\\^,\\:,\\<,\\;,\\>,\",\\$,\\%,\\@,\\> ,\\],\\……,\\＠ ]"); 
	if (txt.test(a.value)) {
		a.value = "";
	}
}


/**  校验姓名 2016-8 
 * 姓名为3-18个字节，只包含中文、英文、• ，全中文或者全英文,不能中英文混合，•只能居中间。
 */
function nameCheck(name){

	if (name == '' || name.length == 0) { 
		return false;
	}
	
	var name2L = getStrLengGBK(name);
	if(name2L <3 || name2L > 18){
		return false;
	}
	
	var txt = new RegExp("^[A-Za-z\\·\\u2E80-\\uFE4F]+$"); 
	if (!txt.test(name)) {
		return false;
	}
	
	var txt2 = new RegExp("[\u4e00-\u9fa5]");  
	var txt3 = new RegExp("[a-zA-Z]");
	if(txt2.test(name) && txt3.test(name)){
		return false;
	}
	var len = name.length;
	if (name.indexOf("·") == 0 || name.substring(len - 1, len) == "·") {
		return false;
	}
	return true;
}


/**  校验身份证 2016-8  */
function idCheck(id){
	if (id == null || id.length != 18) { 
		return false;
	}
	
	var txt = new RegExp("^[0-9]{17}[0-9axAX]{1}"); 
	if (!txt.test(id)) {
		return false;
	}
	return true;
}


 
/**
 *  
 * 用于邮箱的使用
 */
function checkSpecialExcpetMail(a){	
	var txt = new RegExp("[\\*,\\&,\\[,\\],\\{,\\},\\!,\\\\,\\/,\\?,\\:,\\！,\\#,\\￥,\\【,\\】,\\？,\\、,\\）,\\（,\\……,\\<, \\《,\\》,\\;,\\>,\",\\$,\\%,\',\\' ,\\> ,\\(,\\),\\,]"); 
	if (txt.test(a.value)) {
		a.value = "";
	}
}

function xiao2datwo(str){
	str = str.replace(/[^\u4e00-\u9fa5xX0-9 ]/g,'');
	if(str == ''){
		return str;
	}else{ 
		return str.toUpperCase();
	}			
}


/**
 * 用于检测是否包含特殊字符,如：<>（尖括号） ()（括号）
 */
function checkSpecialChar(a){	
	var txt = new RegExp("[\\【,\\】,\\~,\\，,\\！,\\￥,\\（,\\）,\\、,\\？,\\：,\\“,\\”,\\》,\\《,\\*,\\&,\\+,\\[,\\],\\{,\\},\\!,\\\\,\\/,\\?,\\|,\\^,\\:,\\<,\\;,\\>,\",\\$,\\%,\\@,\',\\' ,\\> ,\\( ,\\),\\],\\……,\\＠ ]"); 
	if (txt.test(a.value)) {
		return true;
	}
	return false;
}

/**
 * trim方法实现
 */
function trimStr(str) {
	return str.replace(/(^\s*)|(\s*$)/g,"");
}


//校验单位电话重复 如 8888888,99999999
	function checkRepeat(str){
	var strLen = str.length;
	for(var i = 0 ; i < strLen; i++ ){
		var s = str.substring(i,i+1);
		var sRepeat7 = s * 1111111;
		var sRepeat8 = s * 11111111;
		if(str == sRepeat7 || str == sRepeat8){
			return true;
		}
	}
	return false;
}

//单位名称不能包含3个连续重复的字符
	function checkComName(str){
		if(!isNaN(str)){
			return true;
		}
		var strLen = str.length;
	for(var i = 0 ; i < strLen; i++ ){
		var s = str.substring(i,i+1);
		var sRepeat3 = s+s+s;
		if(str.indexOf(sRepeat3) >= 0){
			return true;
		}
	}
	return false;
}

//卡片申请 校验拼音合法性  2016-9   trim后是否为空  空格必须在中奖
function pyCheck(str) {
	var len = str.length;
	if(str.indexOf("  ") > 0  || trimStr(str) == '' || str.indexOf(" ") <= 0 || str.substring(len - 1, len) == " "){
		return false;
	}
	
	//多个空格
	var sum = 0;
	for(var i = 0 ; i < len; i++ ){
		var s = str.substring(i,i+1);
		if(s == " "){
			sum++;
		}
		if(sum > 1){
			return  false;
		}
	}
	return true;
}

//手机号码验证
function mobilephoneCK(str){
	 var reg0 = /^1\d{10}$/;
    var rel = false;
    if (reg0.test(str)) rel = true;
    return rel;
}


//身份证有效期验证
function idnoVdateck(str){
	
	var year = str.substring(0,4);
	var MM = str.substring(4,6);
	var DD = str.substring(6,8);
	if(year < 2016 || MM <= 0 || MM > 12 || DD <= 0 || DD > 31){
		return false;
	}
	var date = new Date();
	var y = date.getFullYear(); 
	var m = date.getMonth() + 1;
	var d = date.getDate();
	if(m < 10){
		m = '0' + m;
	}
	if(d < 10){
		d = '0'+d;
	}
	var ymd = y + '' + m + '' + d;
	
	if(ymd >  str){
		return false;
	}
	
	
	
	return true;
}

//住宅地址输入框验证
function checkhouseaddr(str){
	var len = str.length;
	if(len < 4 || len > 30){
		return false;
	}
	return true;
}

//单位名称
function checkcomname(str){
	var len = str.length;
	if(len < 4 || len > 19){
		return false;
	}
	if(checkComName(str)){
		return false;
	}
	return true;
}

//原办卡卡号
function oldCardCheck(str){
	 var reg0 = /^\d{16}$/;
    var rel = false;
    if (reg0.test(str)) rel = true;
    return rel;
}


//原办卡卡号 有效期
function MMCheck(str){
	
	if($('#MM').val() > 12 ||　　$('#MM').val() <= 0 ){
		return false;
	}
	 var reg0 = /^\d{2}$/;
    var rel = false;
    if (reg0.test(str)) rel = true;
    return rel;
}



/**  微信校验 2016-10  */
function wxCheck(){
	var str = $("#wxno").val();	
	 var re = new RegExp();
	    re = /^[a-zA-Z]{1}[a-zA-Z\d_-]{5,}$/;
	    if (re.test(str)) {
	        return true;
	    }
	return false;
}


/**  车牌号 2016-10  */
function carCheck(){
	var str = $("#carno").val();	
	 var re = new RegExp();
	    re = /^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z0-9]{5}$/;
	    if (re.test(str)) {
	        return true;
	    }
	return false;
}

function isHaveCarF(){
	var isHaveCar = $('#ishavecar').val();
	if(1 == isHaveCar){
		$('#carno').show();
		$('#carnoDiv').show();
	}else{
		$('#carno').hide();
		$('#carnoDiv').hide();
		$('#carno').val('');
		$("#carnoImgOk").hide();
		$("#carnoNotice").hide();
	}
}


/*  插入基础表PS_CARD_BASIC
 * */
function insertPS_BASIC(id_no, fun)
{
    var back = ''; 
	var url='/cebmms/apply/ps/insert_ps_basic.htm';
	var dataX = "id_no="+$("#id_no").val()+"&name="+$("#name").val()+"&mobilephone="+$("#mobilephone").val()+"&applyId="+$("#req_card_id").val()
	+"&cardorg="+$("#card_org").val()+"&provinceP2="+$("#provinceP2").val()+"&cityC2="+$("#cityC2").val()
	+"&areaA2="+$("#areaA2").val()+"&comaddr="+$("#comaddr").val()+"&pro_code="+$("#pro_code").val()+"&comname="+$("#comname").val();

    $.ajax({
        type: "POST",
        url: url,
        async:false,
        data: dataX,
        success: function(msg){
        	if(msg == '1'){
        		alert("请检查输入字段!");
        		back = 'BBBB';
        	}else{
        		back = 'AAAA';
        	}
        }
    });
    return back;
}


//用于税信通中间页面选择地区赋值
function setArea(){
	
	var flag = $("#logo").val();

	if(flag == '2591000'){         //微众税银
		html="<option value=\"\">请选择</option>"+"<option value=\"101\">广东省</option>"+"<option value=\"102\">河南省</option>"
		+"<option value=\"103\">深圳市</option>"+"<option value=\"104\">山东省</option>"+"<option value=\"105\">天津市</option>"+
		"<option value=\"106\">山西省</option>"+"<option value=\"107\">浙江省</option>" 
		+"<option value=\"108\">江苏省</option>"+"<option value=\"109\">湖南省</option>";
	}else if(flag == '2596183'){        //爱税融
		html="<option value=\"\">请选择</option>"+"<option value=\"201\">安徽省</option>"+"<option value=\"202\">江西省</option>";
	}else if(flag == '2586182'){            //税信通
	    html="<option value=\"\">请选择</option>"+"<option value=\"301\">厦门市</option>";
	}
	$('#areaID').append(html);
}

//手机号码验证
function checkTelPhone(str) {
    var reg0 = /^1\d{10}$/;

    var rel = false;
    if (reg0.test(str)) rel = true;

    return rel;
};



















////* Lvpan edit 2016-9-1 */////