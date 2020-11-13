<?php 
	require_once("config.php");
 ?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>GAME_NAME</title>
		<link rel="stylesheet" href="index_style.css">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
		<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js"></script > 
		<script src="https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js"></script>
		<script type="text/javascript" language="javascript" src="index_script.js"></script>
	</head>
	<body>
		<div id="loader"></div>
		<div id="cont">
		<button id="play" onclick="play()" onmouseout="reset()">PLAY</button>
		<button id="settings">SETTINGS</button>
		<button id="edit"  onclick="edit()"  onmouseout="reset()">EDIT</button>
		</div>
		<div id="icon" onclick="toggle()">
			<img id="icon_image" src="sprites/user.png">
		</div>
		<div id="pannel">

		<?php if( ! ( isset($_COOKIE['id']) || isset($_COOKIE['sess']) ) ){ ?>

			<button onclick="window.location ='<?php echo $login_url; ?>' "  type="button" id="ggl">
			<i class="fa fa-google" aria-hidden="true"></i> Login </button>
			<p> Or </p>
			<button onclick="window.location = 'controller.php' " id="guest" type="button">Guest Login</button>

		<?php }else{ 
			require_once('../connect.php');

			$id = $_COOKIE['id'];
			$query = "SELECT name FROM players WHERE player_id = \"$id\" ";
			$response = @mysqli_query($dbc, $query);
			$row = mysqli_fetch_array($response);

			echo "<p style='color:rgb(45, 46, 43);'>Logged in as:</p>";
			?>
			<form id="changeName" action="name.php" onsubmit="return test()" method="get">
				<input spellcheck="false" autocomplete="off" type="text" id="name" name="name" value = '<?php echo $row["name"] ?>'></input>
				<input type="submit" id="ghost"></form>
			</form>

			<button id="logout" onclick="window.location = 'logout.php'">Logout</button>

		<?php } ?>
		</div>
	</body>
</html>