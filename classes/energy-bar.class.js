class EnergyBar extends StatusBar {
    IMAGES = [
        './assets/img/game-ui-pixel-art/2 Bars/Energybar_empty.png',
        './assets/img/game-ui-pixel-art/2 Bars/energybar/energybar12.5.png',
        './assets/img/game-ui-pixel-art/2 Bars/energybar/energybar25.png',
        './assets/img/game-ui-pixel-art/2 Bars/energybar/energybar37.5.png',
        './assets/img/game-ui-pixel-art/2 Bars/energybar/energybar50.png',
        './assets/img/game-ui-pixel-art/2 Bars/energybar/energybar62.5.png',
        './assets/img/game-ui-pixel-art/2 Bars/energybar/energybar75.png',
        './assets/img/game-ui-pixel-art/2 Bars/energybar/energybar87.5.png',
        './assets/img/game-ui-pixel-art/2 Bars/Energybar_full.png'
    ];

    
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 110;
        this.y = 40;
        this.width = 154;
        this.height = 20;
        this.setPercentage(100);
    }
}