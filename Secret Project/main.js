var saveFunction;
var levelsTable;
var levelNo;
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
var mouseUpdates = 1;
var gamePlaying = 0;
var allow = 1;
var obstacles = [];
var obstacleIndex = 0;
var obstaclePlaced = false;

function preload()
{
    saveFunction = new SaveSystem();
    levelsTable = loadTable("assets/levels.csv","csv","header",saveFunction.loadLevel,saveFunction.generateNew);
}

function setup(){
	myCanvas = createCanvas(windowWidth, windowHeight);
	myCanvas.parent("mainscreen");
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
	animation.start(0, 20, totalFunction);
	grid = new Grid();
	grid.update(offsetX, offsetY, scaleX, scaleY);
	boundry = 0.8;

	mouseUpdates = 1;

	levelNo = getValue("levelNo");
	saveFunction.getLevel( int(levelNo) );
}

function draw(){

	strokeWeight(1);
	if(paused==0){ //running
		background('white');

		if(mouseY > windowHeight*70/100 +30 && menuOn ==0 && allow)
			toggleMenu();
		else if(mouseY < windowHeight*70/100 -30 && menuOn ==1 && allow)
			toggleMenu();

		if(mode){

			var centerX = screenToWorld(windowWidth/2, 0).x;
			offsetX += (animation.wx - centerX);

			var centerY = screenToWorld(0, windowHeight/2).y;
			offsetY += (animation.wy - centerY);

			/*
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
			*/
		}

		grid.update();
		grid.draw();

		for(let i = 0;i<obstacleIndex;i++)
		{
			obstacles[i].draw();
		}

		if(flag == 0 && obstaclePlaced && !keyIsDown(16) ){
			currentShape = -1;
			obstaclePlaced = false;
		}
		flag = 0;
		if(currentShape != -1)
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

		plot(0, intervals[intervals.length-1], totalFunction, 'green');

		if(gamePlaying)
		{
			animation.update();
			animation.draw();
		}
	}
}

function getValue(varname)
{
  var url = window.location.href;
  var qparts = url.split("?");
  if (qparts.length == 0)
    return "";
  var query = qparts[1];
  var vars = query.split("&");
  var value = "";
  for (i=0;i<vars.length;i++){
    var parts = vars[i].split("=");
    if (parts[0] == varname){
      value = parts[1];
      break;
    }
  }
  value = decodeURI(value);
  value.replace(/\+/g," ");
  return value;
}

function totalFunction(x)
{
	for(let k=0; k<intervals.length; k++)
		if(x<=intervals[k]){
			if(intervalLaws[k-1])
				return intervalLaws[k-1].law(x);
			return intervalLaws[k].law(x);
		}

}

function startGame()
{
    gamePlaying=1-gamePlaying;
    if(gamePlaying){
    	animation.preCalculate();
    }
    else
    	mode = 0;
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

function plot( a, b, law, color )
{
	var screenA = worldToScreen(a, 0).x;
	var screenB = worldToScreen(b, 0).x;
	beginShape();
	noFill();
	stroke(color);
	strokeWeight(3);
	var pwy = -law(a);
	for(let sx = screenA; sx<=screenB; sx++)
	{
		let wx = screenToWorld(sx, 0).x;
		let wy = -law(wx);
		if(wy){
			if( abs(pwy - wy)>50 && pwy*wy<0 )
			{
				endShape();
				beginShape();
			}
			let sy = worldToScreen(0, wy).y;
			sy = min(sy, windowHeight + 10);
			sy = max(sy, -10);
			vertex(sx, sy);
			pwy = wy;
		}
	}
	endShape();
}

function plot2(a, b, law, color)
{
	var rate = windowWidth / ( worldToScreen(b, 0).x - worldToScreen(a, 0).x ) /scaleX* 0.5;
	let pwy = -law(a);

	stroke(color);
	noFill();
	strokeWeight(3);
	beginShape();
	for(let wx = a; wx<=b; wx+=rate)
	{
		let wy = -law(wx);
		var s = worldToScreen(wx, wy);

		if( abs(pwy - wy)>50 && pwy*wy<0 )
		{
			endShape();
			beginShape();
		}
		pwy = wy;
		vertex(s.x, s.y)
	}
	endShape();
}

function ct(x)
{
	return 1;
}

function marcel(x)
{
	return -x*sin(3*x);
}

// CANVAS EVENTS //

function keyPressed()
{
	if(keyCode == 32){
		mode= !mode;
	}
	else if(keyCode == 8) //backspace begins game
    {
        startGame();
    }
    else if( keyCode == 69 ){
    	allow = !allow;
    	toggleMenu();
    }
}

document.oncontextmenu = function() { return false; }; //no context menu

function mouseDragged()
{
	if(mouseButton === LEFT && !keyIsDown(16) && ( mouseUpdates  || ( mouseUpdates==0 &&  mouseY<windowHeight*70/100) ) )
	{
		offsetX -= (mouseX - pmouseX)/scaleX;
		offsetY -= (mouseY - pmouseY)/scaleY;
	}
}

function mouseWheel(event)
{
	if(mouseUpdates==1){
		worldMouseX0 = screenToWorld(mouseX, mouseY).x;
		worldMouseY0 = screenToWorld(mouseX, mouseY).y;

		scaleX *= pow(1.08, -event.delta/125);
		scaleY *= pow(1.08, -event.delta/125);

		worldMouseX1 = screenToWorld(mouseX, mouseY).x;
		worldMouseY1 = screenToWorld(mouseX, mouseY).y;

		offsetX += (worldMouseX0 - worldMouseX1);
		offsetY += (worldMouseY0 - worldMouseY1);
	}
}

function mousePressed()
{
	if(mouseButton === LEFT && currentShape!=-1){
		obstacles[obstacleIndex] = new SceneObject();
		obstacles[obstacleIndex].init(mouseX,mouseY,currentShape, previewScaleX, previewScaleY);
		obstacleIndex++;
		obstaclePlaced = true;
	}
	else if(mouseButton === RIGHT)
	{
		if(currentShape!=-1)
			currentShape = -1;
		else{
			var w =  screenToWorld(mouseX, mouseY);
			for(let x = obstacleIndex-1; x>=0 ; x--)
			{
				if(obstacles[x].collide(w.x, w.y)){
					obstacles.splice(x, 1);
					obstacleIndex--;
					x--;
					return;
				}
			}
		}
	}
}
