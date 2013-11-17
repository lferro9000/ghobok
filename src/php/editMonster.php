<?php

	global $db;
	
	$errors = [];
	
	$monster_id = ghobok_get('monster_id');
	$monster_name = "";
	$object_model = "";
	$animation_duration = 1000;
	$default_scale = 1;
	$default_position_x = 0;
	$default_position_y = -150;
	$default_position_z = 0;
	$default_rotation_x = 0;
	$default_rotation_y = 0;
	$default_rotation_z = 0;
	
	// process form, if submitted
	if (isset($_POST['submitted'])) {

		$monster_id = ghobok_get('monster_id');
		$monster_name = ghobok_get('monster_name');
		$object_model = ghobok_get('object_model');
		$animation_duration = ghobok_get('animation_duration');
		$default_scale = ghobok_get('default_scale');
		$default_position_x = ghobok_get('default_position_x');
		$default_position_y = ghobok_get('default_position_y');
		$default_position_z = ghobok_get('default_position_z');
		$default_rotation_x = ghobok_get('default_rotation_x');
		$default_rotation_y = ghobok_get('default_rotation_y');
		$default_rotation_z = ghobok_get('default_rotation_z');
		
		if (!isset($monster_name)) {
			$errors[] = "monster must have name";
		}
		
		// if all is ok, run sql query and return to manager
		if (count($errors) == 0) {		
			if (isset($monster_id)) {
				$query = "UPDATE monsters set object_model='$object_model',
							default_scale=$default_scale,
							animation_duration=$animation_duration,
							default_position_x=$default_position_x,
							default_position_y=$default_position_y,
							default_position_z=$default_position_z,
							default_rotation_x=$default_rotation_x,
							default_rotation_y=$default_rotation_y,
							default_rotation_z=$default_rotation_z,
							monster_name='$monster_name'
							WHERE monster_id=$monster_id";
				
				mysql_query($query,$db) or die('Debile query:  '.$query);
			} else {
				$query = "INSERT INTO monsters (object_model, animation_duration,  default_scale, default_position_x, default_position_y, default_position_z, default_rotation_x, default_rotation_y, default_rotation_z, monster_name) 
							VALUES ('$object_model', $animation_duration, $default_scale, $default_position_x, $default_position_y, $default_position_z, $default_rotation_x, $default_rotation_y, $default_rotation_z, '$monster_name');";
				mysql_query($query,$db) or die('Debile query:  '.$query);
				$monster_id = mysql_insert_id();
			}
			ghobok_redirect("ghobok.php?method=monster_manager#monster$monster_id");
		}
		
	} else if (isset($monster_id)) {
	
		$query = "SELECT * FROM monsters WHERE monster_id = $monster_id";				
		$result = mysql_query($query, $db) or die('Debile query:  '.$query);

		if(mysql_num_rows($result)) {
			$monster = mysql_fetch_object($result);
			$monster_name = $monster->monster_name;
			$object_model = $monster->object_model;
			$animation_duration = $monster->animation_duration;
			$default_scale = $monster->default_scale;
			$default_position_x = $monster->default_position_x;
			$default_position_y = $monster->default_position_y;
			$default_position_z = $monster->default_position_z;
			$default_rotation_x = $monster->default_rotation_x;
			$default_rotation_y = $monster->default_rotation_y;
			$default_rotation_z = $monster->default_rotation_z;			
		}		
	}
	

?>
<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Ghobok Monster Manager</title>
		<link href="editor.css" rel="stylesheet"/>
		
	</head>
	
	<body>

		<?php 
			
			if (count($errors) > 0) {
				echo "<ul>";
				foreach ($errors as $error) {
					echo "<li>$error</li>";
				}
				echo "</ul>";
			}
		?>
		
		<form method="post" enctype="multipart/form-data">
		
			<input type="hidden" name="method" value="edit_monster" />
			
			<?php 
				if (isset($monster_id)) {
					echo "<input type=\"hidden\" name=\"monster_id\" value=\"$monster_id\" />";
				}
			?>
			
			<table>

				<tr>
				
					<td>monster name:</td>
					
					<td><input type="text" name="monster_name" value="<?php echo $monster_name ?>"/></td>
					
				</tr>
				
				<tr>
				
					<td>monster model:</td>
					
					<td><input type="text" name="object_model" value="<?php echo $object_model ?>"/></td>
					
				</tr>
				
				<tr>
				
					<td>Animation duration:</td>
					
					<td><input type="text" name="animation_duration" value="<?php echo $animation_duration ?>"/></td>
					
				</tr>
				
				<tr>
				
					<td>Scale:</td>
					
					<td><input type="text" name="default_scale" value="<?php echo $default_scale ?>"/></td>
					
				</tr>
				
				<tr>
				
					<td>X:</td>
					
					<td><input type="text" name="default_position_x" value="<?php echo $default_position_x ?>"/></td>
					
				</tr>
							
	
				<tr>
				
					<td>Y:</td>
					
					<td><input type="text" name="default_position_y" value="<?php echo $default_position_y ?>"/></td>
					
				</tr>
				
				<tr>
				
					<td>Z:</td>
					
					<td><input type="text" name="default_position_z" value="<?php echo $default_position_z ?>"/></td>
					
				</tr>
				
				<tr>
				
					<td>rotation X:</td>
					
					<td><input type="text" name="default_rotation_x" value="<?php echo $default_rotation_x ?>"/></td>
					
				</tr>
							
	
				<tr>
				
					<td>rotation Y:</td>
					
					<td><input type="text" name="default_rotation_y" value="<?php echo $default_rotation_y ?>"/></td>
					
				</tr>
				
				<tr>
				
					<td>rotation Z:</td>
					
					<td><input type="text" name="default_rotation_z" value="<?php echo $default_rotation_z ?>"/></td>
					
				</tr>
		
				<tr>
				
					<td>
						<input type="submit" value="Save" name="submitted" />
					</td>
					
					<td>
						<a href="ghobok.php?method=monster_manager">Back to Monster Manager</a>
					</td>
					
				</tr>

			</table>
			
		</form>

	</body>
	
</html>