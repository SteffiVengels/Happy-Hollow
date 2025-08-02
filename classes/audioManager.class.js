class AudioManager {
    AUDIO_JUMPING = new Audio('./assets/audio/jump.mp3');
    AUDIO_DEAD = new Audio('./assets/audio/dead.mp3');
    AUDIO_COLLECT_COINS = new Audio('./assets/audio/coin_collected.mp3');
    AUDIO_COLLECT_FOOD = new Audio('./assets/audio/food_collected.mp3');
    AUDIO_HURT = new Audio('./assets/audio/hurt.mp3');// neu!!!
    AUDIO_THROW = new Audio('./assets/audio/throw.mp3'); // neu!!!

    AUDIO_LEVEL1_BACKGROUND = new Audio('./assets/audio/background.mp3');
    AUDIO_ENDBOSSLEVEL1_BACKGROUND = new Audio('./assets/audio/endboss_background2.mp3');

    AUDIO_ENEMIE_DEAD = new Audio('./assets/audio/enemie_dead.mp3');
    AUDIO_ENEMIE_ATTACK = new Audio('./assets/audio/enemie_attack.mp3');

    AUDIO_ENDBOSS_SNEER = new Audio('./assets/audio/endboss_sneer.mp3');
    AUDIO_ENDBOSS_ATTACK = new Audio('./assets/audio/endboss_attack.mp3');
    AUDIO_ENDBOSS_DEAD;

    AUDIO_MENU = new Audio('./assets/audio/menu.mp3');;
    AUDIO_BUTTON = new Audio('./assets/audio/button.mp3');
    AUDIO_GAME_START = new Audio('./assets/audio/game_start.mp3');
    AUDIO_GAME_OVER = new Audio('./assets/audio/game_over.mp3');
    AUDIO_GAME_WIN = new Audio('./assets/audio/game_win3.mp3');


    constructor() {
        this.allSounds = [
            this.AUDIO_JUMPING,
            this.AUDIO_DEAD,
            this.AUDIO_COLLECT_COINS,
            this.AUDIO_COLLECT_FOOD,
            this.AUDIO_HURT,
            this.AUDIO_THROW,
            this.AUDIO_ENDBOSSLEVEL1_BACKGROUND,
            this.AUDIO_LEVEL1_BACKGROUND,
            this.AUDIO_ENEMIE_DEAD,
            this.AUDIO_ENEMIE_ATTACK,
            this.AUDIO_ENDBOSS_SNEER,
            this.AUDIO_ENDBOSS_ATTACK,
            this.AUDIO_ENDBOSS_DEAD,
            this.AUDIO_GAME_START,
            this.AUDIO_MENU,
            this.AUDIO_BUTTON,
            this.AUDIO_GAME_START,
            this.AUDIO_GAME_OVER,
            this.AUDIO_GAME_WIN,
        ];
        this.setGlobalVolume(0.1);
    }

    /**
 * Set the volume for all audio files.
 */
    setGlobalVolume(volume) {
        this.allSounds.forEach(audio => {
            if (audio) {
                audio.volume = volume;
            }
        });
    }

    playCollectCoinSound() {
        if (soundOn) {
            this.AUDIO_COLLECT_COINS.currentTime = 0;
            this.AUDIO_COLLECT_COINS.play();
        }
    }

    playJumpingSound() {
        if (soundOn) {
            this.AUDIO_JUMPING.currentTime = 0;
            this.AUDIO_JUMPING.play();
        }
    }

    playThrowSound() {
        if (soundOn) {
            this.AUDIO_THROW.currentTime = 0;
            this.AUDIO_THROW.play();
        }
    }

    playHurtSound() {
        if (soundOn) {
            this.AUDIO_HURT.currentTime = 0;
            this.AUDIO_HURT.play();
        }
    }

    playLevel1BackgroundMusic() {
        this.AUDIO_LEVEL1_BACKGROUND.play();
        this.AUDIO_LEVEL1_BACKGROUND.loop = true;
    }

    playEndbossLevel1BackgroundMusic() {
        this.AUDIO_ENDBOSSLEVEL1_BACKGROUND.play();
        this.AUDIO_ENDBOSSLEVEL1_BACKGROUND.loop = true;
    }

    playEnemieAttackSound() {
        if (soundOn) {
            this.AUDIO_ENEMIE_ATTACK.currentTime = 0;
            this.AUDIO_ENEMIE_ATTACK.play();
        }
    }

    playEnemieDeadSound() {
        if (soundOn) {
            this.AUDIO_ENEMIE_DEAD.currentTime = 0;
            this.AUDIO_ENEMIE_DEAD.play();
        }
    }

    playEndbossSneerSound() {
        if (soundOn) {
            this.AUDIO_ENDBOSS_SNEER.currentTime = 0;
            this.AUDIO_ENDBOSS_SNEER.play();
        }
    }

    playEndbossAttackSound() {
        if (soundOn) {
            this.AUDIO_ENDBOSS_ATTACK.currentTime = 0;
            this.AUDIO_ENDBOSS_ATTACK.play();
        }
    }

    playCollectFoodSound() {
        if (soundOn) {
            this.AUDIO_COLLECT_FOOD.currentTime = 0;
            this.AUDIO_COLLECT_FOOD.play();
        }
    }

    playGameOverSound() {
        this.AUDIO_GAME_OVER.currentTime = 0;
        this.AUDIO_GAME_OVER.play();
    }

    playGameWinSound() {
        this.AUDIO_GAME_WIN.currentTime = 0;
        this.AUDIO_GAME_WIN.play();
    }

    playButtonSound() {
        if (soundOn) {
            this.AUDIO_BUTTON.currentTime = 0;
            this.AUDIO_BUTTON.play();
        }
    }

    playMenuSound() {
        if (musicOn) {
            this.AUDIO_MENU.currentTime = 0;
            this.AUDIO_MENU.play();
            this.AUDIO_MENU.loop = true;
        }
    }
}