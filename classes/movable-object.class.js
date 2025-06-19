class MovableObject {
    x = 50;
    y = 398;
    img;
    height = 50;
    width = 50;
    imageCache;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(path) {
            this.imageCache = new Image();
            this.imageCache.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        console.log('Moving left');
    }
}