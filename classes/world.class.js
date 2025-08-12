class World {
    canvas;
    ctx;
    camera_x = 0;
    statusBar = new StatusBar(110, 10);
    energyBar = new EnergyBar();
    throwableObjects = [];
    portraitImg = new Image();
    portraitFrameImg = new Image();
    coinImg = new Image();
    animationFrameId;


    constructor(canvas, level, audioManager) {
        this.character = new Character(selectedCharacterType);
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = new Keyboard(this.character);
        this.level = level;
        this.audioManager = audioManager;
        this.portraitFrameImg.src = this.character.IMAGE_PORTRAIT[0];
        this.portraitImg.src = this.character.IMAGE_PORTRAIT[1];
        this.coinImg.src = './assets/img/platformer-pixel-art-tileset/Objects_Animated/coin/tile000.png';
        this.level.enemies.forEach(enemy => {
            enemy.character = this.character;
            enemy.world = this;
        });
        this.setWorld();
        this.draw();
        this.run();
    }


    /**
     * Clears all active intervals in the window.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }


    /**
     * Sets the world reference on the character.
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * Runs the main game logic checks repeatedly.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionWithSpikes();
            this.checkCollisionsWithFood();
            this.checkCollisionsWithCoins();
            this.checkRockHitsEnemy();
            this.cleanUpDeadEnemies();
            this.checkFireBallHitsCharacter();
            this.checkLevelEnd();
        }, 120);
    }


    /**
     * Stops the animation frame loop.
     */
    stopDrawing() {
        cancelAnimationFrame(this.animationFrameId);
    }


    /**
     * Checks if the level end flag is reached and triggers level transition.
     */
    checkLevelEnd() {
        const flag = this.level.backgroundObjects.find(obj => obj.type === 'flag');
        if (flag && this.character.isColliding(flag)) {
            this.triggerLevelEndTransition();
        }
    }


    /**
     * Handles the level end transition with audio and visual effects.
     */
    triggerLevelEndTransition() {
        if (this.transitioning) return;
        this.transitioning = true;
        this.audioManager.stopMusic(this.audioManager.AUDIO_LEVEL1_BACKGROUND);
        fadeOutToWhite(this.canvas, () => {
            if (world) {
                world.clearAllIntervals();
                world.stopDrawing();
            }
            world = loadEndbossLevel(this.canvas, this.keyboard);
            fadeInFromWhite();
            this.transitioning = false;
        });
    }


    /**
     * Creates and adds a rock throwable object to the world.
     * @param {number} x - Starting x position.
     * @param {number} y - Starting y position.
     * @param {boolean} otherDirection - Direction of the throw.
     */
    throwRock(x, y, otherDirection) {
        let rock = new ThrowableObject(x, y, otherDirection, this.character, this);
        this.throwableObjects.push(rock);
    }


    /**
     * Creates and adds a fireball throwable object to the world.
     * @param {number} x - Starting x position.
     * @param {number} y - Starting y position.
     * @param {boolean} otherDirection - Direction of the fireball.
     * @param {Object} enemy - Owner of the fireball.
     */
    throwFireBall(x, y, otherDirection, enemy) {
        let fireBall = new AnimatedObjects('fireBall', x, y);
        fireBall.otherDirection = !otherDirection;
        fireBall.owner = enemy;
        this.throwableObjects.push(fireBall);
    }


    /**
     * Creates and adds a fireball from the endboss to the world.
     * @param {number} x - Starting x position.
     * @param {number} y - Starting y position.
     * @param {boolean} otherDirection - Direction of the fireball.
     * @param {Object} enemy - Owner of the fireball (endboss).
     */
    throwFireBallFromEndboss(x, y, otherDirection, enemy) {
        let fireBallEndboss = new FireBallEndboss(x, y, otherDirection, enemy, this);
        fireBallEndboss.owner = enemy;
        this.throwableObjects.push(fireBallEndboss);
    }


    /**
     * Checks collisions between character and enemies (excluding endboss).
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (!this.character.isColliding(enemy)) return;
            if (this.didJumpOnEnemy(enemy)) {
                if (enemy instanceof EndbossLevel1) {
                    enemy.health -= 12.5;
                    enemy.endbossStatusBar.setPercentage(enemy.health);
                    enemy.lastHit = now;
                } else {
                    enemy.health = 0;
                }
                this.character.applyBounce();
            } else if (!enemy.inDeadAnimation && !this.character.isHurt()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.health);
                this.character.lastHit = Date.now();
            }
        });
    }



    /**
     * Checks collisions between character and food items.
     */
    checkCollisionsWithFood() {
        this.level.foodItems.forEach((food) => {
            if (this.character.isColliding(food)) {
                this.character.select(food);
                this.energyBar.setPercentage(this.character.energy);
                this.audioManager.playSound(this.audioManager.AUDIO_COLLECT_FOOD);
            }
        });
    }


    /**
     * Checks collisions between character and spikes.
     */
    checkCollisionWithSpikes() {
        this.level.spikes.forEach((obj) => {
            if (this.character.isColliding(obj)) {
                if (!this.character.isHurt()) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.health);
                }
            }
        });
    }


    /**
     * Checks collisions between character and coins.
     */
    checkCollisionsWithCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.coinCount++;
                this.level.coins.splice(index, 1);
                this.audioManager.playSound(this.audioManager.AUDIO_COLLECT_COINS);;

            }
        });
    }


    /**
      * Checks if thrown rocks hit any enemies.
      */
    checkRockHitsEnemy() {
        this.throwableObjects.forEach(obj => {
            if (obj instanceof ThrowableObject) {
                this.checkCollisionWithEnemies(obj);
            }
        });
    }


    /**
     * Checks collision of a throwable object with enemies.
     * @param {ThrowableObject} obj - Throwable object to check collisions for.
     */
    checkCollisionWithEnemies(obj) {
        this.level.enemies.forEach(enemy => {
            if (!enemy.isDead() && obj.isColliding(enemy)) {
                this.handleEnemyHit(enemy);

            }
        });
    }


    /**
      * Handles damage to enemy if hit by a throwable.
      * @param {Object} enemy - Enemy to be damaged.
      */
    handleEnemyHit(enemy) {
        const now = Date.now();
        if (now - enemy.lastHit > 1000) {
            if (enemy instanceof EndbossLevel1) {
                enemy.health -= 12.5;
                enemy.endbossStatusBar.setPercentage(enemy.health);
            } else {
                enemy.health = 0;
            }
            enemy.lastHit = now;
        }
    }


    /**
     * Checks if fireballs hit the character.
     */
    checkFireBallHitsCharacter() {
        this.throwableObjects.forEach((obj, index) => {
            if ((obj instanceof AnimatedObjects && obj.type === 'fireBall') || (obj instanceof FireBallEndboss)) {
                if (this.character.isColliding(obj) && !this.didJumpOnEnemy(obj.owner)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.health);
                    this.throwableObjects.splice(index, 1);
                }
            }
        });
    }


    /**
     * Removes enemies marked for deletion or finished death animation.
     */
    cleanUpDeadEnemies() {
        this.level.enemies = this.level.enemies.filter(enemy =>
            !enemy.markedForDeletion || enemy.currentImage < enemy.IMAGES_DEAD.length
        );
    }


    /**
     * Checks if the character jumped on an enemy.
     * @param {Object} enemy - Enemy to check against.
     * @returns {boolean} True if character jumped on enemy.
     */
    didJumpOnEnemy(enemy) {
        const enemyHeight = enemy.y + ((enemy.height - enemy.offset.top));
        const characterHeight = this.character.y + (this.character.height - this.character.offset.top);
        const isAbove = characterHeight < enemyHeight;
        const isFalling = this.character.speedY < 0;
        const isColliding = this.character.isColliding(enemy);
        console.log('isAbove', isAbove, 'IsFalling', isFalling, 'isColliding', isColliding)
        return isAbove && isFalling && isColliding;
    }


    /**
     * Main draw loop for the game world.
     */
    draw() {
        if (this.transitioning) {
            return;
        } else {
            this.drawLevel();
            if (fadeOverlayOpacity > 0) {
                this.ctx.fillStyle = `rgba(255, 255, 255, ${fadeOverlayOpacity})`;
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }
            let self = this;
            this.animationFrameId = requestAnimationFrame(function () {
                self.draw();
            });
        }
    }


    /**
     * Draws the entire level including background and objects.
     */
    drawLevel() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawBackground();
        this.drawFixedObjects();
        this.drawObjects();
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * Draws background layers.
     */
    drawBackground() {
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.spikes);
        this.addObjectsToMap(this.level.groundObjects);
    }


    /**
     * Draws fixed UI and HUD elements.
     */
    drawFixedObjects() {
        const endboss = this.level.enemies.find(e => e instanceof EndbossLevel1);
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.drawImage(this.portraitImg, 29, 29, 51, 51);
        this.ctx.drawImage(this.portraitFrameImg, 10, 10, 90, 90);
        this.ctx.drawImage(this.coinImg, 610, 10, 51, 51);
        this.ctx.font = '20px Pixel, Planes';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`x ${this.character.coinCount}`, 660, 41);
        this.addToMap(this.statusBar);
        this.addToMap(this.energyBar);
        if (endboss) this.addToMap(endboss.endbossStatusBar);
        this.ctx.translate(this.camera_x, 0);
    }


    /**
     * Draws character, food items, enemies and throwable objects.
     */
    drawObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.foodItems);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }


    /**
     * Adds multiple objects to the map.
     * @param {Array} objects - Array of drawable objects.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    /**
      * Adds a single movable object to the map, applying flip if needed.
      * @param {MovableObject} movabelObj - The object to draw.
      */
    addToMap(movabelObj) {
        if (movabelObj.otherDirection) {
            this.flipImage(movabelObj);
        }
        movabelObj.draw(this.ctx);
        movabelObj.drawFrame(this.ctx);
        if (movabelObj.otherDirection) {
            this.flipImageBack(movabelObj);
        }
    }


    /**
     * Flips the drawing context horizontally for mirrored rendering.
     * @param {MovableObject} movabelObj - The object to flip.
     */
    flipImage(movabelObj) {
        this.ctx.save();
        this.ctx.translate(movabelObj.width, 0);
        this.ctx.scale(-1, 1);
        movabelObj.x = movabelObj.x * -1;
    }


    /**
     * Restores the drawing context after flipping.
     * @param {MovableObject} movabelObj - The object flipped previously.
     */
    flipImageBack(movabelObj) {
        movabelObj.x = movabelObj.x * -1;
        this.ctx.restore();
    }
}