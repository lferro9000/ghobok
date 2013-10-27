<?php

function deleteTile($tileID) {
	global $db;
	$query = "DELETE FROM tiles WHERE tile_id = $tileID;";
	$result = mysql_query($query,$db) or die('Debile query:  '.$query);
	echo ('SUCCESS');	
}

?>