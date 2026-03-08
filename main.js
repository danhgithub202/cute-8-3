function createFloatingHearts() {
  const hearts = document.getElementById("hearts");
  if (!hearts) return;

  const heartIcons = ["💙", "🩵", "💚", "💖", "🌸"];
  const isMobile = window.innerWidth <= 640;
  const totalHearts = isMobile ? 16 : 30;

  for (let i = 0; i < totalHearts; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 5 + Math.random() * 6 + "s";
    heart.style.animationDelay = Math.random() * 5 + "s";
    heart.style.fontSize = (isMobile ? 14 : 16) + Math.random() * (isMobile ? 10 : 20) + "px";
    hearts.appendChild(heart);
  }
}

createFloatingHearts();

const startBtn = document.getElementById("startBtn");
const introPage = document.getElementById("introPage");
const mainPage = document.getElementById("mainPage");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonsArea = document.getElementById("buttonsArea");
const questionText = document.getElementById("questionText");

const playGameBtn = document.getElementById("playGameBtn");
const backHomeBtn = document.getElementById("backHomeBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const backGameBtn = document.getElementById("backGameBtn");

let yesFontSize = 18;
let noClicks = 0;
const runAwayAfter = 4;

const questions = [
  "Em chắc là không muốn nhận lời chúc này chứ?",
  "Thật luôn á? Anh chuẩn bị dễ thương lắm đó 🥺",
  "Bấm lại thử đi mà, biết đâu em đổi ý 💙",
  "Thôi mà… cho anh chúc em một câu nhé 💌",
  "Anh vẫn muốn em có một ngày 8/3 thật vui 🌷"
];

function isMobileView() {
  return window.innerWidth <= 640;
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function moveNoButton() {
  if (!buttonsArea || !noBtn || isMobileView()) return;

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
  yesFontSize += isMobileView() ? 4 : 8;

  yesBtn.style.fontSize = `${yesFontSize}px`;

  if (!isMobileView()) {
    yesBtn.style.padding = `${12 + noClicks * 2}px ${22 + noClicks * 4}px`;
    yesBtn.style.zIndex = "10";
  }
}

if (startBtn && introPage && mainPage) {
  startBtn.addEventListener("click", () => {
    introPage.classList.add("hidden");
    mainPage.classList.remove("hidden");
  });
}

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    window.location.href = "success.html";
  });
}

if (noBtn && questionText) {
  noBtn.addEventListener("click", () => {
  growYesButton();

  if (noClicks <= questions.length) {
    questionText.textContent = questions[noClicks - 1];
  }

  if (!isMobileView() && noClicks >= runAwayAfter) {
    moveNoButton();
  }
});

  noBtn.addEventListener("mouseenter", () => {
    if (!isMobileView() && noClicks >= runAwayAfter) {
      moveNoButton();
    }
  });
}

if (playGameBtn) {
  playGameBtn.addEventListener("click", () => {
    window.location.href = "puzzle.html";
  });
}

if (backHomeBtn) {
  backHomeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

if (playAgainBtn) {
  playAgainBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

if (backGameBtn) {
  backGameBtn.addEventListener("click", () => {
    window.location.href = "puzzle.html";
  });
}