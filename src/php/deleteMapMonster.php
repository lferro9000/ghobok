<?php

	global $db;
	
	$mapMonsterID = ghobok_get('map_monster_id');
	$query = "DELETE FROM map_monsters WHERE map_monster_id = $mapMonsterID;";
	$result = mysql_query($query,$db) or die('Debile query:  '. $query);
	echo ("Map monster $mapMonsterID deleted.");
?>