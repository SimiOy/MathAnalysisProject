function Animation()
{
	this.speed = 50;
	this.sx = 0;
	this.sy = 0;
	this.wy = 0;
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
}
