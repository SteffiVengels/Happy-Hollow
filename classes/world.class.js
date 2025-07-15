class World {
    character = new Character();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    energyBar = new EnergyBar();
    throwableObjects = [];
    portraitImg = new Image();
    portraitFrameImg = new Image();
    coinImg = new Image();
    animationFrameId;

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.portraitFrameImg.src = this.character.IMAGE_PORTRAIT[0];
        this.portraitImg.src = this.character.IMAGE_PORTRAIT[1];
        this.coinImg.src = './assets/img/platformer-pixel-art-tileset/Objects_Animated/coin/tile000.png';
        this.level.enemies.forEach(enemy => {
            enemy.character = this.character; // oder direkt setzen
            enemy.world = this;
        });
        this.setWorld();
        this.draw();
        this.run();
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsWithFood();
            this.checkCollisionsWithCoins();
            this.checkRockHitsEnemy();
            this.cleanUpDeadEnemies();
            this.checkFireBallHitsCharacter();
            this.checkLevelEnd();
            this.checkCollisionsWithEndboss();
        }, 120);
    }

    stopDrawing() {
        cancelAnimationFrame(this.animationFrameId);
    }

    checkLevelEnd() {
        const flag = this.level.backgroundObjects.find(obj => obj.type === 'flag');
        if (flag && this.character.isColliding(flag)) {
            this.triggerLevelEndTransition();
        }
    }

    triggerLevelEndTransition() {
        if (this.transitioning) return;
        this.transitioning = true;
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

    throwRock(x, y, otherDirection) {
        let rock = new ThrowableObject(x, y, otherDirection, this.character, this);
        this.throwableObjects.push(rock);
    }

    throwFireBall(x, y, otherDirection, enemy) {
        let fireBall = new AnimatedObjects('fireBall', x, y);
        fireBall.otherDirection = !otherDirection;
        fireBall.owner = enemy;
        this.throwableObjects.push(fireBall);
    }

    throwFireBallFromEndboss(x, y, otherDirection, enemy) {
        let fireBallEndboss = new FireBallEndboss(x, y, otherDirection, enemy, this);
        fireBallEndboss.owner = enemy;
        this.throwableObjects.push(fireBallEndboss);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof EndbossLevel1) return;

            if (this.character.isColliding(enemy)) {
                if (this.didJumpOnEnemy(enemy)) {
                    enemy.health = 0;
                    this.character.applyBounce();
                } else if (!enemy.inDeadAnimation) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.health);
                }
            }
        });
    }

    checkCollisionsWithEndboss() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof EndbossLevel1 && !enemy.inDeadAnimation) {
                if (this.character.isColliding(enemy) && !this.character.isHurt()) {
                    this.character.hit();
                    console.log('health', this.character.health)
                    this.statusBar.setPercentage(this.character.health);
                }
            }
        });
    }

    checkCollisionsWithFood() {
        this.level.foodItems.forEach((food) => {
            if (this.character.isColliding(food)) {
                this.character.select(food);
                this.energyBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionsWithCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.coinCount++;
                this.level.coins.splice(index, 1); // Entfernt eingesammelte Münze
            }
        });
    }

    checkRockHitsEnemy() {
        this.throwableObjects.forEach(obj => {
            if (obj instanceof ThrowableObject) {
                this.level.enemies.forEach(enemy => {
                    if (!enemy.isDead() && obj.isColliding(enemy)) {
                        const now = Date.now();
                        if (now - enemy.lastHit > 400) { // 300ms Schutzzeit
                            if (enemy instanceof EndbossLevel1) {
                                enemy.health -= 10;
                                console.log('enemy health', enemy.health);
                            } else {
                                enemy.health = 0;
                            }
                            enemy.lastHit = now;
                        }
                    }
                });
            }
        });
    }

    checkFireBallHitsCharacter() {
        this.throwableObjects.forEach((obj, index) => {
            // Nur prüfen, wenn es ein Fireball ist
            if ((obj instanceof AnimatedObjects && obj.type === 'fireBall') || (obj instanceof FireBallEndboss)) {

                if (this.character.isColliding(obj) && !this.didJumpOnEnemy(obj.owner)) {
                    this.character.hit(); // Charakter bekommt Schaden
                    this.statusBar.setPercentage(this.character.health);

                    // Fireball aus dem Spiel entfernen
                    this.throwableObjects.splice(index, 1);
                }
            }
        });
    }

    cleanUpDeadEnemies() {
        this.level.enemies = this.level.enemies.filter(enemy =>
            !enemy.markedForDeletion || enemy.currentImage < enemy.IMAGES_DEAD.length
        );
    }

    didJumpOnEnemy(enemy) {
        const enemyHeight = enemy.y + ((enemy.height - enemy.offset.top));
        const characterHeight = this.character.y + (this.character.height - this.character.offset.top);
        const isAbove = characterHeight < enemyHeight;
        const isFalling = this.character.speedY < 0;
        const isColliding = this.character.isColliding(enemy);
        return isAbove && isFalling && isColliding;
    }

    draw() {
        if (this.transitioning) {

            return;
        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.translate(this.camera_x, 0);

            this.addObjectsToMap(this.level.background);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.groundObjects);

            this.ctx.translate(-this.camera_x, 0);
            // Space for fixed objects
            this.ctx.drawImage(this.portraitImg, 29, 29, 51, 51);
            this.ctx.drawImage(this.portraitFrameImg, 10, 10, 90, 90);
            this.ctx.drawImage(this.coinImg, 610, 10, 51, 51);
            this.ctx.font = '20px Pixel, Planes';
            this.ctx.fillStyle = 'white';
            this.ctx.fillText(`x ${this.character.coinCount}`, 660, 41);
            this.addToMap(this.statusBar);
            this.addToMap(this.energyBar);
            this.ctx.translate(this.camera_x, 0);

            this.addToMap(this.character);
            this.addObjectsToMap(this.level.foodItems);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.throwableObjects);

            this.ctx.translate(-this.camera_x, 0);

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

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(movabelObj) {
        if (movabelObj.otherDirection) {
            this.flipImage(movabelObj);
        }
        movabelObj.draw(this.ctx);
        movabelObj.drawFrame(this.ctx);
        movabelObj.drawFrameRed(this.ctx);

        if (movabelObj.otherDirection) {
            this.flipImageBack(movabelObj);
        }
    }

    flipImage(movabelObj) {
        this.ctx.save();
        this.ctx.translate(movabelObj.width, 0);
        this.ctx.scale(-1, 1);
        movabelObj.x = movabelObj.x * -1;
    }

    flipImageBack(movabelObj) {
        movabelObj.x = movabelObj.x * -1;
        this.ctx.restore();
    }

}