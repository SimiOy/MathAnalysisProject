window.onload = function(){
	$('#loader').fadeOut();
}

var flag = 1;
function toggle(){
	if(flag){
		document.getElementById("pannel").style.filter = "opacity(1)";
		document.getElementById("pannel").style.pointerEvents = "auto";
		flag = 0;
	}
	else{
		document.getElementById("pannel").style.filter = "opacity(0)";
		document.getElementById("pannel").style.pointerEvents = "none";
		flag = 1;
	}
}

function play()
{
	if(Cookies.get('id') == null || Cookies.get('sess') == null)
	{
		document.getElementById("settings").innerHTML = "Login first!";
		document.getElementById("settings").style.color = "rgb(230, 137, 103)";
		document.getElementById("settings").classList.add("shake");
	}
	else{
		$('#loader').fadeIn();
		setTimeout(function(){
			window.location ='levelSelect.php';
		}, 250);
	}
}

function reset()
{
	document.getElementById("settings").innerHTML = "SETTINGS";
	document.getElementById("settings").style.color = "rgb(227, 255, 222)";
	document.getElementById("settings").classList.remove("shake");
}

window.addEventListener('click', function(e){   
  if (!document.getElementById('pannel').contains(e.target) && !document.getElementById("icon").contains(e.target) && flag==0){
  	console.log('hi');
    document.getElementById("pannel").style.filter = "opacity(0)";
	document.getElementById("pannel").style.pointerEvents = "none";
	flag = 1;
  }
});

function edit()
{
	if(Cookies.get('id')==13 && Cookies.get('sess')=="6yzz1zvBBA")
	{
		$('#loader').fadeIn();
		setTimeout(function(){
			window.location ='levelSelect.php?edit';
		}, 250);
	}
	else{
		document.getElementById("settings").innerHTML = "You are not a dev!";
		document.getElementById("settings").style.color = "rgb(230, 137, 103)";
		document.getElementById("settings").classList.add("shake");
	}
}

var l = 1;
function test(){
	$('#loader').fadeIn();
    setTimeout( function () { 
        $("#changeName").submit();
        console.log("hello");
    }, 200);
    if(l--)
    	return false;
    return true;
}