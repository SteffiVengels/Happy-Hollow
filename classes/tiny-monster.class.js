class TinyMonster extends MovableObject {
    height = 51;
    width = 51;
    y = 397;
    IMAGES_WALKING = [
        './assets/img/tiny-monsters-pixel-art-pack/5 Tiny/walk/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/5 Tiny/walk/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/5 Tiny/walk/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/5 Tiny/walk/tile003.png',
        './assets/img/tiny-monsters-pixel-art-pack/5 Tiny/walk/tile004.png',
        './assets/img/tiny-monsters-pixel-art-pack/5 Tiny/walk/tile005.png'
    ];

    constructor() {
        super().loadImage('./assets/img/tiny-monsters-pixel-art-pack/5 Tiny/Tiny.png');
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