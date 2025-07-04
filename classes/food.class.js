class Food extends DrawableObject {

    constructor() {
        super();
        this.loadImage('./assets/img/platformer-pixel-art-tileset/Objects/Food/Cake2.png');
        this.height = 26;
        this.width = 26;
        this.y = 422;
        this.x = 300 + Math.random() * 400;
        console.log(this.img)

    }
}