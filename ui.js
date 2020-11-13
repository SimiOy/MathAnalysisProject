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
var homeButton;
var settingsButton;
var sqSelect;
var elSelect;
var functions = [];
var selectedFunction = -1;
var bottomList;
var editMode = 0;

window.onload = function(){
	$('#loader1').fadeOut('slow');
	for(let i = 0; i<10; i++)
	{
		functions[i] = document.getElementsByClassName("function")[i];
		functions[i].onclick = function(){ selectedFunction=i };
	}
	bottomList = document.getElementById("bottom_list");
	playButton = document.getElementById("play_button");
	settingsButton = document.getElementById("settings_button");
	homeButton = document.getElementById("home_button");
	playButton.addEventListener('click', clickPlay);
	editMode = sessionStorage.getItem("edit")=="true" ? 1:0 ;
	if(editMode){
		sqSelect = document.getElementsByClassName("shape")[0];
		elSelect = document.getElementsByClassName("shape")[1];
		sqSelect.addEventListener('click', clickSq);
		elSelect.addEventListener('click', clickEl);
	}
}

function toggleMenu()
{
	if(paused==0)
	{
		menuOn = 1-menuOn;
		mouseUpdates = 1-menuOn;
		bottomList.style.top = bottomListOptions[menuOn];
		if(editMode)
			document.getElementById("shape_selector").style.right = rightOptions[menuOn];
	}
}

var th = true;
function toggleHints()
{
 	th ? $('#command').fadeOut():$('#command').fadeIn(); 
 	th=!th;
}

function home()
{
	$('#loader2').fadeIn();
	setTimeout(function(){
		if(editMode)
    		window.location.href = 'levelSelect.php?edit';
		else
			window.location.href = 'levelSelect.php';
	}, 200);
}

function clickPlay(){
	if(paused)
		pause();
}

function pause()
{
	paused = 1-paused;
	bottomList.style.top = bottomListOptions[menuOn*(1-paused)];

	if(editMode)
		document.getElementById("shape_selector").style.right = rightOptions[menuOn*(1-paused)];

	document.getElementById("frame").style.filter = blurOptions[paused];
	playButton.style.display = playButtonOptions[paused];
	homeButton.style.display = playButtonOptions[paused];
	settingsButton.style.display = playButtonOptions[paused];
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
	var s, e;
	p.setup = function()
	{

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

		intervalLaws[0] = functionImg[0];
		draggIndex = -1;
		s = 1-editMode;
	}

	var flag = 2;
	p.draw = function()
	{
		if(flag)
		{
			if(flag == 1)
			{
				cwidth = document.getElementById('bottom_list').offsetWidth-9;
				cheight= document.getElementById('bottom_list').offsetHeight/2;
				
				offset = intervals[0];
				levelWidth = intervals[1] - intervals[0]
				scale = cwidth/levelWidth;
				p.createCanvas(cwidth, cheight);
				p.background(107, 107, 107);
			}
			flag--;
			return;
		}
		p.background(107, 107, 107);
		p.noStroke();
		p.fill(46, 46, 46);
		p.rect(0, 0, cwidth, cheight/8);

		if(intervalLaws[0]){
			p.strokeWeight(2);
			p.stroke(intervalLaws[0].img);
			p.line(p.worldToScreen(intervals[0]), cheight/16, p.worldToScreen(intervals[1]), cheight/16);

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
		p.line(p.worldToScreen(intervals[0]), cheight/8, p.worldToScreen(intervals[0]), cheight);
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
		var display = p.round(intervals[draggIndex], 2);
		p.stroke(46, 46, 46);
		p.fill(107, 107, 107);
		p.strokeWeight(2);
		p.rect( diSx-cheight/16*2.2, cheight/2, cheight/8*2.2, cheight/8*1.2, cheight/8/4 );

		p.fill('orange');
		p.textSize(cheight/12*1.2);
		p.textAlign(p.CENTER);
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
				if(wx>=intervals[0] && wx<=intervals[intervals.length-1] ){				
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
				for(let i=s; i<intervals.length-s; i++)
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
			if(draggIndex!=intervals.length-1)
				intervals[draggIndex] = min(intervals[draggIndex], intervals[draggIndex+1]);
			if(draggIndex!=0)
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
		if(p.keyCode == 82 && mouseUpdates==0)//R
		{
			offset = intervals[0];
			scale = cwidth/(intervals[intervals.length-1]-intervals[0]);
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