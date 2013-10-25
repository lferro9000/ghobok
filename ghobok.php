<?php

if (isset($_GET['method'])) {

	include (__DIR__.'/src/php/db.php');
	include (__DIR__.'/src/php/loadMap.php');
	include (__DIR__.'/src/php/saveTile.php');
	global $db;
	
	$method = $_GET['method'];
	
	switch ($method) {
    case 'load_map':
		loadMap(intval($_GET['map_id']));
        break;
    case 'save_tile':
        saveTile($_GET['tile']);
        break;
    case 2:
        echo "i equals 2";
        break;
}


		
	@mysql_close($db);
} else die('No method selected.');

?>