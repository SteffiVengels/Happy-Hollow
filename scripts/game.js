let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level = level1);
}

window.addEventListener("keydown", (e) => {
    if (e.code == "ArrowRight" || e.code == "KeyD") {
        keyboard.RIGHT = true;
    }
    if (e.code == "ArrowLeft" || e.code == "KeyA") {
        keyboard.LEFT = true;
    }
    if (e.code == "ArrowUp" || e.code == "Space") {
        keyboard.UP = true;
        world.character.isJumping = true;
        world.character.currentImage = 0;
    }
    if (e.code == "KeyF") {
        keyboard.F = true;
        world.character.isThrowing = true;
        world.character.currentImage = 0;
    }
    if (e.code == "ArrowDown") {
        keyboard.DOWN = true;
    }
})

window.addEventListener("keyup", (e) => {
    if (e.code == "ArrowRight" || e.code == "KeyD") {
        keyboard.RIGHT = false;
    }
    if (e.code == "ArrowLeft" || e.code == "KeyA") {
        keyboard.LEFT = false;
    }
    if (e.code == "ArrowUp" || e.code == "Space") {
        keyboard.UP = false;
    }
    if (e.code == "KeyF") {
        keyboard.F = false;
    }
    if (e.code == "ArrowDown") {
        keyboard.DOWN = false;
    }
})

    function loadEndbossLevel() {
        const level = createEndBossLevel();
        world = new World(canvas, keyboard, level);
        world.character.x = 50;
        world.camera_x = 0;
        world.level.enemies.forEach(enemy => {
            enemy.character = world.character;
            enemy.world = world;
        });
    }

/* /* *
 * This function initializes the game by setting up the level and creating a new world instance.
 * It also binds mobile buttons for touch controls and sets a timeout to hide the loading screen and show the main game screen.

function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    bindMobileButtons();

    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('wrapper-fullscreen').style.display = 'flex';
        document.getElementById('mobile-control-panel').classList.remove('d-none');
        }, 4000);

    }


/**
 * This function initiates the game by replacing the start or end screen with the canvas/ game screen.
 * It also starts a countdown and initializes the game.

async function startGame() {
    countdownStart();
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    init();
}

function returnToStart() {
    stopGame();
    document.getElementById('start-screen').classList.remove('d-none');
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('canvas').classList.add('d-none');
    selectLanguage(language);
} */