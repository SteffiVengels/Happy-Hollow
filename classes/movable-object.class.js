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

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 398;
        }
    }

    isColliding(movabelObj) {
        return this.x + this.width - this.offset.right > movabelObj.x + movabelObj.offset.left &&
            this.y + this.height - this.offset.bottom > movabelObj.y + movabelObj.offset.top &&
            this.x + this.offset.left < movabelObj.x + movabelObj.width - movabelObj.offset.right &&
            this.y + this.offset.top < movabelObj.y + movabelObj.height - movabelObj.offset.bottom;
    }

    hit() {
        this.health -= 5;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    select(food) {
        const index = this.world.level.foodItems.indexOf(food);
        if (index > -1) {
            this.world.level.foodItems.splice(index, 1);
        }
        if (this.energy > 100) {
            this.energy = 100;
        } else {
            this.energy += 5;
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 1000;
    }

    isDead() {
        return this.health == 0;
    }

    noEnergy() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 15;
    }

    playDeathAnimation(images, intervalTime) {
        this.currentImage = 0;
        let interval = setInterval(() => {
            if (this.currentImage < images.length) {
                const path = images[this.currentImage];
                if (this.imageCache[path]) {
                    this.img = this.imageCache[path];
                }
                this.currentImage++;
            } else {
                clearInterval(interval);
                this.dead = true;
            }
            console.log('DEAD Animation frame:', this.currentImage);
        }, intervalTime);
    }

    applyBounce() {
        this.speedY = 10;
        this.y = 398;
    }



}