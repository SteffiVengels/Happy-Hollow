class BackgroundObjects extends MovableObject {

    constructor(imagePath, x, y, height, width) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.imagePath = imagePath;
    }
}