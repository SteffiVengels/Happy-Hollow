class World {
    character = new Character();
    enemies = [
        new Bear(),
        new Mage(),
        new Ooze(),
    ];
    background = [
        new Background('./assets/img/platformer-pixel-art-tileset/Background/Layers/8.png'),
        new Background('./assets/img/platformer-pixel-art-tileset/Background/Layers/7.png'),
        new Background('./assets/img/platformer-pixel-art-tileset/Background/Layers/6.png'),
        new Background('./assets/img/platformer-pixel-art-tileset/Background/Layers/5.png'),
        new Background('./assets/img/platformer-pixel-art-tileset/Background/Layers/4.png'),
        new Background('./assets/img/platformer-pixel-art-tileset/Background/Layers/3.png'),
        new Background('./assets/img/platformer-pixel-art-tileset/Background/Layers/2.png'),
        new Background('./assets/img/platformer-pixel-art-tileset/Background/Layers/1.png'),
    ]
    backgroundObjects = [
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 0, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 32, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 64, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 96, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 128, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 160, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 192, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 224, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 256, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 288, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 320, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 352, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 384, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 416, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 448, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 480, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 512, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 544, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 576, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 608, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 640, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 672, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 704, 448, 32, 32),
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 736, 448, 32, 32),
    ]
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas
        this.draw();

    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.background);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(movabelObj) {
        this.ctx.drawImage(movabelObj.img, movabelObj.x, movabelObj.y, movabelObj.width, movabelObj.height);
    }
}