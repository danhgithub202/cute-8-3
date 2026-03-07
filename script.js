const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonsArea = document.getElementById("buttonsArea");
const questionText = document.getElementById("questionText");

const successBox = document.getElementById("successBox");
const replayBtn = document.getElementById("replayBtn");
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

replayBtn.addEventListener("click", () => {
  window.location.reload();
});

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