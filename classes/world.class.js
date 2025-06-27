class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 100);
    }

    checkThrowObjects() {
        if(this.keyboard.F) {
            let rock = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObjects.push(rock);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
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
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
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