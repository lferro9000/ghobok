function mapEditor () {
	
	this.eraser = false;
	this.skywalker = false;
	this.selecting = false;
	this.parameters = null;
	this.gui = null;
	this.defaultMaterialID = 0;
	this.defaultCategoryID = 0;
	this.defaultTileTypeStr = "Floor";
	this.materialManager = null;
	
	this.defaultObjectID = 0;
	this.defaultObjectCategoryID = 1;
	this.objectManager = null;
	
	this.reset = function () {

		if (this.gui) {
			this.gui.destroy();
			this.gui = false;
		}
		this.gui = new dat.GUI();
		
		this.parameters = {
			floatUp: function() { editor.skywalker = true;party.position.stepsUp += 1; dr.startMovingParty(); hud.refresh(); },
			floatDown: function() { editor.skywalker = true;party.position.stepsUp -= 1; dr.startMovingParty(); hud.refresh(); },
		};
		
		var folder0 = this.gui.addFolder('Float');
		folder0.add( this, 'skywalker' ).name("Skywalker").listen();
		folder0.add( this.parameters, 'floatUp' ).name("Up");
		folder0.add( this.parameters, 'floatDown' ).name("Down");
		folder0.open();
				
	}
	
	this.mainMenu = function () {
		this.reset();
		
		var folder1 = this.gui.addFolder('Dungeon drawing');
		folder1.add( this, 'eraseTiles' ).name("Almighty eraser");
		folder1.add( this, 'addTiles' ).name("Draw tiles");
		folder1.add( this, 'addMapObject' ).name("Add object");
		folder1.add( this, 'selectMapObjects' ).name("Select");		
		folder1.open();
		
		this.gui.open();
	}
	
	/* Tile drawing */
	this.addTiles = function () {
		this.reset();
				
		var folder1 = this.gui.addFolder("Dungeon drawing");
		folder1.add( this, 'defaultTileTypeStr', [ "Floor", "Ceiling", "Wall" ] ).name('Type');
		folder1.add( this, 'defaultMaterialID' ).name('Material').listen();
		folder1.add( this, 'selectMaterial' ).name('Select material');
		folder1.add( this, 'insertTile' ).name('Save');
		folder1.add( this, 'mainMenu' ).name('Cancel');
		folder1.open();
		
		this.gui.open();
	}
	
	this.insertTile = function () {
		var tile = new dungeonTile();
		tile.stepsSouth = party.position.stepsSouth;
		tile.stepsEast = party.position.stepsEast;
		tile.stepsUp = party.position.stepsUp;
		tile.direction = party.position.direction;
		tile.tileType = getTileTypeFromString(this.defaultTileTypeStr);
		tile.materialID = this.defaultMaterialID;
		tile.addToScene(dr.scene, dr.tileGeometry, map.materials);
		$.post("ghobok.php", { method: "save_tile", map_id:map.mapID, tile_json:tile.getJSON() }, function (data) { console.log("Tile inserted:" + data); } );
	}
	
	this.openMaterialManager = function() {
		if (!(this.materialManager)) {
			this.materialManager = $('<iframe id="material-manager" >').appendTo('body');
			return this.materialManager.attr('src', 'ghobok.php?method=material_manager&cat_id=' + this.defaultCategoryID);
		} else {
			return this.materialManager.toggle();		
		}
	}
	
	this.closeMaterialManager = function() {
		if (this.materialManager) {
			this.materialManager.hide();
		}
	}
	
	this.selectMaterial = function() {
		var manager = this.openMaterialManager();
		$(manager).load(function() {
			$(".select-button", manager.contents()).each( 
				function(i, e) {
					$(e).click( function () {
						editor.defaultMaterialID = $(e).attr('materialID');
						editor.closeMaterialManager();
					});
				} 
			);
		});
		
	}
	
	/* MAP OBJECTS */
	this.addMapObject = function () {
		this.reset();
		this.map_object = new mapObject();		
		this.openMapObjectEditor();
	}
	
	this.editMapObject = function (map_object) {
		this.selecting = false;
		this.reset();
		this.map_object = map_object;
		this.openMapObjectEditor();
	}
	
	this.openMapObjectEditor = function() {
	
		var folder1 = this.gui.addFolder("Object drawing");
		folder1.add( this.map_object, 'objectID').name('Object ID').listen();
		folder1.add( this, 'selectObject' ).name('Select object');
		
		folder1.add( this.map_object, 'positionX' ).name('X').min(-500).max(500).step(1).listen().onChange(function(value) { editor.updateEditedMapObject(); });
		folder1.add( this.map_object, 'positionY' ).name('Y').min(-500).max(500).step(1).listen().onChange(function(value) { editor.updateEditedMapObject(); });
		folder1.add( this.map_object, 'positionZ' ).name('Z').min(-500).max(500).step(1).listen().onChange(function(value) { editor.updateEditedMapObject(); });
		folder1.add( this.map_object, 'rotationX' ).name('Rotation X').min(- DOUBLE_RIGHT_ANGLE).max(DOUBLE_RIGHT_ANGLE).step(0.01).listen().onChange(function(value) { editor.updateEditedMapObject(); });
		folder1.add( this.map_object, 'rotationY' ).name('Rotation Y').min(- DOUBLE_RIGHT_ANGLE).max(DOUBLE_RIGHT_ANGLE).step(0.01).listen().onChange(function(value) { editor.updateEditedMapObject(); });
		folder1.add( this.map_object, 'rotationZ' ).name('Rotation Z').min(- DOUBLE_RIGHT_ANGLE).max(DOUBLE_RIGHT_ANGLE).step(0.01).listen().onChange(function(value) { editor.updateEditedMapObject(); });
		folder1.add( this.map_object, 'scale' ).name('Scale').min(0.01).max(15).step(0.01).listen().onChange(function(value) { editor.updateEditedMapObject(); });
		
		folder1.add( this, 'saveMapObject' ).name('Save');
		folder1.add( this, 'mainMenu' ).name('Cancel');
		folder1.open();
		
		this.gui.open();
	}
	
	this.updateEditedMapObject = function() {
		if (this.map_object) {
			if (this.map_object.mesh) {
				this.map_object.update();
			}
		}
	}
	
	this.saveMapObject = function () {
		if (!this.map_object.mesh) {
			this.map_object.addToScene(dr.scene, map.objects, map.materials);
		} else {
			this.map_object.update();
		}
		
		$.post("ghobok.php", { method: "save_map_object", map_id:map.mapID, map_object_json:this.map_object.getJSON() }, function (data) { 
			if (!editor.map_object.mapObjectID) {
				editor.map_object.mapObjectID = parseInt(data);
			}
			console.log("Save map object:" + data); 
		} );
		this.mainMenu();
	}
	
	this.openObjectManager = function() {
		if (!(this.objectManager)) {
			this.objectManager = $('<iframe id="material-manager" >').appendTo('body');
			return this.objectManager.attr('src', 'ghobok.php?method=object_manager&cat_id=' + this.defaultObjectCategoryID);
		} else {
			return this.objectManager.toggle();		
		}
	}
	
	this.closeObjectManager = function() {
		if (this.objectManager) {
			this.objectManager.hide();
		}
	}
	
	this.selectMapObjects = function () {
		this.reset();
		this.selecting = true;
		this.eraser = false;
		
		this.parameters = {
			cancel: function() { 
				editor.selecting = false;
				editor.mainMenu(); 
			},
		};
		
		var folder1 = this.gui.addFolder('Select object to edit');
		this.gui.add( this.parameters, 'cancel' ).name('Cancel');
		folder1.open();

		this.gui.open();
	}
	
	this.selectObject = function() {
		var manager = this.openObjectManager();
		$(manager).load(function() {
			$(".select-button", manager.contents()).each( 
				function(i, e) {
					$(e).click( function () {
						var object_id = $(e).attr('objectID');						
						editor.map_object.objectID = object_id;
						editor.map_object.position = party.position.clone();
						editor.map_object.position.forward();						
						var object_json = JSON.parse($(".object_json",$(e).parent()).html());
						editor.map_object.positionX = object_json.default_position_x;
						editor.map_object.positionY = object_json.default_position_y;
						editor.map_object.positionZ = object_json.default_position_z;
						editor.map_object.rotationX = object_json.default_rotation_x;
						editor.map_object.rotationY = object_json.default_rotation_y;
						editor.map_object.rotationZ = object_json.default_rotation_z;
						editor.map_object.scale = object_json.default_scale;
						editor.map_object.addToScene(dr.scene, map.objects, map.materials);
						editor.closeObjectManager();
					});
				} 
			);
		});
		
	}
	
	/* ERASER */
	this.eraseTiles = function () {
		this.reset();
		this.eraser = true;
		this.selecting = false;
		
		this.parameters = {
			cancel: function() { 
				editor.eraser = false;
				editor.mainMenu(); 
			},
		};
		
		var folder1 = this.gui.addFolder('Erasing tiles');
		this.gui.add( this.parameters, 'cancel' ).name('Cancel');
		folder1.open();

		this.gui.open();
	}
	
	this.deleteTile = function(tile) {
		dr.scene.remove(tile.mesh);
		$.post("ghobok.php", { method: "delete_tile", tile_id:tile.tileID }, function (data) { console.log("Tile deleted:" + data); } );
	}
	
	this.deleteMapObject = function(map_object) {
		dr.scene.remove(map_object.mesh);
		$.post("ghobok.php", { method: "delete_map_object", map_object_id:map_object.mapObjectID }, function (data) { console.log("Map object deleted:" + data); } );
	}
		
	this.mainMenu();
	
}

function getTileTypeFromString(str) {
	switch(str) {
		case "Floor":
			return TILE_TYPE_FLOOR;
		case "Ceiling":
			return TILE_TYPE_CEILING;
		case "Wall":
			return TILE_TYPE_WALL;		
	}
}