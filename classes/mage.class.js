class Mage extends MovableObject {
    height = 51;
    width = 51;
    y = 397;
    markedForDeletion = false;
    inDeadAnimation = false;
    IMAGES_WALKING = [
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/walk/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/walk/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/walk/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/walk/tile003.png'
    ];
    IMAGES_DEAD = [
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/death/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/death/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/death/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/death/tile003.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/death/tile004.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/death/tile005.png'
    ];
    offset = {
        top: 0,
        left: 5,
        right: 0,
        bottom: 0
    };

    constructor() {
        super().loadImage('./assets/img/tiny-monsters-pixel-art-pack/2 Mage/Mage.png');
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
        }, 160);
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

}