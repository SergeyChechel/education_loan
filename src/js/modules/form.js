import Mask from './mask';

export default class Form {
    
    constructor(formSelector) {
        this.forms = document.querySelectorAll(formSelector);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
        };
       this.path = 'assets/server.php';
    }

    clearInputs() {
        this.inputs.forEach(input => {
            if(input.type == 'checkbox') {
                input.checked = false;
            } else {
                input.value = ''; 
            }
        });
    };

    checkMailInputs(event) {
        const reg = /[а-яА-ЯёЁ]/g;
        const target = event.target;
        if (target.value.search(reg) !=  -1) {
            target.value  =  target.value.replace(reg, '');
            target.style.cssText = `border: 2px solid red;`;
            setTimeout(() => {
                target.style.cssText = `border: none`;
            }, 500);
        }
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await res.text() 
    };

    init() {
        new Mask('[name="phone"]').init();
        this.forms.forEach(item => {
            item.querySelector('input[name="email"]').addEventListener('input', (e) => {
                this.checkMailInputs(e);
            });
            item.addEventListener('submit', (e) => {
                e.preventDefault();
                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                item.parentNode.appendChild(statusMessage);
                statusMessage.textContent = this.message.loading;

                let formData = new FormData(item);
                
                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        formData = new FormData();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 6000);
                    });
                
            });
        });
  
    }
}