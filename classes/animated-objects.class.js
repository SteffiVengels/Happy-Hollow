class AnimatedObjects extends BackgroundObjects {
    height = 51;
    width = 51;
    animations = {
        flag: [
            './assets/img/platformer-pixel-art-tileset/Objects_Animated/flag/tile000.png',
            './assets/img/platformer-pixel-art-tileset/Objects_Animated/flag/tile001.png',
            './assets/img/platformer-pixel-art-tileset/Objects_Animated/flag/tile002.png',
            './assets/img/platformer-pixel-art-tileset/Objects_Animated/flag/tile003.png',
            './assets/img/platformer-pixel-art-tileset/Objects_Animated/flag/tile004.png',
            './assets/img/platformer-pixel-art-tileset/Objects_Animated/flag/tile005.png',
            './assets/img/platformer-pixel-art-tileset/Objects_Animated/flag/tile006.png',
            './assets/img/platformer-pixel-art-tileset/Objects_Animated/flag/tile007.png'
        ],
        coin: [
            './assets/img/platformer-pixel-art-tileset/Objects_Animated/coin/tile000.png',
            './assets/img/platformer-pixel-art-tileset/Objects_Animated/coin/tile001.png',
            './assets/img/platformer-pixel-art-tileset/Objects_Animated/coin/tile002.png',
            './assets/img/platformer-pixel-art-tileset/Objects_Animated/coin/tile003.png',
            './assets/img/platformer-pixel-art-tileset/Objects_Animated/coin/tile004.png',
            './assets/img/platformer-pixel-art-tileset/Objects_Animated/coin/tile005.png',
            './assets/img/platformer-pixel-art-tileset/Objects_Animated/coin/tile006.png',
            './assets/img/platformer-pixel-art-tileset/Objects_Animated/coin/tile007.png'
        ]
    };

    constructor(type, x, y) {
        const firstImage = `./assets/img/platformer-pixel-art-tileset/Objects_Animated/${type}/tile000.png`;
        if (type === 'coin') {
            x = 719 + Math.random() * 2700;
            y = 322 + Math.random() * 50;
        }
        super(firstImage, x, y);
        this.type = type;
        this.x = x;
        this.y = y;
        this.animationImages = this.animations[type];
        this.loadImages(this.animationImages);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.animationImages)
        }, 120);
    }
}