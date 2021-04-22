import { LightningElement,track } from 'lwc';
import getContacts from "@salesforce/apex/Contacts.getContacts";
    
export default class Secondary extends LightningElement {
    @track elements1 = [];
    @track elements2 = [];
    element;
    constructor() {
        super();
        getContacts()
            .then(result => {
                this.contacts = result;
                this.contacts.forEach(element=>{
                    this.elements1.push(element.Name)
                    this.elements2.push(element.Phone)
                    });
            })
            .catch(error => {
                this.error = error;
            });
    }

    drag(event) {
        this.element = event.target;
    }

    drop(event) {
         if(event.target.id===this.template.querySelectorAll('.flex-container')[0].id) {
             this.elements1.push(this.element.textContent);
             this.element.remove();
         }
         if(event.target.id===this.template.querySelectorAll('.flex-container')[1].id) {
             this.elements2.push(this.element.textContent);
             this.element.remove();
        }
    }

    handleClick(event) {
        var element = event.target;
        element.parentNode.remove();
    }

    allowDrop(event) {
        event.preventDefault();
    }
}