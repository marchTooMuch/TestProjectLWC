public with sharing class Contacts {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [SELECT Id, 
                       Name, 
                       Title,
                       Phone 
                       FROM Contact 
                       LIMIT 4];
    }  
}//UNCRUSTYFY
//Code style
//Events 
//java 