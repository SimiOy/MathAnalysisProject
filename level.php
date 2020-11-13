<?php 
	session_start();
	require_once('../connect.php');

	if(!isset($_COOKIE['id'])){
		header("Location: index.php");
		exit();
	}
	if($_GET['levelNo'] + 1 > $_SESSION['max_level'] )
		header("LOCATION: levelSelect.php");

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<script type="text/javascript" language="javascript" src="libraries/p5.js"></script>
	<script type="text/javascript" language="javascript" src="main.js"></script>
	<script type="text/javascript" language="javascript" src="animations.js"></script>
	<script type="text/javascript" language="javascript" src="grid.js"></script>
	<script type="text/javascript" language="javascript" src="ui.js"></script>
	<script type="text/javascript" language="javascript" src="obstacles.js"></script>
	<script type="text/javascript" language="javascript" src="save.js"></script>
	<script type="text/javascript" language="javascript" src="githubhandler.js"></script>
	<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js"></script >
	<title>GAME_NAME</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<div id="loader1"><svg width="200" height="200" viewBox="0 0 100 100">
	  <polyline class="line-cornered stroke-still" points="0,0 100,0 100,100" stroke-width="10" fill="none"></polyline>
	  <polyline class="line-cornered stroke-still" points="0,0 0,100 100,100" stroke-width="10" fill="none"></polyline>
	  <polyline class="line-cornered stroke-animation" points="0,0 100,0 100,100" stroke-width="10" fill="none"></polyline>
	  <polyline class="line-cornered stroke-animation" points="0,0 0,100 100,100" stroke-width="10" fill="none"></polyline></svg>
	</div>
	<div id="loader2"></div>
	<div id="frame">
		<div id="mainscreen" class="mainscreen"></div>
		<div id="bottom_trigger"></div>
		<div id="bottom_list">
			<div id="mini_plot"></div>
			<div id="function_list">
				<div class="function"> <div class="temp" style="border: 4px solid blue;">SIN</div> </div>
				<div class="function"> <div class="temp" style="border: 4px solid red;">COS</div> </div>
				<div class="function"> <div class="temp" style="border: 4px solid green;">lOG</div> </div>
				<div class="function"> <div class="temp" style="border: 4px solid lime;">EXP</div> </div>
				<div class="function"> <div class="temp" style="border: 4px solid yellow;">ARCSIN</div> </div>
				<div class="function"> <div class="temp" style="border: 4px solid cyan;">TAN</div> </div>
				<div class="function"> <div class="temp" style="border: 4px solid orange;">ARCCOS</div> </div>
				<div class="function"> <div class="temp" style="border: 4px solid pink;">SQRT</div> </div>
				<div class="function"> <div class="temp" style="border: 4px solid purple;">ARCTAN</div> </div>
				<div class="function" style="border-right:2px solid rgb(107, 107, 107);">
					<div class="temp" style="border: 4px solid white;">CONSTANT</div>
				</div>
			</div>
		</div>
		<?php if($_SESSION['edit']){ ?>
		<script type="text/javascript"> sessionStorage.setItem("edit", "true") </script>
		<div id="shape_selector">
			<div class="shape"></div>
			<div class="shape"></div>
		</div>
		<?php }else{ ?>
		<script type="text/javascript"> sessionStorage.setItem("edit", "false") </script>
		<?php } ?>
		<div id="command">
			<div style="color: #757575;">world:</div>
			<div>
				<div class="key special long"><div>Backspace</div></div>
				<label> START</label>
			</div>
			<div>
				<div class="key special"><div class="mouseIcon1"></div></div>
			 	<div class="key special"><div>W</div></div>
			 	<div class="key special"><div>A</div></div>
			 	<div class="key special"><div>S</div></div>
			 	<div class="key special"><div>D</div></div>
			 	<label> MOVE</label>
			</div>
			<div>
				<div class="key special"><div>E</div></div>
				<label> EDIT FUNCTION</label>
			</div>
			<div>
				<div class="key special long"><div>Enter</div></div>
				<label> PAUSE</label>
			</div>
			<div>
				<div class="key special"><div>H</div></div>
				<label> SHOW KEYS</label>
			</div>
			<div style="color: #757575;">function editor:</div>
			<div>
				<div class="key special"><div class="mouseIcon1"></div></div>
				<label> ADD DIVISION</label>
			</div>
			<div>
				<div class="key special"><div class="mouseIcon2"></div></div>
				<label> MOVE DIVISION</label>
			</div>
			<div>
				<div class="key special long"><div>Shift</div></div>
				<label> + </label>
				<div class="key special"><div class="mouseIcon3"></div></div>
				<label> MOVE</label>
			</div>
			<div>
				<div class="key special"><div>R</div></div>
				<label> CENTER</label>
			</div>
			<?php if($_SESSION['edit']){ ?>
			<div style="color: #757575;">devs:</div>
			<div>
				<div class="key special"><div>P</div></div>
				<label> SAVE LEVEL</label>
			</div>
			<div>
				<div class="key special"><div class="mouseIcon2"></div></div>
				<label> EDIT OBJECT</label>
			</div>
			<div>
				<div class="key special long"><div>Shift</div></div>
				<label> + </label>
				<div class="key special"><div class="mouseIcon1"></div></div>
				<label> PLACE MULTIPLE</label>
			</div>
		<?php } ?>

		</div>
	</div>
	<div id="play_button"> <img style="width:100%;" src = "sprites/playButton.png"> </div>
	<div id="settings_button"> <img style="width:100%;" src = "sprites/settingsButton.png"> </div>
	<div id="home_button"><img style="width:100%;" src="sprites/homeButton.png" onclick="home()"></div>
</body>
</html>