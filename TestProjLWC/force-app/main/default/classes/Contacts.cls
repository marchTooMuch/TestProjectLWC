public with sharing class Contacts {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [SELECT Id,Name,Title,Phone from Contact LIMIT 4];
    }
    @AuraEnabled(cacheable=true)
    public static Contact getSingleContact(){
        return [SELECT Id, Name, Title FROM Contact LIMIT 1];
    }
}
