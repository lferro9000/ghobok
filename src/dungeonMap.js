function dungeonMap() {
	
	this.mapID = false;
	
	this.materials = new Array();
	this.objects = new Array();
	this.monsters = new Array();
	
	this.tiles = new Array();
	this.map_objects = new Array();
	this.weather_effects = new Array();
	this.animated_objects = [];
	this.map_monsters = new Array();
	
	this.plan = new mapPlan();
	
	this.createMaterial = function (material_json) {
		var texture = THREE.ImageUtils.loadTexture( "images/textures/" + material_json.texture_image );
		return new THREE.MeshLambertMaterial( { color: 0xffffff, map: texture } );
	}
	
	this.loader = new THREE.JSONLoader();
	
	this.loadMapFromJSON = function (map_json) {
		
		this.mapID = map_json.map.map_id;
		this.mapName = map_json.map.map_name;
		this.skyboxImage = map_json.map.skybox;
		
		var material;		
		for (var i=0; i<map_json.materials.length; i++) { 
			material = this.createMaterial(map_json.materials[i]);
			this.materials[map_json.materials[i].material_id] = material;
		}
		
		var object;		
		for (var i=0; i<map_json.objects.length; i++) { 			
			object = new ghobokObject();
			object.loadFromJSON(this.loader, map_json.objects[i]);
			this.objects[object.objectID] = object;
		}
		
		var map_object;		
		for (var i=0; i<map_json.map_objects.length; i++) { 
			map_object = new mapObject(map_json.map_objects[i]);
			this.map_objects[map_object.mapObjectID] = map_object;
			if (this.objects[map_object.objectID].objectType == OBJECT_TYPE_ANIMATED) {
				this.animated_objects.push(map_object);
			}
		}
		
		var monster;		
		for (var i=0; i<map_json.monsters.length; i++) { 			
			monster = new ghobokMonster();
			monster.loadFromJSON(this.loader, map_json.monsters[i]);
			this.monsters[monster.monsterID] = monster;
		}
		
		var map_monster;		
		for (var i=0; i<map_json.map_monsters.length; i++) { 
			map_monster = new mapMonster(this.monsters, map_json.map_monsters[i]);
			this.map_monsters[map_monster.mapMonsterID] = map_monster;
			this.animated_objects.push(map_monster);
		}
		
		var tile;
		for (var i=0; i<map_json.tiles.length; i++) { 
			tile = new dungeonTile(map_json.tiles[i]);
			this.tiles[tile.tileID] = tile;
			this.plan.addTile(tile);			
		}
		
		var effect;
		for (var i=0; i<map_json.weather_effects.length; i++) { 
			effect = new weatherEffect(map_json.weather_effects[i]);
			this.weather_effects[effect.weatherEffectID] = effect;
		}
	}

	this.addSkyBoxToScene = function (scene) {
	
		var imagePrefix = "images/sky/" + this.skyboxImage + "-";
		var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
		var imageSuffix = ".png";
		var skyGeometry = new THREE.CubeGeometry( 55000, 55000, 55000 );	
		var materialArray = [];
		for (var i = 0; i < 6; i++)
			materialArray.push( new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
				side: THREE.BackSide
			}));
		var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
		this.skyBox = new THREE.Mesh( skyGeometry, skyMaterial );

		scene.add( this.skyBox );
	}
	
	this.syncSkyBoxPosition = function (x, y, z) {
		map.skyBox.position.x = x;
		map.skyBox.position.y = y;
		map.skyBox.position.z = z;
	}
}


