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


    startIntroAnimation() {
        let sneerInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_SNEER);
        }, 160);
        setTimeout(() => {
            clearInterval(sneerInterval);
            this.animate();
        }, 2000);
    }


    animate() {
        setInterval(() => {
            if (this.isDead() && !this.markedForDeletion) {
                this.handleDeathAnimation();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if ((this.character && this.character.isColliding(this) && this.Type !== 'Mage-Monster') || (this.character && Math.abs(this.character.x - this.x) <= 156 && this.Type === 'Mage-Monster')) {
                return
            } else if (this.character && !this.isDead() && !this.inAttack) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.inDeadAnimation = false;
            }
        }, 160);

        setInterval(() => {
            if (this.character && this.character.isColliding(this) && this.Type !== 'Mage-Monster') {
                if (!this.inAttack) {
                    this.currentImage = 0;
                    this.inAttack = true;
                } else if (this.inAttack) {
                    this.playEnemieAttackSound();
                    this.playAnimation(this.IMAGES_ATTACK);
                    if (this.currentImage >= this.IMAGES_ATTACK.length) {
                        this.inAttack = false;
                    }
                }
            } else if (this.Type !== 'Mage-Monster') {
                this.inAttack = false;
            }
        }, 160);

        setInterval(() => {
            if (this.character && this.Type == 'Mage-Monster' && !this.isDead()) {
                if (Math.abs(this.character.x - this.x) <= 204) {
                    if (!this.inAttack) {
                        this.startFireBallAttack();
                    } else if (this.inAttack) {
                        this.playAnimation(this.IMAGES_ATTACK);
                        if (this.currentImage >= this.IMAGES_ATTACK.length && !this.hasFired) {
                            this.playFireBallAttackEndboss();
                        }
                    }
                } else if (this.Type == 'Mage-Monster') {
                    this.inAttack = false;
                }
            }
        }, 160);

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


    startFireBallAttack() {
        this.currentImage = 0;
        this.inAttack = true;
        this.hasFired = false;
    }


    playFireBallAttackEndboss() {
        let fireBallX = this.otherDirection ? this.x + 102 : this.x;
        this.world.throwFireBallFromEndboss(fireBallX, this.y, this.otherDirection, this);
        this.hasFired = true;
        this.inAttack = false;
    }


    handleDeathAnimation() {
        if (!this.inDeadAnimation) {
            this.currentImage = 0;
            this.inDeadAnimation = true;
        }
        this.playAnimation(this.IMAGES_DEAD);
        if (this.currentImage >= this.IMAGES_DEAD.length) {
            this.markedForDeletion = true;
            this.world.level.AUDIO_BACKGROUND.pause();
            this.rewardCoinsForEndboss();
            setTimeout(() => {
                gameWin();
            }, 3000);
        }
    }


    rewardCoinsForEndboss() {
        let coinsToAdd;
        if (this.Type === 'Mage-Monster') coinsToAdd = 25;
        else if (this.Type === 'Demon-Monster') coinsToAdd = 20;
        else if (this.Type === 'Ooze-Monster') coinsToAdd = 15;
        this.incrementCoinCount(coinsToAdd); // z. B. 20 Coins, alle 100ms
        this.coinsGiven = true;
    }


    incrementCoinCount(coinsToAdd) {
        let steps = 0;
        const interval = setInterval(() => {
            if (steps >= coinsToAdd) {
                clearInterval(interval);
                return;
            }
            this.character.coinCount++;
            this.world.playCollectCoinSound();
            steps++;
        }, 100);
    }


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