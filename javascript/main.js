import { Ball } from './ball.js';
import { EvilCircle } from './evileCircle.js';
import { random, randomRGB } from "./utils.js";

// setup canvas

const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
const para = document.querySelector('p');

export const width = (canvas.width = window.innerWidth);
export const height = (canvas.height = window.innerHeight);

export const balls = [];
let ballCount = 0;

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
  );

  balls.push(ball);
}

const evileCircle = new EvilCircle(50, 50, 20, 20, 'white', 10);

function restartGame() {
  // Reset game-related variables and objects
  ballCount = 0;    // Reset the ball count
  evileCircle.x = 50;
  evileCircle.y = 50;
  balls.length = 0;

  // Add code here to recreate balls if needed

  while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomRGB(),
      size,
      true
    );

    balls.push(ball);
  }
  // Restart the loop
  loop();
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);
  evileCircle.draw();
  evileCircle.checkBounds();
  evileCircle.collisionDetect();

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  // Update ballCount based on the existing balls
  ballCount = balls.filter(ball => ball.exists).length;

  // Display the updated ball count
  para.textContent = `Ball Count: ${ballCount}`;

  if (ballCount === 0) {
    const restart = confirm("Well Done. You won!\nDo you want to restart?");
    if (restart) {
      restartGame();
      return; // Stop the current loop iteration
    } else {
      // User chose not to restart, you can handle this case accordingly
      // For example, stop the loop or perform other actions
    }
  }

  requestAnimationFrame(loop);
}

loop();
