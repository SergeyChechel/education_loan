export default class Mask {
    
    constructor(fieldSelector) {
        this.fields = document.querySelectorAll(fieldSelector);
    }

    init() {
        this.fields.forEach((field) => {
            field.addEventListener('input', (e) => this.createMask(e));
            field.addEventListener('focus', (e) => this.createMask(e));
            field.addEventListener('blur', (e) => this.createMask(e));
        });
    }
    
    setCursorPosition (pos, elem) {
        elem.focus();
        if(elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if(elem.createTextRange) {
            let range = elem.createTextRange();
            range.collapse(true);
            range.moveStart('caracter', pos);
            range.moveEnd('caracter', pos);
            range.select();
        }
    };

    createMask(event) {
        const target = event.target;
        let matrix = '+1 (___) ___-____',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = target.value.replace(/\D/g, '');

        if(def.length >= val.length) {
            val = def;
        }
        target.value = matrix.replace(/./g, (sym) => {
            return /[_\d]/.test(sym) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : sym;
        });

        if(event.type === 'blur') {
            if(target.value.length == 2) {
                target.value = '';
            }
        } else {
            this.setCursorPosition(target.value.length, target);
        }
    }

}