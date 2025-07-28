function createEndBossLevel1(character, world, Type) {
    return new Level(
        new Audio('./assets/audio/game_start.mp3'),
        [
            new EndbossLevel1(character, world, Type)
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
            new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Objects/Trees/Tree1.png', 40, 300, 154, 102),
            new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Objects/Trees/Tree_Back2.png', 420, 125, 154, 102),
            new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Objects/Trees/Tree3.png', 550, 302, 102, 51),
            new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Objects/Grass/Grass5_1.png', 560, 353, 51, 51),
            new AnimatedObjects('flag', 3500, 397)
        ],
        [],
        [
            new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 0, 448, 32, 32)
        ],
        false
    );
}