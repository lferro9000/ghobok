<?php

	global $db;
	
	$map_id = ghobok_get('map_id');
	$tile_json = ghobok_get('map_object_json');
	
	$object = json_decode($tile_json);
	
	$tileID = $tile->tileID;
	$stepsSouth = $tile->stepsSouth;
	$stepsEast = $tile->stepsEast;
	$stepsUp = $tile->stepsUp;
	$direction = $tile->direction;
	$tileType = $tile->tileType;
	$materialID = $tile->materialID;
	
	if ($tileID == 0) {
		
			$query = "INSERT INTO tiles	(map_id, steps_south, steps_east, steps_up, tile_type, direction, material_id)
						VALUES ($map_id, $stepsSouth, $stepsEast, $stepsUp, $tileType, $direction, $materialID);";
			$result = mysql_query($query,$db) or die('Debile query:  '.$query);
			echo ('Map object saved.');
		}
	} else {
		echo('update');
	}

?>