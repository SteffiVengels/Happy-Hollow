class Mage extends MovableObject {
    height = 51;
    width = 51;
    y = 397;
    markedForDeletion = false;
    inDeadAnimation = false;
    hasFired = false;
    inAttack = false;
    IMAGES_WALKING = [
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/walk/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/walk/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/walk/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/walk/tile003.png'
    ];
    IMAGES_DEAD = [
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/death/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/death/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/death/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/death/tile003.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/death/tile004.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/death/tile005.png'
    ];
    IMAGES_ATTACK = [
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/attack/tile000.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/attack/tile001.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/attack/tile002.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/attack/tile003.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/attack/tile004.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/attack/tile005.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/attack/tile006.png',
        './assets/img/tiny-monsters-pixel-art-pack/2 Mage/attack/tile007.png'
    ]
    offset = {
        top: 0,
        left: 5,
        right: 0,
        bottom: 0
    };

    constructor(character, world) {
        super().loadImage('./assets/img/tiny-monsters-pixel-art-pack/2 Mage/Mage.png');
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
                if (!this.inDeadAnimation) {
                    this.currentImage = 0;       // Reset Animation auf Anfang
                    this.inDeadAnimation = true; // Flag setzen, dass Dead-Animation läuft
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
        }, 240);

        setInterval(() => {
            if (this.character && !this.isDead()) {
                if (Math.abs(this.character.x - this.x) <= 204) {
                    if (!this.inAttack) {
                        this.currentImage = 0;
                        this.inAttack = true;
                        this.hasFired = false;
                    } else if (this.inAttack) {
                        this.playAnimation(this.IMAGES_ATTACK);
                        if (this.currentImage >= this.IMAGES_ATTACK.length) {
                            if (!this.hasFired) {
                                let fireBallX = this.otherDirection ? this.x + 20 : this.x - 20;
                                this.world.throwFireBall(fireBallX, this.y + 5, this.otherDirection, this);
                                this.hasFired = true;
                                this.inAttack = false;
                            } 
                        }
                    }
                } else {
                    this.inAttack = false;
                }
            }
        }, 120);

        setInterval(() => {
            if (this.character && !this.isDead() && !this.inAttack) {
                if (this.character.x - this.x > 51) {
                    this.moveRight();
                    this.otherDirection = true; // damit er richtig gespiegelt wird
                } else {
                    this.moveLeft();
                    this.otherDirection = false;
                }
            }
        }, 1000 / 60);
    }

}