class EndbossLevel1 extends MovableObject {
    Type;
    height = 154;
    width = 154;
    y = 294;
    markedForDeletion = false;
    inDeadAnimation = false;
    inAttack = false;
    hasFired = false;
    IMAGES_SNEER = [];
    IMAGES_DEAD = [];
    IMAGES_WALKING = [];
    IMAGES_HURT = [];
    IMAGES_ATTACK = [];
    offset = {
        top: 30,
        left: 25,
        right: 25,
        bottom: 0
    };
    speed = 0.5;


    constructor(character, world, Type) {
        super();
        this.x = 520;
        this.character = character;
        this.world = world;
        this.Type = Type;
        this.coinsGiven = false;
        this.selectMonsterTyp();
        this.changeDimensionForSelectedMonster();
        this.loadImages(this.IMAGES_SNEER);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.startIntroAnimation();
    }


    /**
      * Starts the intro animation of the endboss with sneer sounds.
      */
    startIntroAnimation() {
        this.world.audioManager.playEndbossSneerSound();
        let sneerInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_SNEER);
        }, 160);
        setTimeout(() => {
            clearInterval(sneerInterval);
            this.animate();
        }, 2000);
    }


    /**
     * Main animation loop that triggers various animations and movement.
     */
    animate() {
        setInterval(() => this.playEndboss(), 160);
        setInterval(() => this.playOozeAndDemonAttackAnimation(), 160);
        setInterval(() => this.playMageAttackAnimation(), 160);
        setInterval(() => this.moveEndboss(), 1000 / 60);
    }


    /**
     * Handles the logic to play the endboss animations based on state.
     */
    playEndboss() {
        if (this.isDead() && !this.markedForDeletion) {
            this.handleDeathAnimation();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.canEndbossAttack()) {
            return
        } else if (this.canWalk()) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.inDeadAnimation = false;
        }
    }


    /**
     * Checks if the endboss can attack the player.
     * @returns {boolean} True if attack is possible.
     */
    canEndbossAttack() {
        return (this.character && this.character.isColliding(this) && this.Type !== 'Mage-Monster') || (this.character && Math.abs(this.character.x - this.x) <= 156 && this.Type === 'Mage-Monster');
    }


    /**
     * Moves the endboss towards or away from the character.
     */
    moveEndboss() {
        if (this.canWalk()) {
            if (this.character.x - this.x > 51) {
                this.moveRight();
                this.otherDirection = true;
            } else {
                this.moveLeft();
                this.otherDirection = false;
            }
        }
    }


    /**
     * Determines if the endboss can walk (not dead and not attacking).
     * @returns {boolean} True if the endboss can walk.
     */
    canWalk() {
        return this.character && !this.isDead() && !this.inAttack;
    }


    /**
     * Plays the mage-specific attack animation if conditions are met.
     */
    playMageAttackAnimation() {
        if (this.canMageAttack()) {
            if (this.isCharacterInRange(204)) {
                this.handleMageAttack();
            } else if (this.Type == 'Mage-Monster') {
                this.resetAttack();
            }
        }
    }


    /**
     * Checks if the endboss can perform a mage attack.
     * @returns {boolean} True if mage attack is possible.
     */
    canMageAttack() {
        return this.character && this.Type == 'Mage-Monster' && !this.isDead();
    }


    /**
     * Checks if the player character is within a specified range.
     * @param {number} range - The distance to check.
     * @returns {boolean} True if character is in range.
     */
    isCharacterInRange(range) {
        return Math.abs(this.character.x - this.x) <= range;
    }


    /**
     * Handles the mage attack animation and triggers the fireball attack.
     */
    handleMageAttack() {
        if (!this.inAttack) {
            this.startFireBallAttack();
        } else if (this.inAttack) {
            this.playAnimation(this.IMAGES_ATTACK);
            if (this.currentImage >= this.IMAGES_ATTACK.length && !this.hasFired) {
                this.playFireBallAttackEndboss();
            }
        }
    }


    /**
     * Resets the attack state.
     */
    resetAttack() {
        this.inAttack = false;
    }


    /**
     * Handles the attack animations for Ooze or Demon monsters.
     */
    playOozeAndDemonAttackAnimation() {
        if (this.canOozeOrDemonAttack()) {
            this.handleAttackState();
        } else if (this.Type !== 'Mage-Monster') {
            this.resetAttack();
        }
    }


    /**
     * Initializes or continues the attack animation state.
     */
    handleAttackState() {
        if (!this.inAttack) {
            this.startAttack();
        } else {
            this.executeAttack();
        }
    }


    /**
     * Starts the attack by resetting animation and setting state.
     */
    startAttack() {
        this.currentImage = 0;
        this.inAttack = true;
    }


    /**
     * Plays attack animation and sound, ending the attack when finished.
     */
    executeAttack() {
        this.world.audioManager.playEndbossAttackSound();
        this.playAnimation(this.IMAGES_ATTACK);
        if (this.currentImage >= this.IMAGES_ATTACK.length) {
            this.inAttack = false;
        }
    }


    /**
     * Checks if Ooze or Demon monsters can attack.
     * @returns {boolean} True if attack is possible.
     */
    canOozeOrDemonAttack() {
        return this.character && this.character.isColliding(this) && this.Type !== 'Mage-Monster';
    }


    /**
     * Starts the fireball attack animation for the mage monster.
     */
    startFireBallAttack() {
        this.currentImage = 0;
        this.inAttack = true;
        this.hasFired = false;
    }


    /**
     * Fires the fireball projectile from the mage endboss.
     */
    playFireBallAttackEndboss() {
        let fireBallX = this.otherDirection ? this.x + 102 : this.x;
        this.world.throwFireBallFromEndboss(fireBallX, this.y, this.otherDirection, this);
        this.hasFired = true;
        this.inAttack = false;
    }


    /**
     * Handles the death animation and triggers the end of the boss fight.
     */
    handleDeathAnimation() {
        if (!this.inDeadAnimation) {
            this.currentImage = 0;
            this.inDeadAnimation = true;
            this.world.audioManager.playEndbossDeadSound(); 
        }
        this.playAnimation(this.IMAGES_DEAD);
        if (this.currentImage >= this.IMAGES_DEAD.length) {
            this.endDeathAnimation();
        }
    }


    /**
     * Ends the death animation, marks boss for deletion and rewards the player.
     */
    endDeathAnimation() {
        this.markedForDeletion = true;
        this.world.audioManager.stopEndbossLevel1BackgroundMusic();
        this.rewardCoinsForEndboss();
        setTimeout(() => {
            gameWin();
        }, 3000);
    }


    /**
     * Rewards the player with coins depending on the monster type.
     */
    rewardCoinsForEndboss() {
        let coinsToAdd;
        if (this.Type === 'Mage-Monster') coinsToAdd = 25;
        else if (this.Type === 'Demon-Monster') coinsToAdd = 20;
        else if (this.Type === 'Ooze-Monster') coinsToAdd = 15;
        this.incrementCoinCount(coinsToAdd); // z. B. 20 Coins, alle 100ms
        this.coinsGiven = true;
    }


    /**
      * Increments the player's coin count over time.
      * @param {number} coinsToAdd - The number of coins to add.
      */
    incrementCoinCount(coinsToAdd) {
        let steps = 0;
        const interval = setInterval(() => {
            if (steps >= coinsToAdd) {
                clearInterval(interval);
                return;
            }
            this.character.coinCount++;
            this.world.audioManager.playCollectCoinSound();
            steps++;
        }, 100);
    }


    /**
     * Selects monster type and loads corresponding images.
     */
    selectMonsterTyp() {
        if (this.Type === 'Mage-Monster') {
            this.loadImage('./assets/img/boss-monsters-pixel-art/1 Mage/Mage_boss.png');
            this.showMageMonsterAnimation();
        } else if (this.Type === 'Demon-Monster') {
            this.loadImage('./assets/img/boss-monsters-pixel-art/2 Demon/Demon_Boss.png');
            this.showDemonMonsterAnimation();
        } else if (this.Type === 'Ooze-Monster') {
            this.loadImage('./assets/img/boss-monsters-pixel-art/3 Ooze/Ooze_boss.png');
            this.showOozeMonsterAnimation();
        }
    }


    /**
     * Adjusts size and offsets based on the selected monster type.
     */
    changeDimensionForSelectedMonster() {
        if (this.Type === 'Mage-Monster') {
            this.height = 102,
                this.width = 102,
                this.offset.left = 0,
                this.offset.right = 0,
                this.offset.top = 0,
                this.y = 346
        }
    }


    /**
     * Loads mage monster animations.
     */
    showMageMonsterAnimation() {
        this.IMAGES_WALKING = [
            './assets/img/boss-monsters-pixel-art/1 Mage/walk/tile000.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/walk/tile001.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/walk/tile002.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/walk/tile003.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/walk/tile004.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/walk/tile005.png'
        ];
        this.IMAGES_SNEER = [
            './assets/img/boss-monsters-pixel-art/1 Mage/sneer/tile000.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/sneer/tile001.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/sneer/tile002.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/sneer/tile003.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/sneer/tile004.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/sneer/tile005.png'
        ];
        this.IMAGES_DEAD = [
            './assets/img/boss-monsters-pixel-art/1 Mage/death/tile000.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/death/tile001.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/death/tile002.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/death/tile003.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/death/tile004.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/death/tile005.png'
        ];
        this.IMAGES_HURT = [
            './assets/img/boss-monsters-pixel-art/1 Mage/hurt/tile000.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/hurt/tile001.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/hurt/tile002.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/hurt/tile003.png'
        ];
        this.IMAGES_ATTACK = [
            './assets/img/boss-monsters-pixel-art/1 Mage/attack/tile000.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/attack/tile001.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/attack/tile002.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/attack/tile003.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/attack/tile004.png',
            './assets/img/boss-monsters-pixel-art/1 Mage/attack/tile005.png'
        ];
    }


    /**
      * Loads demon monster animations.
      */
    showDemonMonsterAnimation() {
        this.IMAGES_WALKING = [
            './assets/img/boss-monsters-pixel-art/2 Demon/walk/tile000.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/walk/tile001.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/walk/tile002.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/walk/tile003.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/walk/tile004.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/walk/tile005.png'
        ];
        this.IMAGES_SNEER = [
            './assets/img/boss-monsters-pixel-art/2 Demon/sneer/tile000.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/sneer/tile001.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/sneer/tile002.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/sneer/tile003.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/sneer/tile004.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/sneer/tile005.png'
        ];
        this.IMAGES_DEAD = [
            './assets/img/boss-monsters-pixel-art/2 Demon/death/tile000.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/death/tile001.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/death/tile002.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/death/tile003.png'
        ];
        this.IMAGES_HURT = [
            './assets/img/boss-monsters-pixel-art/2 Demon/hurt/tile000.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/hurt/tile001.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/hurt/tile002.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/hurt/tile003.png'
        ];
        this.IMAGES_ATTACK = [
            './assets/img/boss-monsters-pixel-art/2 Demon/attack/tile000.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/attack/tile001.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/attack/tile002.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/attack/tile003.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/attack/tile004.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/attack/tile005.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/attack/tile006.png',
            './assets/img/boss-monsters-pixel-art/2 Demon/attack/tile007.png'
        ];
    }


    /**
     * Loads ooze monster animations.
     */
    showOozeMonsterAnimation() {
        this.IMAGES_WALKING = [
            './assets/img/boss-monsters-pixel-art/3 Ooze/walk/tile000.png',
            './assets/img/boss-monsters-pixel-art/3 Ooze/walk/tile001.png',
            './assets/img/boss-monsters-pixel-art/3 Ooze/walk/tile002.png',
            './assets/img/boss-monsters-pixel-art/3 Ooze/walk/tile003.png'
        ];
        this.IMAGES_SNEER = [
            './assets/img/boss-monsters-pixel-art/3 Ooze/sneer/tile000.png',
            './assets/img/boss-monsters-pixel-art/3 Ooze/sneer/tile001.png',
            './assets/img/boss-monsters-pixel-art/3 Ooze/sneer/tile002.png',
            './assets/img/boss-monsters-pixel-art/3 Ooze/sneer/tile003.png'
        ];
        this.IMAGES_DEAD = [
            './assets/img/boss-monsters-pixel-art/3 Ooze/death/tile000.png',
            './assets/img/boss-monsters-pixel-art/3 Ooze/death/tile001.png',
            './assets/img/boss-monsters-pixel-art/3 Ooze/death/tile002.png',
            './assets/img/boss-monsters-pixel-art/3 Ooze/death/tile003.png',
            './assets/img/boss-monsters-pixel-art/3 Ooze/death/tile004.png',
            './assets/img/boss-monsters-pixel-art/3 Ooze/death/tile005.png'
        ];
        this.IMAGES_HURT = [
            './assets/img/boss-monsters-pixel-art/3 Ooze/hurt/tile000.png',
            './assets/img/boss-monsters-pixel-art/3 Ooze/hurt/tile001.png',
            './assets/img/boss-monsters-pixel-art/3 Ooze/hurt/tile002.png',
            './assets/img/boss-monsters-pixel-art/3 Ooze/hurt/tile003.png'
        ];
        this.IMAGES_ATTACK = [
            './assets/img/boss-monsters-pixel-art/3 Ooze/attack/tile000.png',
            './assets/img/boss-monsters-pixel-art/3 Ooze/attack/tile001.png',
            './assets/img/boss-monsters-pixel-art/3 Ooze/attack/tile002.png',
            './assets/img/boss-monsters-pixel-art/3 Ooze/attack/tile003.png'
        ];
    }

}