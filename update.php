<?php 
	session_start();
	require_once('../connect.php');

	if($_POST)
	{
		$id = $_COOKIE['id'];
		$max_level = $_POST['maxLevel'] ?? 0;
		if( $_SESSION['max_level'] < $max_level ){
			$query = "UPDATE players SET max_level = '$max_level' WHERE player_id = \"$id\"";
			mysqli_query($dbc, $query);
		}
	}
 ?>