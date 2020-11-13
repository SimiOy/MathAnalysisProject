function unlockNextLevel()
{
	var l = Number(levelNo) + 2;
	$.ajax( {
		type: "post",
		url: "update.php",
		data:{
			maxLevel: l
		}
	} );
}

var levelStart, levelEnd;
function loadLevel()
{
	var u = "map.php?levelNo=" + levelNo +"&type=0";
	$.ajax({
	    url : u,
	    type: "GET",
	    dataType : "json",
	    success: function(data){
	    	if(data[0]){
		    	intervals = [Number(data[0]["level_start"]), Number(data[0]["level_end"])];
		    	animation.a = Number(data[0]["level_start"]);
		    	animation.b = Number(data[0]["level_end"]);
	    	}
	    	else{
	    		intervals = [-10, 10];
	    	}
	    	obstacleIndex = 0;
	    	obstacles = [];
	    	while(data[1][obstacleIndex])
	    	{
  				obstacles[obstacleIndex] = new SceneObject();
				obstacles[obstacleIndex].filesInit( Number(data[1][obstacleIndex]["xPos"]), Number(data[1][obstacleIndex]["yPos"]), 
													Number(data[1][obstacleIndex]["xSize"]), Number(data[1][obstacleIndex]["ySize"]),
													Number(data[1][obstacleIndex]["shape"]) );
				obstacleIndex++;
	    	}
	    }
	});
}

function saveLevel()
{
	var u = "map.php?levelNo=" + levelNo +"&type=1";
	var save = [];	
	for(let i=0; i<obstacleIndex; i++)
	{
		save[i] = [ i, obstacles[i].xPos, obstacles[i].yPos,
					obstacles[i].scalex, obstacles[i].scaley,
					obstacles[i].type ];
	}
	$.ajax({
		url: u,
		type: "post",
		data:{
			objects: save,
			objectsNumber: obstacleIndex,
			level: [intervals[0], intervals[intervals.length-1]]
		},
		success:function(data)
		{
			console.log(data);
		},
		error:function(xhr, status, error)
		{
			console.error(xhr);
		}
	});
}