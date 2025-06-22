class Bear extends MovableObject {
    height = 64;
    width = 64;
    y = 384;
    IMAGES_WALKING = [
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/walk/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/walk/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/walk/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/walk/tile003.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/walk/tile004.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/walk/tile005.png'
    ];



    constructor() {
        super().loadImage('./assets/img/tiny-monsters-pixel-art-pack/1 Bear/Bear.png');
        this.x = 300 + Math.random() * 400;
        this.speed = 0.15 + Math.random() * 0.25;
        console.log(this.x)
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