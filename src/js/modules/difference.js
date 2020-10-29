export default class Difference {

    constructor(oldOfficer, newOfficer, items) {
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
        try {
            this.oldItems = this.oldOfficer.querySelectorAll(items);
            this.newItems = this.newOfficer.querySelectorAll(items);
        } catch(e) {}
        this.oldCounter = 0;
        this.newCounter = 0;

    }

    bindTriggers(container, items, counter) {
        try {
            container.querySelector('.plus').addEventListener('click', () => {
                items[counter].classList.add('animated', 'fadeIn');
                if (counter !== items.length - 2) {
                    items[counter].style.display = 'flex';
                    counter++;
                } else {
                    items[counter].style.display = 'flex';
                    items[items.length - 1 ].style.display = 'none';
                }
            });
        } catch(e) {}
    }

    hideItems(items) {
        try {
            items.forEach((item, i, arr) => {
                if (i !== arr.length - 1) {
                    item.style.display = 'none'; 
                }
            });
        } catch(e) {}
    }
    

    init() {
        this.hideItems(this.oldItems);
        this.hideItems(this.newItems);
        
        this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
        this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
    }
}