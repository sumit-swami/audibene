({
	findByName: function(component,event) {  
    var searchKey = event.getParam("searchKey");
    var searchIndKey = event.getParam("searchIndKey");
    var searchSrcKey = event.getParam("searchSrcKey");
    var accList = component.get("v.accounts");
    var action = component.get("c.findByName");
    action.setParams({
      "searchKey": searchKey,
      "searchIndKey": searchIndKey,
      "searchSrcKey": searchSrcKey,  
      "accList" : accList
    }); 
    action.setCallback(this, function(a) {
        component.set("v.mydata", a.getReturnValue());
        component.set("v.accountsLength", a.getReturnValue().length); 
    });
    $A.enqueueAction(action);}
})