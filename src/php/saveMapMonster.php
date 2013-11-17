<?php

	global $db;
	
	$map_id = ghobok_get('map_id');
	$map_monster_json = ghobok_get('map_monster_json');
	
	$map_monster = json_decode($map_monster_json);
	
	$mapMonsterID = $map_monster->map_monster_id;
		
	if ($mapMonsterID == 0) {
		
			$query = "INSERT INTO map_monsters(map_id, monster_id, steps_up, steps_east, steps_south, scale, direction) 
			VALUES ($map_id, $map_monster->monster_id, $map_monster->steps_up, $map_monster->steps_east, $map_monster->steps_south, $map_monster->scale, $map_monster->direction );";
			$result = mysql_query($query,$db) or die('Debile query:  '.$query);
			echo (mysql_insert_id());
		
	} else {
		$query = "UPDATE map_monsters SET steps_up = " . $map_monster->steps_up . ",
		steps_east = " . $map_monster->steps_east . ",
		steps_south = " . $map_monster->steps_south . ",
		direction = " . $map_monster->direction . ",
		scale = " . $map_monster->scale . "
		WHERE map_monster_id = " . $mapMonsterID;
		$result = mysql_query($query,$db) or die('Debile query:  '.$query);
		echo('Updated monster:' . $mapMonsterID );
	}

?>