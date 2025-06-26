class StatusBar extends DrawableObject {
    IMAGES = [
        './assets/img/game-ui-pixel-art/2 Bars/Healthbar_empty.png',
        './assets/img/game-ui-pixel-art/2 Bars/healthbar/healthbar12.5.png',
        './assets/img/game-ui-pixel-art/2 Bars/healthbar/healthbar25.png',
        './assets/img/game-ui-pixel-art/2 Bars/healthbar/healthbar37.5.png',
        './assets/img/game-ui-pixel-art/2 Bars/healthbar/healthbar50.png',
        './assets/img/game-ui-pixel-art/2 Bars/healthbar/healthbar62.5.png',
        './assets/img/game-ui-pixel-art/2 Bars/healthbar/healthbar75.png',
        './assets/img/game-ui-pixel-art/2 Bars/healthbar/healthbar87.5.png',
        './assets/img/game-ui-pixel-art/2 Bars/Healthbar_full.png'
    ];
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 20;
        this.width = 154;
        this.height = 20;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage < 12.5) {
            return 1;
        } else if (this.percentage < 25) {
            return 2;
        } else if (this.percentage < 37.5) {
            return 3;
        } else if (this.percentage < 50) {
            return 4;
        } else if (this.percentage < 62.5) {
            return 5;
        } else if (this.percentage < 75) {
            return 6;
        } else if (this.percentage < 87.5) {
            return 7;
        } else {
            return 8;
        }
    }
}