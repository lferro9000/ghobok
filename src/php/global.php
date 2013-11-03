<?php

	const TEXTURE_IMAGES_PATH = "images/textures/";

	$db = mysql_connect('localhost','root','') or die('Cannot connect to DB');
	mysql_select_db('ghobok',$db) or die('Cannot select DB');

	function ghobok_redirect($page) {
		$host  = $_SERVER['HTTP_HOST'];
		$uri  = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
		header("Location: http://$host$uri/$page");
	}
	
	function ghobok_get($name) {
		return isset($_GET[$name]) ? $_GET[$name] : (isset($_POST[$name]) ? $_POST[$name] : null);
	}
	
?>