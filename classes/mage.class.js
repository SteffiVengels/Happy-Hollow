class Mage extends MovableObject {
    height = 51;
    width = 51;
    y = 397;
    IMAGES_WALKING = [
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/walk/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/walk/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/walk/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/walk/tile003.png'
    ];
    offset = {
        top: 0,
        left: 5,
        right: 0,
        bottom: 0
    };

    constructor() {
        super().loadImage('./assets/img/tiny-monsters-pixel-art-pack/2 Mage/Mage.png');
        this.x = 300 + Math.random() * 400;
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

}