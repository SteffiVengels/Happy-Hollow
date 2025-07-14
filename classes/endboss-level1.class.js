class EndbossLevel1 extends MovableObject {
    height = 154;
    width = 154;
    y = 294;
    markedForDeletion = false;
    inDeadAnimation = false;
    inAttack = false;
    IMAGES_SNEER = [
        './assets/img/boss-monsters-pixel-art/2 Demon/sneer/tile000.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/sneer/tile001.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/sneer/tile002.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/sneer/tile003.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/sneer/tile004.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/sneer/tile005.png'
    ];
    IMAGES_DEAD = [
        './assets/img/boss-monsters-pixel-art/2 Demon/death/tile000.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/death/tile001.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/death/tile002.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/death/tile003.png'
    ];
    IMAGES_WALKING = [
        './assets/img/boss-monsters-pixel-art/2 Demon/walk/tile000.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/walk/tile001.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/walk/tile002.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/walk/tile003.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/walk/tile004.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/walk/tile005.png'
    ];
    IMAGES_HURT = [
        './assets/img/boss-monsters-pixel-art/2 Demon/hurt/tile000.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/hurt/tile001.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/hurt/tile002.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/hurt/tile003.png'
    ];
    IMAGES_ATTACK = [
        './assets/img/boss-monsters-pixel-art/2 Demon/attack/tile000.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/attack/tile001.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/attack/tile002.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/attack/tile003.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/attack/tile004.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/attack/tile005.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/attack/tile006.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/attack/tile007.png'
    ];
    offset = {
        top: 30,
        left: 25,
        right: 25,
        bottom: 0
    };
    speed = 0.25;



    constructor(character, world) {
        super();
        this.loadImage('./assets/img/boss-monsters-pixel-art/2 Demon/Demon_Boss.png');
        this.x = 520;
        this.character = character;
        this.world = world;
        this.loadImages(this.IMAGES_SNEER);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
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
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.character && Math.abs(this.character.x - this.x) <= 25) {
                return
            } else {
                this.inDeadAnimation = false;
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 160);

        setInterval(() => {
            if (this.character && this.character.isColliding(this)) {
                if (!this.inAttack) {
                    this.currentImage = 0;
                    this.inAttack = true;
                } else if (this.inAttack) {
                    this.playAnimation(this.IMAGES_ATTACK);
                    console.log(this.currentImage)
                    if (this.currentImage >= this.IMAGES_ATTACK.length) {
                        this.inAttack = false;
                    }
                }
            } else {
                this.inAttack = false;
            }
        }, 160);

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

        /*         setInterval(() => {
                    this.playAnimation(this.IMAGES_SNEER);
                }, 160); */

    }


}