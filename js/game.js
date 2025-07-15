// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
main();


// 
const restartBtn = document.getElementById("restartBtn");

function resetGame() {
  player.dead = false;
  player.x = 0;
  player.y = 0;
  player.direction = LEFT;
  player.sprite = 0;
  enemies.length = 0;
  dots.length = 0;
  blocks.length = 0;
  background.length = 0;

  loadImagePixels("data/map.png", function(pixels) {
    pixelBackground(pixels);
    for (let i = 0; i < pixels.length; i++) {
      for (let j = 0; j < pixels[i].length; j++) {
        const pixel = pixels[i][j];
        if (isColor(pixel, WHITE)) {}
        else if (isColor(pixel, BLACK)) blocks.push(p(i * SIZE, j * SIZE));
        else if (isColor(pixel, YELLOW)) dots.push(p(i * SIZE, j * SIZE));
        else if (isColor(pixel, GREEN)) {
          player.x = i * SIZE;
          player.y = j * SIZE;
        } else if (
          isColor(pixel, RED) ||
          isColor(pixel, CYAN) ||
          isColor(pixel, PINK) ||
          isColor(pixel, ORANGE)
        ) {
          addEnemy(i * SIZE, j * SIZE);
        }
      }
    }
  });

  restartBtn.style.display = "block";
  then = Date.now();
}

restartBtn.addEventListener("click", resetGame);
