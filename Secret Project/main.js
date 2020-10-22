function setup(){
	createCanvas(windowWidth, windowHeight);
	offsetX = -windowWidth/2;
	offsetY = -windowHeight/2;
	Alpha = 0;

	var c0, c1;
	c0 = screenToWorld(windowWidth/2, windowHeight/2);
	scaleX = scaleY = 75;
	c1 = screenToWorld(windowWidth/2, windowHeight/2);

	offsetX += (c0.x - c1.x);
	offsetY += (c0.x - c1.y);

	animation = new Animation();
	animation.start(-10, 10, marcel);
	grid = new Grid();
	grid.update(offsetX, offsetY, scaleX, scaleY);
	boundry = 0.8;

	UIScreen = new GUI();
	UIScreen.addImage(0);
}
var grid;
var worldMouseX0 = 0, worldMouseY0 = 0;
var worldMouseX1 = 0, worldMouseY1 = 0;
var offsetX = 0;
var offsetY = 0;
var scaleX = 1;
var scaleY = 1;
var boundry;
var animation;
var mode = 0;
var Alpha;
var speed = 8;
var running = 0;
var UIScreen;

function draw(){

	strokeWeight(1);
	switch(running){
		case 0: { //running
			background('white');
			if(mode){

				var centerX = screenToWorld(windowWidth/2, 0).x;
				offsetX += (animation.wx - centerX); //Fix xCoord to animation

				var centerY = screenToWorld(0, windowHeight/2).y;
				var hTop = animation.wy + boundry;
				var hBottom = animation.wy - boundry;

				if(centerY>hTop){ //Fix yCoord to animation
					offsetY -= lerp(0, centerY - hTop, Alpha);
					Alpha += 0.02;
				}
				else if(centerY<hBottom)
				{
					offsetY += lerp(0, hBottom - centerY, Alpha);
					Alpha += 0.02;
				}
				else
					Alpha = 0;
			}

			grid.update();
			grid.draw();

			for(let i = 0;i<obstacleIndex;i++)
			{
				obstacles[i].draw();
			}

			if(keyIsDown(17))
			{
				if(mouseIsPressed==0)
					drawPreview(mouseX, mouseY, currentShape);
				if(keyIsDown(40) && previewScaleY >= .5)
					previewScaleY-=0.1;
				else if(keyIsDown(38) && previewScaleY <= 30)
					previewScaleY+=0.1;
				if(keyIsDown(39) && previewScaleX <=30)
					previewScaleX+=0.1;
				else if(keyIsDown(37) && previewScaleX >=.5)
					previewScaleX-=0.1;
			}

			plot(-10, 10, marcel, 'green');
			animation.update();
			animation.draw();

			UIScreen.draw();
		}
		case 1:{ //pause

		}
	}
}

var obstacles=[];
var obstacleIndex = 0;

function mousePressed()
{
	if(keyIsDown(17))
	{
		if(mouseButton === LEFT){
			obstacles[obstacleIndex] = new SceneObject();
			obstacles[obstacleIndex].init(mouseX,mouseY,currentShape, previewScaleX, previewScaleY);
			obstacleIndex++;
		}
		else if(mouseButton === RIGHT)
		{
			var w =  screenToWorld(mouseX, mouseY);
			for(let x = 0; x<obstacleIndex ; x++)
			{
				if(obstacles[x].collide(w.x, w.y)){
					obstacles.splice(x, 1);
					obstacleIndex--;
					x--;
				}
			}
		}
	}
}

document.oncontextmenu = function() { return false; };
function mouseDragged()
{
	if(mouseButton === LEFT && !keyIsDown(17))
	{
		offsetX -= (mouseX - pmouseX)/scaleX;
		offsetY -= (mouseY - pmouseY)/scaleY;
	}
}

function mouseWheel(event)
{
	worldMouseX0 = screenToWorld(mouseX, mouseY).x;
	worldMouseY0 = screenToWorld(mouseX, mouseY).y;

	scaleX *= pow(1.08, -event.delta/125);
	scaleY *= pow(1.08, -event.delta/125);

	worldMouseX1 = screenToWorld(mouseX, mouseY).x;
	worldMouseY1 = screenToWorld(mouseX, mouseY).y;

	offsetX += (worldMouseX0 - worldMouseX1);
	offsetY += (worldMouseY0 - worldMouseY1);
}

function worldToScreen( worldX, worldY ){
		return { 
			x: (worldX - offsetX)*scaleX ,
			y: (worldY - offsetY)*scaleY };
}
function screenToWorld( screenX, screenY ){
		return { 
			x: (screenX/scaleX + offsetX) ,
		 	y: (screenY/scaleY + offsetY) };
}


var currentShape = 0;

function keyPressed()
{
	if(keyCode == 32){
		mode= !mode;
	}
	else if(keyCode == 81){
		currentShape = [currentShape+1]%2;
		UIScreen.addImage(currentShape);
	}
	else if(keyCode == 13){
		if(running)
			running = 0;
		else
			running = 1;
	}
}

var Screenshot;
function screenshot() {
  Screenshot = createCapture(VIDEO);
}

function plot( a, b, law, color )
{
	var screenA = worldToScreen(a, 0).x;
	var screenB = worldToScreen(b, 0).x;
	beginShape();
	noFill();
	stroke(color);
	strokeWeight(3);
	for(let sx = screenA; sx<=screenB; sx++)
	{
		let wx = screenToWorld(sx, 0).x;
		let wy = law(wx);
		if(wy == 'Infinity')
			console.log('hi');
		let sy = worldToScreen(0, wy).y;
		sy = min(sy, windowHeight + 10);
		sy = max(sy, -10);
		vertex(sx, sy);
	}
	endShape();
}

function Sin(x)
{
	return -sin(x);
}

function Ln(x)
{
	if(log(x)>=-windowHeight && log(x)!='-Infinity')
		return -log(x);
	else
		return screenToWorld(0, windowHeight + 10*scaleY).y;
}

function Tan(x)
{
	return -tan(x);
}

function marcel(x)
{
	return -x*sin(3*x);
}


var previewScaleX = 1.2;
var previewScaleY = 1.2;
function drawPreview(x, y, type){
	if(type == 0){
		fill(101, 173, 172, 100);
		ellipse(x, y, previewScaleX*scaleX, previewScaleY*scaleY );
	}
	else if(type == 1){
		fill(212, 61, 192, 100);
		rect(x, y, previewScaleX*scaleX, previewScaleY*scaleY);
	}
}
