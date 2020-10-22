 export default class Slider {
     
    constructor(pageSelector, btnsSelector) {
        this.page = document.querySelector(pageSelector);
        this.slides = this.page.children;
        this.btns = document.querySelectorAll(btnsSelector);
        this.slideIndex = 1;
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.slides.length;
        }
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
