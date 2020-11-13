<?php 
	require_once("../connect.php");

	$id = $_COOKIE["id"];
	$name = $_GET["name"];
	$query = "UPDATE players SET name=\"$name\" WHERE player_id=$id ";
	mysqli_query($dbc, $query) or die (mysqli_error($dbc));

	header("Location: index.php");
 ?>