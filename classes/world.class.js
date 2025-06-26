class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    console.log(this.character.energy)
                }
            });
        }, 200);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.statusBar);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

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