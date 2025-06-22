class Character extends MovableObject {
    IMAGES_WALKING = [
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/walk/tile000.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/walk/tile001.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/walk/tile002.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/walk/tile003.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/walk/tile004.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/walk/tile005.png'
    ]
    IMAGES_JUMPING = [
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/jump/tile000.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/jump/tile001.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/jump/tile002.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/jump/tile003.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/jump/tile004.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/jump/tile005.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/jump/tile006.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/jump/tile007.png'
    ]
    IMAGES_IDLE = [
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/idle/tile000.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/idle/tile001.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/idle/tile002.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/idle/tile003.png'
    ]
    world;
    speed = 5;



    constructor() {
        super().loadImage('./assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/Pink_Monster.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.animate();
        this.applyGravity();
    }


    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 160);
    }
}
