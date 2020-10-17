function Animation()
{
	this.speed = 50;

	this.start = function(a, b, law )
	{
		this.a = a;
		this.wx = a;
		this.b = b;
		this.law = law;
	}
	this.update = function()
	{
		if(this.wx > this.b || this.wx < this.a)
			this.speed *= -1;
		var dx = 1/this.speed;
		this.wx += dx;
		var wy = this.law(this.wx);
		var sx = worldToScreen(this.wx, 0).x;
		var sy = worldToScreen(0, wy).y;
		return { 
			x: sx,
			y: sy
		};
	}
	this.draw = function()
	{
		var x = this.update().x;
		var y = this.update().y;
		noStroke();
		fill('red');
		ellipse(x, y, .5*scaleX, .5*scaleY);
		noFill();
		stroke('black');
	}
}
