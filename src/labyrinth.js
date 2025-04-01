document.addEventListener("DOMContentLoaded", () => {
    let gridSize = 5;
    const grid = document.getElementById("grid");
    const startButton = document.getElementById("start-game");
    const restartButton = document.getElementById("restart-game");
    const sizeInput = document.getElementById("size");
    let playerPosition = { x: gridSize - 1, y: 0 };
    let finishPosition = { x: gridSize - 1, y: gridSize - 1 };
    let wallCount = 1; // Начальное количество стен
    let walls = generateWalls(gridSize, wallCount);

    function generateWalls(size, count) {
        let walls = new Set();
        while (walls.size < count) {
            let x = Math.floor(Math.random() * size);
            let y = Math.floor(Math.random() * size);
            if (
                (x !== gridSize - 1 || y !== 0) && 
                (x !== gridSize - 1 || y !== gridSize - 1)
            ) {
                walls.add(`${x},${y}`);
            }
        }
        return walls;
    }

    

    function drawGrid() {
        grid.innerHTML = "";
        grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                if (playerPosition.x === x && playerPosition.y === y) {
                    cell.classList.add("player");
                } else if (walls.has(`${x},${y}`)) {
                    cell.classList.add("wall");
                } else if (finishPosition.x === x && finishPosition.y === y) {
                    cell.classList.add("finish");
                }
                grid.appendChild(cell);
            }
        }
    }

    function movePlayer(dx, dy) {
        let newX = playerPosition.x + dx;
        let newY = playerPosition.y + dy;
        if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
            if (!walls.has(`${newX},${newY}`)) {
                playerPosition = { x: newX, y: newY };
                checkWin();
            } else {
                alert("Game Over: Hit a wall!");
                restartGame();
            }
        } else {
            alert("Game Over: Out of bounds!");
            restartGame();
           
        }
        
    }

    function checkWin() {
        if (playerPosition.x === finishPosition.x && playerPosition.y === finishPosition.y) {
            alert("You Win! Next Level!");
            wallCount++; // Увеличиваем количество стен
            walls = generateWalls(gridSize, wallCount);
            restartGame(false);
        }
        else {
            drawGrid();
        }
    }

    function restartGame(resetWalls = true) {
        playerPosition = { x: gridSize - 1, y: 0 };
        if (resetWalls) {
            wallCount = 1;
            walls = generateWalls(gridSize, wallCount);
        }
        drawGrid();
    }

    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp": movePlayer(0, -1); break;
            case "ArrowDown": movePlayer(0, 1); break;
            case "ArrowLeft": movePlayer(-1, 0); break;
            case "ArrowRight": movePlayer(1, 0); break;
        }
    });

    startButton.addEventListener("click", () => {
        gridSize = parseInt(sizeInput.value) || 5;
        finishPosition = { x: gridSize - 1, y: gridSize - 1 };
        restartGame();
    });

    restartButton.addEventListener("click", () => restartGame());

    drawGrid();
});