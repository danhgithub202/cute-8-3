function createFloatingHearts() {
  const hearts = document.getElementById("hearts");
  if (!hearts) return;

  const heartIcons = ["💙", "🩵", "💚", "💖", "🌸"];

  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 5 + Math.random() * 6 + "s";
    heart.style.animationDelay = Math.random() * 5 + "s";
    heart.style.fontSize = 16 + Math.random() * 20 + "px";
    hearts.appendChild(heart);
  }
}

createFloatingHearts();

const puzzleBoard = document.getElementById("puzzleBoard");
const shuffleBtn = document.getElementById("shuffleBtn");
const moveCount = document.getElementById("moveCount");
const puzzleNote = document.getElementById("puzzleNote");
const backBtn = document.getElementById("backBtn");

const totalTiles = 9;
let puzzleState = [];
let selectedIndex = null;
let moves = 0;

function createSolvedState() {
  return Array.from({ length: totalTiles }, (_, index) => index);
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  if (arr.every((value, index) => value === index)) {
    [arr[0], arr[1]] = [arr[1], arr[0]];
  }

  return arr;
}

function getTileBackgroundPosition(pieceIndex) {
  const row = Math.floor(pieceIndex / 3);
  const col = pieceIndex % 3;
  return `${col * 50}% ${row * 50}%`;
}

function renderPuzzle() {
  puzzleBoard.innerHTML = "";

  puzzleState.forEach((pieceIndex, boardIndex) => {
    const tile = document.createElement("button");
    tile.className = "puzzle-tile";
    tile.type = "button";
    tile.style.backgroundPosition = getTileBackgroundPosition(pieceIndex);

    if (selectedIndex === boardIndex) {
      tile.classList.add("selected");
    }

    tile.addEventListener("click", () => handleTileClick(boardIndex));
    puzzleBoard.appendChild(tile);
  });

  moveCount.textContent = String(moves);
}

function handleTileClick(index) {
  if (selectedIndex === null) {
    selectedIndex = index;
    renderPuzzle();
    return;
  }

  if (selectedIndex === index) {
    selectedIndex = null;
    renderPuzzle();
    return;
  }

  [puzzleState[selectedIndex], puzzleState[index]] = [puzzleState[index], puzzleState[selectedIndex]];
  selectedIndex = null;
  moves += 1;
  renderPuzzle();

  if (isPuzzleSolved()) {
    handlePuzzleSolved();
  }
}

function isPuzzleSolved() {
  return puzzleState.every((value, index) => value === index);
}

function startPuzzleGame() {
  puzzleState = shuffleArray(createSolvedState());
  selectedIndex = null;
  moves = 0;
  puzzleNote.textContent = "Hãy ghép lại bức ảnh thật hoàn chỉnh nha 🌸";
  renderPuzzle();
}

function handlePuzzleSolved() {
  puzzleNote.textContent = "Giỏi quá, em đã mở được phần quà bí mật rồi đó 💙";
  setTimeout(() => {
    window.location.href = "reward.html";
  }, 900);
}

shuffleBtn.addEventListener("click", () => {
  startPuzzleGame();
});

backBtn.addEventListener("click", () => {
  window.location.href = "success.html";
});

startPuzzleGame();