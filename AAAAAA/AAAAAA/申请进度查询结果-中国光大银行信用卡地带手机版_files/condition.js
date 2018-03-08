function convertConditionPattern(formid){
   //alert("here");
   prefix ="condition";
   var inputfields = $$('#'+formid+' input');
   var selects = $$('#'+formid+' select');
   inputfields.each(function(input){
       newname="";
       fieldtype = input.get("contype");
       pattern = input.get("conpattern");
       fieldname = input.get("id");
       fieldvalue = input.get("value");
       if(fieldtype!=null){
       
       newname= prefix+"-"+fieldname+"-"+fieldtype+"-"+pattern;
       //input.set("name",newname);
       //alert(input.get('name'));
       var pageHtml = new Element('input',{'type':'hidden','name':newname,'value':fieldvalue});
       pageHtml.inject($(formid))
       }
   
   
   
   });
   
   selects.each(function(select){
       fieldtype = select.get("contype");
       pattern = select.get("conpattern");
       fieldname = select.get("id");
       fieldvalue = select.get("value");
       if(fieldtype!=null){    
    	newname = prefix+"-"+fieldname+"-"+fieldtype+"-"+pattern;
        //select.set("name",prefix+"-"+fieldname+"-"+fieldtype+"-"+pattern);    
        var pageHtml = new Element('input',{'type':'hidden','name':newname,'value':fieldvalue});
        pageHtml.inject($(formid))
      }
   
   });

}

function initConditionParam(conditionParamHash){
   
   conditionParamHash.each(function(value,key){
     $(key).set('value',value);
   
   
   });


}
