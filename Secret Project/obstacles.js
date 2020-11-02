function SceneObject()
{
	this.type = 0;
	this.xPos = 0;
	this.yPos = 0;
	this.scale = 1.2;
	this.scalex = 1.2;
	this.scaley = 1.8;
	//rotation in the future

	this.filesInit = function(fileXPos,fileYPos,source, scalex, scaley)
    {
        this.scalex = scalex;
        this.scaley = scaley;
        this.type = source;
        this.xPos = fileXPos;
        this.yPos = fileYPos;
    }

	this.init = function(mouseXPos,mouseYPos,source, scalex, scaley)
	{
		this.scalex = scalex;
		this.scaley = scaley;
		this.type = source;
		this.xPos = screenToWorld(mouseXPos,0).x;
		this.yPos = screenToWorld(0,mouseYPos).y;
		if(this.type){
			this.xPos -= scalex/2;
			this.yPos -= scaley/2; 
		}
	}

	this.draw = function()
	{
		var shaep = worldToScreen(this.xPos,this.yPos);
		noStroke();
		if(this.type == 0){
			fill(101, 173, 172);
			ellipse(shaep.x, shaep.y, this.scalex*scaleX, this.scaley*scaleY );
		}
		else if(this.type == 1){

			fill(212, 61, 192);
			rect(shaep.x,shaep.y,this.scalex*scaleX,this.scaley*scaleY);
		}
		noFill();
		stroke('black');
	}

	this.collide = function(x, y)
	{
		if(this.type == 1)
		{
			if( x>=this.xPos && x<=this.xPos + this.scalex && y>=this.yPos && y<=this.yPos + this.scaley )
				return true;
			return false;
		}
		else if(this.type == 0)
		{
			if( pow((x-this.xPos)/this.scalex*2, 2) + pow((y-this.yPos)/this.scaley*2, 2) <= 1 )
				return true;
			return false;
		}
	}
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