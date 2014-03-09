<?php

	global $db;
	
	$tileID = ghobok_get('tile_id');
	$query = "DELETE FROM tiles WHERE tile_id = $tileID;";
	$result = mysql_query($query,$db) or die('Debile query:  '.$query);
	echo ('SUCCESS');	


?>