class Level {
    enemies;
    foodItems;
    background;
    backgroundObjects;
    groundObjects;
    level_end_x = 3500;

    constructor(enemies, foodItems, background, backgroundObjects, groundObjects) {
        this.enemies = enemies;
        this.foodItems = foodItems;
        this.background = background;
        this.backgroundObjects = backgroundObjects;
        this.groundObjects = groundObjects;
        this.repeatBackground();
        this.repeatGroundObjects();

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

    repeatGroundObjects() {
        const repeatedObjects = [];

        for (let x = 0; x <= this.level_end_x + 100; x += 32) {
            for (let i = 0; i < this.groundObjects.length; i++) {
                const original = this.groundObjects[i];
                repeatedObjects.push(
                    new BackgroundObjects(original.imagePath, x, original.y, original.width, original.height)
                );
            }
        }

        this.groundObjects = repeatedObjects;
    }
}