<?php 
	global $db;
	
	$cat_id = ghobok_get('cat_id');
	$category_name = "";
	
	if (isset($cat_id)) {
		echo "<input type=\"hidden\" name=\"cat_id\" value=\"$cat_id\" />";
		$query = "SELECT c.material_category_id, c.category_name
					FROM material_categories c
					WHERE c.material_category_id = $cat_id";				
		$result = mysql_query($query, $db) or die('Debile query:  '.$query);

		if(mysql_num_rows($result)) {
			$category = mysql_fetch_object($result);
			$category_name =$category->category_name;
		}		
	} else {
		$cat_id = 0;
	}
	
	// process form, if submitted
	if (isset($_POST['add'])) {
		$query = "INSERT INTO material_categories (category_name) VALUES ('" . $_POST['category_name'] . "');";				
		mysql_query($query, $db) or die('Debile query:  '.$query);
	} else if (isset($_POST['update'])) {
		$query = "UPDATE material_categories SET category_name = '" . $_POST['category_name'] . "' WHERE material_category_id = $cat_id;";				
		mysql_query($query, $db) or die('Debile query:  '.$query);
	}


			
?>
<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Ghobok Material Manager</title>
		<link href="editor.css" rel="stylesheet"/>
		
		<script language="javascript">
		
			function onCategoryChange(catSel) {
				var cat_id = catSel.options[catSel.selectedIndex].value;
				window.location.href = 'ghobok.php?method=material_manager&cat_id=' + cat_id;
			}
			
		</script>
		
	</head>
	
	<body>

		<form method="post">
		
			<input type="hidden" name="method" value="material_manager" />
		
			<div id="material-manager-menu">

				<select onChange="javascript:onCategoryChange(this);">
					<?php
								
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
				<input type="text" name="category_name"/>
				&nbsp;
				<input type="submit" name="update" value="Update" />
				&nbsp;
				<input type="submit" name="add" value="Add" />
				<br/>
				<a href="ghobok.php?method=edit_material" >+ Add new material</a>
				<br/>
			</div>

			<div id="material-manager-materials">
				
				<table>
					<tr>
						<th></th>
						<th>texture image</th>
						<th>image preview</th>
						<th></th>					
					</tr>
					
					<?php
						
					$query = "SELECT m.material_id, m.texture_image, m.material_category_id
								FROM materials m";
					
					if (isset($cat_id)) {
						$query .= " WHERE m.material_category_id = ". $cat_id;
					}
					
					$result = mysql_query($query,$db) or die('Debile query:  '.$query);

					if(mysql_num_rows($result)) {
						while($material = mysql_fetch_object($result)) {
							echo "<tr><a id=\"material" . $material->material_id ."\"/>";
							echo "<td><a href=\"ghobok.php?method=edit_material&material_id=" . $material->material_id . "\">Edit</a></td>";
							echo "<td>" . $material->texture_image . "</td>";
							echo "<td><img width=\"150\" height=\"150\" src=\"images/textures/" . $material->texture_image . "\" /></td>";
							echo "<td><input class=\"select-button\" type=\"button\" value=\"Select\" materialID=\"" . $material->material_id . "\" /></td>";
							echo "</tr>";		
						}
					}
							
					?>

				</table>
				
			</div>

		</form>
		
	</body>
	
</html>