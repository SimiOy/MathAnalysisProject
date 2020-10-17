
function setup(){
	createCanvas(windowWidth, windowHeight);
	offsetX = -windowWidth/2;
	offsetY = -windowHeight/2;

	var c0, c1;
	c0 = screenToWorld(windowWidth/2, windowHeight/2);

	scaleX = scaleY = 10;

	c1 = screenToWorld(windowWidth/2, windowHeight/2);

	offsetX += (c0.x - c1.x);
	offsetY += (c0.x - c1.y);

	animation = new Animation();
	animation.start(-10, 10, marcel);
	grid = new Grid();
	grid.update(offsetX, offsetY, scaleX, scaleY);
}

var grid;
var worldMouseX0 = 0, worldMouseY0 = 0;
var worldMouseX1 = 0, worldMouseY1 = 0;
var offsetX;
var offsetY;
var scaleX = 1;
var scaleY = 1;
var animation;

function draw(){

	background('white');

	grid.update(offsetX, offsetY, scaleX, scaleY);
	grid.draw();

	plot(-10, 10, marcel);
	animation.draw();

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

function plot( a, b, law )
{
	var screenA = worldToScreen(a, 0).x;
	var screenB = worldToScreen(b, 0).x;
	beginShape();
	noFill();
	stroke('green');
	strokeWeight(3);
	for(let sx = screenA; sx<=screenB; sx++)
	{
		let wx = screenToWorld(sx, 0).x;
		let wy = law(wx);
		let sy = worldToScreen(0, wy).y;
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
	return -log(x);
}

function Tan(x)
{
	return -tan(x);
}

function marcel(x)
{
	return -(x+sin(x));
}