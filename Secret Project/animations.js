function Animation()
{
	this.speed = 50;
	this.sx = 0;
	this.sy = 0;
	this.wy = 0;
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
		this.wy = this.law(this.wx);
		this.sx = worldToScreen(this.wx, 0).x;
		this.sy = worldToScreen(0, this.wy).y; 
	}
	this.draw = function()
	{
		noStroke();
		fill('red');
		var pSize = .5*scaleX;
		ellipse(this.sx, this.sy, pSize, pSize);

		for (let i = 0; i<obstacles.length;i++) {
			obstacles[i].collider.createLine(this.sx,this.sy);

			if(obstacles[i].type == 1)
			{
				//circle
				obstacles[i].collider.circleCollider(this.sx,this.sy,pSize/2);
			}
		}

		noFill();
		stroke('black');
	}
}
