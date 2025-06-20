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

    constructor() {
        super().loadImage('./assets/img/tiny-monsters-pixel-art-pack/2 Mage/Mage.png');
        this.x = 300 + Math.random() * 400;
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
        this.moveLeft();
    }

}