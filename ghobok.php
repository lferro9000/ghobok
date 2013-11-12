<?php

include (__DIR__.'/src/php/global.php');
global $db;

$method = ghobok_get('method');
	
if (isset($method)) {
		
	switch ($method) {
		case 'load_map':
			include (__DIR__.'/src/php/loadMap.php');
			break;
		case 'save_tile':
			include (__DIR__.'/src/php/saveTile.php');
			break;
		case 'delete_tile':
			include (__DIR__.'/src/php/deleteTile.php');
			break;
		case 'material_manager':
			include (__DIR__.'/src/php/materialManager.php');
			break;
		case 'edit_material':
			include (__DIR__.'/src/php/editMaterial.php');
			break;
		case 'object_manager':
			include (__DIR__.'/src/php/objectManager.php');
			break;
		case 'edit_object':
			include (__DIR__.'/src/php/editObject.php');
			break;
		case 'save_map_object':
			include (__DIR__.'/src/php/saveMapObject.php');
			break;
		case 'delete_map_object':
			include (__DIR__.'/src/php/deleteMapObject.php');
			break;
		default:
			die('Method '. $method . ' unknown.');
	}

	@mysql_close($db);
	
} else die('No method selected.');

?>