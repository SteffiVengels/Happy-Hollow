class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.backgroundObjects);
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
            this.ctx.save();
            this.ctx.translate(movabelObj.width, 0);
            this.ctx.scale(-1, 1);
            movabelObj.x = movabelObj.x * -1;
        }
        this.ctx.drawImage(movabelObj.img, movabelObj.x, movabelObj.y, movabelObj.width, movabelObj.height);
        if (movabelObj.otherDirection) {
            movabelObj.x = movabelObj.x * -1;
            this.ctx.restore();
        }
    }

    generateBackgroundLayers() {
        const background = [];
        const layerCount = 8;
        const tileWidth = 719;
        const repeatFrom = -1;
        const repeatTo = 3;

        for (let repeat = repeatFrom; repeat <= repeatTo; repeat++) {
            const x = repeat * tileWidth;
            for (let i = layerCount; i >= 1; i--) {
                background.push(
                    new Background(`./assets/img/platformer-pixel-art-tileset/Background/Layers/${i}.png`, x)
                );
            }
        }

        return background;
    }

    generateBackgroundObjects() {
        const tileWidth = 32;
        const startX = -720;
        const endX = 2876;
        const y = 448;
        const tilePath = './assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png';
        const backgroundObjects = []; // <- Array anlegen

        for (let x = startX; x <= endX; x += tileWidth) {
            backgroundObjects.push(new BackgroundObjects(tilePath, x, y, tileWidth, tileWidth));
        }

        return backgroundObjects; // <- nicht vergessen zurückzugeben!
    }
}