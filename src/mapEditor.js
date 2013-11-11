function mapEditor () {
	
	this.tileDeleteEnabled = false;
	this.skywalker = false;
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
		this.parameters = null;
		if (this.gui) {
			this.gui.destroy();
			this.gui = false;
		}
		this.gui = new dat.GUI();
		
		this.parameters = {
			floatUp: function() { editor.skywalker = true;party.position.stepsUp += 1; dr.syncWithPartyPosition(); hud.refresh(); },
			floatDown: function() { editor.skywalker = true;party.position.stepsUp -= 1; dr.syncWithPartyPosition(); hud.refresh(); }			
		};
		
		var folder0 = this.gui.addFolder('Float');
		folder0.add( this, 'skywalker' ).name("Skywalker").listen();
		folder0.add( this.parameters, 'floatUp' ).name("Up");
		folder0.add( this.parameters, 'floatDown' ).name("Down");
		folder0.open();
		
	}
	
	this.mainMenu = function () {
		this.reset();
		
		this.parameters = {
			materialManager: function() { editor.openMaterialManager() },
			addTiles: function() { editor.addTiles() },
			addObjects: function() { editor.addObjects() },
			eraseTiles: function() { editor.eraseTiles() },
			floatUp: function() { party.position.stepsUp += 1; dr.syncWithPartyPosition(); hud.refresh(); },
			floatDown: function() { party.position.stepsUp -= 1; dr.syncWithPartyPosition(); hud.refresh(); }			
		};
		
		var folder1 = this.gui.addFolder('Tiles');
		folder1.add( this.parameters, 'addTiles' ).name("Dungeon drawing");
		folder1.add( this.parameters, 'eraseTiles' ).name("Tile eraser");
		folder1.open();
		
		var folder2 = this.gui.addFolder('Objects');
		folder2.add( this.parameters, 'addObjects' ).name("Object drawing");
		folder2.open();
		
		this.gui.open();
	}
	
	/* Tile drawing */
	this.addTiles = function () {
		this.reset();
				
		this.parameters = {
			tileTypeStr: this.defaultTileTypeStr,
			selectMaterial: function() { editor.selectMaterial() },
			insertTile: function() { editor.insertTile() },
			cancel: function() { editor.mainMenu() },
		};
		var folder1 = this.gui.addFolder("Dungeon drawing");
		folder1.add( this.parameters, 'tileTypeStr', [ "Floor", "Ceiling", "Wall" ] ).name('Type');
		folder1.add( this, 'defaultMaterialID' ).name('Material').listen();
		folder1.add( this.parameters, 'selectMaterial' ).name('Select material');
		folder1.add( this.parameters, 'insertTile' ).name('Save');
		folder1.add( this.parameters, 'cancel' ).name('Cancel');
		folder1.open();
		
		this.gui.open();
	}
	
	this.insertTile = function () {
		this.defaultTileTypeStr = this.parameters.tileTypeStr;
		var tile = new dungeonTile();
		tile.stepsSouth = party.position.stepsSouth;
		tile.stepsEast = party.position.stepsEast;
		tile.stepsUp = party.position.stepsUp;
		tile.direction = party.position.direction;
		tile.tileType = getTileTypeFromString(this.parameters.tileTypeStr);
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
	this.addObjects = function () {
		this.reset();
				
		this.parameters = {
			object_id: 0,
			x:0,
			selectObject: function() { editor.selectObject() },
			insertObject: function() { editor.insertObject() },
			cancel: function() { editor.mainMenu() },
		};
		var folder1 = this.gui.addFolder("Object drawing");
		folder1.add( this.parameters, 'object_id').name('Object ID').listen();
		folder1.add( this.parameters, 'selectObject' ).name('Select object');
		folder1.add( this.parameters, 'x' ).name('X').listen();
		folder1.add( this.parameters, 'insertObject' ).name('Save');
		folder1.add( this.parameters, 'cancel' ).name('Cancel');
		folder1.open();
		
		this.gui.open();
	}
	
	this.insertObject = function () {
		var tile = new dungeonTile();
		tile.stepsSouth = party.position.stepsSouth;
		tile.stepsEast = party.position.stepsEast;
		tile.stepsUp = party.position.stepsUp;
		tile.direction = party.position.direction;
		tile.tileType = getTileTypeFromString(this.parameters.tileTypeStr);
		tile.materialID = this.defaultMaterialID;
		tile.addToScene(dr.scene, dr.tileGeometry, map.materials);
		$.post("ghobok.php", { method: "save_map_object", map_id:map.mapID, object_json:tile.getJSON() }, function (data) { console.log("Tile inserted:" + data); } );
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
	
	this.selectObject = function() {
		var manager = this.openObjectManager();
		$(manager).load(function() {
			$(".select-button", manager.contents()).each( 
				function(i, e) {
					$(e).click( function () {
						editor.parameters.object_id = $(e).attr('objectID');
						editor.closeObjectManager();
					});
				} 
			);
		});
		
	}
	
	/* ERASER */
	this.eraseTiles = function () {
		this.reset();
		this.tileDeleteEnabled = true;
		
		this.parameters = {
			cancel: function() { 
				editor.tileDeleteEnabled = false;
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