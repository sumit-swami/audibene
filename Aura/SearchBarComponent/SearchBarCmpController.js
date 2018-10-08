({
    doInit : function(component, event, helper) {
        helper.fetchPickListVal(component, 'Type', 'accType');
    },
        
    searchKeyChange: function(component, event, helper) {
        var myEvent = $A.get("e.c:SearchKeyChange");
        myEvent.setParams({"searchKey": event.target.value});
       // myEvent.fire();
    },
    onPicklistChange: function(component, event, helper) {
        // get the value of select option
      //  alert(event.getSource().get("v.value"));
        var myEvent = $A.get("e.c:SearchKeyChange");
        myEvent.setParams({"searchKey": event.getSource().get("v.value")});
      //  myEvent.fire();
        var filterToSet = false;
        var filtersToSet = false;
        if(event.getSource().get("v.value") != '--- None ---' && event.getSource().get("v.value")){
            filterToSet = true;
			console.log('Reached1'+event.getSource().get("v.value"));            
        if(event.getSource().get("v.value") == 'Customer - Direct'){
            helper.fetchPickListVal(component, 'Industry', 'accIndustry');
            filtersToSet = true;
        }else{
            helper.fetchPickListVal(component, 'AccountSource', 'accSource');
            filtersToSet = false;
        }
        }else{
            console.log('Reached');
            filterToSet = false;
        }        
        component.set("v.filteredOption",filterToSet); 
        component.set("v.filterSetOption",filtersToSet);
        component.set("v.typeFilter",event.getSource().get("v.value"));
        component.set("v.sourceFilter",'');
        component.set("v.industryFilter",'');        
        },
	onPicklistChange1: function(component, event, helper) {
        // get the value of select option
        var myEvent = $A.get("e.c:SearchKeyChange");
        console.log('Reached'+event.getSource());
      //  myEvent.setParams({"searchKey": event.getSource().get("v.value")});
        myEvent.setParams({"searchIndKey": event.getSource().get("v.value")});
        component.set("v.industryFilter",event.getSource().get("v.value"));
        component.set("v.sourceFilter",'');
       // myEvent.fire();        
        },
    onPicklistChange2: function(component, event, helper) {
        // get the value of select option
        var myEvent = $A.get("e.c:SearchKeyChange");
        console.log('Reached'+event.getSource());
      //  myEvent.setParams({"searchKey": event.getSource().get("v.value")});
        myEvent.setParams({"searchSrcKey": event.getSource().get("v.value")});
        component.set("v.sourceFilter",event.getSource().get("v.value"));
        component.set("v.industryFilter",'');
       // myEvent.fire();        
        },
    onFilter : function(component, event, helper){
        var myEvent = $A.get("e.c:SearchKeyChange");
        myEvent.setParams({"searchKey": component.get("v.typeFilter")});
        myEvent.setParams({"searchIndKey": component.get("v.industryFilter")});
        myEvent.setParams({"searchSrcKey": component.get("v.sourceFilter")});
        myEvent.fire();
    }
})