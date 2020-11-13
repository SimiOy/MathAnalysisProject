<?php 
	session_start();
	require_once('../connect.php');

	if(!isset($_COOKIE['id'])){
		header("Location: index.php");
		exit();
	}
	$id = $_COOKIE['id'];
	$query =  "SELECT * FROM players WHERE player_id = \"$id\" ";
	$response = @mysqli_query($dbc, $query);

	$row = mysqli_fetch_array($response);
	$_SESSION['max_level'] = $row['max_level'];
	$_SESSION['edit'] = false;
	if(isset($_GET["edit"])){
		if($id!=13){
			header("Location: index.php");
			exit();
		}
		$_SESSION['edit'] = true;
		$_SESSION['max_level'] = 16;
	}
?>
<!DOCTYPE html>
<html>
<head>
	<script type="text/javascript" language="javascript" src="levelselect_script.js"></script>
	<title>GAME_NAME</title>
	<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js"></script >   
	<link rel="stylesheet" href="levelSelect_style.css">
</head>
<body>
	<div id="loader1"></div>
	<div id="loader2"></div>
	<div id="main">
		<div class="cells">
			<div id="cell0" onmouseover="projectCell(0)" onmouseout="normalCell(0)" onclick="level(0)" style="background-image: none; background-size: cover;"> <p id="cellText0"></p> </div>
			<div id="cell1" onmouseover="projectCell(1)" onmouseout="normalCell(1)" onclick="level(1)" style="background-image: none; background-size: cover;"> <p id="cellText1"></p> </div>
			<div id="cell2" onmouseover="projectCell(2)" onmouseout="normalCell(2)" onclick="level(2)" style="background-image: none; background-size: cover;"> <p id="cellText2"></p> </div>
			<div id="cell3" onmouseover="projectCell(3)" onmouseout="normalCell(3)" onclick="level(3)" style="background-image: none; background-size: cover;"> <p id="cellText3"></p> </div>
			<div id="cell4" onmouseover="projectCell(4)" onmouseout="normalCell(4)" onclick="level(4)" style="background-image: none; background-size: cover;"> <p id="cellText4"></p> </div>
			<div id="cell5" onmouseover="projectCell(5)" onmouseout="normalCell(5)" onclick="level(5)" style="background-image: none; background-size: cover;"> <p id="cellText5"></p> </div>
			<div id="cell6" onmouseover="projectCell(6)" onmouseout="normalCell(6)" onclick="level(6)" style="background-image: none; background-size: cover;"> <p id="cellText6"></p> </div>
			<div id="cell7" onmouseover="projectCell(7)" onmouseout="normalCell(7)" onclick="level(7)" style="background-image: none; background-size: cover;"> <p id="cellText7"></p> </div>
			<div id="cell8" onmouseover="projectCell(8)" onmouseout="normalCell(8)" onclick="level(8)" style="background-image: none; background-size: cover;"> <p id="cellText8"></p> </div>
			<div id="cell9" onmouseover="projectCell(9)" onmouseout="normalCell(9)" onclick="level(9)" style="background-image: none; background-size: cover;"> <p id="cellText9"></p> </div>
			<div id="cell10" onmouseover="projectCell(10)" onmouseout="normalCell(10)" onclick="level(10)" style="background-image: none; background-size: cover;"> <p id="cellText10"></p> </div>
			<div id="cell11" onmouseover="projectCell(11)" onmouseout="normalCell(11)" onclick="level(11)" style="background-image: none; background-size: cover;"> <p id="cellText11"></p> </div>
			<div id="cell12" onmouseover="projectCell(12)" onmouseout="normalCell(12)" onclick="level(12)" style="background-image: none; background-size: cover;"> <p id="cellText12"></p> </div>
			<div id="cell13" onmouseover="projectCell(13)" onmouseout="normalCell(13)" onclick="level(13)" style="background-image: none; background-size: cover;"> <p id="cellText13"></p> </div>
			<div id="cell14" onmouseover="projectCell(14)" onmouseout="normalCell(14)" onclick="level(14)" style="background-image: none; background-size: cover;"> <p id="cellText14"></p> </div>
			<div id="cell15" onmouseover="projectCell(15)" onmouseout="normalCell(15)" onclick="level(15)" style="background-image: none; background-size: cover;"> <p id="cellText15"></p> </div>
		</div>
		<div id="home" onclick="home()"><h3>HOME</h3></div>
		<div id="sym"><h3 id="symh">TUTORIAL</h3></div> 
		
		<?php 
			for($i=0; $i<$_SESSION['max_level'] ; $i++)
				echo "<script> unlocked[$i] = 1; </script>";

			if(isset($_GET['edit']))
				echo '<script type="text/javascript">document.getElementById("symh").innerHTML = "HEY&nbsp;&nbsp;&nbsp;&nbsp;DEV"</script>';
		?>

	</div>
</body>
</html>