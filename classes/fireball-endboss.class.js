class FireBallEndboss extends MovableObject {


    constructor(x, y, otherDirection, owner, world) {
        super().loadImage('./assets/img/boss-monsters-pixel-art/1 Mage/Attack2_3_FireBall.png');
        this.x = x;
        this.y = y + 74;
        this.height = 16;
        this.width = 16;
        this.otherDirection = otherDirection;
        this.owner = owner;
        this.world = world;
        this.speed = 6;
        this.throw();
    }

    /**
     * Starts the movement of the fireball, moving it continuously in the specified direction.
     */
    throw() {
        setInterval(() => {
            this.x += this.otherDirection ? this.speed : -this.speed;
        }, 1000 / 60);
    }

}