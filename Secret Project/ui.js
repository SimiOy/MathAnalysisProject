function GUI()
{
	this.image = [];
	this.imageNumbers = -1;

	this.draw = function()
	{
		strokeWeight(5);
		stroke('grey');
		fill(153, 151, 145, 180);
		rect(0, windowHeight-100, windowWidth, 100);
		noFill();
		//line(0, windowHeight-120, windowWidth, windowHeight-120);

		if(this.imageNumbers >= 0)
		this.image[this.imageNumbers].place();

		this.outlinePrep();
	}

	this.addImage = function(type)
	{
		this.imageNumbers ++;
		this.image[this.imageNumbers] = new ImagePlacement();
		this.image[this.imageNumbers].init(type);
	}

	this.outlinePrep = function()
	{
		//outlines
		strokeWeight(3);
		stroke('white');
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

	this.init = function(type)
	{
		this.type = type;
	}

	this.place = function()
	{
		stroke('white');
		if(this.type == 0){
			ellipse(this.xCord+15, this.yCord+14, this.xSize * 70, this.ySize * 70 );
		}
		else if(this.type == 1){
			rect(this.xCord-2,this.yCord-10,70*this.xSize,70*this.ySize);
		}
	}
}
