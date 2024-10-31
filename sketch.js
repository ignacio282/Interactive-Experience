let gameState = "start";
let deck = [];
let hand = [];
let tempCard;
let playerHp = 10;
let playerArmor = 0;
let turn = "player";
let cardNum;
let bg;
let bossDamage;

function preload(){
  bg = loadImage("Assets/background.jpg");
}

function setup() {
  createCanvas(800, 600);
  card1 = new createCard("attack 2", 0, "deal 2 damage", 1, 2);
  card2 = new createCard("heal 2", 1, "heal 2 damage", 1, 2);
  card3 = new createCard("defend 2", 2, "gain 2 armor", 1, 2);
  card4 = new createCard("attack 1", 0, "deal 1 damage", 1, 1);
  card5 = new createCard("heal 1", 1, "Heal 1 damage", 1, 1);
  card6 = new createCard("defend 1", 2, "gain 1 armor", 1, 1);
  card7 = new createCard("attack 3", 0, "deal 3 damage", 1, 3);
  card8 = new createCard("heal 0", 1, "Heal 0 damage", 1, 0);
  card9 = new createCard("defend 3", 2, "gain 3 armor", 1, 3);

  deck = [card1, card2, card3, card4, card5, card6, card7, card8, card9];
  dealCards();

  boss = new createBoss(20,0,2,0);
  

}

function draw() {
  background(bg);
console.log(gameState);
  if (gameState === "start") {
    playerHp = 10;
    playerArmor = 0;
    displayStartScreen();
  }
  if (gameState === "playing") {
    playGame();
    if(boss.hp <=0){
      gameState = "gameOver"
    }
    if(playerHp <= 0 ){
      gameState = "gameOver"
    }
  }
  if (gameState === "gameOver") {
    displayOverScreen();
  }
}

function displayStartScreen() {
  textAlign(CENTER);
  fill("white");
  textSize(24);
  text("Welcome to the Boss Rush Card Game!", width / 2, height / 2 - 20);
  textSize(18);
  text("Press ENTER to start", width / 2, height / 2 + 20);
}

function playGame() {
  displayStats();
  displayHand();
  
  // Instructions on how to play
  textAlign(CENTER);
  fill("white");
  textSize(18);
  text(
    "Press 1 to use the first card, 2 to use the second card, 3 to use the third card",
    width / 2,
    height - 50
  );

  if (turn === "boss") {
    boss.attack();
  }
  if (hand.length === 0 ){
    dealCards();
  }
}

function displayHand() {
  textAlign(LEFT);
  fill("white");
  textSize(16);
  text("Your Hand:", 20, 140);

  for (let i = 0; i < hand.length; i++) {
    text(`Card ${i + 1}: ${hand[i].name} - ${hand[i].effect}`, 20, 170 + i * 20);
  }
}

function createCard(tempName, tempType, tempEffect, tempCost, tempValue) {
  this.name = tempName;
  this.type = tempType; // attack = 0, heal=1, defend=2;
  this.effect = tempEffect;
  this.cost = tempCost;
  this.value = tempValue;
}

function createBoss(tempHp,tempMinDmg,tempMaxDmg,tempArmor) {
  this.hp = tempHp;
  this.minDamage = tempMinDmg;
  this.maxDamage = tempMaxDmg;
  this.armor = tempArmor;
  bossDamage = random(this.minDamage,this.maxDamage);
  
  this.attack = function () {
    bossDamage = int(random(this.minDamage,this.maxDamage));
    playerHp = playerHp - bossDamage;
    turn = "player";
  };
}

function displayStats() {
  textAlign(LEFT);
  fill("white");
  textSize(20);
  text("Boss HP: " + boss.hp, 20, 50);
  text("Player HP: " + playerHp, 20, 80);
  text("Player Armor: " + playerArmor, 20, 110);
}

function displayOverScreen() {
  background("black");
  textAlign(CENTER);
  fill("white");
  textSize(24);
  text("Game Over. Press ENTER to Restart", width / 2, height / 2);
}

function dealCards() {
  for (let i = 0; i < 3; i++) {
    cardNum = int(random(0, deck.length));
    tempCard = deck[cardNum];
    deck.splice(cardNum, 1);
    hand.push(tempCard);
    console.log("card # " + (i + 1) + " is: " + hand[i].name);
  }
}



function keyPressed() {
  if (gameState === "start" && keyCode === ENTER) {
    gameState = "playing";
  } else if (gameState === "gameOver" && keyCode === ENTER) {
    gameState = "start";
  }

  if (gameState === "playing") {
    if (key === "1") {
      if (hand[0].type === 0) {
        boss.hp = boss.hp - hand[0].value;
        console.log("Boss HP: " + boss.hp);
      }
      if (hand[0].type === 1) {
        playerHp = playerHp + hand[0].value;
        console.log("Player HP: " + playerHp);
      }
      if (hand[0].type === 2) {
        playerArmor = playerArmor + hand[0].value;
        console.log("Player Armor: " + playerArmor);
      }
      turn = "boss";
      hand.splice(0,1);
      console.log(`you have `+ hand.length + ` cards left`)
    }
    if (key === "2") {
      if (hand[1].type === 0) {
        boss.hp = boss.hp - hand[1].value;
        console.log("Boss HP: " + boss.hp);
      }
      if (hand[1].type === 1) {
        playerHp = playerHp + hand[1].value;
        console.log("Player HP: " + playerHp);
      }
      if (hand[1].type === 2) {
        playerArmor = playerArmor + hand[1].value;
        console.log("Player Armor: " + playerArmor);
      }
      turn = "boss";
      hand.splice(1,1);
    }
    if (key === "3") {
      if (hand[2].type === 0) {
        boss.hp = boss.hp - hand[2].value;
        console.log("Boss HP: " + boss.hp);
      }
      if (hand[2].type === 1) {
        playerHp = playerHp + hand[2].value;
        console.log("Player HP: " + playerHp);
      }
      if (hand[2].type === 2) {
        playerArmor = playerArmor + hand[2].value;
        console.log("Player Armor: " + playerArmor);
      }
      turn = "boss";
      hand.splice(2,1);
    }
  }
}


