<?php
	session_start();
	require_once('../connect.php');

	$level = $_GET['levelNo'] + 1;
	if($_GET['type'] == 0){
		$query = "select * from objects where level_id = $level";
		$response = @mysqli_query($dbc, $query);
		$rows = [];
		while($row = mysqli_fetch_array($response))
		{
			$rows[] = $row;
		}
		$query = "select level_start, level_end from levels where level_id = $level";
		$response = @mysqli_query($dbc, $query);
		$row = mysqli_fetch_array($response);

		$total = [$row, $rows];
		$myJson = json_encode($total);
		echo $myJson;
	}
	else if($_POST && $_GET['type'] == 1){
		$query = "delete from objects where level_id = $level;";
		mysqli_query($dbc, $query);

		if($_POST["objectsNumber"]!=0){
			foreach ($_POST["objects"] as $object) {
				$query = "INSERT INTO objects VALUES ($object[0], $object[1], $object[2], $object[3], $object[4], $object[5], $level)";
				mysqli_query($dbc, $query);
			}
		}
		$ls = $_POST['level'][0];
		$le = $_POST['level'][1];
		$query = "UPDATE levels SET level_start = $ls, level_end = $le WHERE level_id = $level";
		mysqli_query($dbc, $query) or die;

		echo "Success";
	}

 ?>