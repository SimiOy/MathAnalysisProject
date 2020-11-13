<?php 
	require_once("google-api/vendor/autoload.php");
	$gClient = new Google_Client();
	$gClient->setClientId("115478076902-n7i0cdkf8tdc50m2n2v73jes9ejncie5.apps.googleusercontent.com");
	$gClient->setClientSecret("78SsW816ZmE6D3MeVvLFSUkE");
	$gClient->setApplicationName("Login Secret Project");
	$gClient->setRedirectUri("http://localhost/Secret%20Project/controller.php");
	$gClient->addScope("https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email");

	$login_url = $gClient->createAuthUrl();
 ?>