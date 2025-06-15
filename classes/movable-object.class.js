class MovableObject {
    x = 120;
    y = 400;
    img;
    height = 50;
    width = 50;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        console.log('Moving left');
    }
}