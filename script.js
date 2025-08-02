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
 * Starts the walking animation for an element by moving it from startPos to endPos
 * and updating its sprite while walking. When the target is reached, idle animation starts.
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
 * Updates the sprite frame of an element by changing its background position
 * to show the next frame in a horizontal sprite sheet.
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
 * Starts the idle animation for an element by setting its idle sprite sheet
 * and repeatedly updating the sprite frame at fixed intervals.
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
 * Hides the new game button and character start elements immediately,
 * then after a delay shows the menu screen, header, and menu character.
 */
function openMenuScreen() {
    audioManager.playButtonSound();
    stopStartScreenAnimation();
    animateHeader();
    audioManager.playMenuSound();
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
 * Handles the delayed transition from the start screen to the menu screen,
 * showing and hiding relevant UI elements after 800 milliseconds.
 */
function delayMenuScreenTransition() {
    setTimeout(() => {
        document.getElementById("start_screen").classList.add('d_none');
        document.getElementById("menu_screen").classList.remove('d_none');
        document.getElementById("header").classList.remove('d_none');
        showMenuCharacter();
    }, 800);
}


/**
 * Initiates the idle animation for the menu character element.
 * Selects the element with ID "character_menu" and starts its idle animation from frame 0.
 */
function showMenuCharacter() {
    const currentFrame = { value: 0 };
    const menuChar = document.getElementById("character_menu")
    startIdleAnimation(menuChar, currentFrame);
}


/**
 * Selects a character by its element ID, updates the UI to reflect the selection,
 * enables the play button, and stores the selected character type.
 *
 * @param {string} id - The ID of the character element to select.
 */
function selectYourCharacter(id) {
    resetSelectedCharacter();
    audioManager.playButtonSound();
    document.getElementById(id).classList.add('active');
    document.getElementById("play_button").disabled = false;
    document.getElementById("play_button").classList.add("play-buttn-enabled");
    selectedCharacterType = id;
}


/**
 * Removes the 'active' class from all selectable characters
 * to clear any previous character selection in the menu.
 */
function resetSelectedCharacter() {
    document.getElementById('Pink-Monster').classList.remove('active');
    document.getElementById('Owlet-Monster').classList.remove('active');
    document.getElementById('Dude-Monster').classList.remove('active');
}


/**
 * Closes an overlay element by adding the "d_none" class to hide it.
 * Stops propagation of the event if provided.
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
    audioManager.playButtonSound();
    document.getElementById(id).classList.remove("d_none");

}


/**
 * Toggles the 'on' CSS class on an element identified by the given ID and the corresponding boolean variable.
 *
 * @param {string} id - The ID of the element to toggle the 'on' class.
 */
function setupToggleSwitch(id) {
    const element = document.getElementById(id);
    element.classList.toggle('on');
    if (id === 'music-toggle') {
        musicOn = !musicOn;
        if (musicOn) {
            audioManager.playMenuMusic();
        } else {
            audioManager.stopMenuMusic();
        }
    } else if (id === 'sound-toggle') {
        soundOn = !soundOn;
    }
}


/**
 * Shows the "GAME OVER!" animated text on the screen.
 */
function showGameOver() {
    const gameOverText = document.getElementById('game_over_text');
    document.getElementById('game_over_logo').classList.remove('hidden');
    animateTextByLetters(gameOverText, 'GAME OVER!', 'letter', 0.2);
}


/**
 * Shows the "YOU WIN!" animated text on the screen.
 */
function showYouWin() {
    const winText = document.getElementById('you_win_text');
    animateTextByLetters(winText, 'YOU WIN!', 'letter-win', 0.2, 0.4);
}


/**
 * Animates text inside a target element by wrapping each character in a <span> with animation styles.
 *
 * @param {HTMLElement} targetElement - The DOM element to insert the animated text into.
 * @param {string} text - The text to animate.
 * @param {string} letterClass - CSS class to apply to each letter span.
 * @param {number} delayStep - Delay in seconds between each letter's animation start.
 * @param {number} [duration] - Optional animation duration in seconds for each letter.
 */
function animateTextByLetters(targetElement, text, letterClass, delayStep, duration) {
    targetElement.innerHTML = '';
    [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.classList.add(letterClass);
        span.style.animationDelay = `${i * delayStep}s`;
        if (duration !== undefined) {
            span.style.animationDuration = `${duration}s`;
        }
        targetElement.appendChild(span);
    });
}


/**
 * Shows the start screen by adjusting visibility and animation classes of various elements.
 * Calls animateCharacter() to start the character animation on the start screen.
 */
function showStartScreen() {
    resetStartScreenUI();
    animateCharacter();
}


/**
 * Resets the UI elements for the start screen:
 * - Hides win screen and canvas
 * - Shows start screen, character start, and new game button
 * - Removes animation class from the header
 */
function resetStartScreenUI() {
    document.getElementById('win_screen').classList.add('d_none');
    document.getElementById('canvas').classList.add('d_none');
    document.getElementById('start_screen').classList.remove('d_none');
    document.getElementById("character_start").classList.remove('d_none');
    document.querySelector('#start_screen header').classList.remove('animate');
    document.getElementById('new_game_button').classList.remove('d_none');
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
    audioManager.playMenuSound();
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
    document.getElementById('play_button').classList.remove('play-buttn-enabled');
    document.getElementById('game_over_screen').classList.add('d_none');
    document.getElementById('canvas').classList.add('d_none');
}


/**
 * Starts a fade-out effect on the win screen by adding a CSS class
 * that fades the overlay from transparent to white.
 */
function fadeOutWinScreen() {
    const overlay = document.getElementById('win_fade_overlay');
    overlay.classList.add('fade-in-white');
}


/**
 * Reverses the fade-out effect on the win screen by removing the fade-in class
 * and adding a fade-out class that transitions back to transparency.
 */
function fadeInWinScreen() {
    const overlay = document.getElementById('win_fade_overlay');
    overlay.classList.remove('fade-in-white');
    overlay.classList.add('fade-out-white');
}
