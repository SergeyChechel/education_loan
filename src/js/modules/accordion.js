export default class Accordion {
    
    constructor(triggerSelector) {
        this.btns = document.querySelectorAll(triggerSelector);
    }

    init() {
        this.btns.forEach(btn => {
            
             btn.addEventListener('click', () => {
                const msg = btn.parentNode.nextElementSibling;
                if (msg.classList.contains('msg')) {
                    msg.style.marginTop = '20px';
                    msg.classList.add('animated', 'fadeInDown');
                    msg.classList.remove('msg', 'fadeOutUp');
                } else {
                    
                    msg.classList.remove('fadeInDown');
                    msg.classList.add('msg','fadeOutUp');
                    msg.style.marginTop = '0px';
                }

            });
        });
    }

}