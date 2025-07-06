class BossDemon extends MovableObject {
    height = 154;
    width = 154;
    y = 294;
    IMAGES_WALKING = [
        './assets/img/boss-monsters-pixel-art/2 Demon/sneer/tile000.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/sneer/tile001.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/sneer/tile002.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/sneer/tile003.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/sneer/tile004.png',
        './assets/img/boss-monsters-pixel-art/2 Demon/sneer/tile005.png',
    ];
    offset = {
        top: 60,
        left: 50,
        right: 0,
        bottom: 0
    };



    constructor() {
        super().loadImage('./assets/img/boss-monsters-pixel-art/2 Demon/Demon_Boss.png');
        this.x = 700;
        console.log(this.x)
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);

    }
}