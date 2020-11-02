function Grid(){
	this.norms = [1, 2, 5];
	this.normCount = 0;
	this.grid_norm = 1;
	this.offsetX = 0;
	this.offsetY = 0;
	this.scaleX = 0;
	this.scaleY = 0;
	this.decimalNumber = 10;
	this.endX = 0;
	this.endY = 0;
	this.startX = 0;
	this.startY = 0;

	this.update = function()
	{
		if(keyIsDown(16))
			speed = 32;
		else
			speed = 10;
		if(keyIsDown(68))
			offsetX+=speed/scaleX;
		else if(keyIsDown(65))
			offsetX-=speed/scaleX;
		if(keyIsDown(87))
			offsetY-=speed/scaleY;
		else if(keyIsDown(83))
			offsetY+=speed/scaleY;

		this.startX = screenToWorld(0, 0).x;
		this.endX = screenToWorld(windowWidth, 0).x;
		this.startY = screenToWorld(0, 0).y;
		this.endY = screenToWorld(0, windowHeight).y;

		while( (this.endX-this.startX)/this.grid_norm < 6 )
		{
			this.normCount-=1;
			if(this.normCount>=0)
				this.grid_norm = this.norms[this.normCount%3] * pow(10,  floor(this.normCount/3));
			else
				this.grid_norm = this.norms[2+this.normCount%3] * pow(10,  ceil(this.normCount/3));
		}
		while( (this.endX-this.startX)/this.grid_norm > 10 )
		{
			this.normCount+=1;
			if(this.normCount>=0)
				this.grid_norm = this.norms[this.normCount%3] * pow(10,  floor(this.normCount/3));
			else
				this.grid_norm = this.norms[2+this.normCount%3] * pow(10,  ceil(this.normCount/3));
		}

		this.decimalNumber = 10; // 1 DECIMAL POINT
		if((this.grid_norm<1) && (this.grid_norm*100)%10)
				this.decimalNumber = 100; // 2 DECIMAL POINTS 
	}

	this.draw = function()
	{
		strokeWeight(3);
		stroke('black');

		var center = worldToScreen(0, 0);

		line(0, center.y, windowWidth, center.y);
		line(center.x, 0, center.x, windowHeight);
		
		strokeWeight(1);
		noFill();
		ellipse( worldToScreen(15/scaleX, 15/scaleY).x, worldToScreen(15/scaleX, 15/scaleY).y, 8, 12 );

		for(let x = 0; x<this.endX; x+=this.grid_norm) //POSITIVE X
		{
			let p = worldToScreen(x, 0);

			stroke('black');
			strokeWeight(1);
			line(p.x, 0, p.x, windowHeight);
			strokeWeight(0.2);
			for(let j = x+this.grid_norm/5; j<x+this.grid_norm; j+=this.grid_norm/5)
			{
				let sj = worldToScreen(j, 0).x;
				line(sj, 0, sj, windowHeight);
			}
			if(x){
				p.y = max(p.y, 0);
				p.y = min(p.y, windowHeight - 30);
				noStroke();
				fill('white');
				ellipse(p.x, p.y + 15, 10, 13);
				fill('black');
				textSize(15);
				textAlign(CENTER);
				if(this.grid_norm>=1){
					text( x.toString(), p.x, p.y +20 );
				}
				else{
					var rx = round(x*this.decimalNumber)/this.decimalNumber;
					text( rx.toString(), p.x, p.y +20 );
				}
			}
		}

		for(let x = 0; x>this.startX; x-=this.grid_norm) //NEGATIVE X
		{
			let p = worldToScreen(x, 0);

			stroke('black');
			strokeWeight(1);
			line(p.x, 0, p.x, windowHeight);
			strokeWeight(0.2);
			for(let j = x-this.grid_norm/5; j>x-this.grid_norm; j-=this.grid_norm/5)
			{
				let sj = worldToScreen(j, 0).x;
				line(sj, 0, sj, windowHeight);
			}
			if(x){
				noStroke();
				fill('white');
				ellipse(p.x, p.y + 15, 10, 13);
				fill('black');
				textSize(15);
				textAlign(CENTER);
				if(this.grid_norm>=1)
						text( x.toString(), p.x, p.y +20 );
				else{
						var rx = round(x*this.decimalNumber)/this.decimalNumber;
						text( rx.toString(), p.x, p.y +20 );
				}
			}
		}

		for(let y = 0; y<this.endY; y+=this.grid_norm) //NEGATIVE Y
		{
			let p = worldToScreen(0, y);

			stroke('black');
			strokeWeight(1);
			line(0, p.y, windowWidth, p.y);
			strokeWeight(0.2);
			for(let j = y+this.grid_norm/5; j<y+this.grid_norm; j+=this.grid_norm/5)
			{
				let sj = worldToScreen(0, j).y;
				line(0 , sj, windowWidth, sj);
			}
			if(y){
				noStroke();
				fill('white');
				ellipse(max(p.x, 0) + 25, p.y, 25, 10);
				fill('black');
				textSize(15);
				textAlign(CENTER);
				if(this.grid_norm>=1)
						text( (-y).toString(), max(p.x, 0) + 24, p.y + 4 );
				else{
						var ry = round(-y*this.decimalNumber)/this.decimalNumber;
						text( ry.toString(), max(p.x, 0) + 24, p.y + 4 );
				}
			}
		}

		for(let y = 0; y>this.startY; y-=this.grid_norm) //POSITIVE Y
		{
			let p = worldToScreen(0, y);

			stroke('black');
			strokeWeight(1);
			line(0, p.y, windowWidth, p.y);
			strokeWeight(0.2);
			for(let j = y-this.grid_norm/5; j>y-this.grid_norm; j-=this.grid_norm/5)
			{
				let sj = worldToScreen(0, j).y;
				line(0 , sj, windowWidth, sj);
			}
			if(y){
				noStroke();
				fill('white');
				ellipse( max(p.x, 0) + 25, p.y, 20, 10);
				fill('black');
				textSize(15);
				textAlign(CENTER);
				if(this.grid_norm>=1)
						text( (-y).toString(), max(p.x, 0) + 24, p.y + 4 );
				else{
						var ry = round(-y*this.decimalNumber)/this.decimalNumber;
						text( ry.toString(), max(p.x, 0) + 24, p.y + 4 );
				}
			}
		}
	}
}