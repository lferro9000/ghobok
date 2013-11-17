<?php 
	global $db;
?>
<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Ghobok Monster Manager</title>
		<link href="editor.css" rel="stylesheet"/>
		
		<script src="src/lib/jquery.min.js"></script>
		
	</head>
	
	<body>

		<form method="post">
		
			<input type="hidden" name="method" value="monster_manager" />
		
			<div id="material-manager-menu">
				<a href="ghobok.php?method=edit_monster" >+ Add new monster</a>				
			</div>

			<div id="material-manager-materials">
				
				<table>
					<tr>
						<th></th>
						<th>monster name</th>
						<th>monster model</th>
						<th></th>					
					</tr>
					
					<?php
						
					$query = "SELECT * FROM monsters;";
					
					$result = mysql_query($query,$db) or die('Debile query:  '.$query);
					
					if(mysql_num_rows($result)) {
					
						while($monster = mysql_fetch_object($result)) {
							$monster_json = json_encode($monster);
							echo "<tr><td><a href=\"ghobok.php?method=edit_monster&monster_id=" . $monster->monster_id . "\">Edit</a></td>";
							echo "<td><a id=\"monster" . $monster->monster_id ."\"></a>" . $monster->monster_name . "</td>";

							echo "<td>" . $monster->object_model . "</td>";
							
							echo "<td><input class=\"select-button\" type=\"button\" value=\"Select\" monsterID=\"" . $monster->monster_id . "\" /><span class=\"collapsed monster_json\">$monster_json</span></td>";
							echo "</tr>";		
						}
						

					}
							
					?>
			
					
				</table>
				
			</div>

		</form>
		
	</body>
	
</html>