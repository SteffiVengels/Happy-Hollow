class Bear extends MovableObject {
    height = 64;
    width = 64;
    y = 384;
    markedForDeletion = false;
    inDeadAnimation = false;
    hasFired = false;
    inAttack = false;
    IMAGES_WALKING = [
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/walk/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/walk/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/walk/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/walk/tile003.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/walk/tile004.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/walk/tile005.png'
    ];
    IMAGES_DEAD = [
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/death/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/death/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/death/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/death/tile003.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/death/tile004.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/death/tile005.png'
    ];
    IMAGES_ATTACK = [
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/attack/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/attack/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/attack/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/attack/tile003.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/attack/tile004.png',
        './assets/img/tiny-monsters-pixel-art-pack/1 Bear/attack/tile005.png'
    ]
    offset = {
        top: 10,
        left: 20,
        right: 0,
        bottom: 0
    };



    constructor(character, world) {
        super().loadImage('./assets/img/tiny-monsters-pixel-art-pack/1 Bear/Bear.png');
        this.x = 719 + Math.random() * 2700;
        this.speed = 0.15 + Math.random() * 0.25;
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
                if (!this.inDeadAnimation) {
                    this.currentImage = 0;
                    this.inDeadAnimation = true;
                }
                this.playAnimation(this.IMAGES_DEAD);
                if (this.currentImage >= this.IMAGES_DEAD.length) {
                    this.markedForDeletion = true;
                }
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
                        this.currentImage = 0;
                        this.inAttack = true;
                        this.hasFired = false;
                    } else if (this.inAttack) {
                        this.playAnimation(this.IMAGES_ATTACK);
                        console.log('Attack Animation frame:', this.currentImage, this.inAttack);
                    }

                    if (this.currentImage >= this.IMAGES_ATTACK.length) {
                        if (!this.hasFired) {
                            let fireBallX = this.otherDirection ? this.x + 20 : this.x - 20;
                            this.world.throwFireBall(fireBallX, this.y + 5, this.otherDirection);
                        }
                        this.hasFired = true;
                        this.inAttack = false;
                        console.log(this.inAttack, this.isDead());
                    }
                } else {
                    // Spieler zu weit weg, Abbruch des Angriffs
                    this.inAttack = false;
                }
            }
        }, 160);

        setInterval(() => {
            if (this.character && !this.isDead() && !this.inAttack) {
                if (this.character.x - this.x > 102) {
                    this.moveRight();
                    this.otherDirection = true; // damit er richtig gespiegelt wird
                } else if (this.character.x - this.x < 106) {
                    this.moveLeft();
                    this.otherDirection = false;
                }
            }
        }, 1000 / 60);
    }

}