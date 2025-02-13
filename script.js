//
//Constants for buttons
const washBtn = document.querySelector("#action-wash");
const feedBtn = document.querySelector("#action-feed");
const playBtn = document.querySelector("#action-play");
const startBtn = document.querySelector("#action-menu-start-game");

const play1 = document.getElementById("play1");
const play2 = document.getElementById("play2");
const play3 = document.getElementById("play3");
const play4 = document.getElementById("play4");

const hunger1 = document.getElementById("hunger1");
const hunger2 = document.getElementById("hunger2");
const hunger3 = document.getElementById("hunger3");
const hunger4 = document.getElementById("hunger4");
const hunger5 = document.getElementById("hunger5");

const dirtiness1 = document.getElementById("dirtiness1");
const dirtiness2 = document.getElementById("dirtiness2");
const dirtiness3 = document.getElementById("dirtiness3");
//
const dirtHp = 300;
const hungerHp = 300;
const playHp = 300;
const scoreBar = 0;

let playTier = 4;
let hungerTier = 5;
let dirtTier = 3;

const playIcons = [play4,play3,play2,play1];
const hungerIcons = [hunger5,hunger4,hunger3,hunger2,hunger1];
const dirtIcons = [dirtiness3,dirtiness2,dirtiness1];
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
    this.dirt=maxdirt;
	dirtTier = 3;
	for(let i = 0; i < dirtIcons.length; i++){
		dirtIcons[i].style.visibility = "visible";
	}
};

Tamagotchi.prototype.actionEat = function() {
	this.hunger=maxHunger
	hungerTier = 5;
	for(let i = 0; i < hungerIcons.length; i++){
		hungerIcons[i].style.visibility = "visible";
	}
};

Tamagotchi.prototype.actionPlay = function() {
	this.play=maxPlay;
	playTier = 4;
	for(let i = 0; i < playIcons.length; i++){
		playIcons[i].style.visibility = "visible";
	}
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
		console.log(tmgch);
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

		//Remove HP every tick
		tmgch.tick();

		moveRat();
		hungerCheck();
		playCheck();
		dirtCheck();


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



//status checking functions


function hungerCheck(){
	//maxhunger = 300
	//threshholds in intervals of 60
	//80% is 240
	//60% is 180
	//40% is 120
	//20% is 60
	//0% is 0

	//80-100 has 5 icons
	//60-80 has 4
	//40-60 has 3
	//20-40 has 2
	//0-20 has 1

	switch(true){
		case (tmgch.hunger < 60):
			if(hungerTier > 1){
				hungerTier = 1;
				hungerIcons[1].style.visibility = "hidden";
			}
			return;
		case (tmgch.hunger < 120):
			if(hungerTier > 2){
				hungerTier = 2;
				hungerIcons[2].style.visibility = "hidden";
			}
			return;
		case (tmgch.hunger < 180):
			if(hungerTier > 3){
				hungerTier = 3;
				hungerIcons[3].style.visibility = "hidden";
			}
			return;
		case (tmgch.hunger < 240):
			if(hungerTier > 4){
				hungerTier = 4;
				hungerIcons[4].style.visibility = "hidden";
			}
			return;
	}
	return;
}

function playCheck(){
	switch(true){
		case (tmgch.play < 75):
			if(playTier > 1){
				playTier = 1;
				playIcons[1].style.visibility = "hidden";
			}
			return;
		case (tmgch.play < 150):
			if(playTier > 2){
				playTier = 2;
				playIcons[2].style.visibility = "hidden";
			}
			return;
		case (tmgch.play < 225):
			if(playTier > 3){
				playTier = 3;
				playIcons[3].style.visibility = "hidden";
			}
			return;
	}
	return;
}

function dirtCheck(){
	switch(true){
		case (tmgch.dirt < 100):
			if(dirtTier > 1){
				dirtTier = 1;
				dirtIcons[1].style.visibility = "hidden";
			}
			return;
		case (tmgch.dirt < 200):
			if(dirtTier > 2){
				dirtTier = 2;
				dirtIcons[2].style.visibility = "hidden";
			}
			return;
	}
	return;
}