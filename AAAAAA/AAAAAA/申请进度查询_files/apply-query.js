$.fn.countTime = function (second, callback) {
    var time = second || 119;
    var timer = setInterval(function () {
        callback && callback(time--);
        if (time < 0 ) {
        	clearInterval(timer);
        	time = second;
        }
    }, 1000);
}
$(function () {
	var 
		// 有没有发送短信验证码
		msgcodeSended = false;

	// 身份证输入合法控制
    $("#idcardno").on("input paste", function () {
		var value = $(this).val();
        $(this).val(value.replace(/[^0-9a-zA-Z]+/g, ''));
    });

	
	// 手机号输入合法控制
    $("#mobilephone").on("input paste", function () {

        var value = $(this).val(),
			reg = /^[1-9][0-9]{1,10}$/;

		if (!reg.test(value)) {
			$(this).val(value.replace(/[^0-9]+/g, ''));
		} 
    });

	// 短信验证码输入合法控制
    $("#msgcode").on("input paste", function () {

        var value = $(this).val(),
			reg = /^[1-9][0-9]{1,5}$/;

		if (!reg.test(value)) {
			$(this).val(value.replace(/[^0-9]+/g, ''));
		} 
    });

	// 提示信息
	function showTip(tip) {
		$("#showtip .text-warning").text(tip);
		$("#showtip").removeClass('none');
	}

	// 检查输入为空
	function checkInputNull() {
		if ($("#idcardno").val() === '') {
			showTip("证件号不能为空");
			return false
		}

		if ($("#mobilephone").val() === '') {
			showTip("手机号码不能为空");
			return false
		}

		return true;
	}

	// 生成列表
	function renderData(resXmlDoc) {
		var cardArr = '';
		var cards = $("cardInfoSet", resXmlDoc);
		$.each(cards, function(i, item) {
			var status = $(item).attr("app_proc_status");
			if(status == '1') {

				cardArr += '<li>' +
				             '<section class="content">' + 
							   '<p class="t">' + $(item).attr("app_card_desc") + 
							     ' <i class="check pass">正在审核中</i>' + 
							   '</p>' + 
							   '<p class="date">申请日期&nbsp;&nbsp;&nbsp;' + $(item).attr("rcv_date") + '</p>' + 
							 '</section>' +
							 '<p class="ex">从申请日起，7-15个工作日出审核结果</p>' +  
						   '</li>'

			} else if(status == '2') {
			
				cardArr += '<li>' +
				             '<section class="content">' + 
							   '<p class="t">' + $(item).attr("app_card_desc") + 
							     ' <i class="check pass">审核通过</i>' + 
							   '</p>' + 
							   '<p class="date">申请日期&nbsp;&nbsp;&nbsp;' + $(item).attr("rcv_date") + '</p>' + 
							 '</section>' +
							 '<p class="ex">我们会尽快以短信形式通知面签时间与网点</p>' +  
						   '</li>'

			} else if(status == '3') {
				
				cardArr += '<li>' +
				             '<section class="content">' + 
							   '<p class="t">' + $(item).attr("app_card_desc") + 
							     ' <i class="check nopass">审核未通过</i>' + 
							   '</p>' + 
							   '<p class="date">申请日期&nbsp;&nbsp;&nbsp;' + $(item).attr("rcv_date") + '</p>' + 
							 '</section>' +
							 '<p class="ex">感谢您对中信信用卡的支持</p>' +  
						   '</li>'
			}
		});
		$(".check-lists ul").html(cardArr);
		$(".check-lists").removeClass('none');
	}

	// 发送短信验证码
	$('.msg-code').on('click', function () {
		var _this = this;

		if (!checkInputNull()) {
			return false;
		}

		if (!$(_this).hasClass('msg-code-click')) {
			$.ajax( {
				type : 'POST',
				url: "/citiccard/wap/bind/login.do",
				data: {
				    "func":"sendMsg",
					"mobile": $("#mobilephone").val(),
					"id_nbr": $("#idcardno").val()
				},
				dataType: "xml",
				beforeSend: function () {
					$("#loading").removeClass('none')
				},
				complete: function () {
					$("#loading").addClass('none')
				},
				success: function(data) {
					var returninfo = $("returninfo", data);
					if(returninfo.attr("retcode") == "0"){       
						msgcodeSended = true;
						$(_this).addClass('msg-code-click').text('120s后重发');
						$('.msg-code').countTime(119, function (time) {
							$(this).text(time + 's后重发');
							if (!time) {
								$(this).removeClass('msg-code-click').text('重新获取');
							}
						}.bind(_this));
					} else if(returninfo.attr("retcode") == "1"){
						showTip(returninfo.attr("message"));				
					}  else {				
						showTip("系统错误,请联系中信银行信用卡客服!");	
					}
				},
				error: function() {	
					showTip("系统错误,请联系中信银行信用卡客服!");
				}
			});			
		}
	});

	// 申请进度查询请求
	$("#querybtn").on('click', function () {
		if (!checkInputNull()) {
			return false;
		}

		if ($("#msgcode").val() === '') {
			showTip("验证码不能为空");
			return false
		}

		$.ajax({
			type: "get",
			url: "/citiccard/wap/bind/login.do",
			data: "func=queryCardAppInfo&id_nbr=" + $("#idcardno").val() + "&msg_code=" + $("#msgcode").val(),
			beforeSend: function () {
				$("#loading").removeClass('none')
			},
			complete: function () {
				$("#loading").addClass('none')
			},
			success: function(data){
				var resXmlDoc = $(data);
				var rtnInfo = $("returninfo", resXmlDoc);
				if (rtnInfo.attr("retcode") == "0") {
					renderData(resXmlDoc);	 
					$("#querybtn").addClass("com-btn-disabled").unbind("click"); 
				} else if(rtnInfo.attr("retcode") == "0000001"){
					showTip(rtnInfo.attr("message"));
				} else {
					showTip(rtnInfo.attr("message") || "系统错误,请联系中信银行信用卡客服!");
				}
			},
			error: function(xhq, textstatus, e) {
				showTip("系统错误,请联系中信银行信用卡客服!");
			}
		});
	})
})