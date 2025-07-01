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
    IMAGES_THROW = [
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/throw/tile000.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/throw/tile001.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/throw/tile002.png',
        './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/throw/tile003.png'
    ]
    IMAGE_PORTRAIT = [
        './assets/img/30-pixel-art-monster-portrait-icons/1 Main characters/Portraits_01.png',
        './assets/img/game-ui-pixel-art/1 Frames/Portrait_frame.png'

    ]
    world;
    speed = 5;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    isThrowing = false;
    isJumping = false;



    constructor() {
        super().loadImage('./assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/Pink_Monster.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGE_PORTRAIT);
        this.animate();
        this.applyGravity();
    }


    animate() {
        // Bewegung: 60 FPS
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

        // Schnelle Animationen wie "throw"
        setInterval(() => {
            if (this.isThrowing) {
                console.log('Throw Animation frame:', this.currentImage);
                this.playAnimation(this.IMAGES_THROW);
                if (this.currentImage >= this.IMAGES_THROW.length) {
                    this.isThrowing = false;
                    this.world.throwRock(this.x, this.y, this.otherDirection);
                }
            } 
        }, 120); // <-- schnellere Animation für 'throw'

        // Langsamere Idle-/Walk-/Jump-/Hurt-/Dead-Animation
        setInterval(() => {
            if (!this.isThrowing) {
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
            }
        }, 240); // <-- idle z. B. langsamer
    }


}
