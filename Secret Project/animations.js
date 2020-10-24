function Animation()
{
	this.speed = 50;
	this.sx = 0;
	this.sy = 0;
	this.wy = 0;
	this.deathPos = 0;
	this.currentColor = color(50, 55, 100);
	this.start = function(a, b, intervalFunction)
	{
		this.a = a;
		this.wx = a;
		this.b = b;
		this.intervalFunction = intervalFunction;
	}
	this.update = function()
	{
		if(this.wx > this.b || this.wx < this.a)
			this.speed *= -1;
		var dx = 1/this.speed;
		this.wx += dx;
		this.wy = this.intervalFunction.evaluate(this.wx);
		this.sx = worldToScreen(this.wx, 0).x;
		this.sy = worldToScreen(0, this.wy).y; 
		
		if(this.deathPos !=0)
		{
			if(abs(this.deathPos-this.wx)<=0.01)
			{
				console.log("here");
				this.currentColor = color(200,80,0);
			}
		}
	}
	this.draw = function()
	{
		noStroke();
		fill('red');
		var pSize = .5*scaleX;
		ellipse(this.sx, this.sy, pSize, pSize);

		noFill();
		stroke('black');
	}
	
	this.preCalculate = function()
	{
		var x = obstacles.length;
		if(x==0)
			return;
		var dx = 1/this.speed;
		while(this.wx < this.b)
		{
			this.wx += 0.01;
			this.wy = this.intervalFunction.evaluate(this.wx);
			for(let i=0;i<x;i++)
			{
				if(obstacles[i].collide(this.wx,this.wy))
				{
					this.deathPos = this.wx;
					console.log(this.deathPos);
					this.wx = this.a;
					return;
				}
			}
		}
		this.wx = this.a;
		return;
	}
}
