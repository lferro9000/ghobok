<?php

	$errors = [];
	
	/* load existing material, if it exists */
	$material_id = ghobok_get('material_id');
	if (isset($material_id)) {
	
		$query = "SELECT m.material_id, m.texture_image, m.material_category_id
					FROM materials m 
					WHERE m.material_id = $material_id";
				
		$result = mysql_query($query, $db) or die('Debile query:  '.$query);

		if(mysql_num_rows($result)) {
			$material = mysql_fetch_object($result);
			$texture_image = $material->texture_image;
			$cat_id = $material->material_category_id;
		}		
	}
		
	// process form, if submitted
	if (isset($_POST['submitted'])) {

		// upload image, if sent
		if (isset($_FILES['texture_image'])) {
			
			$temp = explode(".", $_FILES["texture_image"]["name"]);
			$file_name = $temp[0];
			$file_ext = end($temp);
			$texture_image = $file_name . "." . $file_ext;
			$file_path = TEXTURE_IMAGES_PATH . $texture_image;
			$counter = 1;			
			
			while (file_exists($file_path)) {
					$texture_image = $file_name . "_" . $counter . "." . $file_ext;
					$file_path = TEXTURE_IMAGES_PATH . $texture_image;
					$counter++;
			}
			
				
			if (!move_uploaded_file($_FILES["texture_image"]["tmp_name"], $file_path)) {
				$errors[] = "error occured when uploading the texture image file";
			}
							
		} else if (!isset($material)) {
			$errors[] = "no file selected";
		}
		
		// category
		if (isset($_POST['cat_id'])) {
			$cat_id = $_POST['cat_id'];
		} else {
			$errors[] = "no category selected";
		}
		
		// if all is ok, run sql query and return to manager
		if (count($errors) == 0) {		
			if (isset($material)) {
				$query = "UPDATE materials set material_category_id=$cat_id ";
				
				// delete old file if exists
				if (isset($file_path) && isset($material->texture_image) && file_exists(TEXTURE_IMAGES_PATH . $material->texture_image)) {
					unlink( TEXTURE_IMAGES_PATH . $material->texture_image);					
				}
			
				if (isset($texture_image)) {
				$query .= ", texture_image = '$texture_image' ";
				}				
				$query .= "WHERE material_id = $material_id";
				
				mysql_query($query,$db) or die('Debile query:  '.$query);
			} else {
				$query = "INSERT INTO materials (texture_image, material_category_id) VALUES ('$texture_image',$cat_id);";
				mysql_query($query,$db) or die('Debile query:  '.$query);
				$material_id = mysql_insert_id();
			}
			ghobok_redirect("ghobok.php?method=material_manager&cat_id=$cat_id#material$material_id");
		}
		
	}
	

?>
<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Ghobok Material Manager</title>
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
		
			<input type="hidden" name="method" value="edit_material" />
			
			<?php 
				if (isset($material_id)) {
					echo "<input type=\"hidden\" name=\"material_id\" value=\"$material_id\" />";
				}
			?>
			
			<table>

				<tr>
				
					<td>Category:</td>
					
					<td>
						<select name="cat_id">
							<?php
						
							global $db;
	
							$query = "SELECT c.material_category_id, c.category_name
										FROM material_categories c
										ORDER BY c.category_name";
							
							$result = mysql_query($query,$db) or die('Debile query:  '.$query);

							if(mysql_num_rows($result)) {
								while($cat = mysql_fetch_object($result)) {
									$selected = ($cat->material_category_id == $cat_id) ? "selected" : "";						
									echo "<option value=\"" . $cat->material_category_id . "\" $selected >" . $cat->category_name . "</option>";
								}
							}
							
							?>
						</select>
					<td>
					
				</tr>
			
				<tr>
				
					<td>Texture image:</td>
					
					<td>
						<?php
						if (isset($texture_image)) {
							echo "<img width=\"150\" height=\"150\" src=\"" . TEXTURE_IMAGES_PATH . $texture_image . "\" /><br/>";
							echo $texture_image;
						}
						?>
						<input type="file" name="texture_image" id="texture_image" />
					</td>
					
				</tr>
				
				<tr>
				
					<td>
						<input type="submit" value="Save" name="submitted" />
					</td>
					
					<td>
						<a href="ghobok.php?method=material_manager">Back to material manager</a>
					</td>
					
				</tr>

			</table>
			
		</form>

	</body>
	
</html>