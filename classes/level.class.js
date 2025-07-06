class Level {
    enemies;
    foodItems;
    background;
    backgroundObjects;
    level_end_x = 1400;

    constructor(enemies, foodItems, background, backgroundObjects) {
        this.enemies = enemies;
        this.foodItems = foodItems;
        this.background = background;
        this.backgroundObjects = backgroundObjects;

    }
}