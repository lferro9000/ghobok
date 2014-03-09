<?php

include (__DIR__.'/php/global.php');
global $db;

$method = ghobok_get('method');
	
if (isset($method)) {
		
	switch ($method) {
		case 'load_map':
			include (__DIR__.'/php/loadMap.php');
			break;
		
		/* TILES */
		case 'save_tile':
			include (__DIR__.'/php/saveTile.php');
			break;
		case 'delete_tile':
			include (__DIR__.'/php/deleteTile.php');
			break;
			
		/* MATERIALS */
		case 'material_manager':
			include (__DIR__.'/php/materialManager.php');
			break;
		case 'edit_material':
			include (__DIR__.'/php/editMaterial.php');
			break;
		
		/* OBJECTS */
		case 'object_manager':
			include (__DIR__.'/php/objectManager.php');
			break;
		case 'edit_object':
			include (__DIR__.'/php/editObject.php');
			break;	
		
		/* MAP OBJECTS */			
		case 'save_map_object':
			include (__DIR__.'/php/saveMapObject.php');
			break;
		case 'delete_map_object':
			include (__DIR__.'/php/deleteMapObject.php');
			break;
		
		/* MONSTERS */
		case 'monster_manager':
			include (__DIR__.'/php/monsterManager.php');
			break;
		case 'edit_monster':
			include (__DIR__.'/php/editMonster.php');
			break;
			
		/* MAP MONSTERS */
		case 'save_map_monster':
			include (__DIR__.'/php/saveMapMonster.php');
			break;
		case 'delete_map_monster':
			include (__DIR__.'/php/deleteMapMonster.php');
			break;
			
		default:
			die('Method '. $method . ' unknown.');
	}

	@mysql_close($db);
	
} else die('No method selected.');

?>