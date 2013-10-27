<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Ghobok Material Manager</title>
		<style>
			body {
				top:0;
				left:0;
				margin:0;
				padding:0;
			}
			#material-manager-materials, #material-manager-menu {
				background-color:Black;
				color:White;
			}
		</style>
	</head>
	
	<body>

		<?php

			global $db;
				
			$cat_id =isset($_GET['cat_id']) ? $_GET['cat_id'] : null;
			if (isset($cat_id)) {
				$query = "SELECT c.material_category_id, c.category_name
						FROM material_categories c
						WHERE c.material_category_id = $cat_id";
				if(mysql_num_rows($result)) {
					$category = mysql_fetch_object($result);
				}
			}
						
		?>

		<div id="material-manager-menu">

			<select>
				<?php
			
				$query = "SELECT c.material_category_id, c.category_name
							FROM material_categories c";
				$result = mysql_query($query,$db) or die('Debile query:  '.$query);

				if(mysql_num_rows($result)) {
					while($cat = mysql_fetch_object($result)) {
						echo "<option value=\"" . $cat->material_category_id . "\">" . $cat->category_name . "</option>";
					}
				}
				
				?>
			</select>
			
		</div>

		<div id="material-manager-materials">
			
			<table>
				<tr>
					<th>category id</th>
					<th>category name</th>
					<th>material id</th>
					<th>texture image</th>
					<th>image preview</th>
					<th></th>
					<th></th>
					
				</tr>
				
				<?php
					
				$query = "SELECT m.material_id, m.texture_image, c.material_category_id, c.category_name
							FROM materials m
							LEFT OUTER JOIN material_categories c ON (m.material_category_id = c.material_category_id)";
				
				if (isset($category)) {
					$query .= " WHERE c.material_category_id = ". $category->material_category_id;
				}
				
				$result = mysql_query($query,$db) or die('Debile query:  '.$query);

				if(mysql_num_rows($result)) {
					while($material = mysql_fetch_object($result)) {
						echo "<tr>";
						echo "<td>" . $material->material_category_id . "</td>";
						echo "<td>" . $material->category_name . "</td>";
						echo "<td>" . $material->material_id . "</td>";
						echo "<td>" . $material->texture_image . "</td>";
						echo "<td><img width=\"150\" height=\"150\" src=\"images/" . $material->texture_image . "\" /></td>";
						echo "<td><input class=\"select-button\" type=\"button\" value=\"Select\" materialID=\"" . $material->material_id . "\" /></td>";
						echo "<td><input type=\"button\" value=\"Edit\"/></td>";
						echo "</tr>";		
					}
				}
						
				?>

			</table>
			
		</div>

		<div class="material-manager-edit">

		</div>
	
	</body>
	
</html>