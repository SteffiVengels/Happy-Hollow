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


    /** Start enemy animations and movement */
    animate() {
        setInterval(() => this.playEnemy(), 240);
        setInterval(() => this.playEnemyAttack(), 120);
        setInterval(() => this.moveEnemy(), 1000 / 60);
    }


    /** Move the enemy towards or away from the character */
    moveEnemy() {
        if (this.character && !this.isDead() && !this.inAttack) {
            if (this.characterIsRightFromEenemy()) {
                this.moveRight();
                this.otherDirection = true;
            } else {
                this.moveLeft();
                this.otherDirection = false;
            }
        }
    }


    /**
     * Checks if character is right of the enemy
     * @returns {boolean} True if character is right of the enemy
     */
    characterIsRightFromEenemy() {
        return this.character.x - this.x > 51;
    }


    /** Plays attack animation and handles attack logic */
    playEnemyAttack() {
        if (this.character && !this.isDead()) {
            if (this.isEnemyInRange(204)) {
                this.handleEnemyAttack();
            } else {
                this.resetEnemyAttack();
            }
        }
    }


    /**
 * Handles the attack animations
 */
    handleEnemyAttack() {
        if (!this.inAttack) {
            this.startFireBallAttack();
        } else if (this.inAttack) {
            this.playAnimation(this.IMAGES_ATTACK);
            if (this.currentImage >= this.IMAGES_ATTACK.length && !this.hasFired) {
                this.playFireBallAttack();
                this.world.audioManager.playEnemieAttackSound();
            }
        }
    }

    /**
 * Resets the attack state.
 */
    resetEnemyAttack() {
        this.inAttack = false;
    }


    /** Plays walking or death animation depending on state */
    playEnemy() {
        if (this.isDead() && !this.markedForDeletion) {
            this.handleDeathAnimation();
        } else if (this.character && this.isEnemyInRange(204)) {
            return
        } else {
            this.inDeadAnimation = false;
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    /**
     * Checks if the character is within range of the enemy
     * @param {number} range - Range to check
     * @returns {boolean} True if within range
     */
    isEnemyInRange(range) {
        return Math.abs(this.character.x - this.x) <= range;
    }


    /** Handles the death animation and marks the bear for deletion */
    handleDeathAnimation() {
        if (!this.inDeadAnimation) {
            this.currentImage = 0;
            this.inDeadAnimation = true;
            this.world.audioManager.playEnemieDeadSound();
        }
        this.playAnimation(this.IMAGES_DEAD);
        if (this.currentImage >= this.IMAGES_DEAD.length) {
            this.markedForDeletion = true;
        }
    }


    /** Launches a fireball attack */
    playFireBallAttack() {
        let fireBallX = this.otherDirection ? this.x + 20 : this.x - 20;
        this.world.throwFireBall(fireBallX, this.y + 5, this.otherDirection, this);
        this.hasFired = true;
        this.inAttack = false;
    }


    /** Starts the fireball attack animation */
    startFireBallAttack() {
        this.currentImage = 0;
        this.inAttack = true;
        this.hasFired = false;
    }
}