import { LightningElement,track,wire,api } from 'lwc';
import getContacts from '@salesforce/apex/Contacts.getContacts';
import { createMessageContext, releaseMessageContext, publish, subscribe, unsubscribe  } from 'lightning/messageService';
import DragDropChannel from "@salesforce/messageChannel/DragDrop__c";
export default class Main extends LightningElement {
    @track contacts2 = [];
    draggedItem;
    draggedItemId;
    context = createMessageContext();
    subscription = null;
    @track lstPosts1 = [];
    @track lstPosts2 = [];
    constructor() {
        super();
        getContacts()
            .then(result => {
                this.contacts2 = result;
            })
            .catch(error => {
                this.error = error;
            });
        if (this.subscription) { 
            return;
        }
        this.subscription = subscribe(this.context, DragDropChannel, (message) => {
            if(message.upcomingToCompleted){
                this.handleMessage(message);
            } else if(!message.upcomingToCompleted){
                this.template.querySelector('#'+message.itemId).remove();
            }
        });
    }
    handleMessage(message) {
        this.draggedItem = message.draggedItem;
        this.draggedItemId = message.itemId;
    }
    allowDrop(event){
        event.preventDefault();
    }
    drop(event) {
        event.preventDefault();
        if(event.target.id ==="idCompletedPosts-64") {
            this.lstPosts2.push(this.draggedItem);
            const message = {
            draggedItem : null,
            itemId : this.draggedItemId,
            upcomingToCompleted: false
            } 
            publish(this.context, DragDropChannel, message);
        } else if(event.target.id ==="idUpcomingPosts-64") {
            this.lstPosts1.push(this.draggedItem);
            const message = {
            draggedItem : null,
            itemId : this.draggedItemId,
            upcomingToCompleted: false
            } 
            publish(this.context, DragDropChannel, message);
        }
    }
    drag(event) {
        const message = {
            draggedItem : event.target.textContent,
            itemId : event.target.id,
            upcomingToCompleted: true
        };
        publish(this.context, DragDropChannel, message);
    }
    disconnectedCallback() {
        releaseMessageContext(this.context);
    }
    handleClick(event) {
        var element = event.target;
       element.parentNode.remove();
    }
    handleClick2(event) {
        this.contacts2.forEach(element=>{this.lstPosts1.push(element.Name)});
        this.contacts2.forEach(element=>{this.lstPosts2.push(element.Phone)});
    }
    get makeId() {
        var result           = [];
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqr';
        var charactersLength = characters.length;
        for ( var i = 0; i < 8; i++ ) {
            result.push(characters.charAt(Math.floor(Math.random() * 
       charactersLength)));
         }
         return result.join('');
    }
}
