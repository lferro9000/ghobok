<?php

	global $db;
	
	$map_id = ghobok_get('map_id');
	$tile_json = ghobok_get('tile_json');
	
	$tile = json_decode($tile_json);
	
	$tileID = $tile->tileID;
	$stepsSouth = $tile->stepsSouth;
	$stepsEast = $tile->stepsEast;
	$stepsUp = $tile->stepsUp;
	$direction = $tile->direction;
	$tileType = $tile->tileType;
	$materialID = $tile->materialID;
	
	if ($tileID == 0) {
		$query = "SELECT COUNT(*) as cnt
					FROM tiles			
					WHERE map_id = $map_id 
					and steps_south = $stepsSouth 
					and steps_east = $stepsEast 
					and steps_up = $stepsUp
					and tile_type = $tileType 
					and (tile_type < 2 or direction = $direction) ";
		$result = mysql_query($query,$db) or die('Debile query:  '.$query);
		$row = mysql_fetch_assoc($result);
		$count = $row['cnt'];
		
		if ($count > 0) {
			die('This tile aready exists in this map.');
		} else {
			$query = "INSERT INTO tiles	(map_id, steps_south, steps_east, steps_up, tile_type, direction, material_id)
						VALUES ($map_id, $stepsSouth, $stepsEast, $stepsUp, $tileType, $direction, $materialID);";
			$result = mysql_query($query,$db) or die('Debile query:  '.$query);
			echo ('Tile saved.');
		}
	} else {
		echo('update');
	}

?>