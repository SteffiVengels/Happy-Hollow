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
        ],
        fireBall: [
            './assets/img/10-magic-sprite-sheet-effects-pixel-art/10 Fire ball/fire-ball/tile000.png',
            './assets/img/10-magic-sprite-sheet-effects-pixel-art/10 Fire ball/fire-ball/tile001.png',
            './assets/img/10-magic-sprite-sheet-effects-pixel-art/10 Fire ball/fire-ball/tile002.png',
            './assets/img/10-magic-sprite-sheet-effects-pixel-art/10 Fire ball/fire-ball/tile003.png',
            './assets/img/10-magic-sprite-sheet-effects-pixel-art/10 Fire ball/fire-ball/tile004.png',
            './assets/img/10-magic-sprite-sheet-effects-pixel-art/10 Fire ball/fire-ball/tile005.png',
            './assets/img/10-magic-sprite-sheet-effects-pixel-art/10 Fire ball/fire-ball/tile006.png',
            './assets/img/10-magic-sprite-sheet-effects-pixel-art/10 Fire ball/fire-ball/tile007.png'
        ]
    };


    constructor(type, x, y) {
        let basePath;

        if (type === 'fireBall') {
            basePath = './assets/img/10-magic-sprite-sheet-effects-pixel-art/10 Fire ball/fire-ball';
        } else {
            basePath = `./assets/img/platformer-pixel-art-tileset/Objects_Animated/${type}`;
        }

        const firstImage = `${basePath}/tile000.png`;
        super(firstImage, x, y);
        this.type = type;
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.animationImages = this.animations[type];
        this.loadImages(this.animationImages);
        this.animate();
    }

    /**
     * Starts animation and movement loops.
     * Plays the animation frames in a set interval.
     * If type is 'fireBall', moves the object horizontally each frame.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.animationImages)
        }, 120);

        setInterval(() => {
            if (this.type === "fireBall") {
                this.x += this.otherDirection ? -this.speed : this.speed;
            }
        }, 1000 / 60);
    }
}