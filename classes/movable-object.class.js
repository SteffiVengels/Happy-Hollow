class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    health = 100;
    energy = 100;
    lastHit = 0;


    /**
     * Applies gravity to the object by adjusting vertical speed and position over time.
     * Runs at approximately 25 frames per second.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.y > 398 && this instanceof Character) {
                    this.y = 398;
                    this.speedY = 0;
                }
            } else {
                this.speedY = 0;
            }
        }, 1000 / 25);
    }


    /**
     * Checks if the object is above the ground level.
     * @returns {boolean} True if above ground or if object is throwable.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 398;
        }
    }


    /**
      * Checks collision with another movable object considering offsets.
      * @param {MovableObject} movabelObj - The other object to check collision against.
      * @returns {boolean} True if this object collides with the other.
      */
    isColliding(movabelObj) {
        return this.x + this.width - this.offset.right > movabelObj.x + movabelObj.offset.left &&
            this.y + this.height - this.offset.bottom > movabelObj.y + movabelObj.offset.top &&
            this.x + this.offset.left < movabelObj.x + movabelObj.width - movabelObj.offset.right &&
            this.y + this.offset.top < movabelObj.y + movabelObj.height - movabelObj.offset.bottom;
    }


    /**
       * Applies damage to the object, reduces health and plays hurt sound.
       * Sets last hit timestamp.
       */
    hit() {
        this.health -= 12.5;
        this.world.audioManager.playSound(this.world.audioManager.AUDIO_HURT);
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Handles the selection of a food item by removing it from the level and restoring energy.
     * @param {Object} food - The food item selected.
     */
    select(food) {
        const index = this.world.level.foodItems.indexOf(food);
        if (index > -1) {
            this.world.level.foodItems.splice(index, 1);
        }
        if (this.energy > 100) {
            this.fullEnergy();
        } else {
            this.giveEenergy();
        }
    }


    /**
     * Sets energy to full (100).
     * @returns {number} Updated energy value.
     */
    fullEnergy() {
        return this.energy = 100;
    }


    /**
     * Increases energy by 5.
     * @returns {number} Updated energy value.
     */
    giveEenergy() {
        return this.energy += 5;
    }


    /**
     * Checks if the object was hurt recently (within 1 second).
     * @returns {boolean} True if recently hurt.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 1000;
    }


    /**
      * Checks if the object is dead (health equals zero).
      * @returns {boolean} True if dead.
      */
    isDead() {
        return this.health == 0;
    }


    /**
     * Checks if the object has no energy left.
     * @returns {boolean} True if energy is zero.
     */
    noEnergy() {
        return this.energy == 0;
    }


    /**
     * Plays an animation by cycling through the given images.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * Initiates a jump by setting vertical speed.
     */
    jump() {
        this.speedY = 15;
    }


    /**
     * Applies a bounce effect by setting vertical speed and position.
     */
    applyBounce(y) {
        this.speedY = 10;
        this.y = y;
    }
}