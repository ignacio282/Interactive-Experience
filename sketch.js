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
let bossHp;
let bossDead;
let playerDead;
let cardsDealt;
let bgMusic;
let hitSound;
let healSound;
let armorSound;

function preload() {
  bg = loadImage("Assets/background.jpg");
  bossSprite = loadImage("Assets/boss.png");
  bgMusic = loadSound("Assets/music.mp3");
  hitSound = loadSound("Assets/hit.wav");
  healSound = loadSound("Assets/heal.wav");
  armorSound = loadSound("Assets/armor.wav");
  
  

  // Load images for each card in the deck
  card1 = new createCard("attack 2", 0, "deal 2 damage", 1, 2, loadImage("Assets/Card_Dmg_2.png"));
  card2 = new createCard("heal 2", 1, "heal 2 damage", 1, 2, loadImage("Assets/Card_Heal_2.png"));
  card3 = new createCard("defend 2", 2, "gain 2 armor", 1, 2, loadImage("Assets/Card_Armr_2.png"));
  card4 = new createCard("attack 1", 0, "deal 1 damage", 1, 1, loadImage("Assets/Card_Dmg_1.png"));
  card5 = new createCard("heal 1", 1, "Heal 1 damage", 1, 1, loadImage("Assets/Card_Heal_1.png"));
  card6 = new createCard("defend 1", 2, "gain 1 armor", 1, 1, loadImage("Assets/Card_Armr_1.png"));
  card7 = new createCard("attack 0", 0, "deal 3 damage", 1, 0, loadImage("Assets/Card_Dmg_0.png"));
  card8 = new createCard("heal 0", 1, "Heal 0 damage", 1, 0, loadImage("Assets/Card_Heal_0.png"));
  card9 = new createCard("defend 0", 2, "gain 3 armor", 1, 0, loadImage("Assets/Card_Armr_0.png"));
  card10 = new createCard("attack 1", 0, "deal 1 damage", 1, 1, loadImage("Assets/Card_Dmg_1.png"));
  card11 = new createCard("attack 1", 0, "deal 1 damage", 1, 1, loadImage("Assets/Card_Dmg_1.png"));
  card12 =  new createCard("attack 1", 0, "deal 1 damage", 1, 1, loadImage("Assets/Card_Dmg_1.png"));
   
}

function setup() {
  createCanvas(800, 600);
  gameState = "start";
  bgMusic.loop();
  cardsDealt = false;
  bossDead = false;
  playerDead = false;
  
  
  let a = createA('https://www.darrencurtismusic.com/freemusicpage1', 'Music by Darren curtis','_blank');
  a.position(570, 0);

}

function draw() {
  background(bg);
  fill("rgb(216,195,195)");
  rect(560,0,170,30);
  console.log(gameState);
  if (gameState === "start") {
    deck = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12];
    if(cardsDealt == false){
      dealCards();
      cardsDealt = true;
      bossDead = false;
      playerDead = false;
    }

    playerHp = 10;
    playerArmor = 0;
    bossHp = int(random(5,11));
    boss = new createBoss(bossHp,0,2,0);
    displayStartScreen();
    
  }
  if (gameState === "playing") {
    playGame();
    
    if(boss.hp <=0){
      bossDead = true;
      gameState = "gameOver"
    }
    if(playerHp <= 0 ){
      playerDead = true;
      gameState = "gameOver"
    }
    if(deck.length === 0){
      gameState = "gameOver"
      
    }
  }
  
  if (gameState === "gameOver") {
    displayOverScreen();
    
  }
}

function displayStartScreen() {
  textAlign(CENTER);
  fill("black");
  rect(60, height/2-80, 680, 200);
  fill("white");
  textSize(24);
  text("Welcome to the Boss Rush Card Game!", width / 2, height / 2 - 20);
  textSize(18);
  text("Press ENTER to start", width / 2, height / 2 + 60);
  text( "Press 1 to use the first card, 2 to use the second card, 3 to use the third card", width / 2, height / 2 + 20);
}

function playGame() {
  image(bossSprite,200,100,350,350);
  displayStats();
  displayHand();
  

  if (turn === "boss") {
    boss.attack();
  }
  if (hand.length === 0 ){
    dealCards();
  }
}

function displayHand() {
  for (let i = 0; i < hand.length; i++) {
    let cardX = 100 + i * 220;  // Position each card with spacing
    let cardY = height - 240;  // Bottom of the screen
    image(hand[i].iLink, cardX, cardY, 200, 280);  // Draw card image
  }
}

function createCard(tempName, tempType, tempEffect, tempCost, tempValue, tempIlink) {
  this.name = tempName;
  this.type = tempType; // attack = 0, heal=1, defend=2;
  this.effect = tempEffect;
  this.cost = tempCost;
  this.value = tempValue;
  this.iLink = tempIlink;
}

function createBoss(tempHp,tempMinDmg,tempMaxDmg,tempArmor) {
  this.hp = tempHp;
  this.minDamage = tempMinDmg;
  this.maxDamage = tempMaxDmg;
  this.armor = tempArmor;
  bossDamage = random(this.minDamage,this.maxDamage);
  
  this.attack = function () {
    bossDamage = int(random(this.minDamage,this.maxDamage));
    if(playerArmor>0){
      playerArmor = playerArmor - bossDamage;
    }else{
      playerHp = playerHp - bossDamage;
    }
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
  if(deck.length==0 && bossDead == false){
    text("You are out of cards. Press ENTER to Restart", width / 2, height / 2);
    console.log('out of cards');
  }
  if(deck.length==0 && bossDead == true){
    text("Congratulations you killed the boss. Press ENTER to Restart", width / 2, height / 2);
    console.log('out of cards but killed the boss');
  }
  if(deck.length>0 && bossDead == true){
    text("Congratulations you killed the boss. Press ENTER to Restart", width / 2, height / 2);
    console.log('killed the boss');
  }
  if(playerHp<=0 && boddDead ==false){
    text("You were killed by the boss. Press ENTER to Restart", width / 2, height / 2);
    console.log('The boss killed you');
  }
  
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

function resetGame() {
  // Reset core game variables
  playerHp = 10;
  playerArmor = 0;
  hand = [];
  turn = "player";

  // Reinitialize the deck manually
  deck = [
    new createCard("attack 2", 0, "deal 2 damage", 1, 2, loadImage("Assets/Card_Dmg_2.png")),
    new createCard("heal 2", 1, "heal 2 damage", 1, 2, loadImage("Assets/Card_Heal_2.png")),
    new createCard("defend 2", 2, "gain 2 armor", 1, 2, loadImage("Assets/Card_Armr_2.png")),
    new createCard("attack 1", 0, "deal 1 damage", 1, 1, loadImage("Assets/Card_Dmg_1.png")),
    new createCard("heal 1", 1, "Heal 1 damage", 1, 1, loadImage("Assets/Card_Heal_1.png")),
    new createCard("defend 1", 2, "gain 1 armor", 1, 1, loadImage("Assets/Card_Armr_1.png")),
    new createCard("attack 0", 0, "deal 3 damage", 1, 3, loadImage("Assets/Card_Dmg_0.png")),
    new createCard("heal 0", 1, "Heal 0 damage", 1, 0, loadImage("Assets/Card_Heal_0.png")),
    new createCard("defend 0", 2, "gain 3 armor", 1, 3, loadImage("Assets/Card_Armr_3.png"))
  ];

  // Reset boss stats
  boss = new createBoss(20, 0, 2, 0);

  // Deal initial hand of cards
}



function keyPressed() {
  if (gameState === "start" && keyCode === ENTER) {
    bgMusic.play();
    gameState = "playing";
  } else if (gameState === "gameOver" && keyCode === ENTER) {
    gameState = "start";
  }

  if (gameState === "playing") {
    if (key === "1") {
      if (hand[0].type === 0) {
        hitSound.play();
        boss.hp = boss.hp - hand[0].value;
        console.log("Boss HP: " + boss.hp);
      }
      if (hand[0].type === 1) {
        healSound.play();
        playerHp = playerHp + hand[0].value;
        console.log("Player HP: " + playerHp);
      }
      if (hand[0].type === 2) {
        armorSound.play();
        playerArmor = playerArmor + hand[0].value;
        console.log("Player Armor: " + playerArmor);
      }
      turn = "boss";
      hand.splice(0,1);
      console.log(`you have `+ hand.length + ` cards left`)
    }
    if (key === "2") {
      if (hand[1].type === 0) {
        hitSound.play();
        boss.hp = boss.hp - hand[1].value;
        console.log("Boss HP: " + boss.hp);
      }
      if (hand[1].type === 1) {
        healSound.play();
        playerHp = playerHp + hand[1].value;
        console.log("Player HP: " + playerHp);
      }
      if (hand[1].type === 2) {
        armorSound.play();
        playerArmor = playerArmor + hand[1].value;
        console.log("Player Armor: " + playerArmor);
      }
      turn = "boss";
      hand.splice(1,1);
    }
    if (key === "3") {
      if (hand[2].type === 0) {
        hitSound.play();
        boss.hp = boss.hp - hand[2].value;
        console.log("Boss HP: " + boss.hp);
      }
      if (hand[2].type === 1) {
        healSound.play();
        playerHp = playerHp + hand[2].value;
        console.log("Player HP: " + playerHp);
      }
      if (hand[2].type === 2) {
        armorSound.play();
        playerArmor = playerArmor + hand[2].value;
        console.log("Player Armor: " + playerArmor);
      }
      turn = "boss";
      hand.splice(2,1);
    }
  }
}
