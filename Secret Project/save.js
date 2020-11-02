function SaveSystem()
{
	var levelSeperators = [];
	this.index;

	//fata de excel: row e cu 2 mai mic

	this.loadLevel = function(table)
	{
		//github
		this.index = 0;

		console.log("loading level...");
		for(let r = 0; r < table.getRowCount();r++)
		{
			let row = table.getRow(r);

  			if(table.getNum(r,"indexNo") == this.index)
    		{
    			//saving the index of levels change
    			levelSeperators[this.index] = r;
    			this.index++;
    		}
    	}
  	}

  	this.getLevel = function(i)
  	{
  		var a = levelSeperators[i];
  		var b;
  		if(a >= levelSeperators.length)
  		{
  			b = levelsTable.getRowCount();
  		}
  		else
  		b = levelSeperators[i+1];
  		// de unde pana unde se cheama ca instantiate objects pe nivelu chemat
  		obstacles = [];
  		obstacleIndex = 0;

  		for(let k=a;k<b;k++)
  		{
  			obstacles[obstacleIndex] = new SceneObject();
			obstacles[obstacleIndex].filesInit(levelsTable.getNum(k,'xPos'),levelsTable.getNum(k,'yPos'),levelsTable.getNum(k,'shape'), levelsTable.getNum(k,'xSize'), levelsTable.getNum(k,'ySize'));
			obstacleIndex++;
  		}
  	}

	this.saveLevel = function()
	{
		console.log("saving level...");
		
		var currentNoObObstacles;
		var newNumberOfObstacles;
		var a = levelSeperators[currentLevel];
  		var b;
  		console.log(currentLevel,a);
  		if(currentLevel >= levelSeperators.length)
  		{
  			//new level
  			console.log("aici");
  			a = levelsTable.getRowCount();
  			b = a;
  			console.log(currentLevel,a,b);
  		}
  		else
  		b = levelSeperators[currentLevel+1];

		currentNoObObstacles = b-a;
		newNumberOfObstacles = obstacles.length;

		if(currentNoObObstacles < newNumberOfObstacles)
		{
			//adaug randuri
			var howMany = newNumberOfObstacles - currentNoObObstacles;
			for(let i=0;i< howMany;i++)
			{
				levelsTable.addRow();
			}
			this.moveLanesIncrement(b-1,howMany);
			var rii = 0;
			for(let k = a;k<a+newNumberOfObstacles;k++)
			{
				for(let c = 0;c < levelsTable.getColumnCount();c++)
				{
					var x;
					switch(c){
						case 0:{
							x = currentLevel;
							//console.log(c,x,k);
							break;
						}
						case 1:{
							x = obstacles[rii].xPos;
							//console.log(c,x,k);
							break;
						}
						case 2:{
							x = obstacles[rii].yPos;
							//console.log(c,x,k);
							break;
						}
						case 3:{
							x = obstacles[rii].type;
							//console.log(c,x,k);
							break;
						}
						case 4:{
							x = obstacles[rii].scalex;
							//console.log(c,x,k);
							break;
						}
						case 5:{
							x = obstacles[rii].scaley;
							//console.log(c,x,k);
							break;
						}
					}

					levelsTable.set(k,c,x);
				}
				//console.log("enter");
				rii++;
			}
		}
		else
		{
			if(currentNoObObstacles >= newNumberOfObstacles)
			{
				//scad randuri
				var howMany = currentNoObObstacles - newNumberOfObstacles;
				var auxiliar = howMany;
				while(auxiliar)
				{
					levelsTable.removeRow(a);
					auxiliar--;
				}
				var rii = 0;
			for(let k = a;k<a+newNumberOfObstacles;k++)
			{
				for(let c = 0;c < levelsTable.getColumnCount();c++)
				{
					var x;
					switch(c){
						case 0:{
							x = currentLevel;
							//console.log(c,x,k);
							break;
						}
						case 1:{
							x = obstacles[rii].xPos;
							//console.log(c,x,k);
							break;
						}
						case 2:{
							x = obstacles[rii].yPos;
							//console.log(c,x,k);
							break;
						}
						case 3:{
							x = obstacles[rii].type;
							//console.log(c,x,k);
							break;
						}
						case 4:{
							x = obstacles[rii].scalex;
							//console.log(c,x,k);
							break;
						}
						case 5:{
							x = obstacles[rii].scaley;
							//console.log(c,x,k);
							break;
						}
					}

					levelsTable.set(k,c,x);
				}
				//console.log("enter");
				rii++;
			}
			}

		}
		this.rechecks();
	}

	this.rechecks = function()
	{
		//to reimplement lazy ass mf
		this.index = 0;

		for(let r = 0; r < levelsTable.getRowCount();r++)
		{
			let row = levelsTable.getRow(r);

  			if(levelsTable.getNum(r,"indexNo") == this.index)
    		{
    			//saving the index of levels change
    			levelSeperators[this.index] = r;
    			this.index++;
    		}
    	}
	}

	this.uploadLevel = function()
	{
		save(levelsTable, 'levelsupdate.csv');
		//github
	}

	this.moveLanesIncrement = function(initRow,howFar)
	{
		if(howFar == 0)
			return;
		
		var max = levelsTable.getRowCount() - 1;
		for(let k = max - howFar;k> initRow;k--)
		{
			for(let c = 0;c<levelsTable.getColumnCount();c++)
			{
				var x = levelsTable.getNum(k,c);
				levelsTable.set(k + howFar,c,x);
			}
		}
		//this.debug();
	}

	this.debug = function()
	{
		for(let i = 0;i<levelsTable.getRowCount();i++)
		{
			for(let j = 0; j<levelsTable.getColumnCount();j++)
			{
				console.log(levelsTable.getNum(i,j));
			}
		}
	}

	this.generateNew = function()
	{
		console.log("I dont have a fukin .csv file. Make me one...");
		//let myTable = new p5.Table();
		//save(myTable, 'myTable.csv');
	}
}