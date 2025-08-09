class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    F = false;


    constructor(character) {
        this.character = character;
        this.bindKeyPressEvents();
        this.bindBtsPressEvents();
    }


    bindBtsPressEvents() {
        document.getElementById('btn_left').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('btn_left').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
        document.getElementById('btn_right').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('btn_right').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
        document.getElementById('btn_jump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.UP = true;
            this.character.isJumping = true;
            this.character.currentImage = 0;
        });

        document.getElementById('btn_jump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.UP = false;
        });
        document.getElementById('btn_throw').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.F = true;
            this.character.isThrowing = true;
            this.character.currentImage = 0;
        });

        document.getElementById('btn_throw').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.F = false;
        });
    }


    bindKeyPressEvents() {

        window.addEventListener('keydown', (e) => {
            if (e.code == "ArrowRight" || e.code == "KeyD") {
                this.RIGHT = true;
            }
            if (e.code == "ArrowLeft" || e.code == "KeyA") {
                this.LEFT = true;
            }
            if (e.code == "ArrowUp" || e.code == "Space") {
                this.UP = true;
                this.character.isJumping = true;
                this.character.currentImage = 0;
            }
            if (e.code == "KeyF") {
                this.F = true;
                this.character.isThrowing = true;
                this.character.currentImage = 0;
            }
            if (e.code == "ArrowDown") {
                this.DOWN = true;
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.code == "ArrowRight" || e.code == "KeyD") {
                this.RIGHT = false;
            }
            if (e.code == "ArrowLeft" || e.code == "KeyA") {
                this.LEFT = false;
            }
            if (e.code == "ArrowUp" || e.code == "Space") {
                this.UP = false;
            }
            if (e.code == "KeyF") {
                this.F = false;
            }
            if (e.code == "ArrowDown") {
                this.DOWN = false;
            }
        })
    }

}