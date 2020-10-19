
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
	animation.start(0, 10, marcel);
	grid = new Grid();
	grid.update(offsetX, offsetY, scaleX, scaleY);
	boundry = 0.8;

	UIScreen = new GUI();
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

var UIScreen;

function draw(){

	strokeWeight(1);
	

	background('white');

	animation.update();

	if(mode){

		var centerX = screenToWorld(windowWidth/2, 0).x;
		var centerY = screenToWorld(0, windowHeight/2).y;

		offsetX += (animation.wx - centerX);
		var hTop = animation.wy + boundry;
		var hBottom = animation.wy - boundry;
		//fill('green');
		//noStroke();
		//ellipse(animation.sx, worldToScreen(0, hTop).y, 50, 50);
		//ellipse(animation.sx, worldToScreen(0, hBottom).y, 50, 50);
		//ellipse(windowWidth/2, windowHeight/2, 20, 20);
		//noFill();

		if(centerY>hTop){
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
		obstacles[i].updatetime();
	}


	plot(-1, 10, marcel, 'green');
	animation.draw();

	UIScreen.draw();

}

var obstacles=[];
var obstacleIndex = 0;

function mouseClicked()
{
	console.log( screenToWorld(mouseX, mouseY).x, screenToWorld(mouseX, mouseY).y );

	//ignore drags, press control and click to spawn objects of latest type selected
	if(keyIsDown(17))
	{
		//preview
		
		obstacles[obstacleIndex] = new SceneObject();
		obstacles[obstacleIndex].init(mouseX,mouseY,currentShape);
		obstacleIndex++;
	}
}

function mouseDragged()
{
	offsetX -= (mouseX - pmouseX)/scaleX;
	offsetY -= (mouseY - pmouseY)/scaleY;
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
		console.log('Hi');
	}
	else
		if(keyCode == 49)
		{
			//square
			currentShape = 0;
		}
	else
		if(keyCode == 50)
		{
			//circle
			currentShape = 1;
		}
	else
		if(keyCode == 51)
		{
			//rect
			currentShape = 2;
		}
	UIScreen.addImage(currentShape);
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
