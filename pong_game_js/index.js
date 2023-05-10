const canvas = document.querySelector('Canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

function getRandomInt(min, max) 
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

c.fillRect(0,0, canvas.width, canvas.height);

class Sprite {
	constructor({position, velocity, color, height,width}) 
	{
		this.position = position;
		this.velocity = velocity;
		this.height = height;
		this.width = width;
		this.lastKey;
		this.hitbox = 
		{
			position: this.position,
			width: this.width,
			height: this.height,
		}
		this.color = color;
	}
	draw() {
		c.fillStyle = this.color;
		c.fillRect(this.position.x, this.position.y, this.width, this.height);

		c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.position.width, this.hitbox.position.height)
	}
	update() {
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		if (this.position.y + this.height + this.velocity.y >= canvas.height)
		{
			this.velocity.y = 0;
			this.position.y = 496;
		}

		if (this.position.y + this.velocity.y <= 0)
		{
			this.velocity.y = 0;
			this.position.y = 0;
		}

	}
}

class Ball {
	constructor({position, velocity, color, height,width}) 
	{
		this.position = position;
		this.velocity = velocity;
		this.height = height;
		this.width = width;
		this.lastKey;
		this.hitbox = 
		{
			position: this.position,
			width: this.width,
			height: this.height,
		}
		this.color = color;
		this.r = 10;
		this.reset();
	}
	

	reset()
	{
		this.position.x = canvas.width /2;
		this.position.y = canvas.height / 2;
		this.velocity.x = getRandomInt(5, 10);
		let isLeft = Math.random(1);
		isLeft *= 10;
		if (isLeft <= 5)
			this.velocity.x = -this.velocity.x;
		this.velocity.y = getRandomInt(-5, 5);
	}
	draw() {
		c.fillStyle = this.color;
		c.fillRect(this.position.x, this.position.y, this.width, this.height);
		c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.position.width, this.hitbox.position.height)
	}
	update_ball()
	{
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		if (this.position.x <= 50 || this.position.x + this.height >= 974)
			this.reset();
		
	}
}


const player = new Sprite({
	position: {
	x: 50,
	y: 50
	},
	velocity: {
		x: 0,
		y: 0
	},
	color: 'red',
	width: 10,
	height: 80
});

const enemy = new Sprite({
	position: {
	x: 964,
	y: 50
	},
	velocity: {
		x: 0,
		y: 0
	},
	color: 'white',
	width: 10,
	height: 80
});

const ball = new Ball({
	position:
	{
		x: 512,
		y: 50
	},
	velocity:
	{
		x: -15,
		y: 0
	},
	color: 'green',
	height: 10,
	width: 10,
	});

console.log(player);

const keys = 
{
	w:
	{
		pressed: false
	},
	s:
	{
		pressed: false
	},
	ArrowUp:
	{
		pressed: false
	},
	ArrowDown:
	{
		pressed: false
	}
}



function animate()
{
	window.requestAnimationFrame(animate);
	c.fillStyle = 'black';
	c.fillRect(0,0, canvas.width, canvas.height);
	player.update();
	enemy.update();
	ball.update_ball();
	player.velocity.y  = 0;
	enemy.velocity.y  = 0;

	if (keys.w.pressed && player.lastKey === 'w')
		player.velocity.y = -5;
	else if (keys.s.pressed && player.lastKey === 's')
		player.velocity.y = 5;

	if (keys.ArrowUp.pressed && enemy.lastKey === 'ArrowUp')
		enemy.velocity.y = -5;
	else if (keys.ArrowDown.pressed && enemy.lastKey === 'ArrowDown')
		enemy.velocity.y = 5;

	//*********** HITBOX WITH PADDLE*********/
	if (ball.position.x <= player.position.x + player.width && ball.position.y >= player.position.y && ball.position.y <= player.position.y + player.height)
		ball.velocity.x = -ball.velocity.x;

	if (ball.position.x >= enemy.position.x - enemy.width && ball.position.y >= enemy.position.y && ball.position.y <= enemy.position.y + enemy.height)
		ball.velocity.x = -ball.velocity.x;
	//*********** HITBOX WITH WALL*********/
	
	if (ball.position.y <= 0 || ball.position.y >= 576)
		ball.velocity.y = -ball.velocity.y;

}

animate();

window.addEventListener('keydown', (event) =>{
	switch(event.key)
	{
		case 'w':
			keys.w.pressed = true;
			player.lastKey = 'w';
			break;
		case 's':
			keys.s.pressed = true;
			player.lastKey = 's';
			break;
		case 'ArrowUp':
			keys.ArrowUp.pressed = true;
			enemy.lastKey = 'ArrowUp';
			break;
		case 'ArrowDown':
			keys.ArrowDown.pressed = true;
			enemy.lastKey = 'ArrowDown';
			break;
	}
});

window.addEventListener('keyup', (event) =>{
	switch(event.key)
	{
		case 'w':
			keys.w.pressed = false;
			break;
		case 's':
			keys.s.pressed = false;
			break;
		case 'ArrowUp':
			keys.ArrowUp.pressed = false;
			break;
		case 'ArrowDown':
			keys.ArrowDown.pressed = false;
			break;
	}
});
