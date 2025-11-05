const spaceship = document.querySelector(".spaceship");
const background = document.querySelector('.background');
const keyDiv = document.querySelector('.key');
const manual = document.querySelector('.manual');


// display keydown
function showKeydown(key){
	keyDiv.innerText = `${key}`;
	let keyframes = [
		{opacity: 1},
		{opacity: 0},
	]
	let options = {
		duration: 1000,
		easeing: "ease-in"
	}
	keyDiv.animate(keyframes, options);
}


// create astroid
function random(min, max) {
	return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floating(item, delayAfter, size) {
	gsap.to(
		item,
		random(1.5, 2.5),
		{
			delay: random(0, delayAfter),
			y: size,
			repeat: -1,
			yoyo: true,
			ease: Power1.easeInOut
		}
	);
}


const field = document.querySelector('.others-container');
const fieldRect = field.getBoundingClientRect();


function createAsteroid(num) {
	const xMin = 0;
	const yMin = 0;
	const xMax = fieldRect.width;
	const yMax = fieldRect.height;

	size = Math.floor(random(1, 6));
	rotate = random(0, 360);
	  
	newDiv = document.createElement('div');
	    
	const x = random(xMin, xMax);
  const y = random(yMin, yMax);
  
  newDiv.className += `floating asteroid${num}`;

  newDiv.style.position = 'absolute';
  newDiv.style.left = `${x}px`;
  newDiv.style.top = `${y}px`;
  
  newDiv.style.width = `${size*15}px`; 
  newDiv.style.height = `${size*15}px`;

  newDiv.style.transform = `rotate(${rotate}deg)`;

  newDiv.style.backgroundImage = `url('./img/asteroid_${size}.png')`;
  newDiv.style.backgroundSize = 'contain';
  newDiv.style.backgroundRepeat = 'no-repeat';

  field.appendChild(newDiv);

  floating(`.asteroid${num}`, 0, random(10, 25));
}

asteroid_num = 0;

for (let i = 0; i<20; i++){
	createAsteroid(asteroid_num);
	asteroid_num += 1;
}


// move(wasd)
function move(x, y){
	let keyframes = [
		{transform: "translate(0, 0)"},
		{transform: `translate(${x}px, ${y}px)`},
		{transform: "translate(0, 0)"}
	]
	let options = {
		duration: 1600,
		easeing: "ease-out"
	}
	spaceship.animate(keyframes, options);
}


// warp(q)
current_background = 1;

function warp(){
	let keyframes = [
		{transform: "scale(1, 1)"},
		{transform: "scale(0, 0)"}
	]
	let options = {
		duration: 1600,
		easeing: "ease-in"
	}
	spaceship.animate(keyframes, options);


	next_background = Math.floor(random(2, 7));
	keyframes = [
		{backgroundImage: `url("./img/background_${current_background}.jpg")`},
		{backgroundImage: 'url("./img/white.png")'},
		{backgroundImage: `url("./img/background_${next_background}.jpg")`}
	]
	options = {
		duration: 2000,
		easeing: "easeInOut"
	}
	background.animate(keyframes, options);
	background.style.backgroundImage = `url("./img/background_${next_background}.jpg")`;
	current_background = next_background;

	const asteroids = document.getElementsByClassName("floating");
	for (let i = 0; i<20; i++){
		asteroids[i].style.opacity = '0';
	}
}


// radio wave(e)
function createHollowCircle(num){
	newDiv = document.createElement('div');
	newDiv.className += `hollow-circle hc${num}`;
	background.appendChild(newDiv);
}

function activeHC(num){
	hollowCircle = document.querySelector(`.hc${num}`);
	hollowCircle.classList.toggle('active');
}


// laser
function createLaser(num){
	newDiv = document.createElement('div');
	newDiv.className += `laser${num}`;

	newDiv.style.width = "50px"; 
  newDiv.style.height = "50px";

	newDiv.style.backgroundImage = "./img/laser.png";
  newDiv.style.backgroundSize = 'contain';
  newDiv.style.backgroundRepeat = 'no-repeat';

	background.appendChild(newDiv);
}


function activeLaser(num){
	const laser = document.querySelector(`.laser${num}`);
	let keyframes = [
		{transform: "translate(0, 0)"},
		{transform: 'translate(0, -500px)'}
	]
	let options = {
		duration: 500
	}
	laser.animate(keyframes, options);
}


hc_num = 0;
laser_num = 0;

const bgm = new Audio('./sound/bgm.mp3');
bgm.volume = 0.5;
bgm.loop = true;

const radioWaveSound = new Audio('./sound/radio_wave.mp3');
const warpSound = new Audio('./sound/warp.mp3');


// Listen for keydown events
document.addEventListener("keydown", function(event) {
	bgm.play();
	console.log("Key pressed:", event.key);
	if (event.key === "w"){
		move(0, -100);
	} else if (event.key === "a"){
		move(-100, 0);
	} else if (event.key === "s") {
		move(0, 100);
	} else if (event.key === "d") {
		move(100, 0);
	} else if (event.key === "q") {
		warpSound.play();
	  warp();
	  manual.style.opacity = '0';
	} else if (event.key === "e") {
		radioWaveSound.play();
		createHollowCircle(hc_num);
		setTimeout(function(){
			activeHC(hc_num);
			hc_num += 1;
		}, 1);
	} else if (event.key === "r") {
		createLaser(laser_num);
		activeLaser(laser_num);
		laser_num += 1;
	} 

	showKeydown(event.key);



});

