//
//Constants for buttons
const washBtn = document.querySelector("#action-wash");
const feedBtn = document.querySelector("#action-feed");
const playBtn = document.querySelector("#action-play");
const startBtn = document.querySelector("#action-menu-start-game");
//
//Constants for main bar
//const dirtHp = document.querySelector("#dirt-hp");
//const hungerHp = document.querySelector("#hunger-hp");
//const playHp = document.querySelector("#play-hp");
//const scoreBar = document.querySelector("#score");

const dirtHp = 300;
const hungerHp = 300;
const playHp = 300;
const scoreBar = 0;
//
//Game settings
const maxdirt = 300;
const maxHunger = 300;
const maxPlay = 300;
//Game speed
let day = 20;

//New object
function Tamagotchi() {
  this.dirt = maxdirt;
  this.hunger = maxHunger;
  this.play = maxPlay;
}

//Abilities
Tamagotchi.prototype.actionWash = function() {
    this.dirt=maxdirt
};

Tamagotchi.prototype.actionEat = function() {
	this.hunger=maxHunger
};

Tamagotchi.prototype.actionPlay = function() {
	this.play=maxPlay
};

Tamagotchi.prototype.tick = function() {
    this.dirt-= 0.15;
    this.hunger-= 0.2;
    this.play-= 0.1;
};

let tmgch = new Tamagotchi();
let dirtHpCount;
let hungerHpCount;
let playHpCount;
let score = 0;

//Controllers
washBtn.addEventListener("click", function() {
	tmgch.actionWash();
});

feedBtn.addEventListener("click", function() {
	tmgch.actionEat();
});

playBtn.addEventListener("click", function() {
	tmgch.actionPlay();
});

startBtn.addEventListener("click", function() {
	startGame();
});


//Togglers for buttons
document.querySelector(".game-screen").classList.toggle("hide");

function MainMenu() {
	document.querySelector(".main-menu-screen").classList.toggle("hide");
}

function startGame() {
	document.querySelector(".game-screen").classList.toggle("hide");
	document.querySelector(".main-menu-screen").classList.toggle("hide");

	//Start game
	core();
	let coreUpdate = setInterval(core, 40);

	//Main function of tamagotchi
	function core() {
		//console.log(tmgch);
		dirtHpCount = (tmgch.dirt / maxdirt * 100).toFixed(2);
		hungerHpCount = (tmgch.hunger / maxHunger * 100).toFixed(2);
		playHpCount = (tmgch.play / maxPlay * 100).toFixed(2);

		//Scores
		score++;
		scoreBar.innerHTML = score;

		//Death ability
		if ((playHpCount <= 0) || (dirtHpCount <= 0) || (hungerHpCount <= 0)) {
			playHpCount = 0;
			dirtHpCount = 0;
			hungerHpCount = 0;
			clearInterval(coreUpdate);
			alert('Your score: ' + score + '\n ╭(×_×)╮');
		}

		//Max health percentage (real)
		//Little help for player
		if (tmgch.dirt >= (maxdirt + (maxdirt / 100 * 20))) {
			tmgch.dirt = maxdirt + (maxdirt / 100 * 20);
		}

		if (tmgch.hunger >= (maxHunger + (maxHunger / 100 * 20))) {
			tmgch.hunger = maxHunger + (maxHunger / 100 * 20);
		}

		if (tmgch.play >= (maxPlay + (maxPlay / 100 * 20))) {
			tmgch.play = maxPlay + (maxPlay / 100 * 20);
		}

		//Max health percentage (for player)
		if ((tmgch.dirt / maxdirt * 100) > 100) {
			dirtHpCount = 100;
		}
		if ((tmgch.hunger / maxHunger * 100) > 100) {
			hungerHpCount = 100;
		}
		if ((tmgch.play / maxPlay * 100) > 100) {
			playHpCount = 100;
		}

		//Show HP on screen
		dirtHp.innerHTML = dirtHpCount;
		hungerHp.innerHTML = hungerHpCount;
		playHp.innerHTML = playHpCount;

		//Remove HP every tick
		tmgch.tick();

		moveRat();


	}
}

//tamogatchi movement functions

let direction = false; //false = right     true = left
let isSat = false;
let sitTime = 120;

function ratStop(){
	if(sitTime == 1){
		isSat = false;
		sitTime = 120;
		if(Math.floor(Math.random() * 100) > 50){
			direction = !direction;
		}
		unStop();
		return;
	}
	sitTime -= 1;
	const rat = document.getElementById('t-body');
	if(direction){
		rat.src = './img/ratSitLeft.png';
		return;
	} 
	rat.src = './img/ratSitRight.png';
	return;
}

function unStop(){
	const rat = document.getElementById('t-body');
	if(direction){
		rat.src = './img/ratLeft.png';
		return;
	}
	rat.src = './img/ratRight.png';
	return;
}

function moveRat(){
	    sitNum = Math.floor(Math.random() * 1000);
		if(sitNum > 995){
			isSat = true;
		}
        if(isSat){
			ratStop();
			return;
		}

		let maxY = window.innerHeight;
		let maxX = window.innerWidth;

		const rat = document.getElementById('t-body');
		let xPos = rat.offsetLeft;
		let yPos = rat.offsetTop;

		if(xPos > maxX - 200){
			rat.src = './img/ratLeft.png';
			direction = true;
		} if(xPos < 200){
			rat.src = './img/ratRight.png';
			direction = false;
		}
		console.log(xPos);
		console.log(maxX);
		console.log(direction);

		let Speed = 5;
		let JumpHig = 10;
		let JumpDis = 0.1;

		if(direction){
			xPos -= Speed;
		} else{
			xPos += Speed;
		}

		yPos = Math.abs(JumpHig * Math.sin(JumpDis * xPos)) * (-1) + 400;
	
		rat.style.top = yPos + "px";
		rat.style.left = xPos + "px";
		return;
}