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
var mouseUpdates = 1;
var gamePlaying = 0;

function draw(){

	strokeWeight(1);
	switch(paused){
		case 0: { //running
			background('white');

			console.log(mouseY);
			if(mouseY > windowHeight*70/100 +30 && menuOn ==0)
				toggleMenu();
			else if(mouseY < windowHeight*70/100 -30 && menuOn ==1)
				toggleMenu();

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

			break;
		}
		case 1:{ //pause

		}
	}
}

function totalFunction(x)
{
	for(let k=intervals[0]; k<intervals.length; k++)
		if(x<intervals[k]){
			if(intervalLaws[k-1])
				return intervalLaws[k-1].law(x);
			return ;
		}

}

function startGame()
{
    gamePlaying=1-gamePlaying;
    if(gamePlaying)
    	animation.preCalculate();
}

var obstacles = [];
var obstacleIndex = 0;
var obstaclePlaced = false;

function mousePressed()
{
	if(mouseButton === LEFT && currentShape!=-1 && mouseUpdates==1){
		obstacles[obstacleIndex] = new SceneObject();
		obstacles[obstacleIndex].init(mouseX,mouseY,currentShape, previewScaleX, previewScaleY);
		obstacleIndex++;
		obstaclePlaced = true;
	}
	else if(mouseButton === RIGHT && mouseUpdates)
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

document.oncontextmenu = function() { return false; };
function mouseDragged()
{
	if(mouseButton === LEFT && !keyIsDown(16) && mouseUpdates)
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

function keyPressed()
{
	if(keyCode == 32){
		mode= !mode;
	}
	else if(keyCode == 8) //backspace begins game
    {
        startGame();
    }
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

var previewScaleX = 1.2;
var previewScaleY = 1.2;
function drawPreview(x, y, type){
	if(type == 0){
		fill(101, 173, 172, 100);
		ellipse(x, y, previewScaleX*scaleX, previewScaleY*scaleY );
	}
	else if(type == 1){
		fill(212, 61, 192, 100);
		rect(x - previewScaleX*scaleX/2, y - previewScaleY*scaleY/2, previewScaleX*scaleX, previewScaleY*scaleY);
	}
}

var bottomListOptions = ['100%', '70%'];
var rightOptions = ['-100px', '10px'];
var blurOptions = [ 'none', 'blur(10px)'];
var playButtonOptions = ['none', 'block'];
var menuOn = 0;
var paused = 0;
window.addEventListener("keypress", event=>
{
	if(event.keyCode == 13)
		pause();
})

var playButton;
var sqSelect;
var elSelect;
var functions = [];
var selectedFunction = -1;
var bottomList;

window.onload = function(){
	for(let i = 0; i<10; i++)
	{
		functions[i] = document.getElementsByClassName("function")[i];
		functions[i].onclick = function(){ selectedFunction=i };
	}
	bottomList = document.getElementById("bottom_list");
	playButton = document.getElementById("play_button");
	sqSelect = document.getElementsByClassName("shape")[0];
	elSelect = document.getElementsByClassName("shape")[1];
	playButton.addEventListener('click', clickPlay);
	sqSelect.addEventListener('click', clickSq);
	elSelect.addEventListener('click', clickEl);
}

function toggleMenu()
{
	if(paused==0)
	{
		menuOn = 1-menuOn;
		mouseUpdates = 1-menuOn;
		bottomList.style.top = bottomListOptions[menuOn];
		document.getElementById("shape_selector").style.right = rightOptions[menuOn];
	}
}

function clickPlay(){
	if(paused)
		pause();
}

function pause()
{
	paused = 1-paused;
	bottomList.style.top = bottomListOptions[menuOn*(1-paused)];
	document.getElementById("shape_selector").style.right = rightOptions[menuOn*(1-paused)];
	document.getElementById("frame").style.filter = blurOptions[paused];
	playButton.style.display = playButtonOptions[paused];
}

var currentShape = -1;
var flag = 0;
function clickEl()
{
	if(menuOn){
		currentShape = 0;
		flag = 1;
	}
}

function clickSq()
{
	if(menuOn){
		currentShape = 1;
		flag = 1;
	}
}

var intervals = [];
var intervalLaws = [];
var functionImg = [];
let bottom_bar = function(p)
{
	var  draggIndex;
	var levelWidth;
	var scale;
	var cwidth;
	var cheight;
	var offset;
	p.setup = function()
	{
		offset = 0;
		cwidth = document.getElementById('bottom_list').offsetWidth-9;
		cheight= document.getElementById('bottom_list').offsetHeight/2;
		p.createCanvas(cwidth, cheight);
		p.background(107, 107, 107);

		functionImg = [ {img:'blue', law:(x) => sin(x)},
					{img:'red' , law:(x) =>  cos(x)},
					{img:'green', law:(x) =>  log(x)},
					{img:'lime', law:(x) =>  exp(x)}, 
					{img:'yellow', law:(x) =>  asin(x)},
					{img:'cyan', law:(x) =>  tan(x)},
					{img:'orange', law:(x) =>  acos(x)},
					{img:'pink', law:(x) =>  sqrt(x)},
					{img:'purple', law:(x) =>  atan(x)},
					{img:'white', law:(x) =>  ct(x)} ];

		levelWidth = 20;
		scale = cwidth/levelWidth;
		intervals = [0, levelWidth];
		intervalLaws[0] = functionImg[0];
		draggIndex = -1;
	}

	p.draw = function()
	{
		p.background(107, 107, 107);
		p.noStroke();
		p.fill(46, 46, 46);
		p.rect(0, 0, cwidth, cheight/8);

		if(intervalLaws[0]){
			p.strokeWeight(2);
			p.stroke(intervalLaws[0].img);
			p.line(p.worldToScreen(0), cheight/16, p.worldToScreen(intervals[1]), cheight/16);

			var x = p.worldToScreen( intervals[0]) + 15;
			var y = cheight/8 + 10;
			var w = p.worldToScreen( intervals[1]) - 15 - x; 
			var h = cheight-cheight/8*3;

			if(w>0){
				p.fill(intervalLaws[0].img);
				p.rect( x, y, w, h, w/4);
			}
		}
		p.strokeWeight(4);
		p.stroke(46, 46, 46);
		p.fill(107, 107, 107);
		p.line(p.worldToScreen(0), cheight/8, p.worldToScreen(0), cheight);
		p.line(p.worldToScreen(intervals[intervals.length - 1]), cheight/8, p.worldToScreen(intervals[intervals.length - 1]), cheight);
		for(let i=1; i<intervals.length-1; i++)
		{
			var sx = p.worldToScreen(intervals[i]);

			p.strokeWeight(2);
			p.stroke(46, 46, 46);
			p.line(sx, cheight/8, sx, cheight);

			var rscalex = 1.4;
			var rscaley = 1;
			var rcolor = 'rgb(210, 210, 210)';
			var tscale = 1;
			var display = round(intervals[i], 2);

			p.stroke(46, 46, 46);
			p.fill(107, 107, 107);
			p.strokeWeight(2);
			p.rect( sx-cheight/16*rscalex, cheight/2, cheight/8*rscalex, cheight/8*rscaley, cheight/8/4 );

			p.fill(rcolor);
			p.textSize(cheight/12*tscale);
			p.textAlign(CENTER);
			p.text(display.toString(), sx, cheight/2 + cheight/8*rscaley - 4*rscaley);

			p.fill('orange');
			p.stroke('black');
			p.strokeWeight(1);
			p.triangle(sx, 0, sx-6, cheight/8, sx+6, cheight/8);

			if(intervalLaws[i])
			{
				p.stroke(intervalLaws[i].img);
				p.strokeWeight(2);
				p.line(sx, cheight/16, p.worldToScreen(intervals[i+1]), cheight/16);
				var x = p.worldToScreen( intervals[i]) +15;
				var y = cheight/8 + 10;
				var w = p.worldToScreen( intervals[i+1] ) -15- x; 
				var h = cheight-cheight/8*3;

				if(w>0){
					p.fill(intervalLaws[i].img);
					p.rect( x, y, w, h, w/4);		
				}		
			}

		}
		var diSx = p.worldToScreen(intervals[draggIndex]);
		var display = round(intervals[draggIndex], 2);
		p.stroke(46, 46, 46);
		p.fill(107, 107, 107);
		p.strokeWeight(2);
		p.rect( diSx-cheight/16*2.2, cheight/2, cheight/8*2.2, cheight/8*1.2, cheight/8/4 );

		p.fill('orange');
		p.textSize(cheight/12*1.2);
		p.textAlign(CENTER);
		p.text(display.toString(), diSx, cheight/2 + cheight/8*1.2 - 4*1.2);

		if(selectedFunction!=-1)
			p.drawPreview();

	}

	p.drawPreview = function()
	{
		var mx = p.screenToWorld(p.mouseX);
		var currentIntrval = 0;
		for(let i = 0; i<intervals.length; i++){
			if(mx<intervals[i])
			{
				currentIntrval = i-1;
				break;
			}
		}
		var x = p.worldToScreen( intervals[currentIntrval]) + 15;
		var y = cheight/8 + 10;
		var w = p.worldToScreen( intervals[currentIntrval+1] ) - 15 - x; 
		var h = cheight-cheight/8*3;
		p.stroke( functionImg[selectedFunction].img );
		p.fill('gray');
		p.rect( x, y, w, h, w/4);
	}

	p.addImage = function()
	{
		var mx = p.screenToWorld(p.mouseX);
		var currentIntrval = 0;
		for(let i = 0; i<intervals.length; i++){
			if(mx<intervals[i])
			{
				currentIntrval = i-1;
				break;
			}
		}
		intervalLaws[currentIntrval] = functionImg[selectedFunction];
	}

	p.mousePressed = function()
	{
		if(p.mouseButton === p.LEFT)
		{
			if( p.mouseX>0 && p.mouseX<cwidth && p.mouseY>0 && p.mouseY<=cheight/8 && selectedFunction==-1)
			{
				var wx = p.screenToWorld(p.mouseX);
				if(wx>=0 && wx<=levelWidth ){				
					var i = p.addInterval(wx);
					c = intervalLaws[i-1];
					intervalLaws.splice(i, 0, c);
				}

			}
			if(selectedFunction!=-1)
			{
				p.addImage();
				selectedFunction = -1;
			}
		}
		else if(p.mouseButton === p.RIGHT)
		{
			if(selectedFunction==-1){
				for(let i=1; i<intervals.length-1; i++)
				{
					var sx = p.worldToScreen(intervals[i]);
					if( pow((sx-p.mouseX)/cheight*8, 2) + pow((p.mouseY-cheight/16)/cheight*8, 2) <= 1 )
					{
						draggIndex = i;
						break;
					}
				}
			}
			else
			{
				selectedFunction = -1;
			}
		}
	}

	p.mouseDragged = function()
	{
		if(draggIndex!=-1){
			if(keyIsDown(16))
				intervals[draggIndex] = p.screenToWorld(p.mouseX);
			else{
				if( abs( p.screenToWorld(p.mouseX) - intervals[draggIndex-1])<.02 )
					intervals[draggIndex] = intervals[draggIndex-1];
				else if( abs(p.screenToWorld(p.mouseX) - intervals[draggIndex+1])<.02 )
					intervals[draggIndex] = intervals[draggIndex+1];
				else
					intervals[draggIndex] = round( p.screenToWorld(p.mouseX)*10)/10;
			}
			intervals[draggIndex] = min(intervals[draggIndex], intervals[draggIndex+1]);
			intervals[draggIndex] = max(intervals[draggIndex], intervals[draggIndex-1]);
		}
	}

	p.mouseReleased = function()
	{
		if(draggIndex!=-1){
			var c1 = intervals[draggIndex] == intervals[draggIndex-1];
			var c2 = intervals[draggIndex] == intervals[draggIndex+1];
			if(!keyIsDown(16)){
				intervals[draggIndex] = round(intervals[draggIndex], 1);	
				c1 = abs(intervals[draggIndex] - intervals[draggIndex-1])<.05;
				c2 = abs(intervals[draggIndex] - intervals[draggIndex+1])<.05;
			}
			if( c1 )
			{
				intervals.splice(draggIndex, 1);
				intervalLaws.splice(draggIndex-1, 1);
			}
			else if( c2 )
			{
				intervals.splice(draggIndex, 1);
				intervalLaws.splice(draggIndex, 1)
			}
			draggIndex = -1;
		}
	}

	p.addInterval = function(wx)
	{
		for(let i = 0; i<intervals.length; i++)
		{
			if(wx<intervals[i])
			{
				intervals.splice(i, 0, wx);
				return i;
			}
		}
	}

	p.mouseWheel = function(event)
	{
		if(p.mouseX>0 && p.mouseX<cwidth && p.mouseY>0 && p.mouseY<=cheight)
		{
			if(!keyIsDown(16)){
				var mouse0 = p.screenToWorld(p.mouseX);

				scale*=pow(1.08, -event.delta/125);

				var mouse1 = p.screenToWorld(p.mouseX);

				offset += (mouse0 - mouse1);
			}
			else{
				offset += event.delta/20 / scale;
			}
		}
	}

	p.keyPressed = function()
	{
		if(p.keyCode == 82 && mouseUpdates==0)
		{
			scale = cwidth/levelWidth;
			offset = 0;
		}
	}

	p.screenToWorld = function(sx)
	{
		return sx/scale+offset;
	}

	p.worldToScreen = function(wx)
	{
		return (wx-offset)*scale;
	}
}

new p5(bottom_bar, 'mini_plot');
