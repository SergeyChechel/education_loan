export default class VideoPlayer {
    
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.querySelector('.closed')) {
                    return;
                }
                this.activeBtn = btn;
                if (this.path && this.path !== btn.getAttribute('data-url')) {
                    this.path = btn.getAttribute('data-url');
                    this.player.loadVideoById({videoId: this.path});
                    this.overlay.style.display = 'flex';
                } else {
                    this.path = btn.getAttribute('data-url');
                    this.createPlayer(this.path);
                }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.pauseVideo();
        });
    }

    createPlayer(url) {
        if(!this.player) {
            this.player = new YT.Player('frame', {
                height: '100%',
                width: '100%',
                videoId: `${url}`,
                events: {
                    'onStateChange': this.onPlayerStateChange
                }
            });
        }
        this.overlay.style.display = 'flex';
    }

    onPlayerStateChange(state) {
        try {
            const blockedEl = this.activeBtn.closest('.module__video-item').nextElementSibling;
            const playSvg = this.activeBtn.querySelector('svg').cloneNode(true);

            if (state.data == 0) {
                if (blockedEl.querySelector('.play__circle').classList.contains('closed')) {
                    blockedEl.querySelector('.play__circle').classList.remove('closed');
                    blockedEl.querySelector('svg').remove();
                    blockedEl.querySelector('.play__circle').appendChild(playSvg);
                    blockedEl.querySelector('.play__text').textContent = 'play video';
                    blockedEl.querySelector('.play__text').classList.remove('attention');
                    blockedEl.style.opacity = 1;
                    blockedEl.style.filter = 'none';
                }
            }
        } catch (error) {}
    
    }

    init() {
        if (this.btns.length > 0) {
            const tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            
            this.bindTriggers();
            this.bindCloseBtn();
        }
    }

} 