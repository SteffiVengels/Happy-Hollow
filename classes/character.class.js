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
    IMAGES_DEAD = [
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/death/tile000.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/death/tile001.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/death/tile002.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/death/tile003.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/death/tile004.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/death/tile005.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/death/tile006.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/death/tile007.png'
    ]
    IMAGES_HURT = [
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/hurt/tile000.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/hurt/tile001.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/hurt/tile002.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/hurt/tile003.png'
    ]
    world;
    speed = 5;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };



    constructor() {
        super().loadImage('./assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/Pink_Monster.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
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
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 160);
    }

}
