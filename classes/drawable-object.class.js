class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;


    /**
     * Loads a single image for the object.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Draws the current image on the canvas.
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


        /**
     * Draws a blue frame around the object for debugging.
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Bear || this instanceof Mage || this instanceof Ooze || this instanceof RedMonster || this instanceof TinyMonster || this instanceof YellowMonster || this instanceof EndbossLevel1) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }


    /**
     * Loads multiple images into the image cache.
     * @param {string[]} arr - Array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}