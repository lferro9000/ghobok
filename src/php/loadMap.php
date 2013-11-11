<?php

	global $db;
	
	$mapID = ghobok_get('map_id');
	
	/* MATERIALS */
	$query = "SELECT DISTINCT m.material_id, m.texture_image
				FROM materials m 
				LEFT OUTER JOIN tiles t ON ( t.material_id = m.material_id ) 
				LEFT OUTER JOIN objects o ON ( o.material_id = m.material_id ) 
				LEFT OUTER JOIN map_objects mo ON ( mo.object_id = o.object_id ) 
				WHERE t.map_id = $mapID OR mo.map_id = $mapID;";
	$result = mysql_query($query,$db) or die('Debile query:  '.$query);
	
	$materials = array();
	if(mysql_num_rows($result)) {
		while($material = mysql_fetch_assoc($result)) {
			$materials[] = $material;
		}
	}
	
	/* OBJECT MODELS */
	$query = "SELECT DISTINCT o.object_id, o.object_model FROM objects o	
				JOIN map_objects mo ON (o.object_id = mo.object_id)
				WHERE mo.map_id = $mapID AND o.object_type = 0;";
	$result = mysql_query($query,$db) or die('Debile query:  '.$query);
	
	$models = array();
	if(mysql_num_rows($result)) {
		while($model = mysql_fetch_object($result)) {
			$model->model_json = file_get_contents("models/" . $model->object_model);
			$models[] = $model;
		}
	}
	
	/* MAP OBJECTS */
	$query = "SELECT mo.*, o.material_id, o.object_type 
				FROM map_objects mo 
				JOIN objects o ON (o.object_id = mo.object_id)
				WHERE map_id = $mapID;";
	$result = mysql_query($query,$db) or die('Debile query:  '.$query);
	
	$map_objects = array();
	if(mysql_num_rows($result)) {
		while($map_object = mysql_fetch_assoc($result)) {
			$map_objects[] = $map_object;
		}
	}
	
	/* TILES */
	$query = "SELECT tile_id, steps_south, steps_east, steps_up, direction, tile_type, material_id 
				FROM tiles WHERE map_id = $mapID";
	$result = mysql_query($query,$db) or die('Debile query:  '.$query);
	
	$tiles = array();
	if(mysql_num_rows($result)) {
		while($tile = mysql_fetch_assoc($result)) {
			$tiles[] = $tile;
		}
	}
	
	/* WEATHER EFFECTS */
	$query = "SELECT * FROM weather_effects	WHERE map_id = $mapID ORDER BY weather_effect_id desc";
	$result = mysql_query($query,$db) or die('Debile query:  '.$query);
	
	$effects = array();
	if(mysql_num_rows($result)) {
		while($effect = mysql_fetch_assoc($result)) {
			$effects[] = $effect;
		}
	}
		
	header('Content-type: application/json');
	echo json_encode(array('map_id'=>$mapID, 'materials'=>$materials, 'models'=>$models, 'map_objects'=>$map_objects, 'tiles'=>$tiles, 'weather_effects'=>$effects));

		
?>