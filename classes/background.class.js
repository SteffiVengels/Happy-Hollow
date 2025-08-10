class Background extends MovableObject {
    width = 720;
    height = 480;
    y = 0;
    imagePath;


    constructor(imagePath, x) {
        super(); 
        this.x = x;
        this.imagePath = imagePath;
        this.loadImage(imagePath);
    }
}