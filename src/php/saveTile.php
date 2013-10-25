<?php

function saveTile($tile_json) {
	$tile = json_decode($tile_json);
    var_dump($tile);
	/*
	$query = "SELECT DISTINCT m.material_id, m.texture_image
				FROM tiles t
				JOIN materials m ON ( t.material_id = m.material_id ) 
				WHERE t.map_id = $mapID";
	$result = mysql_query($query,$db) or die('Debile query:  '.$query);
	*/
}