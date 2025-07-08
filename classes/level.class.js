class Level {
    enemies;
    foodItems;
    background;
    backgroundObjects;
    level_end_x = 3500;

    constructor(enemies, foodItems, background, backgroundObjects) {
        this.enemies = enemies;
        this.foodItems = foodItems;
        this.background = background;
        this.backgroundObjects = backgroundObjects;
        this.repeatBackground();
        this.repeatBackgroundObjects();

    }

    repeatBackground() {
        const repeatedBackgrounds = [];

        for (let x = 0; x <= this.level_end_x; x += 719) {
            for (let i = 0; i < this.background.length; i++) {
                const original = this.background[i];
                repeatedBackgrounds.push(new Background(original.imagePath, x));
            }
        }

        this.background = repeatedBackgrounds;
    }

repeatBackgroundObjects() {
    const repeatedObjects = [];

    for (let x = 0; x <= this.level_end_x + 100; x += 32) {
        for (let i = 0; i < this.backgroundObjects.length; i++) {
            const original = this.backgroundObjects[i];
            repeatedObjects.push(
                new BackgroundObjects(original.imagePath, x, original.y, original.width,  original.height)
            );
        }
    }

    this.backgroundObjects = repeatedObjects;
}
}