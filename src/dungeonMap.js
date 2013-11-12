function dungeonMap() {
	
	this.mapID = false;
	this.materials = new Array();
	this.tiles = new Array();
	this.map_objects = new Array();
	this.objects = new Array();
	this.weather_effects = new Array();
	
	this.plan = new mapPlan();
	
	this.createMaterial = function (material_json) {
		var texture = THREE.ImageUtils.loadTexture( "images/textures/" + material_json.texture_image );
		return new THREE.MeshLambertMaterial( { color: 0xffffff, map: texture } );
	}
	
	this.loader = new THREE.JSONLoader();
	
	this.loadMapFromJSON = function (map_json) {
		
		this.mapID = map_json.map_id;
		
		var material;		
		for (var i=0; i<map_json.materials.length; i++) { 
			material = this.createMaterial(map_json.materials[i]);
			this.materials[parseInt(map_json.materials[i].material_id)] = material;
		}
		
		var object;		
		for (var i=0; i<map_json.objects.length; i++) { 			
			object = new ghobokObject();
			object.loadFromJSON(this.loader, map_json.objects[i]);
			this.objects[parseInt(map_json.objects[i].object_id)] = object;
		}
		
		var map_object;		
		for (var i=0; i<map_json.map_objects.length; i++) { 
			map_object = new mapObject(map_json.map_objects[i]);
			this.map_objects[parseInt(map_json.map_objects[i].map_object_id)] = map_object;
		}
		
		var tile;
		for (var i=0; i<map_json.tiles.length; i++) { 
			tile = new dungeonTile(map_json.tiles[i]);
			this.tiles[parseInt(map_json.tiles[i].tile_id)] = tile;
			this.plan.addTile(tile);			
		}
		
		var effect;
		for (var i=0; i<map_json.weather_effects.length; i++) { 
			effect = map_json.weather_effects[i];
			this.weather_effects[parseInt(effect.weather_effect_id)] = new weatherEffect(effect);
		}
	}		
}


