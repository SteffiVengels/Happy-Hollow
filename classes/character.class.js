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
    speed = 10;


    constructor() {
        super().loadImage('./assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/Pink_Monster.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }


    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }

        }, 50);
    }
}
