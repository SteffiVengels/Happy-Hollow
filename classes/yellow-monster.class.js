class YellowMonster extends MovableObject {
    height = 54;
    width = 54;
    y = 393;
    markedForDeletion = false;
    inDeadAnimation = false;
    IMAGES_WALKING = [
        './assets/img/tiny-monsters-pixel-art-pack/6 Yellow/walk/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/6 Yellow/walk/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/6 Yellow/walk/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/6 Yellow/walk/tile003.png',
        './assets/img/tiny-monsters-pixel-art-pack/6 Yellow/walk/tile004.png',
        './assets/img/tiny-monsters-pixel-art-pack/6 Yellow/walk/tile005.png'
    ];
    IMAGES_DEAD = [
        './assets/img/tiny-monsters-pixel-art-pack/6 Yellow/death/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/6 Yellow/death/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/6 Yellow/death/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/6 Yellow/death/tile003.png',
        './assets/img/tiny-monsters-pixel-art-pack/6 Yellow/death/tile004.png',
        './assets/img/tiny-monsters-pixel-art-pack/6 Yellow/death/tile005.png'
    ];
    offset = {
        top: 5,
        left: 10,
        right: 0,
        bottom: 0
    };

    constructor() {
        super().loadImage('./assets/img/tiny-monsters-pixel-art-pack/6 Yellow/Yellow.png');
        this.x = 719 + Math.random() * 2700;
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isDead() && !this.markedForDeletion) {
                if (!this.inDeadAnimation) {
                    this.currentImage = 0;       // Reset Animation auf Anfang
                    this.inDeadAnimation = true; // Flag setzen, dass Dead-Animation läuft
                }
                console.log('Dead Animation frame:', this.currentImage);
                this.playAnimation(this.IMAGES_DEAD);
                if (this.currentImage >= this.IMAGES_DEAD.length) {
                    this.markedForDeletion = true;
                }
            } else {
                this.inDeadAnimation = false;
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 240);
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

}