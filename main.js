const keyDiv = document.querySelector('.key');
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



function random(min, max) {
	return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingCircle(item, delayAfter, size) {
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


const field = document.querySelector('.wrap');
const fieldRect = field.getBoundingClientRect();


function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}


function createCircle(num) {
	const xMin = 0;
	const yMin = 0;
	const xMax = fieldRect.width;
	const yMax = fieldRect.height;

	size = randomNumber(10, 50);
	  
	newDiv = document.createElement('div');
	    
	const x = randomNumber(xMin, xMax);
  const y = randomNumber(yMin, yMax);
  
  newDiv.className += `floating c${num}`;

  newDiv.style.position = 'absolute';
  newDiv.style.left = `${x}px`;
  newDiv.style.top = `${y}px`;
  
  newDiv.style.width = `${size}px`; 
  newDiv.style.height = `${size}px`;
  newDiv.style.backgroundColor = 'skyblue';
  newDiv.style.borderRadius = '50%';

  field.appendChild(newDiv);

  floatingCircle(`.c${num}`, 0, randomNumber(10, 25));
}


background = document.querySelector('.background');


function createHollowCircle(num){
	newDiv = document.createElement('div');
	newDiv.className += `hollow-circle hc${num}`;
	background.appendChild(newDiv);
}

function activeHC(num){
	hollowCircle = document.querySelector(`.hc${num}`);
	hollowCircle.classList.toggle('active');
	
	hollowCircle.ontransitionend = () => {
		//hollowCircle.remove();
		console.log(num);
	}	
}


const circle = document.querySelector(".circle");


circle_num = 0;
hc_num = 0;

// Listen for keydown events
document.addEventListener("keydown", function(event) {
	console.log("Key pressed:", event.key);
	if (event.key === "q") {
	  createCircle(circle_num);
	  circle_num += 1;
	} else if (event.key === "w"){
		circle.classList.toggle('upward');
		setTimeout(function(){
			circle.classList.toggle('upward');
		}, 800);
	} else if (event.key === "e") {
		createHollowCircle(hc_num);
		setTimeout(function(){
			activeHC(hc_num);
			hc_num += 1;
		}, 1);
	} else if (event.key === "r") {
		
	} 

	showKeydown(event.key);



});

