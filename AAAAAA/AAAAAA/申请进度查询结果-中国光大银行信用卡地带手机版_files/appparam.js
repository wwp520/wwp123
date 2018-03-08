function getParam_Data(urlstr,paramtype,fns){
    
    var ajaxRequest = new Request({
	 url: urlstr,
     data:{
		   para_type:paramtype	  
		 
	  },
	 onSuccess: function(response){
	   var param_map = new Hash({}); 
	   var params =  response.split("|");
	     params.each(function(param){
		 var contentarray = param.split(":");
		 code = contentarray[0];
		 val = contentarray[1];
		 //alert(code);
		 if(code!=''){	
		   param_map.set(code,val);		  
		  
		 }	         
       	
		
		})
	   // alert(param_map.getLength());
	  fns.each(function(fn){
	    fn.run(param_map);
	  
	  
	  });
	   
     
	 
	}
	}).send();	
	
  
   

}

