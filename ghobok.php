<?php

if (isset($_GET['method'])) {

	$method = $_GET['method'];
	
	if ($method == 'load_map') {
		$map_id = intval($_GET['map_id']);
		$db = mysql_connect('localhost','root','') or die('Cannot connect to the DB');
		mysql_select_db('ghobok',$db) or die('Cannot select the DB');

		$query = "SELECT DISTINCT m.material_id, m.texture_image
					FROM tiles t
					JOIN materials m ON ( t.material_id = m.material_id ) 
					WHERE t.map_id = $map_id";
		$result = mysql_query($query,$db) or die('Debile query:  '.$query);
		
		$materials = array();
		if(mysql_num_rows($result)) {
			while($material = mysql_fetch_assoc($result)) {
				$materials[] = $material;
			}
		}
		
		$query = "SELECT tile_id, steps_south, steps_west, direction, tile_type, material_id FROM tiles WHERE map_id = $map_id";
		$result = mysql_query($query,$db) or die('Debile query:  '.$query);
		
		$tiles = array();
		if(mysql_num_rows($result)) {
			while($tile = mysql_fetch_assoc($result)) {
				$tiles[] = $tile;
			}
		}
		
		header('Content-type: application/json');
		echo json_encode(array('materials'=>$materials, 'tiles'=>$tiles));

		@mysql_close($db);
	
	}
		
} else die('No method selected.');

?>