Hear.com Challenge
1.)	Have added a Formula field on Account Object called nameurl__c of type text
Forumla is  “/”{!id}
It is used to display the link “Account” on app page.
Since we are using Lightning datatables – the type url attribute causes problems after page refreshes.
And workaround is looping around data again and modify on run-time.
I think formula field is better than that.

2.)	You can Filter on and conditionally on Source or Industry 

3.)	Instead of clear filter – if you filter on ---none--- it clears respective filters (but could do that as well)

4.)	Table with checkbox to be selected – could have also added row selection on row click rather just on checkbox select.

5.)	You can press Activate button to activate items to be selected – It is not enabled/disabled based on selection – but could do that. (bulk update is not supported in lds)

6.)	If you have selected accounts other than blocked account and update is successful – message is displayed. (could not use event toast if app is used on non-lightning environment)

7.)	If you have selected blocked account – an error is displayed – and nothing is updated.

8.)	Table is refreshed on any action.

9.)	Spinner is displayed for every action.
