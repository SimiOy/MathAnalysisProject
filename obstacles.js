function SceneObject()
{
	this.type = 0;
	this.xPos = 0;
	this.yPos = 0;
	//rotation in the future
	//maybe manual scaling dunno yet if necessary
	this.init = function(mouseXPos,mouseYPos,source)
	{
		this.type = source;
		this.xPos = screenToWorld(mouseXPos,0).x;
		this.yPos = screenToWorld(0,mouseYPos).y;
	}
	this.updatetime = function()
	{
		var shaep = worldToScreen(this.xPos,this.yPos);
		noStroke();
		if(this.type == 0)
		{
			fill('yellow');
			square(shaep.x,shaep.y,1.2*scaleX);
		}
		else
			if(this.type == 1)
			{
				fill('cyan');
				ellipse(shaep.x, shaep.y, 1.2*scaleX, 1.2*scaleY );
			}
		else
			if(this.type == 2)
			{
				fill('pink');
				rect(shaep.x,shaep.y,1.2*scaleX,1.8*scaleY);
			}

		noFill();
		stroke('black');
	}
}	