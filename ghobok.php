<?php

$method = isset($_GET['method']) ? $_GET['method'] : $_POST['method'];
	
if (isset($method)) {

	include (__DIR__.'/src/php/db.php');
	global $db;
		
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
		default:
			die('Method '. $method . ' unknown.');
	}

	@mysql_close($db);
	
} else die('No method selected.');

?>