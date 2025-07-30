class Level {
    AUDIO_BACKGROUND;
    enemies;
    foodItems;
    background;
    coins;
    backgroundObjects;
    spikes;
    groundObjects;
    level_end_x = 670;


    constructor(AUDIO_BACKGROUND, enemies, foodItems, background, coins, backgroundObjects, spikes, groundObjects, repeatBackground = true) {
        this.AUDIO_BACKGROUND = AUDIO_BACKGROUND;
        this.enemies = enemies;
        this.foodItems = foodItems;
        this.background = background;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
        this.spikes = spikes;
        this.groundObjects = groundObjects;
        if (repeatBackground) {
            this.level_end_x = 7100;
        }
        this.repeatBackground();
        this.repeatGroundObjects();
        if (musicOn) {
            this.playBackgroundMusic();
        }

    }

    playBackgroundMusic() {
        this.AUDIO_BACKGROUND.play();
        this.AUDIO_BACKGROUND.loop = true;
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