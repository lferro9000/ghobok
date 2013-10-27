<?php

function saveTile($mapID, $tile_json) {
	global $db;
	
	$tile = json_decode($tile_json);
	
	$tileID = $tile->tileID;
	$stepsSouth = $tile->stepsSouth;
	$stepsWest = $tile->stepsWest;
	$stepsUp = $tile->stepsUp;
	$direction = $tile->direction;
	$tileType = $tile->tileType;
	$materialID = $tile->materialID;
	
	if ($tileID == 0) {
		$query = "SELECT COUNT(*) as cnt
					FROM tiles			
					WHERE map_id = $mapID 
					and steps_south = $stepsSouth 
					and steps_west = $stepsWest 
					and steps_up = $stepsUp
					and tile_type = $tileType 
					and (tile_type < 2 or direction = $direction) ";
		$result = mysql_query($query,$db) or die('Debile query:  '.$query);
		$row = mysql_fetch_assoc($result);
		$count = $row['cnt'];
		
		if ($count > 0) {
			die('This tile aready exists in this map.');
		} else {
			$query = "INSERT INTO tiles	(map_id, steps_south, steps_west, steps_up, tile_type, direction, material_id)
						VALUES ($mapID, $stepsSouth, $stepsWest, $stepsUp, $tileType, $direction, $materialID);";
			$result = mysql_query($query,$db) or die('Debile query:  '.$query);
			echo ('Tile saved.');
		}
	} else {
		echo('update');
	}
	
}

?>