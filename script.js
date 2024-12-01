"use strict";

// 3.7
let sysAnimSqnc = [];
//6.0
let usrAnimSqnc = [];

//1.0
let started = false;

//2.0- select h2 element
const h3 = document.querySelector("h3");

//2.1
let level = 0;

//3.0
const animBtn = [
  "cat",
  "tiger",
  "ziraf",
  "dog",
  "mouse",
  "cow",
  "lion",
  "bird",
  "zebra",
];

// 8.0
let highScore = 0;
// 8.1
const h2 = document.querySelector("h2");

//1. & 4.0 accessing all the button type divs from our index.html using DOM manipulation
let allBtn = document.querySelectorAll(".btn");

let play = document.querySelector("#play");
//1.1
//1.2-- if play button is pressed then the game will start.
play.addEventListener("click", function () {
  if (!started) {
    let audio = document.createElement("audio");
    audio.src = "gameStart.mp3";
    audio.play();
    console.log("game started");
    started = true;

    levelUp();
  }
});

//2.2 levelUp() function for leveling up and choose random animal to flash
function levelUp() {
  //7.4
  usrAnimSqnc = [];
  //2.2
  level++;
  h3.textContent = `লেভেল - ${level} | বর্তমান স্কোর - ${level - 1}`;
  //3.1 making random index of animBtn array.
  let ranIdx = Math.floor(Math.random() * animBtn.length);
  let ranAnim = animBtn[ranIdx];

  //3.8 pushing system generated animal to the sysAnimSqnc array as its last element
  sysAnimSqnc.push(ranAnim);
  console.log(sysAnimSqnc);

  // 3.2 iterating sysAnimSqnc[] using forEach so that all button flash can be shown to the user
  sysAnimSqnc.forEach(function (element, index) {
    setTimeout(function () {
      //3.6 Dynamic button Selection Based on gameColorSqnc elements name. Here we gave button's id name and array element's name same so that it can be linked & indentify each other properly and work with the DOM system perfectly.
      let btn = document.querySelector(`#${element}`);
      gameFlash(btn);
    }, index * 600);
  });
  //3.2 inserting animBtn array's value to the buttons dynamically using elements #id
  //   let ranAnimBtn = document.querySelector(`.${ranAnim}`);

  //3.6 calling the gameFlash() function so that whenever game is started the automatically button will be flashed in different color
  //   gameFlash(ranAnimBtn);
}

//3.3 making gameFlash() function which will help to flash the button for the system end.
function gameFlash(btn) {
  //3.4 adding a class for changing bg color using style.css
  btn.classList.add("gameFlash");
  //3.5 using setTime() function remove the previously added class within 500ms=0.5s
  setTimeout(function () {
    btn.classList.remove("gameFlash");
  }, 500);
}

//4.1 - using for-of loop selecting individual button type div from allBtn elements
for (let btn of allBtn) {
  //5. inputed btnPress function as callback() so that after clicking it effect shows
  btn.addEventListener("click", btnPress);
}

//5.0: creating btnPress() function so that we can display & track the user pressed button
function btnPress() {
  let btn = this;
  //6.1 pushing user generated animal to the usrAnimSqnc array as its last element
  usrAnimSqnc.push(btn.id);
  console.log(usrAnimSqnc);

  // 5.2 calling the userFlash() function so that whenever button is pressed by user button will be flashed in different color
  userFlash(btn);
  //7. calling checkAnswer() function here because after user pressed the button this function will activate
  checkAnswer(usrAnimSqnc.length - 1);
}
// 5.1 making userFlash() function which will help to flash the button for the user end.
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 200);
}

//7.0 checkAnswer() function will check between sysAnimSqnc[] and usrAnimSqnc[]elements that each of every level of the game elements are matched or not.
function checkAnswer(idx) {
  //7.1
  if (sysAnimSqnc[idx] === usrAnimSqnc[idx]) {
    //7.2
    if (sysAnimSqnc.length == usrAnimSqnc.length) {
      //7.3 for delaying the flash of button from the system-end after user give input
      setTimeout(levelUp, 1200);
    }
  }
  //0.0 last execution
  else {
    gameOver();
  }
}

function gameOver() {
  h3.innerHTML =
    "<span style='color:red'>গেম🫷ওভার !!</span> আবার খেলতে চাইলে প্লে বাটনে চাপুন👍";

  document.querySelector("body").style.backgroundColor = "red";
  setTimeout(() => {
    document.querySelector("body").style.backgroundColor = "white";
  }, 200);

  if (level > highScore) {
    highScore = level - 1;
  }
  h2.textContent = `সর্বশেষ স্কোর: ${level - 1} | সর্বোচ্চ স্কোর: ${highScore}`;

  let audio = document.createElement("audio");
  audio.src = "gameOver.mp3";
  audio.play();

  reset();
}

//0.1 last execution
function reset() {
  started = false;
  level = 0;
  sysAnimSqnc = [];
  usrAnimSqnc = [];
}
