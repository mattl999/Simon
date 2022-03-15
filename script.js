//Constants and QuerySelectors
const wrapper = document.getElementById("wrapper");

const button1 = document.getElementById("btn1");
const button2 = document.getElementById("btn2");
const button3 = document.getElementById("btn3");
const button4 = document.getElementById("btn4");

const light1 = document.getElementById("light1");
const light2 = document.getElementById("light2");
const light3 = document.getElementById("light3");
const light4 = document.getElementById("light4");

const buttons = document.querySelectorAll(".btn");
const lights = document.querySelectorAll(".light");

const buttonPanel = document.getElementById("btn-container");
const lightPanel = document.getElementById("light-container");
//headerEls
const topContainer = document.getElementById("top-container");
const title = document.getElementById("title");
const message = document.getElementById("message");
const health = document.getElementById("health");
const rocket1 = document.getElementById("rocket1");
const rocket2 = document.getElementById("rocket2");
const rocket3 = document.getElementById("rocket3");
const music = document.getElementById("song");

const scoreBox = document.getElementById("score");

const innerScore = document.querySelector(".score-value");
//bottom buttons
const startButton = document.getElementById("start");
const playAgainButton = document.getElementById("play-again");
const muteMusic = document.getElementById("mute");
const muteSfx = document.getElementById("sfx");

const msgArray = [
  "<span>Your Turn</span>",
  "<span>&darr;&darr; Watch Closely &darr;&darr;</span>",
  "<span>Press the Start Button to Begin.</span>",
  "<span>👽:Yes! All Humans Shall Fall Before Me!</span>",
  "<span>👽: Press the Restart Button to try again.</span>",
  "<span>👽: Don\x27t get distracted by this message</span>",
  "<span>👽: What was it?...Blue green red red?</span>",
  "<span>👽: Kneel before me Sapien!</span>",
  "<span>👽: You\x27ll never defeat me!</span>",
  "<span>👽: Your earthly brain is no match for me!</span>",
  "<span>👽: Yes, do as I say.</span>",
  "<span> 👽: prepare for annihilation</span>",
];
const wrongArray = [
  "wrong!",
  "wrong again!",
  "wrong! prepare to meet your doom earthling!",
];

const buttonArr = [button1, button2, button3, button4];
const lightArr = [light1, light2, light3, light4];
const idxArr = [1, 2, 3, 4];

function sound(src, id = "") {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.setAttribute("id", id);
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

let soundTrack = new sound("./assets/sounds/soundtrack.mp3", "soundTracks");
const songo = document.getElementById("soundTracks");
songo.volume = 0.01;


let introSound = new sound("./assets/sounds/intro.mp3", "introTracks");
const introo = document.getElementById("introTracks");
introo.volume = 0.04;


const sound1 = new sound("./assets/sounds/button1Sound.wav", "butt1");
document.getElementById("butt1").volume = 0.1;


const sound2 = new sound("./assets/sounds/Button2Sound.wav", "butt2");
document.getElementById("butt2").volume = 0.1;


const sound3 = new sound("./assets/sounds/button3sound.wav", "butt3");
document.getElementById("butt3").volume = 0.1;


const sound4 = new sound("./assets/sounds/button4sound.wav", "butt4");
document.getElementById("butt4").volume = 0.1;


const correctSound = new sound("./assets/sounds/Correct.wav", "correct");
document.getElementById("correct").volume = 0.2;


const alienSound = new sound("./assets/sounds/alienSound.wav");


const wrongSound = new sound("./assets/sounds/Wrong.wav","wrong");
document.getElementById("wrong").volume = 0.2;


const deathSound = new sound("./assets/sounds/Death.wav", "deathNoise");
document.getElementById("deathNoise").volume = 0.1;

const soundArr = [alienSound, sound1, sound2, sound3, sound4];

function randomNum() {
  return Math.floor(Math.random() * (4 - 1 + 1) + 1);
}
function randomMsgNum() {
  return Math.floor(Math.random() * (10 - 5 + 1) + 5);
}

function scoreMult(a) {
  return a * 1.6;
}

// setInterval(
// }),1000)

//State Variables

let player = [];
let alien = [];
let playerIdx = [];
let alienChoices = [];
let hp = 3;
let msgIdx = 0;
let round = 0;
let r = randomNum();
let m = randomMsgNum();
let missed = false;
let wrong = 0;
let guessNum = 0;
let guessIdx = 0;
let muted = 0;
let restarted = 0;
let score = 0;
let scoreGain = 1;
// introSound.play();
function disableButtons() {
  button1.removeEventListener("click", makeChoice);
  button2.removeEventListener("click", makeChoice);
  button3.removeEventListener("click", makeChoice);
  button4.removeEventListener("click", makeChoice);
}

//Event Listeners

startButton.addEventListener("click", init);
playAgainButton.addEventListener("click", init);

function msgTest() {
  let m = randomMsgNum();
  console.log(m);
  message.innerHTML = msgArray[m];
}
// startButton.addEventListener("click", init);

muteMusic.addEventListener("click", mute);

soundTrack.volume = 0.01;

//Init Function

function init() {
  restarted++;
  if (restarted < 2) {
    introSound.stop();
    soundTrack.play();
    songo.currentTime = 0;
    soundTrack.src = "./assets/sounds/blank.mp3";
    document.getElementById("soundTracks").volume = 0.05;
    // soundTrack.play();
    
    player = [];
    alien = [];
    playerIdx = [];
    alienChoices = [];
    hp = 3;
    msgIdx = 0;
    round = 0;
    score = 0;
    scoreGain = 1;
    innerScore.textContent = score;
    r = randomNum();
    m = randomMsgNum();
    missed = false;
    guessNum = 0;
    guessIdx = 0;
    wrong = 0;
    muted = 0;

    console.log(restarted);

    rocket1.style.visibility = "visible";
    rocket2.style.visibility = "visible";
    rocket3.style.visibility = "visible";
    startButton.style.display = "none";
    playAgainButton.style.display = "block";
    message.innerHTML = msgArray[11];
    setTimeout(function () {
      message.innerHTML = "3";
      setTimeout(function () {
        message.innerHTML = "2";
        setTimeout(function () {
          message.innerHTML = "1";
          setTimeout(function () {
            message.innerHTML = "begin!";
            setTimeout(function () {
              alienLights();
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 3600);
  }
}

function mute() {
  muted++;
  if (muted % 2 === 1) {
    document.getElementById("introTracks").volume = 0;
    document.getElementById("soundTracks").volume = 0;
    muteMusic.innerText = "un-mute";
  } else {
    muteMusic.innerText = "mute";

    document.getElementById("introTracks").volume = 0.01;
    document.getElementById("soundTracks").volume = 0.01;
  }
}

function youDied() {
  soundTrack.stop();
  deathSound.play();
  introo.currentTime = 0;
  setTimeout(function () {
    introSound.play();
  }, 2200);

  message.innerHTML = msgArray[3];
  console.log("function is being activated");
  disableButtons();
  setTimeout(function () {
    message.innerHTML = msgArray[4];
    playAgainButton.style.display = "block";
  }, 3000);
}

function takeDamage() {
  wrapper.setAttribute("class", "oof");
  wrongSound.play();
  setTimeout(function () {
    wrapper.classList.remove("oof");
  }, 1000);
}

function lightUp(arrIdx, cb) {
  setTimeout(function () {
    alien[arrIdx].classList.add("lit");
    soundArr[parseInt(alien[arrIdx].textContent)].play();
    // console.log("func 1");
    cb();
  }, 300);
}

function lightOff(arrIdx) {
  setTimeout(function () {
    alien[arrIdx].classList.remove("lit");
    // soundArr[parseInt(alien[arrIdx].textContent)].stop();
    // console.log("func 2");
    arrIdx++;
    if (arrIdx < alien.length) {
      lightUp(arrIdx, function () {
        lightOff(arrIdx, function () {});
      });
    } else {
      if (round % 3 === 1) {
        setTimeout(function () {
          let m = randomMsgNum();
          message.innerHTML = msgArray[m];
        }, 1000);
      }
      playerTurn();
    }
  }, 600);
}

function alienLights() {
  setTimeout(function () {
    message.innerHTML = msgArray[1];
  }, 400);

  restarted = 0;
  setTimeout(function () {
    console.log(round);
    if (!missed) {
      let r = randomNum();
      alien.push(lightArr[r - 1]);
      alienChoices.push(idxArr[r - 1]);
    }

    let arrIdx = 0;
    console.log("alienChoices: " + alienChoices);
    lightUp(arrIdx, function () {
      lightOff(arrIdx, function () {});
    });
  }, 1200);
}

function makeChoice(evt) {
  setTimeout(function () {
    missed = false;
    let pushed = evt.target;
    player.push(parseInt(pushed.innerHTML));
    // soundArr[parseInt(pushed.innerHTML)].play();
    if (player[guessNum] === alienChoices[guessNum]) {
      guessNum++;
      if (player.length !== alienChoices.length) {
        soundArr[parseInt(pushed.textContent)].play();
      }
    } else {
      wrong++;
      if (wrong === 1) {
        rocket3.style.visibility = "hidden";
      } else if (wrong === 2) {
        rocket2.style.visibility = "hidden";
      } else if (wrong === 3) {
        rocket1.style.visibility = "hidden";
      }
      missed = true;
      guessNum = 0;
      round++;
      hp--;

      if (hp <= 0) {
        youDied();
        return;
      }
      takeDamage();
      disableButtons();
      alienLights();
    }

    if (player.length === alienChoices.length) {
      guessNum = 0;
      round++;

      if (!missed) {
        correctSound.play();
        buttonPanel.setAttribute("class", "nice");
        
        score = score + scoreGain;
        innerScore.textContent = score;
        setTimeout(function () {
          buttonPanel.classList.remove("nice");
        }, 1500);
      }

      disableButtons();
      alienLights();
    }
  }, 100);
}

function playerTurn() {
  setTimeout(function () {
    button1.addEventListener("click", makeChoice);
    button2.addEventListener("click", makeChoice);
    button3.addEventListener("click", makeChoice);
    button4.addEventListener("click", makeChoice);
    if (round % 3 !== 1) {
      message.innerHTML = msgArray[0];
    }
    player = [];
  }, 500);
}
