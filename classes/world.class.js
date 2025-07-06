class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    energyBar = new EnergyBar();
    throwableObjects = [];
    portraitImg = new Image();
    portraitFrameImg = new Image();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.portraitFrameImg.src = this.character.IMAGE_PORTRAIT[0];
        this.portraitImg.src = this.character.IMAGE_PORTRAIT[1];
        this.setWorld();
        this.draw();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsWithFood();
        }, 120);
    }

    throwRock(x, y, otherDirection) {
        let rock = new ThrowableObject(x, y, otherDirection, this.character, this);
        this.throwableObjects.push(rock);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.health);
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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        // Space for fixed objects
        this.ctx.drawImage(this.portraitImg, 22, 22, 32, 32);
        this.ctx.drawImage(this.portraitFrameImg, 10, 10, 56, 56);
        this.addToMap(this.statusBar);
        this.addToMap(this.energyBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.foodItems);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
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