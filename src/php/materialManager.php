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

		<div id="material-manager-menu">

			<select onChange="javascript:onCategoryChange(this);">
				<?php
			
				global $db;
				
				$cat_id = isset($_GET['cat_id']) ? $_GET['cat_id'] : 0;			
			
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
			
			<a href="ghobok.php?method=edit_material" >+ Add new material</a>
			
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

	</body>
	
</html>