/// un exemplu de cum ai folosi IntervalFunction
/*

	functie = new InvervalFunction();
	
	functie.add(new Interval(-30,-20,(x) => sin(sin(-x))));
	functie.add(new Interval(-20,1,(x) => cos(log(-x))));
	functie.add(new Interval(-5,1,(x) => log(-x)));
	functie.add(new Interval(1,5,(x) => x));
	functie.add(new Interval(5,10,(x) => -x+3));
	functie.add(new Interval(10,12,(x) => x*x)); e o sintaxa mista (x)=> si scrii o functie lambda
		
	animation.start(-30,10, functie); parametul de la animation.start este functia cu ramuri



*/

function InvervalFunction(){
	this.intervals = []
	this.numberIntervals = 0;

	this.add = function(interval){
		this.intervals[this.numberIntervals++] = interval;
	}
	this.evaluate = function(x){
		// x-ul este in world space, iterez print toate intervalele si vad in care ma aflu
		// apelez functia asta in animation.js in fiecare frame pentru a vedea pe ce Y desenez.
		// poti spune ca este ineficient dar o sa avem maxim 10 sa zicem intervale.
		// in cel mai rau caz cred ca pot sa fac o cautare binara si o sa fie un pic mai eficient
		// momentan merge asa daca observam ca are lagg ceva atunci optimizam

		// atata timp cat mai am intervale si x-ul meu nu se afla in interval iterez prin intervale
		let index = 0;
		while(index < this.numberIntervals && this.intervals[index].contains(x) == false)
			index++; 
		// se presupune ca am ajuns la un index bun
		if(index < this.numberIntervals){
			console.log(index,this.numberIntervals,this.intervals[index]);
			let interval = this.intervals[index];
			if(interval.contains(x)){
				// ma asigur ca x-ul se afla in interval
				return interval.evaluate(x);
			}
		}
	}
	this.draw = function(color){
		/// denez de la maximul din stanga la maximul din dreapta
		var screenA = worldToScreen(this.intervals[0].a, 0).x;
		var screenB = worldToScreen(this.intervals[this.numberIntervals - 1].b, 0).x;
		beginShape();
		noFill();
		stroke(color);
		strokeWeight(3);
		let indexInterval = 0;
		for(let sx = screenA; sx<=screenB; sx++)
		{
			let wx = screenToWorld(sx, 0).x;
			while(indexInterval < this.numberIntervals && this.intervals[indexInterval].contains(wx) == false)
				indexInterval++; 
			if(indexInterval < this.numberIntervals){
				let interval = this.intervals[indexInterval];
				let wy = interval.law(wx);
				let sy = worldToScreen(0, wy).y;
				vertex(sx, sy);
			}
		}
		endShape();
	}
}

class Interval{
	constructor(a,b,law){
		this.a = a;
		this.b = b;
		this.law = law;
	}
	// tot world space
	contains(x){
		if(this.a <= x && x <= this.b)
			return true;
		return false;
	}
	/// asteapta un x in world space
	evaluate(x){
		if(this.contains(x) == false){			
			return -2e9; // returneaza un numar F mare sau ar trebui o eroare poate ma ajuta aaron aici
		}
		return this.law(x);
	}
}
