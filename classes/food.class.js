class Food extends DrawableObject {
    offset = {
        top: 0,
        left: 5,
        right: 5,
        bottom: 0
    };
    constructor() {
        super();
        this.loadImage('./assets/img/platformer-pixel-art-tileset/Objects/Food/Strawberry.png');
        this.height = 26;
        this.width = 26;
        this.y = 422;
        this.x = 300 + Math.random() * 400;
    }
}