//显示动态浮动提示函数
var tipHash = new Hash({
		position: 'right',
		fixed: false,
		center: true,
		content: 'rel',
		/*html: false,*/
		balloon: true,
		arrowSize: 6,
		arrowOffset: 6,
		distance: 10,
		motion: 6,
		motionOnShow: false,
		motionOnHide: false,
		showOn: 'mouseenter',
		hideOn: 'mouseleave',
		showDelay: 0,
		hideDelay: 0,
		className: 'floating-tip',
		offset: { x: 0, y: 0 },
		fx: { 'duration': 'short' }
});

		function showTip(elem,hash,content,containerid){
		   var oldtip =   elem.retrieve('floatingtip');
		   if(oldtip!=null)
		   oldtip.dispose(); 
		   var tip = createTip(elem,hash,content,containerid);
		 
		}
		function hideTip(elem,hash){
		  var tip =  elem.retrieve('floatingtip');	    
			if(tip!=null){
			  tip.dispose();
		  }
		}

	function createTip(elem,hash,content,containerid){
		var o = hash;
		var oc = o.content;
		var opos = o.position;
		/*
		if (oc == 'title') {
			oc = 'floatingtitle';
			if (!elem.get('floatingtitle')) elem.setProperty('floatingtitle', elem.get('title'));
			elem.set('title', '');
		}
	
		var cnt = (typeof(oc) == 'string' ? elem.get(oc) : oc(elem)); */
		var cwr = new Element('div').addClass(o.className).setStyle('margin', 0);
		
		cwr.setStyle('z-index',99);
		var tip = new Element('div').addClass(o.className + '-wrapper').setStyles({ 'margin': 0, 'padding': 0, 'z-index': cwr.getStyle('z-index') }).adopt(cwr);
		cwr.set('text', content);
		/*
		if (cnt) { 
			if (o.html) {
				if (o.html_adopt) cwr.adopt(cnt);
				else cwr.set('html', typeof(cnt) == 'string' ? cnt : cnt.get('html'));
			} else {
				cwr.set('text', cnt); 
			}
		} else { 
			return null;
		} */
		
		var body = $(containerid);
		tip.setStyles({ 'position': (o.fixed ? 'fixed' : 'absolute'), 'opacity': 0, 'top': 0, 'left': 0 }).inject(body);
		if (o.balloon && !Browser.ie6) {
			
			var trg = new Element('div').addClass(o.className + '-triangle').setStyles({ 'margin': 0, 'padding': 0 });
			var trgSt = { 'border-color': cwr.getStyle('background-color'), 'border-width': o.arrowSize, 'border-style': 'solid','width': 0, 'height': 0 };
			
			switch (opos) {
				case 'inside': 
				case 'top'   : trgSt['border-bottom-width'] = 0; break;
				case 'right' : trgSt['border-left-width'  ] = 0; trgSt['float'] = 'left'; cwr.setStyle('margin-left', o.arrowSize); break;
				case 'bottom': trgSt['border-top-width'   ] = 0; break;
				case 'left'  : trgSt['border-right-width' ] = 0; 
					if (Browser.ie7) { trgSt['position'] = 'absolute'; trgSt['right'] = 0; } else { trgSt['float'] = 'right'; }
					cwr.setStyle('margin-right', o.arrowSize); break;
			}
			
			switch (opos) {
				case 'inside': case 'top': case 'bottom': 
					trgSt['border-left-color'] = trgSt['border-right-color'] = 'transparent';
					trgSt['margin-left'] = o.center ? tip.getSize().x / 2 - o.arrowSize : o.arrowOffset; break;
				case 'left': case 'right': 
					trgSt['border-top-color'] = trgSt['border-bottom-color'] = 'transparent';
					trgSt['margin-top'] = o.center ?  tip.getSize().y / 2 - o.arrowSize : o.arrowOffset; break;
			}
			trg.setStyles(trgSt).inject(tip, (opos == 'top' || opos == 'inside') ? 'bottom' : 'top');
			
		}
		
		var tipSz = tip.getSize(), trgC = elem.getCoordinates();
		var offsetOption = ('function' === typeof(o.offset) ? Object.merge({ x: 0, y: 0 }, o.offset(elem)) : o.offset);
		var pos = { x: trgC.left + offsetOption.x, y: trgC.top + offsetOption.y };
		
		if (opos == 'inside') {
			tip.setStyles({ 'width': tip.getStyle('width'), 'height': tip.getStyle('height') });
			elem.setStyle('position', 'relative').adopt(tip);
			pos = { x: o.offset.x, y: o.offset.y };
		} else {
			switch (opos) {
				case 'top'   :  pos.y -= tipSz.y + o.distance; break;
				case 'right' :  pos.x += trgC.width + o.distance; break;
				case 'bottom':  pos.y += trgC.height + o.distance; break;
				case 'left'  :  pos.x -= tipSz.x + o.distance; break;
			}
		}
		if (o.center) {
			switch (opos) {
				case 'top' : case 'bottom': pos.x += (trgC.width / 2 - tipSz.x / 2); break;
				case 'left': case 'right' : pos.y += (trgC.height / 2 - tipSz.y / 2); break;
				case 'inside':
					pos.x += (trgC.width / 2 - tipSz.x / 2);
					pos.y += (trgC.height / 2 - tipSz.y / 2); break;
			}
		}
		tip.set('morph', o.fx).store('position', pos);
		tip.setStyles({ 'top': pos.y, 'left': pos.x });
		
		tip.setStyle('opacity',1);
		//alert(tip.get('html'));
		elem.store('floatingtip', tip);
		//alert(tip);
		return tip;
	}
 //表单校验函数
  var validateHash= new Hash({
  kkk: {regex:/^[A-Za-z0-9_]+$/,msg:'须由数字与字母组成'},
	Require : {regex:/.+/,msg:'不能为空'},
	Require1 :{regex: /^[0-9]*[1-9][0-9]*$/,msg:'为必输'},
	RequireSelect : {regex:/.+/,msg:'中须选择一项'},
	Email : {regex:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,msg:'不是有效EMAIL地址'},
//	Phone : /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,
	Phone : {regex:/^\d+(\-\d+)?$/,msg:'不是有效电话号码'},
	Mobile :{regex:/^(1[3|5|8])\d{9}$/,msg:'不是有效手机号码'},
	Url : {regex:/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,msg:'不是有效URL'},
	
	Currency : {regex:/^\d{1,13}((\.+?)(\d{1,2})|)$/,msg:'不是有效金额类型'},
	Percent1: {regex:/^(0(\.\d{1,7})?|1(\.0{1,7})?)$/,msg:'不是有效百分比'},
	Percent: {regex:/^\d{1,3}((\.+?)(\d{1,2})|)$/,msg:'不是有效百分比'},	 
	Number : {regex:/^\d+$/,msg:'不是有效数字'},
	Zip : {regex:/^[1-9]\d{5}$/,msg:'不是有效邮编'},
	QQ : {regex:/^[1-9]\d{4,8}$/,msg:'不是有效QQ号'},
	money :{regex:/^\d{1,13}(\.\d{0,2})?$/,msg:'不是有效金额类型'},
	Integer : {regex:/^[-\+]?\d+$/,msg:'不是有效整数类型'},
	Integer1 :{regex:/^[\+]?\d+$/,msg:'不是有效整数类型'},
	Double : {regex:/^[-\+]?\d+(\.\d+)?$/,msg:'不是有效浮点数'},
	Double1 :{regex:/^[\+]?\d+(\.\d+)?$/, msg:'不是有效浮点数'},
	English : {regex:/^[A-Za-z1-9]+$/,msg:'含有非英文内容'},
    Chinese : {regex:/^[\u0391-\uFFE5]+$/,msg:'含有非中文内容'},
    Username : {regex:/^[a-z]\w{3,}$/i,msg:'输入有效用户名'},
	NormalInput:{regex:/^[^\'\"]{1,}$/,msg:'输入含有非法字符'},
	NormalInput1 : {regex:/^[^\'\"\-\_\~\!\#\$\%\^\&\*\.\(\)\[\]\{\}\<\>\?\\\/\￥\，\。\；\！\【\】\？\—\（\）\：\‘\’\“\”\《\》\|\、\……]{1,}$/,msg:'含有非法字符'},
	//前台基金收益-----------------------------开始
	float_10_2:{regex:/^\d{1,10}(\.\d{1,2})?$/,msg:'不是有效数值'},
	int_4: {regex:/^\d{1,4}$/,msg:'不是有效数值'},
	int_2:{regex:/^\d{1,2}$/,msg:'不是有效数值'},
	float_3_2:{regex:/^\d{1,3}(\.\d{1,2})?$/,msg:'不是有效数值'},
	//前台基金收益-----------------------------结束
	//贷款还款计划计算器------------------------开始
	float_15_2:{regex:/^\d{1,15}(\.\d{1,2})?$/,msg:'不是有效数值'},
	float_15_5:{regex:/^\d{1,15}(\.\d{1,5})?$/,msg:'不是有效数值'},
	int_8:{regex:/^\d{1,8}$/,msg:'不是有效金额数值'},
	int_4:{regex:/^\d{1,4}$/,msg:'不是有效数值'},
	//贷款还款计划计算器------------------------结束
    IdCard :{functionValid:'Y'},
	Filter :{functionValid:'Y'},
	Limit : {functionValid:'Y'},
	LimitB :{functionValid:'Y'},
	Date :  {functionValid:'Y'},
	Range : {functionValid:'Y'},
	Repeat :{functionValid:'Y'},
	Range : {funcitonValid:'Y'}

});


 function processValidationBlurEvent(formid){

   var textFields = $$('#'+formid+' select','#'+formid+' input[type=text]','#'+formid+' textarea','#'+formid+' input[type=password]');
    textFields.each(function(textField){
    
		
       if(textField.get('dataType')!=null){
       textField.addEvent('blur',function(){
        var msgcontent =  validateInputField(textField);
	      
		    if(msgcontent!=null&& msgcontent!=''){
		    	 showTip(textField,tipHash,msgcontent,formid);
		    }else{
		       hideTip(textField,tipHash);
		    }
	      });
       }
    }); 
 }
function validSubmitForm(formid){
	var fields = $$('#'+formid+' select','#'+formid+' input[type=text]','#'+formid+' textarea','#'+formid+' input[type=password]');
	var errorMap = new Hash({});
	fields.each(function(field){

		if(field.get('dataType')!=null){
			//alert(field);
			var msgcontent =  validateInputField(field);
			//alert(field);
			//alert($(formid).get('html'));
			if(msgcontent!=null&& msgcontent!=''){
				showTip(field,tipHash,msgcontent,formid);
				errorMap.set(field.get('id'),msgcontent);
			}else{
				hideTip(field,tipHash);
			}
		}
	}); 
	if(errorMap.getLength()!=0){
	    return false;
	}else{
	    return true;
	   }
}


 function validateInputField(input_field){
 	  if(input_field.get('dataType')!=null){
    	  //alert('中文测试');
    	  dataTypeStr = input_field.get('dataType');
    	
    	  datavalue = trim(input_field.get('value'));
    	
    	  if(!dataTypeStr.contains('Require')&&datavalue.length==0)
    	   return "";
      	var chktypes  = dataTypeStr.split('|');
      	for(i=0;i<chktypes.length;i++){
      	valueObj = validateHash.get(chktypes[i]);
	      	if(valueObj.regex!=null){
	      	 if(input_field.get('exttype')==null){	
	      		if(!valueObj.regex.test(input_field.get('value'))){
	      			//alert(unescape(valueObj.msg));
	      			msgcontent = input_field.get('title')+valueObj.msg;	      	
	      			return msgcontent;
	      		}
	      	 }
	      	 /*
	      	 else{
	      	 	
	      	 	if(!valueObj.regex.test(datavalue)){
	      			//alert(unescape(valueObj.msg));
	      			alert(input_field);
	      			msgcontent = input_field.get('title')+valueObj.msg;	      	
	      			return msgcontent;
	      		}
	      	 	
	      	 	}*/
	      		
	      	}else if(valueObj.functionValid=='Y'){
	      		if(chktypes[i]=='Limit'){
	      			msgcontent =Limit(input_field);
	      		 if(msgcontent!=null&& msgcontent!=''){	      		  	
	      			msgcontent = input_field.get('title')+Limit(input_field);	      	
	      			return msgcontent;
	      		}
	      			else
	      			 return "";	      			
	      	  }
	      	  else if(chktypes[i]=='LimitB'){
	      	  	msgcontent =LimitB(input_field);
	      	  	if(msgcontent!=null&& msgcontent!=''){
	      	  	msgcontent = input_field.get('title')+LimitB(input_field);	
	      	  	return msgcontent;
	      	    }else
	      	    	return "";
	      	  }
	      	  else if(chktypes[i]=='Filter'){
	      	    msgcontent =doFilter(input_field);
	      	  	if(msgcontent!=null&& msgcontent!=''){
	      	  	msgcontent = input_field.get('title')+msgcontent;	
	      	  	return msgcontent;
	      	    }else
	      	    	return "";
	      	  }
	      	}
    	}
    	return "";
    }
 function trim(s) {
	    var i;
	    for(i = 0; i < s.length && s.charCodeAt(i) == 32; i++);
	    s = s.substring(i,s.length);
	    for(i=s.length-1;i>=0&&s.charCodeAt(i)==32;i--);
	    s = s.substring(0,i+1);
	    return s;
  }
    return "";
 }
 
 function Limit(elem){
 	  maxval = elem.get('max');
 	  minval = elem.get('min');
 	  minval = minval || 0;
		maxval = maxval || Number.MAX_VALUE;
		len = elem.get('value').length;
		if(len >=minval && len <= maxval){
			return "";		  	
		}else{
		    if(len<minval || len>maxval)
			return "字段输入有误，长度应为"+minval;
			if(len<minval)
			return "字段长度应大于"+minval;
			if(len>maxval)
			return "字段长度小于"+maxval;	
		}
 	}
 	function LimitB(elem){
 	  maxval = elem.get('max');
 	  minval = elem.get('min');
 	  minval = minval || 0;
		maxval = maxval || Number.MAX_VALUE;
		len = LenB(elem.get('value'));
		if(len >=minval && len <= maxval){
			return "";		  	
		}else{
			if(len<minval)
			return "字段长度应大于"+minval;
			if(len>maxval)
			return "字段长度小于"+maxval;	
		}
 	}
 	function doFilter(elem){
 		 filter = elem.get('accept');
 		 valid = new RegExp("^.+\.(?=EXT)(EXT)$".replace(/EXT/g, filter.split(/\s*,\s*/).join("|")), "gi").test(elem.get('value'));
 		if(!valid){
 		  return "文件类型不支持";	
 		}
 		return "";
 	}
 	function LenB(str){
 	 return str.replace(/[^\x00-\xff]/g,"**").length;	
 	}
