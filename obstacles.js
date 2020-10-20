function SceneObject()
{
	this.type = 0;
	this.xPos = 0;
	this.yPos = 0;
	//rotation in the future
	this.collider;

	//maybe manual scaling dunno yet if necessary
	this.init = function(mouseXPos,mouseYPos,source)
	{
		this.type = source;
		this.xPos = screenToWorld(mouseXPos,0).x;
		this.yPos = screenToWorld(0,mouseYPos).y;
		this.collider = new Collider();
	}
	this.updatetime = function()
	{
		var shaep = worldToScreen(this.xPos,this.yPos);
		noStroke();

		this.collider.getObstacleCord(shaep.x,shaep.y);

		if(this.type == 0)
		{
			fill('yellow');
			square(shaep.x,shaep.y,1.2*scaleX);
		}
		else
			if(this.type == 1)
			{
				noFill();
				strokeWeight(5);
				stroke('cyan');
				//circle
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
