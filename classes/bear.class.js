class Bear extends MovableObject {
    height = 64;
    width = 64;
    y = 384;
    markedForDeletion = false;
    inDeadAnimation = false;
    IMAGES_WALKING = [
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/walk/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/walk/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/walk/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/walk/tile003.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/walk/tile004.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/walk/tile005.png'
    ];
    IMAGES_DEAD = [
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/death/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/death/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/death/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/death/tile003.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/death/tile004.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/death/tile005.png'
    ];
    offset = {
        top: 10,
        left: 20,
        right: 0,
        bottom: 0
    };



    constructor() {
        super().loadImage('./assets/img/tiny-monsters-pixel-art-pack/1 Bear/Bear.png');
        this.x = 719 + Math.random() * 2700;
        this.speed = 0.15 + Math.random() * 0.25;
        console.log(this.x)
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