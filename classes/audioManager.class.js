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


    /**
     * Sets the volume for all sounds.
     * @param {number} volume - Volume level between 0.0 and 1.0.
     */
    setGlobalVolume(volume) {
        this.allSounds.forEach(audio => {
            if (audio) {
                audio.volume = volume;
            }
        });
    }


    /**
     * Plays a given sound effect if sound is enabled.
     * @param {HTMLAudioElement} sound - The sound to play.
     */
    playSound(sound) {
        if (soundOn) {
            sound.currentTime = 0;
            sound.play();
        }
    }


    /**
     * Plays background music if music is enabled.
     * Loops the track automatically.
     * @param {HTMLAudioElement} music - The music to play.
     */
    playMusic(music) {
        if (musicOn) {
            music.currentTime = 0;
            music.play();
            music.loop = true;
        }
    }


    /**
     * Stops a playing music track.
     * @param {HTMLAudioElement} music - The music to stop.
     */
    stopMusic(music) {
        music.pause();
    }


    /** Stops all background music and plays the death sound. */
    stopBackgroundMusicAndPlayDeathSound() {
        this.stopMusic(this.AUDIO_LEVEL1_BACKGROUND);
        this.stopMusic(this.AUDIO_ENDBOSSLEVEL1_BACKGROUND);
        this.playSound(this.AUDIO_DEAD);
    }


    /** Stops menu music and plays the game start sound. */
    stopMenuMusicAndPlayGameStartSound() {
        this.stopMusic(this.AUDIO_MENU);
        this.playSound(this.AUDIO_GAME_START);
    }

}