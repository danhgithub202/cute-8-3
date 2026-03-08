const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");
const backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", () => {
  puzzleScreen.classList.add("hidden");
  successBox.classList.remove("hidden");
});
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonsArea = document.getElementById("buttonsArea");
const questionText = document.getElementById("questionText");

const successBox = document.getElementById("successBox");
const playGameBtn = document.getElementById("playGameBtn");
const replayBtn = document.getElementById("replayBtn");

const puzzleScreen = document.getElementById("puzzleScreen");
const puzzleBoard = document.getElementById("puzzleBoard");
const shuffleBtn = document.getElementById("shuffleBtn");
const moveCount = document.getElementById("moveCount");
const puzzleNote = document.getElementById("puzzleNote");

const rewardScreen = document.getElementById("rewardScreen");
const replayRewardBtn = document.getElementById("replayRewardBtn");

const hearts = document.getElementById("hearts");

let yesFontSize = 18;
let noClicks = 0;
const runAwayAfter = 4;

const questions = [
  "Em chắc là không muốn nhận lời chúc này chứ? 🌸",
  "Thật luôn á? Anh chuẩn bị dễ thương lắm đó 🥺",
  "Bấm lại thử đi mà, biết đâu em đổi ý 💙",
  "Thôi mà… cho anh chúc em một câu nhé 💌",
  "Anh vẫn muốn em có một ngày 8/3 thật vui 🌷"
];

// ===== Floating hearts =====
function createFloatingHearts() {
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

function burstHearts(count = 24) {
  const heartIcons = ["💙", "🩵", "💚", "💖", "🌸", "💞"];

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 2 + Math.random() * 2 + "s";
    heart.style.animationDelay = "0s";
    heart.style.fontSize = 18 + Math.random() * 22 + "px";
    hearts.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4500);
  }
}

// ===== Yes / No logic =====
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function moveNoButton() {
  const areaRect = buttonsArea.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();

  const maxLeft = areaRect.width - noRect.width - 10;
  const maxTop = areaRect.height - noRect.height - 10;

  const newLeft = randomBetween(10, Math.max(10, maxLeft));
  const newTop = randomBetween(10, Math.max(10, maxTop));

  noBtn.style.left = `${newLeft}px`;
  noBtn.style.top = `${newTop}px`;
  noBtn.style.transform = "none";
}

function growYesButton() {
  noClicks += 1;
  yesFontSize += 8;

  yesBtn.style.fontSize = `${yesFontSize}px`;
  yesBtn.style.padding = `${12 + noClicks * 2}px ${22 + noClicks * 4}px`;
  yesBtn.style.zIndex = "10";
}

// ===== Puzzle 3x3 =====
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
    tile.dataset.index = String(boardIndex);
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
  burstHearts(30);

  setTimeout(() => {
    puzzleScreen.classList.add("hidden");
    rewardScreen.classList.remove("hidden");
    burstHearts(34);
  }, 1000);
}

// ===== Events =====
startBtn.addEventListener("click", () => {
  intro.classList.add("hidden");
});

noBtn.addEventListener("click", () => {
  growYesButton();

  if (noClicks <= questions.length) {
    questionText.textContent = questions[noClicks - 1];
  }

  if (noClicks >= runAwayAfter) {
    moveNoButton();
  }
});

noBtn.addEventListener("mouseenter", () => {
  if (noClicks >= runAwayAfter) {
    moveNoButton();
  }
});

yesBtn.addEventListener("click", () => {
  successBox.classList.remove("hidden");
});

playGameBtn.addEventListener("click", () => {
  successBox.classList.add("hidden");
  puzzleScreen.classList.remove("hidden");
  startPuzzleGame();
});

shuffleBtn.addEventListener("click", () => {
  startPuzzleGame();
});

replayBtn.addEventListener("click", () => {
  window.location.reload();
});

replayRewardBtn.addEventListener("click", () => {
  window.location.reload();
});

// ===== Init =====
createFloatingHearts();