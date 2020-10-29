function Animation()
{
	this.speed = 50;
	this.sx = 0;
	this.sy = 0;
	this.wy = 0;
	this.color = 'yellow';
	this.start = function(a, b, law )
	{
		this.a = a;
		this.wx = a;
		this.b = b;
		this.deathPos = b + 1;
		this.law = law;
	}
	this.update = function()
	{
		if(this.wx > this.b || this.wx < this.a)
			this.speed *= -1;
		var dx = 1/this.speed;
		if(this.wx<=this.deathPos || this.deathPos==0)
			this.wx += dx;
		this.wy = -this.law(this.wx);
		this.sx = worldToScreen(this.wx, 0).x;
		this.sy = worldToScreen(0, this.wy).y;

		if(this.deathPos !=0)
		{
			if(abs(this.deathPos-this.wx)<=0.01)
			{
				this.color = 'red';
			}
		} 
	}
	this.draw = function()
	{
		noStroke();
		fill(this.color);
		ellipse(this.sx, this.sy, .5*scaleX, .5*scaleY);
		noFill();
		stroke('black');
	}

	this.preCalculate = function()
	{
		this.color = 'yellow';
		var x = obstacles.length;
		var dx = 0.01;
		this.wx = this.a;
		this.deathPos = 0;
		if(x==0)
			return;
		while(this.wx < this.b)
		{
			this.wx += dx;
			this.wy = -this.law(this.wx);
			for(let i=0;i<x;i++)
			{
				if(obstacles[i].collide(this.wx,this.wy))
				{
					this.deathPos = this.wx;
					this.wx = this.a;
					return;
				}
			}
		}
		this.wx = this.a;
		return;
	}
}
