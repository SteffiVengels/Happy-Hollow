function createEndBossLevel() {
return new Level(
    [
        new BossDemon()
    ],
    [],
    [
        new Background('./assets/img/platformer-pixel-art-tileset/Background/Layers/8.png', 0),
        new Background('./assets/img/platformer-pixel-art-tileset/Background/Layers/7.png', 0),
        new Background('./assets/img/platformer-pixel-art-tileset/Background/Layers/6.png', 0),
        new Background('./assets/img/platformer-pixel-art-tileset/Background/Layers/5.png', 0),
        new Background('./assets/img/platformer-pixel-art-tileset/Background/Layers/4.png', 0),
        new Background('./assets/img/platformer-pixel-art-tileset/Background/Layers/3.png', 0),
        new Background('./assets/img/platformer-pixel-art-tileset/Background/Layers/2.png', 0),
        new Background('./assets/img/platformer-pixel-art-tileset/Background/Layers/1.png', 0)
    ],
    [],
    [
        new AnimatedObjects('flag', 3500, 397)
    ],
    [
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 0, 448, 32, 32)
    ],
    false

);
}