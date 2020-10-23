
function Derivative(){
	
	this.start = function(a,b,law){
		this.a = a;
		this.b = b;
		this.law = law;
		this.worldX = a;
		this.speed = 50;
	}
	this.ecuatiaDreptei = function(x0,y0,x,y){
		// (y - y0) / (x - x0) = m
		// => y - y0 = (x - x0) * m => y = y0 + (x - x0) * m
		let panta = (y - y0) / (x - x0);
		return (x) => y0 + (x - x0) * panta;
	}
	this.update = function(law){
		if(this.worldX < this.a || this.worldX > this.b)
			this.speed *= -1;

		this.worldX += 1/this.speed;

		/// (x0,y0) valorile de acum ale functiei
		let x0 = this.worldX;
		let y0 = law(x0);

		// (x,y) valorile la o distanta mica mica a functiei
		let x = x0 + 1/this.speed;
		let y = law(x);

		// ecuatia dreptei tangentei la grafic
		let dreapta = this.ecuatiaDreptei(x0,y0,x,y); 

		let x0dreapta = x0 - 1;
		let y0dreapta = dreapta(x0dreapta);
		let x1dreapta = x0 + 1;
		let y1dreapta = dreapta(x1dreapta);
		print(x1dreapta - x0dreapta);

		return{
			x0 : worldToScreen(x0dreapta,0).x,
			y0 : worldToScreen(0,y0dreapta).y,
			x1 : worldToScreen(x1dreapta,0).x,
			y1 : worldToScreen(0,y1dreapta).y
		};

	}
	this.draw = function(){
	
		strokeWeight(5)
		stroke("red");
		let cooronate = this.update(this.law);
		line(cooronate.x0,cooronate.y0,cooronate.x1,cooronate.y1);
	}
}



