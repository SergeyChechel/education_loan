import Slider from './slider';

export default class MiniSlider extends Slider {

    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
        });

        this.slides[0].classList.add(this.activeClass);
    }

    bindTriggers() {
        this.next.addEventListener('click', () => {
            this.container.append(this.slides[0]);
        });

        this.prev.addEventListener('click', () => {
            let active = this.slides[this.slides.length - 1];
            this.container.insertBefore(active, this.slides[0]);
        });
    }

    init() {
        this.container.style.cssText = `
            display: flex; 
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
    }
}