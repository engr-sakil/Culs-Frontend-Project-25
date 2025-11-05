    const playerXInput = document.getElementById("playerX");
    const playerOInput = document.getElementById("playerO");

   
    const board = document.getElementById("board");
    const statusText = document.getElementById("status");
    const resetBtn = document.getElementById("reset");

    let currentPlayer = "X";
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Create board cells
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      cell.addEventListener("click", handleCellClick);
      board.appendChild(cell);
    }

    function handleCellClick(e) {
      const index = e.target.dataset.index;

      if (gameState[index] !== "" || !gameActive) return;

      gameState[index] = currentPlayer;
      if (currentPlayer === "X") {
        e.target.classList.add("red");
    } else {
        e.target.classList.add("blue");
    }

      if (checkWinner()) {
        const winnerName = currentPlayer === "O" ? playerXInput.value || "Player 1" : playerOInput.value || "Player 2";
        statusText.textContent = `🎉 ${winnerName} wins!`;
        gameActive = false;
        return;
      }

      if (!gameState.includes("")) {
        statusText.textContent = "😐 It's a draw!";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
        const nextName = currentPlayer === "X" ? playerXInput.value || "Player 1" : playerOInput.value || "Player 2";
        const nextIcon = currentPlayer === "X" ? "🔵" : "❌";
        statusText.textContent = `${nextName}'s turn (${nextIcon})`;

    }

    function checkWinner() {
      for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (
          gameState[a] &&
          gameState[a] === gameState[b] &&
          gameState[a] === gameState[c]
        ) {
          highlightCells(condition);
          return true;
        }
      }
      return false;
    }

    function highlightCells(indices) {
      indices.forEach(i => {
        board.children[i].style.backgroundColor = "#90ee90";
      });
    }

    resetBtn.addEventListener("click", () => {
      gameState = ["", "", "", "", "", "", "", "", ""];
      gameActive = true;
      currentPlayer = "X";
      statusText.textContent = "Player X's turn";
      Array.from(board.children).forEach(cell => {
        cell.classList.remove("blue", "red");
        cell.style.backgroundColor = "white";
      });
    });