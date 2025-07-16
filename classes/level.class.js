class Level {
    enemies;
    foodItems;
    background;
    coins;
    backgroundObjects;
    groundObjects;
    level_end_x = 670;

    constructor(enemies, foodItems, background, coins, backgroundObjects, groundObjects, repeatBackground = true) {
        this.enemies = enemies;
        this.foodItems = foodItems;
        this.background = background;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
        this.groundObjects = groundObjects;
        if (repeatBackground) {
            this.level_end_x = 7100;

        }
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