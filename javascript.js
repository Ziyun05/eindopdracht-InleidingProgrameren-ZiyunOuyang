// Buttons
const startButton = document.querySelector("#startButton");
const restartButton = document.querySelector("#restartButton");

const kikkerNameDisplay = document.querySelector("#kikkerName");

const sleepDisplay = document.querySelector("#sleep");
const hungerDisplay = document.querySelector("#hunger");
const playDisplay = document.querySelector("#play");

const finalHealthDisplay = document.querySelector("#finalHealth");

const mainMenuScreen = document.querySelector(".mainMenuScreen"); 
const gameScreen = document.querySelector(".gameScreen");
const endScreen = document.querySelector(".endScreen");

const playButton = document.querySelector("#playButton");
const feedButton = document.querySelector("#feedButton");
const sleepButton = document.querySelector("#sleepButton");

const kikkerImage = document.querySelector("#kikkerImage");

// Audio 
const kwaakSound = new Audio("img/kikkerKwaken.mp3"); //https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
const gameOverSound = new Audio("img/gameOverSound.mp3");
const backgroundMusic = new Audio("img/backgroundMusic.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

// levenswaarden van de kikker begin 100%
let sleep = 100;
let hunger = 100;
let play = 100;

let kikkerName = "";
let healthInterval;

// Spel starten
function startGame() {

  // Speel kwaakgeluid
  kwaakSound.play();

  // Wacht tot geluid is afgespeeld en start dan het spel
  setTimeout(startAfterSound, 800);
}

// start spel iets later , zodat de muziek af kan worden gespeeld
function startAfterSound() {
  kikkerName = prompt("Geef je kikker maatje een naam?"); 
  if (!kikkerName) kikkerName = "Kikker";

  kikkerNameDisplay.textContent = `Naam: ${kikkerName}`;

  sleep = 100;
  hunger = 100;
  play = 100;

  updateStatsUI();

  // laat het mainMenu verdwijnen en toont het spel scherm
  mainMenuScreen.classList.add("hide");
  endScreen.classList.add("hide");
  gameScreen.classList.remove("hide");

  // Herstart achtergrondmuziek
  backgroundMusic.currentTime = 0; //https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime
  backgroundMusic.play();

  // Stop vorige interval als die nog loopt
  if (healthInterval) clearInterval(healthInterval);

  // Start een nieuwe interval 
  healthInterval = setInterval(() => {
    sleep = Math.max(sleep - 3, 0);
    hunger = Math.max(hunger - 3, 0);
    play = Math.max(play - 3, 0);
    updateStatsUI();
  }, 2000); 
}

// levenswaarden updaten op het scherm
function updateStatsUI() {
  sleepDisplay.textContent = sleep;
  hungerDisplay.textContent = hunger;
  playDisplay.textContent = play;

  // veranderd aan de hand van de percentage van de kikker
  if (sleep <= 5 || hunger <= 5 || play <= 5) {
    kikkerImage.src = "img/kikker_ded.png";
    endGame();
  } else if (sleep < 30 || hunger < 30 || play < 30) {
    kikkerImage.src = "img/kikker_sad.png";
  }
}

// Spel beëindigen als de kikker dood is
function endGame() {
  clearInterval(healthInterval);
  gameScreen.classList.add("hide");
  endScreen.classList.remove("hide");

  gameOverSound.play();

  // laat de laagste stats zien als eindscore
  const lowestStat = Math.min(sleep, hunger, play); //ChatGPT, prompt: hoe laat ik de laagste stats zien als eindscore 
  finalHealthDisplay.textContent = lowestStat;
}

// knoppen om de spel te starten
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);

//knop actie: play
playButton.addEventListener("click", () => {
  play = Math.min(play + 3, 100);
  updateStatsUI(); 
  kikkerImage.src = "img/kikker_blij.png";
});

//knop actie: feed
feedButton.addEventListener("click", () => {
  hunger = Math.min(hunger + 3, 100);          //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
  updateStatsUI();                            
  kikkerImage.src = "img/kikker_eten.png";
});

//knop actie:sleep
sleepButton.addEventListener("click", () => {
  sleep = Math.min(sleep + 3, 100);
  updateStatsUI();
  kikkerImage.src = "img/kikker_slapen.png";
});

// Speelt achtergrondmuziek af als je voor het eerst klikt
document.addEventListener("click", () => {
  backgroundMusic.play();
}, { once: true });

