function dungeonMap() {
	
	this.mapID = false;
	this.materials = new Array();
	this.tiles = new Array();
	this.weather_effects = new Array();

	this.getMaterial = function (material_json) {
		var texture = THREE.ImageUtils.loadTexture( "images/textures/" + material_json.texture_image );
		return new THREE.MeshLambertMaterial( { color: 0xffffff, map: texture } );
	}
	
	this.loadMapFromJSON = function (map_json) {
		
		this.mapID = map_json.mapID;
		
		var material;		
		for (var i=0; i<map_json.materials.length; i++) { 
			material = this.getMaterial(map_json.materials[i]);
			this.materials[parseInt(map_json.materials[i].material_id)] = material ;
		}
		
		for (var i=0; i<map_json.tiles.length; i++) { 
			this.tiles[parseInt(map_json.tiles[i].tile_id)] = new dungeonTile(map_json.tiles[i]);
		}
		
		var effect;
		for (var i=0; i<map_json.weather_effects.length; i++) { 
			effect = map_json.weather_effects[i];
			this.weather_effects[parseInt(effect.weather_effect_id)] = new weatherEffect(effect);
		}
	}		
}
