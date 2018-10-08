public class AccountListCtrl{
 @AuraEnabled
 public static List<Account> getAccounts(){     
    List<Account> accList = [Select Id, Name, nameurl__c,Type, active__c, AccountNumber, Website, AccountSource, Site, AnnualRevenue, NumberOfEmployees, Phone, Industry from Account];
    return accList;
 }
 @AuraEnabled
public static List<Account> findByName(String searchKey, String searchIndKey, String searchSrcKey, Account[] accList) {
   Set<Id> recordIds = new Map<Id, Account>(getAccounts()).keySet();
   system.debug('ACCOUNT LIST' + accList);
   system.debug('Searchkey' + searchKey);
   String mainQuery = 'Select Id, Name, nameurl__c, AccountNumber, Type, active__c, Website, AccountSource, Site, AnnualRevenue, NumberOfEmployees, Phone, Industry from Account';
   
   if(!String.isBlank(searchKey)){
       mainQuery = mainQuery + ' WHERE Type =: searchKey';
       String q = '';
    if(!String.isBlank(searchIndKey)){
        q = 'AND Industry =: searchIndKey';
        mainQuery = mainQuery+' '+q;
    }
    if(!String.isBlank(searchSrcKey)){
        q = 'AND AccountSource =: searchSrcKey';
        mainQuery = mainQuery+' '+q;
    }  
   }   
    List<Account> castRecords = database.query(mainQuery);  
    return castRecords;  
}

@AuraEnabled
public static List<Account> updateAccnts1(Account[] accList){
   // List<Account> acctList = [SELECT Id, Name FROM Account LIMIT 2000];
system.debug('Reached'+accList);
for(Account acct :accList){
        if(acct.name == 'Burlington Textiles Corp of America'){
            string errAccId = 'Account -- Burlington Textiles Corp of America -- Cannot be updated!';
            AuraHandledException ex = new AuraHandledException(errAccId);
            ex.setMessage(errAccId);
            throw ex;
        }
        acct.Active__c = 'Yes';
}
update accList;
return [Select Id, Name, nameurl__c, AccountNumber, Type, active__c, Website, AccountSource, Site, AnnualRevenue, NumberOfEmployees, Phone, Industry from Account];
} 
 

 
}