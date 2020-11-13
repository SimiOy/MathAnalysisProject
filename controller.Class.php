<?php 
	class Controller{

		function generateCode($length)
		{
			$chars = "vwyzABC1256";
			$code = "";
			$clean = strlen($chars) - 1;
			while(strlen($code) < $length)
			{
				$code .= $chars[mt_rand(0, $clean)];
			}
			return $code;
		}

		function insertData($data)
		{
			require_once('../connect.php');
			$email = $data['email'];
			$checkUser = "SELECT * FROM players WHERE email=\"$email\"";
			$response = @mysqli_query($dbc, $checkUser) or die( mysqli_error($dbc));
			$row = mysqli_fetch_array($response);

			if(!$row){
				$session = $this->generateCode(10);
				$password = $this->generateCode(5);
				$name = $data['name'];
				$insertInfo = "INSERT INTO players VALUES (\"$name\", \"$email\", \"$password\", 1, null, \"$session\")";
				$inserted = @mysqli_query($dbc, $insertInfo) or die( mysqli_error($dbc));
				if($inserted)
				{
					setcookie("id", mysqli_insert_id($dbc), time()+60*60*24*30, "/", NULL);
					setcookie("sess", $session, time()+60*60*24*30, "/", NULL);
					header('Location: index.php');
					exit();
				}else return "Error inserting user";
			}
			else{
				setcookie("id", $row['player_id'], time()+60*60*24*30, "/", NULL);
				setcookie("sess", $row['session'], time()+60*60*24*30, "/", NULL);
				header('Location: index.php');
				exit();
			}
		}

		function insertGuest()
		{
			require_once('../connect.php');

			$name = "Guest_" . $this->generateCode(5);
			$email = "none";
			$password = "none";
			$session = $this->generateCode(10);

			$insertInfo = "INSERT INTO players VALUES (\"$name\", \"$email\", \"$password\", 1, null, \"$session\")";
			$inserted = @mysqli_query($dbc, $insertInfo) or die( mysqli_error($dbc));
			if($inserted)
				{
					setcookie("id", mysqli_insert_id($dbc), time()+60*60*24*30, "/", NULL);
					setcookie("sess", $session, time()+60*60*24*30, "/", NULL);
					header('Location: index.php');
					exit();
			}else return "Error inserting user";

		}
	}
 ?>