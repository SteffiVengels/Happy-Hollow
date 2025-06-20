class Character extends MovableObject {
    IMAGES_WALKING = [
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/walk/tile000.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/walk/tile001.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/walk/tile002.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/walk/tile003.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/walk/tile004.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/walk/tile005.png'
    ]
    world;
    speed = 1.5;


    constructor() {
        super().loadImage('./assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/Pink_Monster.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }


    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }

        }, 50);
    }
}
