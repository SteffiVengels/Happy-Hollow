class AudioManager {
    AUDIO_JUMPING = new Audio('./assets/audio/jump.mp3');
    AUDIO_DEAD = new Audio('./assets/audio/dead.mp3');
    AUDIO_COLLECT_COINS = new Audio('./assets/audio/coin_collected.mp3');
    AUDIO_COLLECT_FOOD = new Audio('./assets/audio/food_collected.mp3');
    AUDIO_HURT = new Audio('./assets/audio/hurt2.mp3');
    AUDIO_THROW = new Audio('./assets/audio/throw2.mp3');

    AUDIO_LEVEL1_BACKGROUND = new Audio('./assets/audio/background.mp3');
    AUDIO_ENDBOSSLEVEL1_BACKGROUND = new Audio('./assets/audio/endboss_background2.mp3');

    AUDIO_ENEMIE_DEAD = new Audio('./assets/audio/enemie_dead.mp3');
    AUDIO_ENEMIE_ATTACK = new Audio('./assets/audio/enemie_attack.mp3');

    AUDIO_ENDBOSS_SNEER = new Audio('./assets/audio/endboss_sneer.mp3');
    AUDIO_ENDBOSS_ATTACK = new Audio('./assets/audio/endboss_attack.mp3');
    AUDIO_ENDBOSS_DEAD = new Audio('./assets/audio/endboss_dead.mp3');

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


    setGlobalVolume(volume) {
        this.allSounds.forEach(audio => {
            if (audio) {
                audio.volume = volume;
            }
        });
    }

    playSound(sound) {
        if (soundOn) {
            sound.currentTime = 0;
            sound.play();
        }
    }


    playMusic(music) {
        if (musicOn) {
            music.currentTime = 0;
            music.play();
            music.loop = true;
        }
    }


    stopMusic(music) {
        music.pause();
    }


    stopBackgroundMusicAndPlayDeathSound() {
        this.stopLevel1BackgroundMusic();
        this.stopEndbossLevel1BackgroundMusic();
        this.playSound(this.AUDIO_DEAD);
    }


    stopMenuMusicAndPlayGameStartSound() {
        this.stopMenuMusic();
        this.playSound(this.AUDIO_GAME_START);
    }


    stopMenuMusic() {
        this.stopMusic(this.AUDIO_MENU);
    }


    stopLevel1BackgroundMusic() {
        this.stopMusic(this.AUDIO_LEVEL1_BACKGROUND);
    }


    stopEndbossLevel1BackgroundMusic() {
        this.stopMusic(this.AUDIO_ENDBOSSLEVEL1_BACKGROUND);
    }


    playCollectCoinSound() {
        this.playSound(this.AUDIO_COLLECT_COINS);
    }


    playJumpingSound() {
        this.playSound(this.AUDIO_JUMPING);
    }


    playThrowSound() {
        this.playSound(this.AUDIO_THROW);
    }


    playHurtSound() {
        this.playSound(this.AUDIO_HURT);
    }


    playEnemieAttackSound() {
        this.playSound(this.AUDIO_ENEMIE_ATTACK);
    }


    playEnemieDeadSound() {
        this.playSound(this.AUDIO_ENEMIE_DEAD);
    }


    playEndbossSneerSound() {
        this.playSound(this.AUDIO_ENDBOSS_SNEER);
    }


    playEndbossAttackSound() {
        this.playSound(this.AUDIO_ENDBOSS_ATTACK);
    }


    playEndbossDeadSound() {
        this.playSound(this.AUDIO_ENDBOSS_DEAD);
    }


    playCollectFoodSound() {
        this.playSound(this.AUDIO_COLLECT_FOOD);
    }


    playGameOverSound() {
        this.playSound(this.AUDIO_GAME_OVER);
    }


    playGameWinSound() {
        this.playSound(this.AUDIO_GAME_WIN);
    }


    playButtonSound() {
        this.playSound(this.AUDIO_BUTTON);
    }


    playMenuMusic() {
        this.playMusic(this.AUDIO_MENU);
    }


    playLevel1BackgroundMusic() {
        this.playMusic(this.AUDIO_LEVEL1_BACKGROUND);
    }


    playEndbossLevel1BackgroundMusic() {
        this.playMusic(this.AUDIO_ENDBOSSLEVEL1_BACKGROUND);
    }
}