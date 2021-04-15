
import { LightningElement} from 'lwc';

export default class Main extends LightningElement {
  
  handleClick(event) {
    var element = this.template.querySelector('#' +event.target.id);

    element.parentNode.remove();
}

    drag(event){
        event.dataTransfer.setData("divId", event.target.id);
        
    }

    allowDrop(event){
        event.preventDefault();
    }

    drop(event){
        event.preventDefault();
        var divId = event.dataTransfer.getData("divId");
        var draggedElement = this.template.querySelector('#' +divId);
        draggedElement.classList.add('completed');
        event.target.appendChild(draggedElement);
        
    }
}
  // initialize component
  // renderedCallback() {
  //   var p1 = document.createElement("p");
  //   var node1 = document.createTextNode("Hi");
  //   var p2 = document.createElement("p");
  //   var node2 = document.createTextNode("Hi");
  //   p1.appendChild(node1);
  //   p2.appendChild(node2);
  //   var div = this.template.querySelectorAll('div')
  //   div[0].appendChild(p1);
  //   div[1].appendChild(p2);
  // }
