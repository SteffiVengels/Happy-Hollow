class Bear extends MovableObject {
    height = 64;
    width = 64;
    y = 384;


    constructor() {
        super().loadImage('./assets/img/tiny-monsters-pixel-art-pack/1 Bear/Bear.png');
        this.x = 300 + Math.random() * 400;
    }

}