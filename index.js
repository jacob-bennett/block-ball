const BALL_SPEED_MS = 80;
const GAME_HEIGHT = 24;
const GAME_WIDTH = 24;

class Bat {
    constructor() {
        this.styleId = "bat";
        this.batWidth = 5;
        this.horizontalPosition = (GAME_HEIGHT / 2) - this.batWidth / 2;
    }
}

class Ball {
    constructor(verticalPosition, horizontalPosition) {
        this.styleId = "ball";
        this.verticalPosition = verticalPosition;
        this.horizontalPosition = horizontalPosition;
    }
}

function renderObject(object) {
    return `<div class='pix ${object.styleId}'></div>`
}

function renderBlock() {
    return "<div class='pix'></div>"
}

const bat = new Bat();
let ball = new Ball(0, GAME_WIDTH / 2);
const container = document.getElementById("container");

function render() {
    let frameHtml = "";

    for (let height = 0; height < GAME_HEIGHT; height++) {
        for (let width = 0; width < GAME_WIDTH; width++) {
            const isBatPixel = height === GAME_HEIGHT - 1 && width >= bat.horizontalPosition && width < (bat.horizontalPosition + bat.batWidth);
            const isBallPixel = height === ball.verticalPosition && width === ball.horizontalPosition;

            if (isBatPixel) {
                frameHtml += renderObject(bat);
            } else if (isBallPixel) {
                frameHtml += renderObject(ball);
            } else {
                frameHtml += renderBlock()
            }
        }

        frameHtml += "<br>"
    }

    container.innerHTML = frameHtml;
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
        bat.horizontalPosition++;
        render()
    }

    if (event.key === "ArrowLeft") {
        bat.horizontalPosition--;
        render()
    }
});

function resetBall() {
    const randomVerticalPos = Math.floor(Math.random() * Math.floor(GAME_HEIGHT));
    ball = new Ball(0, randomVerticalPos)
}

setInterval(function () {
    ball.verticalPosition++;

    if (ball.verticalPosition === GAME_WIDTH - 1) {
        const ballIsTouchingBat = ball.horizontalPosition >= bat.horizontalPosition && ball.horizontalPosition < (bat.horizontalPosition + bat.batWidth);
        if (ballIsTouchingBat) {
            resetBall()
        } else {
            alert('Game over! Press space to continue');

            document.addEventListener("keydown", function resetOnSpace(event) {
                if (event.key === ' ') {
                    document.removeEventListener('keydown', resetOnSpace);
                    resetBall();
                }
            });
        }
    }

    render()
}, BALL_SPEED_MS);
