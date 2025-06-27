class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('./assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/Rock2.png');
        this.x = x + 35;
        this.y = y;
        this.height = 16;
        this.width = 16;
        this.throw();
    }

    throw() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 4;
        }, 1000 / 60);
    }

}