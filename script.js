const frameWidth = 50;
const walkFrames = 6;
const idleFrames = 4;
let walkTimeoutId;
let animationFrameId;
let idleTimeoutId;
let selectedCharacterType;


/**
 * Initializes the game or animation by starting the character animation.
 * This is typically the entry point for setting up the initial visual state.
 */
function init() {
    animateCharacter();
    checkScreenWidth();
    loadSettingsFromLocalStorage();
}


/**
 * Starts the animation of the character element by initiating a walking sequence.
 * Selects the element with the class 'character-animation' and moves it from position 0 to 620px.
 * If the character element is not found, the function exits early.
 */

function animateCharacter() {
    const character = document.querySelector('.character-animation');
    if (!character) return;
    const currentFrame = { value: 0 };
    stopIdleAnimation(character);
    walk(character, currentFrame, 0, 620, 4);
}


/**
 * Stops the idle animation by clearing the idle timeout and resetting the background.
 *
 * @param {HTMLElement} element - The element whose idle animation should stop.
 */
function stopIdleAnimation(element) {
    clearTimeout(idleTimeoutId);
    element.style.backgroundImage = '';
    element.style.backgroundSize = '';
}


/**
 * Starts the walking animation for an element by moving it from startPos to endPos and updating its sprite while walking. When the target is reached, idle animation starts.
 *
 * @param {HTMLElement} element - The element to move.
 * @param {number} currentFrame - The current animation frame index.
 * @param {number} startPos - Starting horizontal position in pixels.
 * @param {number} endPos - Target horizontal position in pixels.
 * @param {number} speed - Number of pixels to move per step.
 */
function walk(element, currentFrame, startPos, endPos, speed) {
    element.style.transform = 'scaleX(+1)';
    let position = startPos;
    function step() {
        if (position < endPos) {
            position = moveElement(element, position, speed, currentFrame);
            animationFrameId = requestAnimationFrame(() => {
                walkTimeoutId = setTimeout(step, 120);
            });
        } else {
            element.style.transform = 'scaleX(-1)';
            startIdleAnimation(element, currentFrame);
        }
    }
    step();
}


/**
 * Moves the element horizontally by a given speed and updates its sprite.
 *
 * @param {HTMLElement} element - The element to move.
 * @param {number} position - The current position of the element.
 * @param {number} speed - The number of pixels to move.
 * @param {number} currentFrame - The current sprite frame index.
 * @returns {number} The new updated position.
 */
function moveElement(element, position, speed, currentFrame) {
    const newPosition = position + speed;
    element.style.left = newPosition + 'px';
    updateSprite(element, currentFrame, walkFrames);
    return newPosition;
}


/**
 * Updates the sprite frame of an element by changing its background position to show the next frame in a horizontal sprite sheet.
 *
 * @param {HTMLElement} element - The element whose sprite to update.
 * @param {{value: number}} currentFrame - An object holding the current frame index (mutable).
 * @param {number} totalFrames - Total number of frames in the sprite animation.
 */
function updateSprite(element, currentFrame, totalFrames) {
    currentFrame.value = (currentFrame.value + 1) % totalFrames;
    const offsetX = currentFrame.value * frameWidth;
    element.style.backgroundPosition = `-${offsetX}px 0`;
}


/**
 * Starts the idle animation for an element by setting its idle sprite sheet and repeatedly updating the sprite frame at fixed intervals.
 *
 * @param {HTMLElement} element - The element to animate.
 * @param {{value: number}} currentFrame - An object holding the current frame index (mutable).
 */
function startIdleAnimation(element, currentFrame) {
    element.style.backgroundImage = "url('./assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/Pink_Monster_Idle_4.png')";
    element.style.backgroundSize = `${frameWidth * idleFrames}px 50px`;
    currentFrame.value = 0;
    function idle() {
        updateSprite(element, currentFrame, idleFrames);
        idleTimeoutId = setTimeout(idle, 240);
    }
    idle();
}


/**
 * Opens the menu screen after stopping the start screen animation and animating the header.
 * Hides the new game button and character start elements immediately, then after a delay shows the menu screen, header, and menu character.
 */
function openMenuScreen() {
    audioManager.playSound(audioManager.AUDIO_BUTTON);
    stopStartScreenAnimation();
    animateHeader();
    audioManager.playMusic(audioManager.AUDIO_MENU);
    document.getElementById("new_game_button").classList.add('d_none');
    document.getElementById("character_start").classList.add('d_none');
    delayMenuScreenTransition();
}


/**
 * Stops any ongoing start screen animations by clearing relevant timeouts and cancelling animation frames.
 */
function stopStartScreenAnimation() {
    clearTimeout(walkTimeoutId);
    clearTimeout(idleTimeoutId);
    cancelAnimationFrame(animationFrameId);
}


/**
 * Starts the header animation by adding the 'animate' CSS class to the header element inside the start screen.
 */
function animateHeader() {
    const header = document.querySelector('#start_screen header');
    header.classList.add('animate');
}


/**
 * Handles the delayed transition from the start screen to the menu screen, showing and hiding relevant UI elements after 800 milliseconds.
 */
function delayMenuScreenTransition() {
    setTimeout(() => {
        document.getElementById("start_screen").classList.add('d_none');
        document.getElementById("menu_screen").classList.remove('d_none');
        document.getElementById("header").classList.remove('d_none');
        document.getElementById('fullscreen_button').classList.remove('d_none');
        showMenuCharacter();
    }, 800);
}


/**
 * Initiates the idle animation for the menu character element. Selects the element with ID "character_menu" and starts its idle animation from frame 0.
 */
function showMenuCharacter() {
    const currentFrame = { value: 0 };
    const menuChar = document.getElementById("character_menu")
    startIdleAnimation(menuChar, currentFrame);
}


/**
 * Selects a character by its element ID, updates the UI to reflect the selection, enables the play button, and stores the selected character type.
 *
 * @param {string} id - The ID of the character element to select.
 */
function selectYourCharacter(id) {
    resetSelectedCharacter();
    audioManager.playSound(audioManager.AUDIO_BUTTON);
    document.getElementById(id).classList.add('active');
    document.getElementById("play_button").disabled = false;
    document.getElementById("play_button").classList.add("play-button-enabled");
    selectedCharacterType = id;
}


/**
 * Removes the 'active' class from all selectable characters to clear any previous character selection in the menu.
 */
function resetSelectedCharacter() {
    document.getElementById('Pink-Monster').classList.remove('active');
    document.getElementById('Owlet-Monster').classList.remove('active');
    document.getElementById('Dude-Monster').classList.remove('active');
}


/**
 * Closes an overlay element by adding the "d_none" class to hide it. Stops propagation of the event if provided.
 *
 * @param {Event} [event] - Optional event to stop propagation on.
 * @param {string} id - The ID of the overlay element to close.
 */
function closeOverlay(event, id) {
    if (event) {
        event.stopPropagation();
    }
    document.getElementById(id).classList.add("d_none");
}


/**
 * Opens an overlay element by removing the "d_none" class to make it visible.
 *
 * @param {string} id - The ID of the overlay element to open.
 */
function openOverlay(id) {
    audioManager.playSound(audioManager.AUDIO_BUTTON);
    document.getElementById(id).classList.remove("d_none");
}


/**
 * Handles the toggle click by delegating to the correct toggle function.
 *
 * @param {string} id - The ID of the element to toggle the 'on' class.
 */
function setupToggleSwitch(id) {
    const element = document.getElementById(id);
    element.classList.toggle('on');
    if (id === 'music-toggle') {
        toggleMusic();
    } else if (id === 'sound-toggle') {
        toggleSound();
    }
}


/**
 * Toggles music setting, updates localStorage and plays/stops menu music.
 */
function toggleMusic() {
    musicOn = !musicOn;
    localStorage.setItem('musicOn', musicOn.toString());
    if (musicOn) {
        audioManager.playMusic(audioManager.AUDIO_MENU);
    } else {
        audioManager.stopMusic(audioManager.AUDIO_MENU);
    }
}


/**
 * Toggles sound setting and updates localStorage.
 */
function toggleSound() {
    soundOn = !soundOn;
    localStorage.setItem('soundOn', soundOn.toString());
}


/**
 * Loads saved music and sound settings from localStorage and updates the toggle button UI accordingly.
 * Retrieves the 'musicOn' and 'soundOn' values from localStorage, converts them to booleans, and applies the 'on' CSS class to the corresponding toggle buttons if the values are true.
 */
function loadSettingsFromLocalStorage() {
    musicOn = localStorage.getItem('musicOn') === 'true';
    soundOn = localStorage.getItem('soundOn') === 'true';
    document.getElementById('music-toggle').classList.toggle('on', musicOn);
    document.getElementById('sound-toggle').classList.toggle('on', soundOn);
}


/**
 * Returns the player to the main menu by:
 * - Showing the header
 * - Displaying the menu screen
 * - Resetting the selected character
 * - Resetting the game UI state (e.g., play button, canvas, etc.)
 */
function returnToMenu() {
    document.getElementById('header').classList.remove('d_none');
    showMenuCharacter();
    audioManager.playMusic(audioManager.AUDIO_MENU);
    document.getElementById('menu_screen').classList.remove('d_none');
    resetSelectedCharacter();
    resetGameUI();
    resetGameOverAnimation();
}


/**
 * Resets the game UI by:
 * - Disabling and visually resetting the play button
 * - Hiding the game over screen
 * - Hiding the game canvas
 */
function resetGameUI() {
    document.getElementById('play_button').disabled = true;
    document.getElementById('play_button').classList.remove('play-button-enabled');
    document.getElementById('game_over_screen').classList.add('d_none');
    document.getElementById('canvas').classList.add('d_none');
}


/**
 * Toggles fullscreen mode for the element with id 'fullscreen'. Supports multiple browser implementations.
 */
function toggleFullScreen() {
    const element = document.getElementById('fullscreen');
    if (!document.fullscreenElement &&    
        !document.webkitFullscreenElement && 
        !document.msFullscreenElement) { 
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    } else {
        exitFullscreenModus();
    }
}


/**
 * Exits fullscreen mode. Supports multiple browser implementations.
 */
function exitFullscreenModus() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}


/**
 * Handles UI changes when the fullscreen mode changes, toggling visibility of fullscreen buttons accordingly.
 */
function handleFullscreenChange() {
    const fullscreenButton = document.getElementById('fullscreen_button');
    const exitFullscreenButton = document.getElementById('exit_fullscreen_button');
    if (document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement) {
        fullscreenButton.classList.add('d_none');
        exitFullscreenButton.classList.remove('d_none');
    } else {
        fullscreenButton.classList.remove('d_none');
        exitFullscreenButton.classList.add('d_none');
    }
}


// 📡 Event Listener for fullscreen change for all browsers
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);


/**
 * Toggles visibility of the orientation warning based on screen width.
 */
function checkScreenWidth() {
    const warning = document.getElementById('orientation_warning');
    const mainContent = document.getElementById('main_content');
    if (!warning || !mainContent) return;
    const isSmallScreen = window.innerWidth < 790;
    const isPortrait = window.innerHeight > window.innerWidth;
    if (isSmallScreen && isPortrait) {
        warning.classList.remove('d_none');
        mainContent.classList.add('d_none');
    } else {
        warning.classList.add('d_none');
        mainContent.classList.remove('d_none');
    }
}


// Listen to window resize to check screen width and orientation
window.addEventListener('resize', checkScreenWidth);