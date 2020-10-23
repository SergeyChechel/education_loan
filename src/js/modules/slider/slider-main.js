import Slider from './slider';

export default class MainSlider extends Slider {

    constructor(page, btns) {
        super(page, btns);
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }
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

        this.slides.forEach(slide => {
            slide.classList.remove('fadeIn');
            slide.classList.add('animated', 'fadeOut');
            slide.style.display = 'none';
        });
        this.slides[this.slideIndex - 1].classList.remove('fadeOut');
        this.slides[this.slideIndex - 1].classList.add('fadeIn');
        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n)
    }

    render() {
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
        this.showSlides(this.slideIndex);

    } 

}