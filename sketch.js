let sceneNumber;
let rect1Size;
let rect2Size;
let rectVel;
let firstCall;
let blinkTimes;
let locked;


//Dom Elements
let morseInput;
let morseEnter;
let morseBack;

let room2Input;
let room2Enter;
let room2Back;

let checkRed;
let checkGreen;
let checkOrange;
let checkPurple;
let checkPink;
let checkDarkB;
let checkLightB;
let checkYellow;


//images
let room1;
let room1unlocked;
let blur1;
let blur2;
let blur3;

let room2;
let room2unlocked;

let room3unlocked;
let room3locked;

let keypadlocked;
let keypadunlocked;

//sounds
let lockedSound;
let morseCode;
let open;
let wrong;

function preload(){
  room1 = loadImage('room1.jpg');
  room1unlocked = loadImage('room1unlocked.jpg');
  blur1 = loadImage('blur1.jpg');
  blur2 = loadImage('blur2.jpg');
  blur3 = loadImage('blur3.jpg');
  lockedSound = loadSound('locked.mp3');
  morseCode = loadSound('morseCode.mp3');
  unlockSound = loadSound('unlock.mp3');
  open = loadSound('open.mp3');
  room2 = loadImage('room2.jpg');
  room2unlocked = loadImage('room2unlocked.jpg')

  room3unlocked = loadImage('room3unlocked.jpg')
  room3locked = loadImage('room3locked.jpg')

  keypadlocked = loadImage('keypadlocked.jpg');
  keypadunlocked = loadImage('keypadunlocked.jpg');

  wrong = loadSound('wrong.mp3');
}

function setup() {
  createCanvas(800, 600);
  background(0);
  sceneNumber = 0;
  rect1Size = 0;
  rect2Size = 0;
  rectVel = 15;
  firstCall = false;
  blinkTimes = 0;
  textSize(16)
  locked = true;

  morseInput = createInput();
  morseInput.position(320,300);

  morseEnter = createButton("Enter");
  morseEnter.position(600, 400)

  morseBack = createButton("Back");
  morseBack.position(200, 400);

  morseBack.mousePressed(morseB)
  morseEnter.mousePressed(morseCheck)

  room2Input = createInput();
  room2Enter = createButton("Enter");
  room2Back = createButton("Back");

  room2Input.position(320, 300);
  room2Back.position(200, 400);
  room2Enter.position(600,400)

  room2Enter.mousePressed(room2Check)
  room2Back.mousePressed(room2B)



  checkRed = createCheckbox();
  checkGreen = createCheckbox();
  checkOrange = createCheckbox();
  checkPurple = createCheckbox();
  checkPink = createCheckbox();
  checkDarkB = createCheckbox();
  checkLightB = createCheckbox();
  checkYellow = createCheckbox();

  checkGreen.position(79,106);
  checkRed.position(78,217);
  checkOrange.position(122,362);
  checkPurple.position(528,136);
  checkDarkB.position(670, 68);
  checkPink.position(633,148);
  checkLightB.position(641,228);
  checkYellow.position(646,327);

  checkGreen.hide();
  checkRed.hide();
  checkOrange.hide();
  checkPurple.hide();
  checkDarkB.hide();
  checkPink.hide();
  checkLightB.hide();
  checkYellow.hide();

  morseInput.hide();
  morseEnter.hide();
  morseBack.hide();
  room2Input.hide();
  room2Enter.hide();
  room2Back.hide();




}

function draw() {

  console.log(mouseX + " " + mouseY);
  console.log(checkRed.value())
  switch(sceneNumber){
    case 0:
      startUp();
      break;
    case 1:
      loadRoom1();
      break;
    case 2:
      loadRoom2();
      break;
    case 3:
      loadRoom3();
      break;
    case 30:
      morsePass();
      break;
    case 31:
      room2Pass();
      break;

  }


  showDialogue();
}

function showDialogue(){
  switch (sceneNumber){
    case 1:
    if(mouseX > 264 && mouseX < 476 && mouseY > 107 && mouseY < 443){
      fill(0,0,0);
      if(locked){
        text("A locked door", 10, 30)
      } else{
        text("The door seems to be unlocked now", 10, 30)
      }
    }
    if(mouseX > 495 && mouseX < 538 && mouseY > 232 && mouseY < 271){
      if(locked){
        text("Looks like it needs a password to unlock the door", 10, 30)
      } else{
        text("The password was right", 10, 30)
      }
    }
    if(mouseX > 665 && mouseX < 704 && mouseY > 323 && mouseY < 340){
      text("Some kind of device with a button", 10, 30)
    }
    break;
    case 2:
    if(mouseX > 264 && mouseX < 476 && mouseY > 107 && mouseY < 443){
      fill(0,0,0);
      if(locked){
        text("Another locked door", 10, 30)
      } else{
        text("The door seems to be unlocked now", 10, 30)
      }
    }
    if(mouseX > 495 && mouseX < 538 && mouseY > 232 && mouseY < 271){
      if(locked){
        text("Looks like it needs a password to unlock the door", 10, 30)
      } else{
        text("The password was right", 10, 30)
      }
    }
    if(mouseX > 530 && mouseX < 658 && mouseY > 102 && mouseY < 218){
      text("Some kind of puzzle", 10, 30)
    }
    break;
    case 3:
    if(mouseX > 264 && mouseX < 476 && mouseY > 107 && mouseY < 443){
      fill(0,0,0);
      if(locked){
        text("Another locked door", 10, 30)
      } else{
        text("The door seems to be unlocked now", 10, 30)
      }
    }
    if(mouseX > 495 && mouseX < 538 && mouseY > 232 && mouseY < 271){
      if(locked){
        text("Theres only an enter button this time", 10, 30)
      } else{
        text("The buttons were correct", 10, 30)
      }
    }
    break;
  }
}

function mouseClicked(){
  switch (sceneNumber){
    case 1:
    if(mouseX > 264 && mouseX < 476 && mouseY > 107 && mouseY < 443){
      if(locked){
        if(!lockedSound.isPlaying()){
          lockedSound.play();
        }
      } else {
        open.play();
        sceneNumber = 2;
        locked = true;
        morseInput.value("");
        sleep(1000);
      }
    }
    if(mouseX > 495 && mouseX < 538 && mouseY > 232 && mouseY < 271){
      sceneNumber = 30;
    }
    if(mouseX > 665 && mouseX < 704 && mouseY > 323 && mouseY < 340){
      if(!morseCode.isPlaying()){
        morseCode.play();
      }
    }
    break;
   case 2:
   if(mouseX > 264 && mouseX < 476 && mouseY > 107 && mouseY < 443){
     if(locked){
       if(!lockedSound.isPlaying()){
         lockedSound.play();
       }
     } else {
       open.play();
       sceneNumber = 3;
       locked = true;
       sleep(1000);
       checkGreen.show();
       checkRed.show();
       checkOrange.show();
       checkPurple.show();
       checkDarkB.show();
       checkPink.show();
       checkLightB.show();
       checkYellow.show();
       room2Input.value("");
     }
   }
   if(mouseX > 495 && mouseX < 538 && mouseY > 232 && mouseY < 271){
     sceneNumber = 31;
   }
   break;
   case 3:
   if(mouseX > 264 && mouseX < 476 && mouseY > 107 && mouseY < 443){
     if(locked){
       if(!lockedSound.isPlaying()){
         lockedSound.play();
       }
     } else {
       open.play();
       sceneNumber = 1;
       locked = true;
       sleep(1000);
       checkGreen.hide();
       checkRed.hide();
       checkOrange.hide();
       checkPurple.hide();
       checkDarkB.hide();
       checkPink.hide();
       checkLightB.hide();
       checkYellow.hide();

       checkRed.checked(false)
       checkLightB.checked(false)
       checkYellow.checked(false)
       checkPurple.checked(false)
     }
  }
  if(mouseX > 495 && mouseX < 538 && mouseY > 232 && mouseY < 271){
    if(checkRed.checked() && checkLightB.checked() && checkYellow.checked() && checkPurple.checked() && !checkOrange.checked() && !checkGreen.checked() && !checkPink.checked() && !checkDarkB.checked()){
      if(locked){
        unlockSound.play();
        locked = false;
      }
    } else{
      wrong.play();
    }
  }
  break;
 }
}

function increment(){
  sceneNumber += 1;
}



function startGame(){

}

function startUp(){
  background(255,255,255);
  blink()
}

function sleep(milliseconds) {
  let timeStart = new Date().getTime();
    while (true) {
      let elapsedTime = new Date().getTime() - timeStart;
        if (elapsedTime > milliseconds) {
            break;
        }
    }
}

function loadRoom1(){
  if(locked){
    image(room1, 0, 0);
  } else{
    image(room1unlocked, 0, 0);
  }
}

function loadRoom2(){
  if(locked){
    image(room2,0,0);
  } else {
    image(room2unlocked,0,0);
  }
}

function loadRoom3(){
  if(locked){
    image(room3locked,0,0)
  } else{
    image(room3unlocked,0,0)
  }
}

function morsePass(){
  background(255,255,255);
  if(locked){
    image(keypadlocked, 0, 0);
  }
  else{
    image(keypadunlocked, 0, 0);
  }
  morseBack.show();
  morseInput.show();
  morseEnter.show();
}

function room2Pass(){
  background(255,255,255);
  if(locked){
    image(keypadlocked, 0, 0);
  }
  else{
    image(keypadunlocked, 0, 0);
  }
  room2Back.show();
  room2Enter.show();
  room2Input.show();
}



function morseB(){
  sceneNumber = 1;
  morseInput.hide();
  morseEnter.hide();
  morseBack.hide();
}

function room2B(){
  sceneNumber = 2;
  room2Input.hide();
  room2Enter.hide();
  room2Back.hide();
}



function morseCheck(){
  const pass = morseInput.value();
  if(pass.toUpperCase() == "ESCAPE" && locked == true){
    locked = false;
    unlockSound.play();
  } else {
    wrong.play();
  }
}

function room2Check(){
  if(room2Input.value() == "2472"){
    locked = false;
    unlockSound.play();
  }else {
    wrong.play();
  }
}


function blink(){
  fill(0,0,0);
  switch (blinkTimes){
    case 0:
      image(blur1, 0, 0);
      break;
    case 1:
      image(blur2, 0, 0);
      break;
    case 2:
      image(blur2, 0, 0);
      break;
    case 3:
      image(blur3, 0, 0);
      break;
    case 4:
      image(blur3, 0, 0);
      break;
    case 5:
      image(room1, 0, 0);
    default:
      break;
  }

  rect(0,0,windowWidth,rect1Size);
  rect(0, 600 - rect2Size, windowWidth, rect2Size)
  if(rect1Size < -20 || rect1Size > 350){
    rectVel *= -1
    sleep(300)
    blinkTimes += 1

  }
  rect1Size += rectVel;
  rect2Size += rectVel;
  if(blinkTimes > 5){
    sceneNumber += 1;
  }
}



function  gameOver(){

}
