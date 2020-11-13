<?php 
	require_once('../connect.php');

	$id = $_COOKIE['id'];
	$query = "SELECT email FROM players WHERE player_id = $id ";
	$respone = @mysqli_query($dbc, $query) or die(mysqli_error($dbc));
	$row = mysqli_fetch_array($respone);
	if($row['email']=="none"){
		$query = "DELETE FROM players WHERE player_id = $id ";
		mysqli_query($dbc, $query) or die(mysqli_error($dbc));
	}
	unset($_COOKIE['id']); 
    setcookie('id', null, -1, '/'); 
	unset($_COOKIE['sess']); 
    setcookie('sess', null, -1, '/'); 
	header("Location: index.php");
 ?>