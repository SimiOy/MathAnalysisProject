function GUI()
{
	this.image = [];
	this.imageNumbers = -1;

	this.draw = function()
	{
		strokeWeight(5);
		stroke('grey');
		line(0, windowHeight-100, windowWidth, windowHeight-100);
		//line(0, windowHeight-120, windowWidth, windowHeight-120);

		if(this.imageNumbers >= 0)
		this.image[this.imageNumbers].place();

		this.outlinePrep();
	}

	this.addImage = function(a,b,c,d)
	{
		this.imageNumbers ++;
		this.image[this.imageNumbers] = new ImagePlacement();
		this.image[this.imageNumbers].init(a,b,c,d);
	}

	this.outlinePrep = function()
	{
		//outlines
		strokeWeight(3);
		stroke('grey');
		noFill();
		rect(windowWidth-90, windowHeight-80, 70,70,20);
		//actual image
	}
}

function ImagePlacement()
{
	this.xCord = windowWidth-70;
	this.yCord = windowHeight-60;
	this.xSize = .5;
	this.ySize = .7;
	this.type = 0;

	//rotation later maybe

	this.init = function(rr)
	{
		this.type = rr;
	}

	this.place = function()
	{
		if(this.type == 0)
		{
			square(this.xCord,this.yCord,70 * this.xSize);
		}
		else
			if(this.type == 1)
			{
				ellipse(this.xCord, this.yCord, this.xSize * 70, this.ySize * 70 );
			}
		else
			if(this.type == 2)
			{
				rect(this.xCord,this.yCord,70*this.xSize,70*this.ySize);
			}
	}
}