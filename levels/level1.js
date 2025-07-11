const level1 = new Level(
    [
        new Bear()
    ],
    [
        new Food(),
        new Food(),
        new Food(),
        new Food(),
        new Food(),
        new Food(),
        new Food(),
        new Food(),
        new Food(),
        new Food(),
    ],
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
        [
        new AnimatedObjects('coin', 510, 397),
        new AnimatedObjects('coin', 561, 397),
        new AnimatedObjects('coin', 612, 397),
        new AnimatedObjects('coin', 663, 397),
        new AnimatedObjects('coin', 1179, 397),
        new AnimatedObjects('coin', 1230, 346),
        new AnimatedObjects('coin', 1281, 295),
        new AnimatedObjects('coin', 1332, 270),
        new AnimatedObjects('coin', 1383, 270),
        new AnimatedObjects('coin', 1434, 295),
        new AnimatedObjects('coin', 1485, 346),
        new AnimatedObjects('coin', 1536, 397),
        new AnimatedObjects('coin', 2142, 346),
        new AnimatedObjects('coin', 2193, 346),
        new AnimatedObjects('coin', 2244, 346),
        new AnimatedObjects('coin', 2295, 346),
        new AnimatedObjects('coin', 3162, 397),
        new AnimatedObjects('coin', 3162, 346),
        new AnimatedObjects('coin', 3162, 295)
    ],
    [
        new AnimatedObjects('flag', 3500, 397)
    ],
    [
        new BackgroundObjects('./assets/img/platformer-pixel-art-tileset/Tiles/Tileset/TileSet_02.png', 0, 448, 32, 32)
    ]

);