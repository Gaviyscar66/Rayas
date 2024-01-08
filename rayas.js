const cells = document.querySelectorAll('[data-cell]');
let currentPlayer = 'X';
const playerTurnIndicator = document.getElementById('player-turn');

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
    const cell = e.target;
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            if (currentPlayer === 'X') {
                alert("¡Jugador 1 Ganó!");
            } else {
                alert("¡Jugador 2 Ganó!");
            }
            resetGame();
        } else if (isBoardFull()) {
            alert("¡Empate!");
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerTurnIndicator.textContent = `Jugador ${currentPlayer === 'X' ? '1' : '2'}`;
        }
    }
}

function showWinAlert(winner) {
    const alertElement = document.createElement('div');
    alertElement.classList.add('alert', 'alert-win');
    alertElement.innerHTML = `<p>${winner} Ganó</p>`;
    document.body.appendChild(alertElement);
    setTimeout(() => {
        alertElement.style.display = 'none';
        alertElement.remove();
    }, 2000);
}

function showTieAlert() {
    const alertElement = document.createElement('div');
    alertElement.classList.add('alert', 'alert-tie');
    alertElement.innerHTML = '<p>Empate</p>';
    document.body.appendChild(alertElement);
    setTimeout(() => {
        alertElement.style.display = 'none';
        alertElement.remove();
    }, 2000);
}


function checkWin(player) {
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (cells[a].textContent === player && cells[b].textContent === player && cells[c].textContent === player) {
            return true;
        }
    }
    return false;
}

function isBoardFull() {
    return Array.from(cells).every(cell => cell.textContent !== '');
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    playerTurnIndicator.textContent = 'Jugador 1';
}

const resetButton = document.getElementById('reset-button');

resetButton.addEventListener('click', resetGame);
