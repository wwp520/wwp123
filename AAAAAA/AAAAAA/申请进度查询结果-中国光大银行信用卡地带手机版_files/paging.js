﻿function formPageingContent(currentPage,totalPage){
         var html="";
     var offset = 2;
     var pagespan =10;
     html=html + "<ul class=\"pager c\">";
    
	 if(currentPage>totalPage||currentPage<1){
			 currentPage=totalPage;
	 }
     if(totalPage>=1){
        pos = currentPage%pagespan;
        totalpos = totalPage%pagespan;

	 if(currentPage>1){
		 html =html +"<li class='next' pageid='item' pageno='"+(1)+"'><a href='#' style='margin-left: 4%;' >首页</a></li>";
         html =html +"<li class='next' pageid='item' pageno='"+(currentPage-1)+"'><a href='#'>上一页</a></li>";
      }else{
 		 html =html +"<li class='next' pageid='item' pageno='"+(1)+"'><a href='#' style='margin-left: 4%;'>首页</a></li>";
         html =html +"<li class='next' pageid='item' pageno='"+(1)+"'><a href='#'>上一页</a></li>"; 
      } 
	 
/*	 if(pos==0)
	 pos=pagespan;
	 
	 if(totalpos!=0&&totalPage-currentPage<pagespan&&totalPage>pagespan){
	   //alert("here");
	   currentoffset = pagespan - totalpos;
	   for(k=totalPage-pagespan+1;k<=totalPage;k++){
	   
		 if(k==currentPage){
		   html= html+"<li class='current' pageid='item' pageno='"+k+"'><a href='#'>"+k;  
		 }else{
		  html= html + "<li pageid='item' pageno='"+k+"'><a href='#'>"+k;  
		 
		 }
              html= html + "</a></li>";
		      
           
           
           }
           
         
         
         
         }
       */
        if(currentPage<totalPage){          
           html =html +"<li class=\"next\" pageid='item' pageno='"+(currentPage+1)+"'><a href='#'>下一页</a></li>" ;  
        }else{
           html =html +"<li class=\"next\" pageid='item' pageno='"+(currentPage)+"'><a href='#'>下一页</a></li>" ;
        }
		if(currentPage<totalPage){          
           html =html +"<li class=\"last\" pageid='item' pageno='"+(totalPage)+"'><a href='#'>末页</a></li>";
        }else{
           html =html +"<li class=\"last\" pageid='item' pageno='"+(totalPage)+"'><a href='#'>末页</a></li>" ;
        }   
       }
       html=html+"</ul>";
      //alert(html);
      $('paging').set('html',html);
}

  function processPagingEvents(formid,totalpage){
     var pagingitems = $$('#paging li[pageid=item]');
     //$(formid).store('pagingitems',pagingitems);
     pagingitems.each(function(pagingitem){
      pagingitem.addEvent('click',function(){
        /*
        var items = $(formid).retrieve('pagingitems');
        items.each(function(item){
        
          if(item.get('class').contains('mun_font')){
            item.set('class','mun_font');
          
          }
        
        
        });
        pagingitem.set('class','mun_font_on');
        */
        var qryCurrentPage = new Element('input',{'type':'hidden','name':'currentpage','value':pagingitem.get('pageno')});     
        var totalPage = new Element('input',{'type':'hidden','name':'totalpage','value':totalpage});
     
       qryCurrentPage.inject($(formid));
       totalPage.inject($(formid));
       
        convertConditionPattern(formid);
    
       $(formid).submit();
      
     
     });
     
     
     
     });
     
     var tobtn = $('topagebtn');
     if(tobtn){
     tobtn.addEvent('click',function(){
     	var topageno_val=$('topageno').get('value');
     	if(!topageno_val.trim().match(/^[1-9]\d*$/g)){
     		alert("请输入数字");
     		return false;
     	}else if(topageno_val>totalpage){
     		alert("请求页数大于总页数");
     		return false;
     	}
        var qryCurrentPage = new Element('input',{'type':'hidden','name':'currentpage','value':$('topageno').get('value')});     
        
        var totalPage = new Element('input',{'type':'hidden','name':'totalpage','value':totalpage});
         qryCurrentPage.inject($(formid));
         totalPage.inject($(formid));       
        convertConditionPattern(formid);
    
        $(formid).submit();
     
     
     
     });
    } 
    
  
  
  }
