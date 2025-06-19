class Character extends MovableObject {
    totalFrames = 6;
    currentImage = 0;

    constructor() {
        super().loadImage('./assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/Pink_Monster.png');
        this.loadImages('./assets/img/tiny-monsters-pixel-art-pack/1 Bear/Walk.png');
        this.animate();
    }
    

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }


}
