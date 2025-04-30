const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gameArea = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

// Definir el jugador
const player = {
  x: 50,
  y: 50,
  width: 50,
  height: 50,
  color: "blue",
  speed: 0.3,
  lives: 3,
};

// Definir el enemigo
const enemy = {
  x: 400,
  y: 300,
  width: 50,
  height: 50,
  color: "red",
  speed: 1,
};

// Array para almacenar obstáculos
const obstacles = [];

// Función para generar obstáculos aleatorios dentro del área de juego
function generateObstacle() {
  const obstacle = {
    x: Math.random() * (gameArea.width - 30), // Generar dentro del ancho del área de juego
    y: Math.random() * (gameArea.height - 30), // Generar dentro de la altura del área de juego
    width: 30,
    height: 30,
    color: "gray",
  };
  obstacles.push(obstacle);
}

// Dibujar al jugador
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Dibujar al enemigo
function drawEnemy() {
  ctx.fillStyle = enemy.color;
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

// Dibujar obstáculos
function drawObstacles() {
  for (let obstacle of obstacles) {
    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }
}

// Función para verificar colisión entre dos rectángulos
function isColliding(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

// Función para verificar colisión entre el enemigo y los obstáculos
function checkEnemyObstacleCollision() {
  for (let obstacle of obstacles) {
    if (isColliding(enemy, obstacle)) {
      // Si hay colisión, cambiar la dirección del enemigo
      if (enemy.x < obstacle.x) {
        enemy.x -= enemy.speed;
      } else {
        enemy.x += enemy.speed;
      }

      if (enemy.y < obstacle.y) {
        enemy.y -= enemy.speed;
      } else {
        enemy.y += enemy.speed;
      }
    }
  }
}

// Actualizar la posición del jugador y del enemigo
function update() {
  // Mover al jugador con las teclas de flecha
  // Código para mover al jugador...

  // Mover al enemigo hacia el jugador
  // Código para mover al enemigo...

  // Detección de colisiones entre el jugador y el enemigo
  // Código para detectar colisión entre jugador y enemigo...

  // Detección de colisiones entre el enemigo y los obstáculos
  checkEnemyObstacleCollision();

  // Generar nuevos obstáculos aleatorios rápidamente al principio
  if (obstacles.length < 5) {
    generateObstacle();
  }
}

// Función para reiniciar la posición del jugador
function resetPlayerPosition() {
  player.x = 50;
  player.y = 50;
}

// Dibujar en el canvas
function draw() {
  // Limpiar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar al jugador, al enemigo y los obstáculos
  drawPlayer();
  drawEnemy();
  drawObstacles();

  // Mostrar el contador de vidas
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Vidas: ${player.lives}`, 10, 30);
}

// Función para reiniciar el juego después de un retraso
function restartGame() {
  setTimeout(function() {
    location.reload(); // Recargar la página para reiniciar el juego
  }, 5000); // 5000 milisegundos = 5 segundos
}

// Bucle principal del juego
function gameLoop() {
  update(); // Actualizar la lógica del juego
  draw(); // Dibujar en el canvas

  // Verificar si el jugador ha perdido todas sus vidas
  if (player.lives <= 0) {
    alert("¡Perdiste todas tus vidas! ¡Fin del juego!");
    restartGame(); // Reiniciar el juego después de 5 segundos
    return; // Salir del bucle para detener el juego
  }

  requestAnimationFrame(gameLoop); // Repetir el bucle
}

// Generar obstáculos rápidamente al principio
for (let i = 0; i < 5; i++) {
  generateObstacle();
}

// Iniciar el juego
gameLoop();
