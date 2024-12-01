document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const btnRestart = document.getElementById("btnRestart");

    let board = Array(9).fill(null); 
    let currentPlayer = "X"; 
    let isPlayerVsAI = true; 

    function createBoard() {
        gameBoard.innerHTML = "";
        board.forEach((cell, index) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.dataset.index = index;

            if (cell) {
                cellElement.textContent = cell;
                cellElement.classList.add("taken");
            }

            cellElement.addEventListener("click", handleMove);
            gameBoard.appendChild(cellElement);
        });
    }

    function handleMove(event) {
        const index = event.target.dataset.index;

        if (board[index] || currentPlayer !== "X") return; 

        makeMove(index, "X");

        if (checkWinner()) {
            Swal.fire({
                title: `¡${currentPlayer} ha ganado!`,
                icon: "success",
                confirmButtonText: "Reiniciar"
            }).then(restartGame);
        } else if (board.every(cell => cell)) {
            Swal.fire({
                title: "¡Empate!",
                icon: "info",
                confirmButtonText: "Reiniciar"
            }).then(restartGame);
        } else if (isPlayerVsAI) {
            setTimeout(performAIMove, 500);
        } else {
            currentPlayer = "O";  
        }
    }

    function performAIMove() {
        const availableCells = board
            .map((cell, index) => (cell === null ? index : null))
            .filter(index => index !== null);

        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        makeMove(randomIndex, "O");

        if (checkWinner()) {
            Swal.fire({
                title: "¡La máquina ha ganado! 🤖",
                icon: "error",
                confirmButtonText: "Reiniciar"
            }).then(restartGame);
        } else if (board.every(cell => cell)) {
            Swal.fire({
                title: "¡Empate!",
                icon: "info",
                confirmButtonText: "Reiniciar"
            }).then(restartGame);
        } else {
            currentPlayer = "X";  
        }
    }

    function makeMove(index, player) {
        board[index] = player;

        const cellElement = document.querySelector(`[data-index='${index}']`);
        cellElement.textContent = player;
        cellElement.classList.add("taken");
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return (
                board[a] &&
                board[a] === board[b] &&
                board[a] === board[c]
            );
        });
    }

    function restartGame() {
        board = Array(9).fill(null);
        currentPlayer = "X";
        createBoard();
    }

    
    createBoard();

    
    btnRestart.addEventListener("click", restartGame);
});
