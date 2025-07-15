class Character extends MovableObject {
    Type = 'Dude-Monster';
    IMAGES_WALKING = [];
    IMAGES_JUMPING = [];
    IMAGES_IDLE = [];
    IMAGES_DEAD = [];
    IMAGES_HURT = [];
    IMAGES_THROW = [];
    IMAGE_PORTRAIT = [];
    world;
    speed = 5;
    offset = {
        top: 0,
        left: 5,
        right: 5,
        bottom: 0
    };
    isThrowing = false;
    isJumping = false;
    coinCount = 0;

    constructor() {
        super().selectCharacterTyp();
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
                if (this.x < 310 || this.x > (this.world.level.level_end_x - 320) || this.world.level.level_end_x == 670) {
                    this.moveRight(); // Character bewegt sich bis zur Mitte
                } else {
                    this.x += this.speed; // Character-Position erhöhen
                    this.world.camera_x = -this.x + 310; // Hintergrund scrollt
                }
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                if (this.x <= 310 || this.x > (this.world.level.level_end_x - 320) || this.world.level.level_end_x == 670) {
                    this.moveLeft(); // Character bewegt sich selbst zurück
                } else {
                    this.x -= this.speed;
                    this.world.camera_x = -this.x + 310;
                }
                this.otherDirection = true;
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isJumping) {
                return
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                return
            } else if (this.isThrowing && !this.noEnergy()) {
                return
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 240);

        setInterval(() => {
            if (this.isThrowing && !this.noEnergy()) {
                this.playAnimation(this.IMAGES_THROW);
                if (this.currentImage >= this.IMAGES_THROW.length) {
                    this.isThrowing = false;
                    this.world.throwRock(this.x, this.y, this.otherDirection);
                }
            }
        }, 120);

        setInterval(() => {
            if (this.isJumping) {
                this.playAnimation(this.IMAGES_JUMPING);
                if (this.currentImage >= this.IMAGES_JUMPING.length) {
                    this.isJumping = false;
                }
            }
        }, 240);

        setInterval(() => {
            if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isJumping) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 120);
    }

    selectCharacterTyp() {
        if (this.Type === 'Pink-Monster') {
            this.loadImage('./assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/Pink_Monster.png');
            this.showPinkMonsterAnimation();
        } else if (this.Type === 'Owlet-Monster') {
            this.loadImage('./assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/Owlet_Monster.png');
            this.showOwletMonsterAnimation();
        } else if (this.Type === 'Dude-Monster') {
            this.loadImage('./assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/Dude_Monster.png');
            this.showDudeMonsterAnimation();
        }
    }

    showPinkMonsterAnimation() {
        this.IMAGES_WALKING = [
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/walk/tile000.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/walk/tile001.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/walk/tile002.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/walk/tile003.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/walk/tile004.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/walk/tile005.png'
        ];
        this.IMAGES_JUMPING = [
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/jump/tile002.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/jump/tile003.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/jump/tile004.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/jump/tile005.png'
        ];
        this.IMAGES_IDLE = [
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/idle/tile000.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/idle/tile001.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/idle/tile002.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/idle/tile003.png'
        ];
        this.IMAGES_DEAD = [
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/death/tile000.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/death/tile001.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/death/tile002.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/death/tile003.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/death/tile004.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/death/tile005.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/death/tile006.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/death/tile007.png'
        ];
        this.IMAGES_HURT = [
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/hurt/tile000.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/hurt/tile001.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/hurt/tile002.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/hurt/tile003.png'
        ];
        this.IMAGES_THROW = [
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/throw/tile000.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/throw/tile001.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/throw/tile002.png',
            './assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/throw/tile003.png'
        ];
        this.IMAGE_PORTRAIT = [
            './assets/img/game-ui-pixel-art/1 Frames/Portrait_frame.png',
            './assets/img/30-pixel-art-monster-portrait-icons/1 Main characters/Portraits_01.png'
        ];
    }

    showOwletMonsterAnimation() {
        this.IMAGES_WALKING = [
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/walk/tile000.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/walk/tile001.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/walk/tile002.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/walk/tile003.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/walk/tile004.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/walk/tile005.png'
        ];
        this.IMAGES_JUMPING = [
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/jump/tile002.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/jump/tile003.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/jump/tile004.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/jump/tile005.png'
        ];
        this.IMAGES_IDLE = [
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/idle/tile000.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/idle/tile001.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/idle/tile002.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/idle/tile003.png'
        ];
        this.IMAGES_DEAD = [
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/death/tile000.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/death/tile001.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/death/tile002.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/death/tile003.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/death/tile004.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/death/tile005.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/death/tile006.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/death/tile007.png'
        ];
        this.IMAGES_HURT = [
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/hurt/tile000.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/hurt/tile001.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/hurt/tile002.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/hurt/tile003.png'
        ];
        this.IMAGES_THROW = [
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/throw/tile000.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/throw/tile001.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/throw/tile002.png',
            './assets/img/pixel-art-tiny-hero-sprites/2 Owlet_Monster/throw/tile003.png'
        ];
        this.IMAGE_PORTRAIT = [
            './assets/img/game-ui-pixel-art/1 Frames/Portrait_frame.png',
            './assets/img/30-pixel-art-monster-portrait-icons/1 Main characters/Portraits_07.png'
        ];
    }

    showDudeMonsterAnimation() {
        this.IMAGES_WALKING = [
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/walk/tile000.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/walk/tile001.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/walk/tile002.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/walk/tile003.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/walk/tile004.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/walk/tile005.png'
        ];
        this.IMAGES_JUMPING = [
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/jump/tile002.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/jump/tile003.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/jump/tile004.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/jump/tile005.png'
        ];
        this.IMAGES_IDLE = [
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/idle/tile000.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/idle/tile001.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/idle/tile002.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/idle/tile003.png'
        ];
        this.IMAGES_DEAD = [
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/death/tile000.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/death/tile001.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/death/tile002.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/death/tile003.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/death/tile004.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/death/tile005.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/death/tile006.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/death/tile007.png'
        ];
        this.IMAGES_HURT = [
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/hurt/tile000.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/hurt/tile001.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/hurt/tile002.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/hurt/tile003.png'
        ];
        this.IMAGES_THROW = [
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/throw/tile000.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/throw/tile001.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/throw/tile002.png',
            './assets/img/pixel-art-tiny-hero-sprites/3 Dude_Monster/throw/tile003.png'
        ];
        this.IMAGE_PORTRAIT = [
            './assets/img/game-ui-pixel-art/1 Frames/Portrait_frame.png',
            './assets/img/30-pixel-art-monster-portrait-icons/1 Main characters/Portraits_13.png'
        ];
    }

}
