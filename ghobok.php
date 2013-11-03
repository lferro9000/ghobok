<?php

include (__DIR__.'/src/php/global.php');
global $db;

$method = ghobok_get('method');
	
if (isset($method)) {
		
	switch ($method) {
		case 'load_map':
			include (__DIR__.'/src/php/loadMap.php');
			loadMap(intval($_GET['map_id']));
			break;
		case 'save_tile':
			include (__DIR__.'/src/php/saveTile.php');
			saveTile($_POST['mapID'], $_POST['tile_json']);
			break;
		case 'delete_tile':
			include (__DIR__.'/src/php/deleteTile.php');
			deleteTile($_POST['tile_id']);
			break;
		case 'material_manager':
			include (__DIR__.'/src/php/materialManager.php');
			break;
		case 'edit_material':
			include (__DIR__.'/src/php/editMaterial.php');
			break;
		default:
			die('Method '. $method . ' unknown.');
	}

	@mysql_close($db);
	
} else die('No method selected.');

?>