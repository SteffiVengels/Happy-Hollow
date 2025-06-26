class StatusBar extends DrawableObject {
    IMAGES = [
        './assets/img/game-ui-pixel-art/2 Bars/Healthbar_full.png',
        './assets/img/game-ui-pixel-art/2 Bars/Healthbar_full.png',
        './assets/img/game-ui-pixel-art/2 Bars/Healthbar_full.png',
        './assets/img/game-ui-pixel-art/2 Bars/Healthbar_full.png',
        './assets/img/game-ui-pixel-art/2 Bars/Healthbar_full.png',
        './assets/img/game-ui-pixel-art/2 Bars/Healthbar_full.png'
    ];
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 100;
        this.y = 100;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}