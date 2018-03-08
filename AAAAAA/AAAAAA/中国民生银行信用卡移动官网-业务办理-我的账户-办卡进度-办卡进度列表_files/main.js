$(function() {
    var rootPath = "/fe/";


	$('#headersKeyType').css({
		fontSize:'.525rem'   
	})
    /*************************祝雪涛 start***********************************/
    $('.header2_box').width($('body').width());

    //账单查询密码键盘调整；
    $("#SIPBox1").click(function(){
    	$("#CompleteKeyboard").css('display',none);
    });


    //客服
    var customerService = $('<a></a>').addClass('customer_service  wow elastic-in').attr("data-wow-delay", "1s");
    $('body').append(customerService);
    setTimeout(function(){
    	$('.customer_service').click(function(){
    	   Artificial();
    	});
	},1000);

    // 使图标可以拖动
    dialogIcon(".customer_service");

    // 拖动方法
    function dialogIcon(selectElement){
        // 获取节点
        var block = document.querySelector(selectElement);
        var oW,oH;
        // 绑定touchstart事件
        block.addEventListener("touchstart", function(e) {
         var touches = e.touches[0];
         oW = touches.clientX - block.offsetLeft;
         oH = touches.clientY - block.offsetTop;
         //阻止页面的滑动默认事件
         document.addEventListener("touchmove",defaultEvent,false);
         
        },false)
        
        block.addEventListener("touchmove", function(e) {
         var touches = e.touches[0];
         var oLeft = touches.clientX - oW;
         var oTop = touches.clientY - oH;
         if(oLeft < 0) {
          oLeft = 0;
         }else if(oLeft > document.documentElement.clientWidth - block.offsetWidth) {
          oLeft = (document.documentElement.clientWidth - block.offsetWidth);
         }

         if(oTop < 0) {
          oTop = 0;
         }else if(oTop > document.documentElement.clientHeight - block.offsetHeight) {
          oTop = (document.documentElement.clientHeight - block.offsetHeight);
         }

         block.style.left = oLeft + "px";
         block.style.top = oTop + "px";
        },false);
         
        block.addEventListener("touchend",function() {
         document.removeEventListener("touchmove",defaultEvent,false);
        },false);

        function defaultEvent(e) {
         e.preventDefault();
        };
    };



    $(document).on('touchmove', function() {
        var top = $('body').scrollTop();
        var n = top / 100;
        if (top > 20) {
            $('.header_box').addClass('header2_box');
            $('.header_box .logo1').addClass('header2_logo1');
            $('.header_box .logo2').addClass('header2_logo2');
            $('.header_box .header_border').addClass('header2_border');
            $('.header_box .header_position').addClass('showBlack').removeClass('header_position');
            $('.header_box .header_input_box input.input_seach').addClass('grayBg');
        } else {
            $('.header_box').removeClass('header2_box');
            $('.header_box .logo1').removeClass('header2_logo1');
            $('.header_box .logo2').removeClass('header2_logo2');
            $('.header_box .header_border').removeClass('header2_border');
            $('.header_box .showBlack').addClass('header_position').removeClass('showBlack');
            $('.header_box .header_input_box input.input_seach').removeClass('grayBg');
        }
    });



    var N = 0;
    var n = 115 / 80;
    var $li = $('.journalism_ul .Journalism_ul_li2');
    var $li2 = $('.journalism_ul2 .Journalism_ul_li3');

    $('.footer_last_btn').click(function() {
        $('body').scrollTop(0);
        return false;
    });


    $('.screen_content_box_div_li').click(function() {
        $(this).toggleClass('screen_content_box_div_li_active');
        $(this).find('i').toggleClass('screen_content_box_div_li_i');
    });

    $('.screen').click(function() {

        $('.screen_content_box').toggleClass('screen_content_box_show');
        var H = $('.screen_content_box').height();
        $('.yo-modal').css("height", H + 35);

        $('.yo-modal').toggleClass('yo_modal_show');
    });
    $('.dicount_box_btn .dicount_btn').each(function(index) {
        $('.dicount_box_btn .dicount_btn').eq(index).click(function() {
            $(this).addClass('dicount_btn_show').siblings().removeClass('dicount_btn_show');
            $('.dicount_box_div').eq(index).addClass('dicount_box_div_show').siblings().removeClass('dicount_box_div_show');
            $('.ex_merchant_tab_box .yo_list').eq(index).addClass('yo-list-show').siblings().removeClass('yo-list-show');

        });
    });
    $('.ex_merchant_btn').each(function(index) {
        $('.ex_merchant_btn').eq(index).click(function() {
            $('.delicious_content_box').eq(index).addClass('delicious_content_box_show').siblings().removeClass('delicious_content_box_show');

        });
    });
    $('.btn_box .btn1').click(function() {
        $('.screen_content_box_div_li').each(function(index) {
            $('.screen_content_box_div_li').eq(index).removeClass('screen_content_box_div_li_active').find('i').removeClass('screen_content_box_div_li_i');
        });
    });
    $('.btn_box .btn2').click(function() {
        $('.screen_content_box').removeClass('screen_content_box_show');
        $('.yo-modal').removeClass('yo_modal_show');
    });
    $('.discount_delicious_nav .discount_delicious_div1').each(function(index) {

        $('.discount_delicious_nav .discount_delicious_div1').eq(index).click(function() {


            if (!$('.discount_delicious_click_content').eq(index).hasClass('discount_delicious_click_content_show')) {
                $('.discount_delicious_click_content').eq(index).addClass('discount_delicious_click_content_show').siblings().removeClass('discount_delicious_click_content_show');
                $('.discount_delicious_nav .discount_delicious_div1').find('i').removeClass('discount_delicious_div1_i_show');
                $(this).find('i').addClass('discount_delicious_div1_i_show');
                $('.yo-modal').addClass('yo_modal_show');

            } else {
                $('.discount_delicious_click_content').eq(index).removeClass('discount_delicious_click_content_show');
                $('.discount_delicious_nav .discount_delicious_div1').find('i').removeClass('discount_delicious_div1_i_show');
                $('.yo-modal').removeClass('yo_modal_show');
            }

        });
    });
    $('.discount_delicious_click_content').on('touchmove', function(evtnt) {
        event.preventDefault();
    });
    $('.business_district_tab_box  .delicious_content_ul1_li').each(function(index) {
        $('.business_district_tab_box .delicious_content_ul1_li').eq(index).on('touchstart', function() {
            $(this).addClass('delicious_content_ul1_li_show').siblings().removeClass('delicious_content_ul1_li_show');
            $('.business_district_tab_box2 .delicious_content_ul').eq(index).addClass('delicious_content_box_ul2_show').siblings().removeClass('delicious_content_box_ul2_show');
        });
    });

    $('.business_district_tab_box01  .delicious_content_ul1_li').each(function(index) {
        $('.business_district_tab_box01 .delicious_content_ul1_li').eq(index).on('touchstart', function() {
            $(this).addClass('delicious_content_ul1_li_show').siblings().removeClass('delicious_content_ul1_li_show');
            $('.business_district_tab_box02 .delicious_content_ul').eq(index).addClass('delicious_content_box_ul2_show').siblings().removeClass('delicious_content_box_ul2_show');
        });
    });
    $('.business_district_tab_box_01  .delicious_content_ul1_li').each(function(index) {
        $('.business_district_tab_box_01 .delicious_content_ul1_li').eq(index).on('touchstart', function() {
            $(this).addClass('delicious_content_ul1_li_show').siblings().removeClass('delicious_content_ul1_li_show');
            $('.business_district_tab_box_02 .delicious_content_ul').eq(index).addClass('delicious_content_box_ul2_show').siblings().removeClass('delicious_content_box_ul2_show');
        });
    });
    $('.application_button_lable_a').click(function() {
        $('.app_yo_modal').show();
        $('.application_modal_box').addClass('application_modal_box_show');
        var myScroll = new IScroll('#application_modal', {
            mouseWheel: true,
            scrollbars: true
        });
    });
    $('.application_modal_box_header_i').click(function() {
        $('.app_yo_modal').hide();
        $('.application_modal_box').removeClass('application_modal_box_show');
    });


    // 我的支付中点击效果
    var downIcon2 = "&#xf033;"; //点击之前 
    var upIcon2 = "&#xf029;"; //点击之后 
    $('.bill_changeState').click(function() {
        $(this).next().toggleClass('show').parent().siblings().find('.showList').removeClass('show');
        if (!$(this).find('i.yo-ico').hasClass('changeIcon')) {
            $('i.yo-ico').removeClass('changeIcon').html(downIcon2);
            $(this).find('i.yo-ico').addClass('changeIcon').html(upIcon2).css('color', '#0088ed');
        } else {
            $('i.yo-ico').removeClass('changeIcon').html(downIcon2).css('color', '#0088ed');
        }
    });


    //$('.bill_two_tab').each(function(index) {
        //$('.bill_two_tab').eq(index).click(function() {
            //$(this).addClass('bill_two_tab_show').siblings().removeClass('bill_two_tab_show');
            //$('.bill_content_box').eq(index).addClass('bill_content_box_show').siblings().removeClass('bill_content_box_show');
        //});
    //});   
    /*************************祝雪涛 ent***********************************/

    /*************************张帆 start***********************************/
    /**选项卡**/
    $(".detailtabcont .detailtabconttit .item").on("tap", function() {
            $(this).addClass("item-on").siblings().removeClass("item-on");
            $(".detailtabcont .detailtabcontnew").eq($(this).index()).addClass("detailtabcontnewblock").siblings().removeClass("detailtabcontnewblock")
        })
        /**选项卡2**/
    $(".swiperselectcard .cardrankswiper .swiper-wrapper .swiper-slide").on("tap", function() {
        $(this).addClass("swiperborderblue").siblings().removeClass("swiperborderblue");
        $(".swiperselectcard .cardrankcont").eq($(this).index()).addClass("cardrankcontblock").siblings().removeClass("cardrankcontblock")
    })

    //1月10号的js
    /**弹窗**/
    $(".detailandbutcot4a1").on("tap", function() {
        $("article").scrollTop(0);
        $(".freeaccountshadelc").addClass("freeaccountshadeshow");
    })
    $(".detailandbutcot4a2").on("tap", function() {
        $("article").scrollTop(0);
        $(".freeaccountshadeyuxz").addClass("freeaccountshadeshow");
    })

    $(".shadestagestitle").on("tap", function() {
        $(this).parent().parent().removeClass("freeaccountshadeshow");
    })

    $(".outsidecashbut").on("tap", function() {
        $(this).parent().parent().removeClass("freeaccountshadeshow");
    })
    $('*[data-url]').each(function() {
        $(this).click(function() {
            window.location.href = $(this).attr("data-url");
        })
    });

    /****新页面****/
    var newpage = 0;
    var newpageval = $(".pagexchangeflexnum .input").val();
    $(".pagexchangeflexnum .minus").on("tap", function() {
        var newpageval2 = $(".pagexchangeflexnum .input").val();
        newpageval2--;
        if (newpageval2 < 0) {
            return false;
        }
        $(".pagexchangeflexnum .input").val(newpageval2)

    })
    $(".pagexchangeflexnum .plus").on("tap", function() {
        var newpageval2 = $(".pagexchangeflexnum .input").val();
        newpageval2++;
        if (newpageval2 > 0) {
            $(".pagexchangeflexnum .input").val(newpageval2)
        }
    })

    /****修改后js**/
    $(".mylibertyposcont").each(function() {
        $(this).on("tap", function() {
            $(this).find("i").toggleClass("rotetelibert").parents(".myliberty").siblings().find(".mylibertyposcont i").removeClass("rotetelibert");
            $(this).parent().parent().siblings(".mylibertycontsel").toggle().parent().siblings().find(".mylibertycontsel").hide()
        })
    })


    /*************************张帆 end***********************************/


    /*********** 李杰 Start **********/
    // 汽车分期01切换效果
    $('.quickEntrance li').each(function(index) {
        $('.quickEntrance li').eq(index).click(function() {
            $('.carByStagesOne ul.quickEntrance li').find('a').removeClass('active');
            $(this).find('a').addClass('active');
            $('.carByStages_list').eq(index).addClass('show').siblings().removeClass('show');
        });
    });

    //悦享服务中的点击效果
    $('.quickEntrance li').each(function(index) {
        $('.quickEntrance li').eq(index).click(function() {
            $('.leshareService ul.quickEntrance li').find('a').removeClass('active');
            $(this).find('a').addClass('active');
            $('.carByStages_list').eq(index).addClass('show').siblings().removeClass('show');
        });
    });

    // 我的支付中点击效果
    var downIcon = "&#xf2ae;";
    var upIcon = "&#xf2ad;";
    $('.item a.changeState').each(function(index) {
        $(this).click(function() {
            $(this).next().toggleClass('show').parent().siblings().find('.showList').removeClass('show');
            if (!$(this).find('i.yo-ico').hasClass('changeIcon')) {
                $('i.yo-ico').removeClass('changeIcon').html(downIcon);
                $(this).find('i.yo-ico').addClass('changeIcon').html(upIcon).css('color', '#0088ed');
            } else {
                $('i.yo-ico').removeClass('changeIcon').html(downIcon).css('color', '#333333');
            }
        });
    });

    //标签之间的切换效果
    $('.swiper-wrapper .swiper-slide').each(function(index) {
        $('.swiper-wrapper .swiper-slide').eq(index).click(function(even) {
            var topScroll = $('.block').eq(index).offset();
            var topHeight = $('.content_position').height();
            $(this).addClass('active').siblings().removeClass('active');
            var ObjWidth = $('.header').width();
            var leftValue = getLeft(index);
            console.log(leftValue);
            $('.swiper-wrappernew').css('transform', 'translate3d(-' + leftValue + 'px,0px,0px)')
        });
    });

    function getLeft(i) {
        var leftValue = 0;
        $('.swiper-wrapper .swiper-slide').each(function(index, item) {
            if (index < i) {
                leftValue += $(this).width();
            }
        });
        var leftV = $('.swiper-wrapper .swiper-slide').eq(i).width() / 2;
        if (i == 0) return 0;
        return leftValue - leftV;
    };

    //其他支付页面标签切换
    $('.selectTab a').each(function(index) {
        $(this).click(function() {
            $(this).addClass('active').siblings().removeClass('active');
            $('.yo_list_content').eq(index).addClass('showContent').siblings().removeClass('showContent');
        });
    });

    // 客户服务页面中的切换
    $('.customerService .nav ul li a.current').each(function(index) {
        $(this).click(function() {
            $('.myKnowledgeBase').css('display', 'block');
            $('.childPage').css('display', 'none');
            $('.customerService .nav ul li').eq(index).addClass('selected').siblings().removeClass('selected');
            $('.customerService .yo-list-group').eq(index).addClass('showContent').siblings().removeClass('showContent');
        });
    });
    $('.myKnowledgeBase table tbody tr td a.checked').each(function(index){
            $(this).click(function(){
                $('.childPage').eq(index).css({ "display": "block", "marginTop": "-.5rem", "z-index": "9999" }).siblings('.childPage').css({ "display": "none", "marginTop": "-.5rem", "z-index": "9999" });
                $('.myKnowledgeBase').css('display', 'none');
            });
        });


    /*********** 李杰 End **********/
   
  
});
