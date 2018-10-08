({
	doInit : function(component, event, helper) {
        //Data table columns
        component.set('v.mycolumns', [            
            {label: 'Account Name', fieldName:'nameurl__c', type:'url', typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}},            
            {label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'text'},
	    {label: 'Active', fieldName: 'Active__c', type: 'text'},
            {label: 'Website', fieldName: 'Website', type: 'url'}
        ]);
        
		var action = component.get("c.getAccounts");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue());
                //Tried to modify name field on run time - but doesnt works properly
               /* var records = response.getReturnValue();
                records.forEach(function(record){
                record.linkName = '/'+record.Id;
                });*/
                //Set data and legnth attribute to be displayed
                component.set('v.mydata', response.getReturnValue());
                component.set("v.accountsLength", response.getReturnValue().length);
            }
        });
        
        $A.enqueueAction(action);
	},    
    searchKeyChange : function(component, event, helper){
    //Search accnts   
    helper.findByName(component,event); 
},
 updateSelectedRows : function(component, event, helper) {
     	//Get selected rows
        var selectedRows = event.getParam('selectedRows');        
        var setRows = [];
        for (var i = 0; i < selectedRows.length; i++){           
            setRows.push(selectedRows[i].Id);
        }
        console.log(setRows);
        component.set("v.rowsSelected", event.getParam('selectedRows')); //Set the rowsSelected attribute used to update
    },    
   handleSelect: function (component, event, helper) {
       //Get selected rows
       var obj = component.get("v.rowsSelected");
       console.log('obj '+obj );
	   //Get cntrlr action	        
       var updateAction = component.get("c.updateAccnts1");
       //Set selected rows to be updated
       updateAction.setParams({"accList": obj});
       updateAction.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
               //$A.get('e.force:refreshView').fire();   <-- Lightning experience or Lightning Communities only
               //Set the list        
               component.set('v.mydata', response.getReturnValue());
               //Set Success Message 
               component.set("v.success",true);
               component.set("v.type", 'success');
			   component.set("v.message", 'Completed Successfully!' );
            }else if (response.getState() === "ERROR") {
                    //Set Error Message
     				component.set("v.type", 'error');
                    var errors = response.getError();
                    if (errors) {
                    if (errors[0] && errors[0].message) {
                    component.set("v.message",errors[0].message );
                            }
                    }
                    else {
                    component.set("v.message", 'Request Failed!' );
                    }
                    }              
        });
       $A.enqueueAction(updateAction);
    },
	showSpinner: function(component, event, helper) {
       //Set Spinner 
       component.set("v.Spinner", true); 
   },    
    hideSpinner : function(component,event,helper){
       component.set("v.Spinner", false);
    }    
})