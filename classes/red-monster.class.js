class RedMonster extends MovableObject {
    height = 51;
    width = 51;
    y = 397;
    markedForDeletion = false;
    inDeadAnimation = false;
    hasFired = false;
    inAttack = false;
    IMAGES_WALKING = [
        './assets/img/tiny-monsters-pixel-art-pack/4 Red/walk/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/4 Red/walk/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/4 Red/walk/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/4 Red/walk/tile003.png',
        './assets/img/tiny-monsters-pixel-art-pack/4 Red/walk/tile004.png',
        './assets/img/tiny-monsters-pixel-art-pack/4 Red/walk/tile005.png'
    ];
    IMAGES_DEAD = [
        './assets/img/tiny-monsters-pixel-art-pack/4 Red/death/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/4 Red/death/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/4 Red/death/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/4 Red/death/tile003.png'
    ];
    IMAGES_ATTACK = [
        './assets/img/tiny-monsters-pixel-art-pack/4 Red/attack/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/4 Red/attack/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/4 Red/attack/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/4 Red/attack/tile003.png'
    ]
    offset = {
        top: 0,
        left: 10,
        right: 0,
        bottom: 0
    };


    constructor(character, world) {
        super().loadImage('./assets/img/tiny-monsters-pixel-art-pack/4 Red/Red.png');
        this.x = 1400 + Math.random() * 6000;
        this.speed = 1 + Math.random() * 0.75;
        this.character = character;
        this.world = world;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.animate();
    }


    animate() {
        setInterval(() => {
            if (this.isDead() && !this.markedForDeletion) {
                this.handleDeathAnimation();
            } else if (this.character && Math.abs(this.character.x - this.x) <= 204) {
                return
            } else {
                this.inDeadAnimation = false;
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 160);

        setInterval(() => {
            if (this.character && !this.isDead()) {
                if (Math.abs(this.character.x - this.x) <= 204) {
                    if (!this.inAttack) {
                        this.startFireBallAttack();
                    } else if (this.inAttack) {
                        this.playAnimation(this.IMAGES_ATTACK);
                        if (this.currentImage >= this.IMAGES_ATTACK.length && !this.hasFired) {
                            this.playFireBallAttack();
                            this.world.audioManager.playEnemieAttackSound();
                        }
                    }
                } else {
                    this.inAttack = false;
                }
            }
        }, 240);

        setInterval(() => {
            if (this.character && !this.isDead() && !this.inAttack) {
                if (this.character.x - this.x > 51) {
                    this.moveRight();
                    this.otherDirection = true;
                } else {
                    this.moveLeft();
                    this.otherDirection = false;
                }
            }
        }, 1000 / 60);
    }


    handleDeathAnimation() {
        this.world.audioManager.playEnemieDeadSound();
        if (!this.inDeadAnimation) {
            this.currentImage = 0;
            this.inDeadAnimation = true;
        }
        this.playAnimation(this.IMAGES_DEAD);
        if (this.currentImage >= this.IMAGES_DEAD.length) {
            this.markedForDeletion = true;
        }
    }


    playFireBallAttack() {
        let fireBallX = this.otherDirection ? this.x + 20 : this.x - 20;
        this.world.throwFireBall(fireBallX, this.y + 5, this.otherDirection, this);
        this.hasFired = true;
        this.inAttack = false;
    }


    startFireBallAttack() {
        this.currentImage = 0;
        this.inAttack = true;
        this.hasFired = false;
    }

}