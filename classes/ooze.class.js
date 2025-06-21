class Ooze extends MovableObject {
    height = 61;
    width = 61;
    y = 387;
    IMAGES_WALKING = [
        './assets/img/tiny-monsters-pixel-art-pack/3 Ooze/walk/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/3 Ooze/walk/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/3 Ooze/walk/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/3 Ooze/walk/tile003.png'
    ];

    constructor() {
        super().loadImage('./assets/img/tiny-monsters-pixel-art-pack/3 Ooze/Ooze.png');
        this.x = 300 + Math.random() * 400;
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
        this.moveLeft();
    }

}