import Slider from './slider';

export default class MainSlider extends Slider {

    constructor(btns, next, prev) {
        super(btns, next, prev);
    }

    showSlides(n) {
        try {
            if (n > this.slides.length) {
                this.slideIndex = 1;
            }
        } catch(e) {}

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        try {
            this.hanson.style.opacity = '0';
            if (n == 3) {
                setTimeout(() => {
                    this.hanson.classList.add('animated', 'slideInUp');
                    this.hanson.style.opacity = '1';
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch (e) {}

        try {
            this.slides.forEach(slide => {
                slide.classList.remove('fadeIn');
                slide.classList.add('animated', 'fadeOut');
                slide.style.display = 'none';
            });
            this.slides[this.slideIndex - 1].classList.remove('fadeOut');
            this.slides[this.slideIndex - 1].classList.add('fadeIn');
            this.slides[this.slideIndex - 1].style.display = 'block';
        } catch(e) {}

    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n)
    }

    bindTriggers(trigger, n) {
        trigger.forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                if (e.target.tagName == el.tagName ||
                    e.target.tagName == el.children[0].tagName || 
                    e.target.tagName == el.children[0].children[0].tagName) {
                    this.plusSlides(n);
                }
            });
        });
    }

    render() {
        if (this.container) {
            try {
                this.hanson = document.querySelector('.modules__info .hanson');
            } catch (e) {}
            
            this.btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.plusSlides(1);
                });
                btn.parentNode.previousElementSibling.addEventListener('click', (e) =>{
                    e.preventDefault();
                    this.slideIndex = 1;
                    this.showSlides(this.slideIndex);
                });
            });

            this.bindTriggers(this.prev, -1);
            this.bindTriggers(this.next, +1);
            this.showSlides(this.slideIndex);
        }
    } 

}