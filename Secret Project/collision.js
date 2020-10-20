function Collider()
{
	//obstacle coord
	this.xCord; 
	this.yCord;
	this.danger;

	this.circleCollider= function(x1,y1,r)
	{
		if(this.danger)
		{
			var d = dist(this.xCord,this.yCord,x1,y1)
			if(d < (.31*scaleX) + r)
			{
				console.log("collided circle");
				return true;
			}
			else
				return false;
		}
		else
			return false;
	}

	this.createLine = function(x1,y1)
	{
		strokeWeight(3);

			if(x1>windowWidth/2 && y1<windowHeight/2)
		{
			//cadran 1
			if(this.xCord>windowWidth/2 && this.yCord<windowHeight/2)
			{
				stroke('red');
				this.danger = true;
			}
			else
			{
				stroke('grey');
				this.danger = false;
			}
		}
		else
		if(x1<windowWidth/2 && y1<windowHeight/2)
		{
			//cadran 2
			if(this.xCord<windowWidth/2 && this.yCord<windowHeight/2)
			{
				stroke('red');
				this.danger = true;
			}
			else
			{
				stroke('grey');
				this.danger = true;
			}
		}
		else
			if(x1<windowWidth/2 && y1>windowHeight/2)
		{
			//cadran 3
			if(this.xCord<windowWidth/2 && this.yCord>windowHeight/2)
			{
				stroke('red');
				this.danger = true;
			}
			else
			{
				stroke('grey');
				this.danger = true;
			}
		}
		else
			if(x1>windowWidth/2 && y1>windowHeight/2)
		{
			//cadran 4
			if(this.xCord>windowWidth/2 && this.yCord>windowHeight/2)
			{
				stroke('red');
				this.danger = true;
			}
			else
			{
				stroke('grey');
				this.danger = true;
			}
		}
		
		line(x1,y1,this.xCord,this.yCord);
	}

	this.getObstacleCord = function(x1,y1)
	{
		this.xCord = x1;
		this.yCord = y1;
	}
}