<?php

function loadMap ($mapID) 
{
	global $db;
	
	$query = "SELECT DISTINCT m.material_id, m.texture_image
				FROM tiles t
				JOIN materials m ON ( t.material_id = m.material_id ) 
				WHERE t.map_id = $mapID";
	$result = mysql_query($query,$db) or die('Debile query:  '.$query);
	
	$materials = array();
	if(mysql_num_rows($result)) {
		while($material = mysql_fetch_assoc($result)) {
			$materials[] = $material;
		}
	}
	
	$query = "SELECT tile_id, steps_south, steps_west, steps_up, direction, tile_type, material_id 
				FROM tiles WHERE map_id = $mapID";
	$result = mysql_query($query,$db) or die('Debile query:  '.$query);
	
	$tiles = array();
	if(mysql_num_rows($result)) {
		while($tile = mysql_fetch_assoc($result)) {
			$tiles[] = $tile;
		}
	}
	
	$query = "SELECT p.particle_id, p.particle_image
				FROM particles p
				JOIN map_particles m ON (m.particle_id = p.particle_id)
				WHERE m.map_id = $mapID";
	$result = mysql_query($query,$db) or die('Debile query:  '.$query);
	
	$particles = array();
	if(mysql_num_rows($result)) {
		while($particle = mysql_fetch_assoc($result)) {
			$particles[] = $particle;
		}
	}
	
	
	header('Content-type: application/json');
	echo json_encode(array('mapID'=>$mapID, 'materials'=>$materials, 'tiles'=>$tiles, 'particles'=>$particles));
}
		
?>