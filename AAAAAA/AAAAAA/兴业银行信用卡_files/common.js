// JavaScript Document
var localData = {};
var optionList = {
	"numberType":[["1406PD01","1406PD01"],["1505PD02","1505PD02"]],	//申请确认函编号前八位
	"productType":[],		//产品类型
	"productName":[],		//产品名称
	"cardType":[],			//卡样类型
	"education":[["高中及以下",1],["大专",2],["本科",3],["硕士",4],["博士",5]],	//教育程度
	"province":[],
	"city":[],
	"area":[],
	"nodeprovince":[],
	"nodecity":[],
	"nodename":[],
	"workingYears":[["小于6个月",5],["6-12个月",12],["12-24个月",24],["24-36个月",36],["大于36个月",37]],		//现单位工龄
	"nature":[["机关事业单位",1],["国有企业",2],["外商独资企业",3],["合资/合作企业",4],["股份制企业",5],["民营企业",6],["个体私营企业",7],["其他",8]],	//单位性质
	"relationship":[["配偶",1],["子女",2],["父母",3],["兄弟姐妹",4]],		//与申请人关系
	"repayment":[["全额",1],["最低还款额",2],["未填",9]]    	//人民币自动还款方式
};
//重置表单
function resetForm(){
	for(var i=0;i<$("input[type=text]").length;i++){
		$("input[type=text]").eq(i).val("");
	}
};
//localStorage超时
function timeOutStorage(t){
	var time = parseInt(t);
	var tmp = localStorage.timeFlag;
	var timestamp = new Date().getTime();
	if(tmp == undefined || timestamp-tmp >= time){
		localStorage.removeItem("localData");
		localStorage.removeItem("localDateFast");
		localStorage.removeItem("localDateMGM");
		localStorage.timeFlag = timestamp;
	}
};
//localStorage取出
function getStorage(items){
	for(var i=0;i<items.length;i++){
		if(typeof(items[i])=="string"){
			try{
				if(items[i].indexOf("province") > -1){
					$("#"+items[i]).val(localData[items[i]][0]).attr({"data-loc":localData[items[i]][1],"data-display":localData[items[i]][2]});
				}else if(items[i].indexOf("city") > -1){
					$("#"+items[i]).val(localData[items[i]][0]).attr({"data-loc":localData[items[i]][1],"data-display":localData[items[i]][2]});
				}else if(items[i].indexOf("area") > -1 && items[i]!="areacode"){
					$("#"+items[i]).val(localData[items[i]][0]).attr({"data-loc":localData[items[i]][1],"data-display":localData[items[i]][2]});
					var province = $(".province").val(),
					    city = $(".city").val(),
					    area = $(".area").val();
					if(province!=0 || city!=0 || area!=0){
						$(".locationSelect").addClass("selected");
					}
					var areaDis = $(".area").attr("data-display")==undefined ? "":$(".area").attr("data-display");
					var proDis = $(".province").attr("data-display")==undefined ? "":$(".province").attr("data-display"); 
					var cityDis = $(".city").attr("data-display")==undefined ? "":$(".city").attr("data-display"); 
					$(".locationSelect span").html(proDis+" "+cityDis+" "+areaDis);
				}else{
					$("#"+items[i]).val(localData[items[i]]);
				}
			}catch(e){}
		}else{
			try{
				if(items[i][1]=="select"){
					$("#"+items[i][0]).val(localData[items[i][0]][0]).attr("data-loc",localData[items[i][0]][1]);
					if(localData[items[i][0]][0] != 0 && localData[items[i][0]][0] != "" && localData[items[i][0]][0] != undefined){
						$("#"+items[i][0]+"Select").addClass("selected");
					}
					$("#"+items[i][0]+"Select span").html(localData[items[i][0]][2]);
				}else if(items[i][1] == "radio"){
					$("#"+items[i][0]+localData[items[i][0]]).attr("checked","checked");
				}
			}catch(e){
				//not exist
			}
		}
	}
};
//表单数据存入localStorage
function pushStorage(key){
	if(key == "weixin"){
		localStorage.localData = JSON.stringify(localData);
	}else if(key == "Fast"){
		localStorage.localDateFast = JSON.stringify(localData);
	}else if(key == "MGM"){
		localStorage.localDateMGM = JSON.stringify(localData);
	}
	
	
};
//卡样类型选择框
function getCardSample(obj){
	var sele = $(obj).attr("data-select");
	var cardType = document.getElementById("productType").value;
	var proType  = document.getElementById("productName").value;
	if(cardType.length <= 0){
		alert("请选择产品类型!");
	}else{
		if(proType.length <= 0){
			alert("请选择产品名称!");
		}else{
			getSelectContent.getCardSample(cardType,proType,function(ret){
				var res = JSON.parse(ret)["0"];
				optionList[sele]=[];
				for(var k in res){
					var temp = [res[k],k];
					optionList[sele].push(temp);
				}
				optionShow(sele);
			});
		}
	}
};
//产品名称选择框
function getProductNameByCardType(obj){
	var sele = $(obj).attr("data-select");
	var cardType = document.getElementById("productType").value;
	if(cardType.length > 0){
		getSelectContent.getProductNameByCardType(cardType,function(ret){
			var res = JSON.parse(ret)["0"];
			optionList[sele]=[];
			for(var k in res){
				var temp = [res[k],k];
				optionList[sele].push(temp);
			}
			optionShow(sele);	
		});
	}else{
		alert("请选择产品类型!");
	}
};
//产品类型选择框
function getCardProductType(obj){	
	getSelectContent.getCardProductType(function(ret){
		var sele = $(obj).attr("data-select");
		var res = JSON.parse(ret)["0"];
		optionList[sele]=[];
		for(var k in res){
			var temp = [res[k],k];
			optionList[sele].push(temp);
		}
		optionShow(sele);
	});
};
//省份选择框
function getProvince(obj){
	var flag = $(obj).attr("flag");
	getSelectContent.getProvince(flag,function(ret){
		var res = JSON.parse(ret)["0"];
		optionList["province"]=[];
		for(var k in res){
			var temp = [res[k],k];
			optionList["province"].push(temp);
		}
		optionShow("province");
	});	
};
//市选择框
function getCityByProId(proId){   
	getSelectContent.getCityByProId(proId,function(ret){
		var res = JSON.parse(ret)["0"];
		optionList["city"]=[];
		for(var k in res){
			var temp = [res[k],k];
			optionList["city"].push(temp);
		}
		optionShow("city");
	});
};
//区选择框
function getAreaByCityId(cityId){   
	getSelectContent.getAreaByCityId(cityId,function(ret){
		var res = JSON.parse(ret)["0"];
		optionList["area"]=[];
		for(var k in res){
			var temp = [res[k],k];
			optionList["area"].push(temp);
		}
		if(optionList["area"].length > 0){
			optionShow("area");
		}else{
			//区为空
			$(".area").attr({"data-loc":"","data-display":""}).val(0);
			$(".locationSelect").addClass("selected");
			$(".locationSelect span").html($(".provinceTemp").html()+" "+$(".cityTemp").html()+" "+$(".areaTemp").html());
			var locationFlag = $("#locationFlag").html().trim();
			localData[locationFlag+"province"] = [$(".province").val(),$(".province").attr("data-loc"),$(".provinceTemp").html()];
			localData[locationFlag+"city"] = [$(".city").val(),$(".city").attr("data-loc"),$(".cityTemp").html()];
			localData[locationFlag+"area"] = [0,"",""];
			$(".optionList").hide();
		}
	});
};

//通用选择框
function getSelect(obj){
	var flag = $(obj).attr("data-flag");
	var sele = $(obj).attr("data-select");
	var n = $(obj).attr("data-val");
	if(flag == 0){
		getSelectContent.getSelectContentByKey(n,function(ret){
			$(obj).attr("data-flag",1);
			var res = JSON.parse(ret)["0"];
			optionList[sele]=[];
			
			var keys = [];
			for(var key in res){
				keys.push(key);
			}
			keys = keys.sort();
			for(var i = 0; i< keys.length;i++){
				var k = keys[i];
				var temp = [res[k],k];
				optionList[sele].push(temp);
			}
			/*for(var k in res){
				var temp = [res[k],k];
				optionList[sele].push(temp);
			}*/
			optionShow(sele);
		});
	}else{
		optionShow(sele);
	}
};
//省市区弹出选择框顶部title
function locTitle(){
	var prov = $(".province").attr("data-loc");
	var city = $(".city").attr("data-loc");
	var area = $(".area").attr("data-loc");
	if(prov){
		try{
		$(".provinceTemp").html(optionList["province"][prov][0]).attr("data-prov",optionList["province"][prov][1]);
		if(city){
			$(".cityTemp").html(optionList["city"][city][0]).attr("data-city",optionList["city"][city][1]);
			if(area){
				$(".areaTemp").html(optionList["area"][area][0]).attr("data-city",optionList["area"][area][1]);
			}else{
				$(".areaTemp").html("").attr("data-city","");
			}
		}else{
			$(".cityTemp").html("").attr("data-city","");
		}
		}catch(e){}
	}else{
		$(".provinceTemp").html("").attr("data-city","");
	}
};
//显示下拉选择框
function optionShow(str){
	var opt = optionList[str];
	var arr="";
	for(var i=0;i<opt.length;i++){
		if($("#"+str).val() == opt[i][1] && $("#"+str).val()!= 0){
			arr+="<li class='checked' data-loc='"+i+"' data-val='"+opt[i][1]+"'  onClick='clickLi(this);'>"+opt[i][0]+"</li>";
		}else{
			arr+="<li data-loc='"+i+"' data-val='"+opt[i][1]+"'  onClick='clickLi(this);'>"+opt[i][0]+"</li>";
		}
	}
	if(str == "province"){
		locTitle();
		$("#provinceList ul").attr("data-sel",str).html(arr);
		$("#provinceList").show();		
	}else if(str == "city"){
		$("#cityList ul").attr("data-sel",str).html(arr);
		$("#cityList").show();		
	}else if(str == "area"){
		$("#areaList ul").attr("data-sel",str).html(arr);
		$("#areaList").show();
	}
	//
	else if(str == "nodeprovince"){
		nodeTitle();
		$("#nodeprovinceList ul").attr("data-sel",str).html(arr);
		$("#nodeprovinceList").show();		
	}else if(str == "nodecity"){
		$("#nodecityList ul").attr("data-sel",str).html(arr);
		$("#nodecityList").show();		
	}else if(str == "nodename"){
		$("#nodenameList ul").attr("data-sel",str).html(arr);
		$("#nodenameList").show();
	}
	else{
		$("#optionList ul").attr("data-sel",str).html(arr);
		$("#optionList").show();
	}
};
//选中通用选择框
function optionCheck(obj,str){	
	$("#"+str).val($(obj).attr("data-val")).attr("data-loc",$(obj).attr("data-loc"));
	if($("#"+str).val()!= 0){
		$("#"+str+"Select").addClass("selected");
	}else{
		$("#"+str+"Select").removeClass("selected");
	}
	$("#"+str+"Select span").html($(obj).html());
	$(".optionList").hide();
	
	localData[str] = [$(obj).attr("data-val"),$(obj).attr("data-loc"),$(obj).html()];	
	if(str == "numberType"){		
		localData["applicationNo"] = $(obj).attr("data-val")+$("#number").val();
		$("#applicationNo").val($(obj).attr("data-val")+$("#number").val());
	}else if(str == "productType"){
		$("#productName").val("").attr("data-loc","");
		$("#productNameSelect").removeClass("selected");
		$("#productNameSelect span").html("未选择");
		$("#cardType").val("").attr("data-loc","");
		$("#cardTypeSelect").removeClass("selected");
		$("#cardTypeSelect span").html("未选择");
	}else if(str == "productName"){
		$("#cardType").val("").attr("data-loc","");
		$("#cardTypeSelect").removeClass("selected");
		$("#cardTypeSelect span").html("未选择");
	}else if(str == "repayment"){
		if($(obj).html().indexOf("全额")>-1 ||$(obj).html().indexOf("最低")>-1){
			$("#account").val("").removeAttr("disabled");
		}else{
			$("#account").val("").attr("disabled","disabled");
			localData["account"]="";
		}
	}
};
//选中省市区选择框
function locationCheck(obj,str){
	var ori = $("."+str).val();
	$("."+str).val($(obj).attr("data-val")).attr("data-loc",$(obj).attr("data-loc"));
	if($("."+str).val() != ori){
		if(str == "province"){
			$(".city").val(0).attr("data-loc","");
			$(".area").val(0).attr("data-loc","");
		}else if(str == "city"){
			$(".area").val(0).attr("data-loc","");
		}
	}
	locTitle();
	if(str == "area"){
		$(".locationSelect").addClass("selected");
		var locationFlag = $("#locationFlag").html().trim();
		$(".locationSelect span").html($(".provinceTemp").html()+" "+$(".cityTemp").html()+" "+$(".areaTemp").html());
		localData[locationFlag+"province"] = [$(".province").val(),$(".province").attr("data-loc"),$(".provinceTemp").html()];
		localData[locationFlag+"city"] = [$(".city").val(),$(".city").attr("data-loc"),$(".cityTemp").html()];
		localData[locationFlag+"area"] = [$(".area").val(),$(".area").attr("data-loc"),$(".areaTemp").html()];
	}
	
};
//选择框点击选中事件
function clickLi(obj){
	var sel = $(obj).parent().attr("data-sel");
	$(obj).addClass("checked").siblings().removeClass("checked");
	if(sel == "province"){
		locationCheck(obj,sel);
		getCityByProId($(obj).attr("data-val"));
	}else if(sel == "city"){
		locationCheck(obj,sel);
		getAreaByCityId($(obj).attr("data-val"))
	}else if(sel == "area"){
		locationCheck(obj,sel);
		$(".optionList").hide();
	}
	else if(sel == "nodeprovince"){
		banknodeCheck(obj,sel);
		getNodeCityByProId($(obj).attr("data-val"));		
	}else if(sel == "nodecity"){
//		banknodeCheck(obj,sel);
//		$(".optionList").hide();
		banknodeCheck(obj,sel);
		getBankNodesByCityId($(obj).attr("data-val"))	
	}else if(sel == "nodename"){
		banknodeCheck(obj,sel);
		$(".optionList").hide();
	}
	else{
		optionCheck(obj,sel);
		if(sel == "repayment" && $(obj).attr("data-val")!=1 && $(obj).attr("data-val")!=2){
			$("#account").val("");
			$("#account").parent().height(36).find('.error').remove();
		}
	}
};
//关闭下拉选择框
function closeOptionList(obj){
	if($(obj).find("li").length<=0){
		if($(obj).attr("id")=="areaList"){
			$(".optionList").hide();
			$(".locationSelect").addClass("selected");
			$(".locationSelect span").html($(".provinceTemp").html()+" "+$(".cityTemp").html()+" "+$(".areaTemp").html());
			var locationFlag = $("#locationFlag").html().trim();
			localData[locationFlag+"province"] = [$(".province").val(),$(".province").attr("data-loc"),$(".provinceTemp").html()];
			localData[locationFlag+"city"] = [$(".city").val(),$(".city").attr("data-loc"),$(".cityTemp").html()];
			localData[locationFlag+"area"] = [$(".area").val(),$(".area").attr("data-loc"),$(".areaTemp").html()];
		}
		else if($(obj).attr("id")=="nodenameList"){
			$(".optionList").hide();
			$(".nodeSelect").addClass("selected");
			$(".nodeSelect span").html($(".nodeprovinceTemp").html()+" "+$(".nodecityTemp").html()+" "+$(".nodenameTemp").html());
			var locationFlag = $("#nodeFlag").html().trim();
			localData[locationFlag+"nodeprovince"] = [$(".nodeprovince").val(),$(".nodeprovince").attr("data-loc"),$(".nodeprovinceTemp").html()];
			localData[locationFlag+"nodecity"] = [$(".nodecity").val(),$(".nodecity").attr("data-loc"),$(".nodecityTemp").html()];
			localData[locationFlag+"nodename"] = [$(".nodename").val(),$(".nodename").attr("data-loc"),$(".nodenameTemp").html()];
		}
		else{
			$(obj).hide();
		}
	}
};
//省市区返回
function locationBack(obj){
	$(obj).parents(".optionList").hide();
};
//---------------------------------表单确认页面---------------------------------
// 单选框转义
function tranRadio(key,value,id){
	if(key=="01"){//婚姻状况
		if(value =="1"){
			$("#"+id).html("未婚");
		}else if(value =="2"){
			$("#"+id).html("已婚");
		}else{
			$("#"+id).html("其他");
		}
	}else if(key=="02"){//卡片寄送地址
		if(value=="1"){
			$("#"+id).html("单位地址");
		}else if(value=="2"){
			$("#"+id).html("当前住址");
		}else{
			$("#"+id).html("其他地址");
		}
	}else if(key == "03"){//交易短信通知
		if(value =="1"){
			$("#"+id).html("开通");
		}else if(value =="2"){
			$("#"+id).html("不开通");
		}else{
			$("#"+id).html("未选择");
		}
	}
};
//选择框填值
function showOption(key,value,id,other,other1){
	if(key=="01"||key=="02"||key=="03"){
		var tmp = parseInt(key);
		switch (tmp) {
		case 1: // 卡种类型
			getSelectContent.TransCardProductType(value,function (ret){			
				if(ret ==null){
					$("#"+id).html("未选择");
				}else{
					$("#"+id).html(ret);
				}
			});
			return;
		case 2:
			getSelectContent.TransCardProductName(other,value,function (ret){			
				if(ret ==null){
					$("#"+id).html("未选择");
				}else{
					$("#"+id).html(ret);
				}
			});
			return;			
		case 3 :
			getSelectContent.TransCardSample(value,other,other1,function(ret){				
				if(ret ==null){
					$("#"+id).html("未选择");
				}else{
					$("#"+id).html(ret);
				}
			});
			return;
		default:
			return;
		}
	}// 卡种类型信息特殊处理
	getSelectContent.TransSelectContentByKey(key,value,function(ret){
		if(ret ==null){
			$("#"+id).html("未选择");
		}else{
			$("#"+id).html(ret);
		}
	});
};
//省市区转义
function transLocation(pid,cid,aid,str){
	getSelectContent.getAddress(pid,cid,aid,function(ret){
		if(ret != null || ret != "" || ret != undefined){
			$("#"+str).html(ret);
		}else{
			alert("获取地址失败！");
			return false;
		}
	})
};
//证件有效期
function showIdentificationPeriod(period,date,str){
	if(period == 1){
		$("#"+str).html("长期");
	}else{
		$("#"+str).html(date.substr(0,4)+"年"+date.substr(4,2)+"月"+date.substr(6,2)+"日");
	}
};
//单位电话
function showTel(num1,num2,num3,str){
	var tmp = num1+"-"+num2;
	if(num3 != null && num3 != "" && num3 != undefined){
		tmp += "-"+num3;
	}
	$("#"+str).html(tmp);
};
//------------------------------表单验证----------------------------------------------------------
//错误提示
function remind(id,txt){
	$("#"+id).parent().append("<div class='error'>"+txt+"</div>").height(50);
}
$(document).on("focus",".step .list li input",function(){
	if(!$(this).hasClass("periodRadio")){
		$(this).parent().height(36).find('.error').remove();
	}
});
//验证为空
function isNull(str){
	if(str=="") return true;
	var regu = /^[ ]+$/;
	var re = new RegExp(regu);
	return re.test(str);
//	return false;
};
//验证字符创最大长度
function isLong(str,num){
	if(str.length > num){
		return false;
	}else{
		return true;
	}
};
//验证正整数
function isNumber(str){
	var regu = /^[0-9]+$/;
	var re = new RegExp(regu);
	return re.test(str);
};
//验证手机号码
function checkMobile(str){
	var regu = /^1\d{10}$/;
	var re = new RegExp(regu);
	return re.test(str);
};
//姓名
function checkName(str){
	var regu = /^[\u4e00-\u9fa5]{2,8}$/;
	var re = new RegExp(regu);
	return re.test(str);
};
//姓、名
function checkNames(str){
	var regu = /^[\u4e00-\u9fa5]{1,7}$/;
	var re = new RegExp(regu);
	return re.test(str);
};
//拼音
function checkPinyin(str){
	var regu = /^[A-Za-z]*([\s][A-Za-z]*)+$/;
	var re = new RegExp(regu);
	return re.test(str);
};
//拼音姓、名
function checkPinyins(str){
	var regu = /^[A-Za-z]*([\s]*[A-Za-z]*)+$/;
	var re = new RegExp(regu);
	return re.test(str);
};
//身份证号
function checkIdnumber(str){
	var regu = /^[1-9][0-9]{5}(19[0-9]{2}|20[0-9]{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/;
	var re = new RegExp(regu);
	return re.test(str);
};
//邮箱
function checkEmail(str){
	
	//  ^([a-z0-9A-Z]+[-|\\.|_]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$
	var regu = /^([a-z0-9A-Z]+[-|\.|_]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/;
	var re = new RegExp(regu);
	return re.test(str);
};
//邮编
function checkZipCode(str){
	var regu = /^[0-9]{6}$/;
	var re = new RegExp(regu);
	return re.test(str);
};
//车牌号
function checkLincense(str){
	var regu = /^[\u4e00-\u9fa5]{1}[A-Za-z]{1}[A-Za-z_0-9]{5}$/;
	var re = new RegExp(regu);
	return re.test(str);
};
//区号
function checkAreaCode(str){
	var regu = /^\d{3,5}$/;
	var re = new RegExp(regu);
	return re.test(str);
};
//电话号码
function checkPhone(str){
	var regu = /^\d{7,8}$/;
	var re = new RegExp(regu);
	var regu2 =/^\d{11}$/;
	var re2 = new RegExp(regu2);
	return re.test(str)||re2.test(str);
};
//分机号
function checkExNum(str){
	var regu = /^\d{0,6}$/;
	var re = new RegExp(regu);
	return re.test(str);
};
//验证日期
function checkDate(str){
	var year = parseInt(str.split("-")[0]);
	var month = parseInt(str.split("-")[1])-1;
	var day = parseInt(str.split("-")[2]);
	var date = new Date(year,month,day);
	return(date.getFullYear() == year && date.getMonth() == month && date.getDate() == day);
};
//获取字符串长度
function getLength(str){
	var realLength = 0;
	var len = str.length;
	for(var i=0;i<len;i++){
		var charCode = str.charCodeAt(i);
		if(charCode >=0 && charCode < 128){
			realLength += 1;
		}else{
			realLength += 2;
		}
	}
	return realLength;
};
//截取字符串
function cutStr(str,len){
	var str_length = 0;
	var str_len = str.length;
	var str_cut1 = "";
	var str_cut2 = "";
	for(var i=0;i<str_len;i++){
		var a = str.charAt(i);
		if(str_length < len-1){
			str_cut1 = str_cut1.concat(a);
		}else{
			str_cut2 = str_cut2.concat(a);
		}
		str_length++;
		if(escape(a).length > 4){
			str_length++;
		}
	}
	return [str_cut1,str_cut2];
};

//详细地址
function checkDetailAddress(str){
	var regu = /^(?![^\u4e00-\u9fa5]+$)[\S\s]/;
	var re = new RegExp(regu);
	return re.test(str);
};

//还款账号有效性校验
//自扣还款加入卡片位数的验证
//规则：卡bin 90592的借记卡16位，966666、622909、622908的为18位
function checkBinCrad(str){
	var regu = /^((90592)|(966666[0-9])|(622909[0-9])|(622908[0-9]))\d{11}$/;
	var re = new RegExp(regu);
	return re.test(str);
};
/**
 * 校验身份证号码的合法性。 遵循GB11643-1999公民身份证号码验证规范。
 * 
 * @param sId
 * @return
 */
function valCertID(sId) {
	if (sId == undefined)
		return false;

	var aCity = {
		11 : "北京",
		12 : "天津",
		13 : "河北",
		14 : "山西",
		15 : "内蒙古",
		21 : "辽宁",
		22 : "吉林",
		23 : "黑龙江",
		31 : "上海",
		32 : "江苏",
		33 : "浙江",
		34 : "安徽",
		35 : "福建",
		36 : "江西",
		37 : "山东",
		41 : "河南",
		42 : "湖北",
		43 : "湖南",
		44 : "广东",
		45 : "广西",
		46 : "海南",
		50 : "重庆",
		51 : "四川",
		52 : "贵州",
		53 : "云南",
		54 : "西藏",
		61 : "陕西",
		62 : "甘肃",
		63 : "青海",
		64 : "宁夏",
		65 : "新疆",
		71 : "台湾",
		81 : "香港",
		82 : "澳门",
		91 : "国外"
	};

	var iSum = 0;
	var info = "";
	// 是否15、18位数字或17位数字加x
	if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(sId))) {
		// alert('身份证号长度不对，或不符合格式要求.');
		return false;
	}

	// 转成18位
	if (sId.length == 15) {
		sId = certId15To18(sId);
	}
	sId = sId.replace(/x$/i, "a");
	// 非法地区
	if (aCity[parseInt(sId.substr(0, 2))] == null) {
		// alert('地区不对！');
		return false;
	}
	sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-"
			+ Number(sId.substr(12, 2));
	var d = new Date(sBirthday.replace(/-/g, "/"));
	// 非法生日
	if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d
			.getDate())) {
		// alert("生日有误！");
		return false;
	}
	for (var i = 17; i >= 0; i--)
		iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
	// 非法证号
	if (iSum % 11 != 1) {
		return false;
	}
	return true;
};

function setCenter(top,left,divname){
	var ltop =($(window).height()-divname.height())/2;
	var lleft =($(window).width()-divname.width())/2;
	var lscrolltop =$(document).scrollTop();
	var lscrollleft =$(document).scrollLeft();
	divname.css({postion:'absolute','top':ltop+lscrolltop,'left':lleft+lscrollleft}).show();
};

function closeNotify(element){
	if(typeof element !== "undefined") {
		element.remove();
	}else{
		$('.alert').remove();
	}
};
function showNotify(text, color, icon){
	var me = this;
	var time = '3000';
	var $container = $(document.body);
	
	var icon_markup = "";
	
	if(icon){
		icon_markup = "<span class='" + icon + "'></span>";
	}
	
	var html = '<div class ="notify-container"><div class="alert alert-' 
			+ color + '" text-align="center">' + icon_markup + text + '</div></div>';
	var alertEl = $(html).on("tap",function(){
		me.closeNotify($(this));
	});
	$container.append(alertEl);
	$(".notify-container").show();
	var ltop =($(window).height()-$(".notify-container").height())/2;
	var lleft =($(window).width()-$(".notify-container").width())/2;
	var lscrolltop =$(document).scrollTop();
	var lscrollleft =$(document).scrollLeft();
	var tmp = $(".notify-container");
	alert(ltop+lscrolltop);
	tmp.css({position:"absolute",top:(ltop+lscrolltop)-30,left:lleft+lscrollleft});
	window.setTimeout(function(){
		//me.closeNotify($container.find('.alert').first());
	}, time);
};

function showInfoNotify(message){
	showNotify(message,'red');
};
//--------------------------------------------
//网点省份选择框
function getNodeProvince(obj){
	var flag = $(obj).attr("flag");
	getSelectContent.getProvince(flag,function(ret){
		var res = JSON.parse(ret)["0"];
		optionList["nodeprovince"]=[];
		for(var k in res){
			var temp = [res[k],k];
			optionList["nodeprovince"].push(temp);
		}
		optionShow("nodeprovince");
	});	
};
//网点市选择框
function getNodeCityByProId(proId){   
	getSelectContent.getCityByProId(proId,function(ret){
	//getSelectContent.getBankNodesByCityId(proId,function(ret){
		var res = JSON.parse(ret)["0"];
		optionList["nodecity"]=[];
		for(var k in res){
			var temp = [res[k],k];
			optionList["nodecity"].push(temp);
		}
		optionShow("nodecity");
	});
};
//网点选择框
function getBankNodesByCityId(cityId){   
	getSelectContent.getBankNodesByCityId(cityId,function(ret){
		var res = JSON.parse(ret);
		optionList["nodename"]=[];
		for(var k in res){
			var temp = [res[k][0],k,res[k][1]];
			optionList["nodename"].push(temp);
		}
		if(optionList["nodename"].length > 0){
			optionNodeShow("nodename");
		}else{
			//node为空
			alert("抱歉，您所选择的城市没有网点")
			//$(".node").attr({"data-loc":"","data-display":""}).val(0);
			$(".nodeSelect").removeClass("selected");
			$("#banknodeSelect span").html("未选择");
			//$(".locationSelect span").html($(".provinceTemp").html()+" "+$(".cityTemp").html()+" "+$(".areaTemp").html());
			//var locationFlag = $("#locationFlag").html().trim();
			//localData[locationFlag+"province"] = [$(".province").val(),$(".province").attr("data-loc"),$(".provinceTemp").html()];
			//localData[locationFlag+"city"] = [$(".city").val(),$(".city").attr("data-loc"),$(".cityTemp").html()];
			//localData[locationFlag+"area"] = [0,"",""];
			//$(".optionList").hide();
		}
	});
};

//显示下拉选择框
function optionNodeShow(str){
	var opt = optionList[str];
	var arr="";
	for(var i=0;i<opt.length;i++){
		if($("#"+str).val() == opt[i][1] && $("#"+str).val()!= 0){
			arr+="<li style='line-height:20px' class='checked' data-loc='"+i+"' data-val='"+opt[i][1]+"'  onClick='clickLi(this);'>"+opt[i][0]+"<p>"+opt[i][2]+"</p></li>";
		}else{
			arr+="<li style='line-height:20px' data-loc='"+i+"' data-val='"+opt[i][1]+"'  onClick='clickLi(this);'>"+opt[i][0]+"<p style='color: gray;'>"+opt[i][2]+"</p></li>";
		}
	}
	
		$("#nodenameList ul").attr("data-sel",str).html(arr);
		$("#nodenameList").show();

};

//选中网点选择框
function banknodeCheck(obj,str){
	var ori = $("."+str).val();
	$("."+str).val($(obj).attr("data-val")).attr("data-loc",$(obj).attr("data-loc"));
	if($("."+str).val() != ori){
		if(str == "nodeprovince"){
			$(".nodecity").val(0).attr("data-loc","");
			$(".nodename").val(0).attr("data-loc","");
		}else if(str == "nodecity"){
			$(".nodename").val(0).attr("data-loc","");
		}
	}
	nodeTitle();
	if(str == "nodename"){
//	if(str == "nodecity"){
		$(".nodeSelect").addClass("selected");
		var locationFlag = $("#nodeFlag").html().trim();
		$(".nodeSelect span").html($(".nodeprovinceTemp").html()+" "+$(".nodecityTemp").html()+" "+$(".nodenameTemp").html());
		localData[locationFlag+"nodeprovince"] = [$(".nodeprovince").val(),$(".nodeprovince").attr("data-loc"),$(".nodeprovinceTemp").html()];
		localData[locationFlag+"nodecity"] = [$(".nodecity").val(),$(".nodecity").attr("data-loc"),$(".nodecityTemp").html()];
		localData[locationFlag+"nodename"] = [$(".nodename").val(),$(".nodename").attr("data-loc"),$(".nodenameTemp").html()];
	
		
		
	}
	
};

//网点弹出选择框顶部title
function nodeTitle(){
	var prov = $(".nodeprovince").attr("data-loc");
	var city = $(".nodecity").attr("data-loc");
	var name = $(".nodename").attr("data-loc");
	if(prov){
		try{
		$(".nodeprovinceTemp").html(optionList["nodeprovince"][prov][0]).attr("data-prov",optionList["nodeprovince"][prov][1]);
		if(city){
			$(".nodecityTemp").html(optionList["nodecity"][city][0]).attr("data-city",optionList["nodecity"][city][1]);
			if(name){
				$(".nodenameTemp").html(optionList["nodename"][name][0]).attr("data-city",optionList["nodename"][name][1]);
			}else{
				$(".nodenameTemp").html("").attr("data-city","");
			}
		}else{
			$(".nodecityTemp").html("").attr("data-city","");
			$(".nodenameTemp").html("").attr("data-city","");
		}
		}catch(e){}
	}else{
		$(".nodeprovinceTemp").html("").attr("data-city","");
	}
}

//弹出提示框样式
function sAlert(str){
	var msgw,msgh,titleheight,bordercolor;
	msgw = 260;//提示框宽度
	msgh = 132;//提示框高度
	titleheight=40;//提示框标题高度
	bordercolor = "#0085d2";//提示框边框颜色
	titlecolor = "#0085d2";//提示框标题颜色
	
	var sWidth,sHeight;
	sWidth = document.body.clientWidth;
	sHeight = (document.body.clientHeight>document.body.scrollHeight)?document.body.clientHeight:document.body.scrollHeight;
	var bgObj = document.createElement("div");
	bgObj.setAttribute("id", "bgDiv");
	bgObj.setAttribute("align", "center");
	bgObj.style.position = "absolute";
	bgObj.style.top = "0";
	bgObj.style.background = "#cccccc";
	bgObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75);";
	bgObj.style.opacity = "0.6";
	bgObj.style.left = "0";
	bgObj.style.width = sWidth + "px";
	bgObj.style.height = sHeight + "px";
	bgObj.style.zlndex = "9999";
	document.body.appendChild(bgObj);
	
	var msgObj = document.createElement("div");
	msgObj.setAttribute("id", "msgDiv");
	msgObj.setAttribute("align", "center");
	msgObj.style.background = "white";
	msgObj.style.border = "1px solid #0085d2";
	msgObj.style.position = "absolute";
	msgObj.style["border-radius"] = "7px";
	msgObj.style.left = "55%";
	
	
	/*	msgObj.style.top = "35%";*/
	
	//msgObj.style.top = "35%";
	//debugger;
	var screenwidth,screenheight,mytop=0,getPosLeft,getPosTop;
	screenwidth = $(window).width();
	screenheight = $(window).height();
	mytop = $(document).scrollTop();
	getPosTop = screenheight/2-150;
	/*msgObj.style.top = getPosTop+"px";
	
	//浏览器大小改变
	$(window).resize(function(){
		debugger;
		msgObj.style.top = (getPosTop+mytop+80)+"px";
	});
	
	//浏览器有滚动条的时候
	$(window).scroll(function(){
		debugger;
		msgObj.style.top = (getPosTop+mytop+80)+"px";
	});*/
	msgObj.style.top = (getPosTop+mytop+80)+"px";
	msgObj.style.font = "12px/1.6em verdana,Geneva,Arial,Helvetica,sans-serif";
	//msgObj.style.marginLeft = "-135px";
	msgObj.style.marginLeft = "-"+msgw/2-15+"px";
	msgObj.style.marginTop = -15 + document.documentElement.scrollTop+ "px";
	msgObj.style.width = msgw + "px";
	msgObj.style.height = msgh + "px";
	msgObj.style.textAlign = "center";
	msgObj.style.lineHeight = "25px";
	msgObj.style.zlndex = "10001";
	document.body.appendChild(bgObj);

	var title = document.createElement("h4");
	title.setAttribute("id", "msgTitle");
	title.setAttribute("align", "center");
	title.style.margin = "0px 0px 7px 0px";
	title.style.padding = "3px";
	title.style.background = bordercolor;
	title.style.opacity = "0.75";
	title.style.border = "1px solid #0085d2";
	title.style.height = "20px";
	title.style.font = "17px verdana,Geneva,Arial,Helvetica,sans-serif";
	title.style.fontWeight = "bold";
	title.style.color = "beige";
	title.style.cursor = "pointer";
	title.innerHTML = "温馨提示";
	document.body.appendChild(msgObj);
	document.getElementById("msgDiv").appendChild(title);
	
	var btn = document.createElement("button");
	btn.setAttribute("id", "msgBtn");
	btn.style.padding = "3px";
	btn.style.width = "45px";
	btn.style.top= "75%";
	btn.style.left= "79%";
	btn.style.position = "absolute";
	btn.style.font = "12px verdana,Geneva,Arial,Helvetica,sans-serif";
	btn.innerHTML = "关闭";
	document.body.appendChild(btn);
	
	var txt = document.createElement("p");
	txt.style.margin = "1 em 0";
	txt.setAttribute("id","msgTxt");
	txt.style.margin = "8px";
	txt.style.font = "15px verdana,Geneva,Arial,Helvetica,sans-serif";
	txt.innerHTML = str;
	document.getElementById("msgDiv").appendChild(txt);
	document.getElementById("msgDiv").appendChild(btn);

	btn.onclick=function(){
		document.body.removeChild(bgObj);
		document.getElementById("msgDiv").removeChild(btn);
		document.body.removeChild(msgObj);	
	}
}


function getCCOC(obj){
	var key = $(obj).attr("data-val");
	var id=$(obj).attr("id");

	if(optionList["CCOC"] == undefined){
		getSelectContent.getCCOC("",function(ret){
			var result = JSON.parse(ret);
			optionList["CCOC"]=result;
			var keys = [];
			var res = result[key];
			for(var k in res){
				keys.push(k);
			}
			keys = keys.sort();
			obj.options.length=1;
			for(var i = 0; i< keys.length;i++){
				var k = keys[i];
				obj.options.add(new Option(res[k].dsc,k));
			}
		});
	}else {
		var keys = [];
		var res = optionList["CCOC"][key];
		for(var k in res)
			keys.push(k);
		
		keys = keys.sort();
		for(var i = 0; i< keys.length;i++){
			var k = keys[i];
			obj.options.add(new Option(res[k].dsc,k));
		}	
	}
}


function selectClick(obj){
	var key = $(obj).attr("data-val");
	var id=$(obj).attr("id");
	
	if(optionList["CCOC"] == undefined){
		getCCOC(obj);
	}
	else if(id == "natureSelect2"&&key == 0){
		alert("请先选择单位性质");
		document.getElementById("natureSelect").focus();
		return false;
	}else if(id == "postSelect"&&key == 0){
		alert("请先选择性质详情");
		document.getElementById("natureSelect2").focus();
		return false;
	}
}

function selectChange(obj){
	var id=$(obj).attr("id");
	var val=obj.options[obj.selectedIndex].value;
	var sele = $(obj).attr("data-select");
	var key = $(obj).attr("data-val");
	if(id=="natureSelect"){
		obj.options[0]=new Option("请先选择单位性质","");
		document.getElementById("nature").setAttribute("value",val);
		localData["nature"] = val;
		
		document.getElementById("natureSelect2").setAttribute("data-val",val);
		document.getElementById("natureSelect2").options.length=0;
		document.getElementById("natureSelect2").options.add(new Option("性质详情",""));
		getCCOC(document.getElementById("natureSelect2"));
		
		document.getElementById("nature2").setAttribute("value",0);

		document.getElementById("postSelect").setAttribute("data-val",0);
		document.getElementById("postSelect").options.length=0;
		document.getElementById("postSelect").options.add(new Option("请选择职务",""));
		document.getElementById("post").setAttribute("value",0);
	}
	else if(id == "natureSelect2"){
		document.getElementById("postSelect").setAttribute("data-val",optionList["CCOC"][key][val].bz2);
		document.getElementById("postSelect").options.length=0;
		document.getElementById("postSelect").options.add(new Option("请选择职务",""));
		getCCOC(document.getElementById("postSelect"));
		
		document.getElementById("nature2").setAttribute("value",optionList["CCOC"][key][val].secondValue);
		localData["nature2"] = optionList["CCOC"][key][val].secondValue;		
	}
	else if(id=="postSelect"){
		document.getElementById("post").setAttribute("value",optionList["CCOC"][key][val].secondValue);
		localData["post"] = optionList["CCOC"][key][val].secondValue;
		localData["post2"] = optionList["CCOC"][key][val].useageKey;
	}
	localData[id] = [val,obj.options[obj.selectedIndex].text,key];	
}