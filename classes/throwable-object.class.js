class ThrowableObject extends MovableObject {

    constructor(x, y, otherDirection, character, world) {
        super().loadImage('./assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/Rock2.png');
        this.x = x + 20;
        this.y = y + 15;
        this.height = 16;
        this.width = 16;
        this.otherDirection = otherDirection;
        this.character = character;
        this.world = world;
        this.throw();
    }

    throw() {
        this.speedY = 10;
        this.character.energy -= 10;
        this.world.energyBar.setPercentage(this.character.energy);
        this.applyGravity();
        setInterval(() => {
            if (this.otherDirection) {
                this.x -= 4;
            } else {
                this.x += 4;
            }
        }, 1000 / 60);
    }

}