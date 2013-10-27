function mapEditor () {
	
	this.tileEditEnabled = false;
	this.tileDeleteEnabled = false;
	this.parameters = null;
	this.gui = null;
	
	this.reset = function () {
		this.parameters = null;
		if (this.gui) {
			this.gui.destroy();
			this.gui = false;
		}
		this.gui = new dat.GUI();
	}
	
	this.mainMenu = function () {
		this.reset();
		
		this.parameters = {
			addMaterial: function() { editor.addMaterial() },
			addTiles: function() { editor.addTiles() },
			eraseTiles: function() { editor.eraseTiles() },
		};
		
		this.gui.add( this.parameters, 'addMaterial' ).name('Material manager');
		this.gui.add( this.parameters, 'addMaterial' ).name('Open shader manager');
		this.gui.add( this.parameters, 'addMaterial' ).name('Open model manager');
		this.gui.add( this.parameters, 'addMaterial' ).name('Open object manager');
		
		var folder1 = this.gui.addFolder('Tiles');
		folder1.add( this.parameters, 'addTiles' ).name("Dungeon drawing");
		folder1.add( this.parameters, 'eraseTiles' ).name("Tile eraser");
		folder1.open();
		
		this.gui.open();
	}
	
	this.addMaterial = function () {
		this.reset();
		
		this.parameters = {
			saveMaterial: function() { editor.saveMaterial() },
		};
		
		this.gui.add( this.parameters, 'saveMaterial' ).name('Save');
		this.gui.open();
	}
		
	this.addTiles = function () {
		this.reset();
				
		this.parameters = {
			tileTypeStr: "Floor",
			materialID: 0,
			insertTile: function() { editor.insertTile() },
			cancel: function() { editor.mainMenu() },
		};
		
		this.gui.add( this.parameters, 'tileTypeStr', [ "Floor", "Ceiling", "Wall" ] ).name('Type');
		this.gui.add( this.parameters, 'materialID' ).name('Material');
		this.gui.add( this.parameters, 'insertTile' ).name('Save');
		this.gui.add( this.parameters, 'cancel' ).name('Cancel');
		this.gui.open();
	}
	
	this.insertTile = function () {
		var tile = new dungeonTile(0, party.position.stepsSouth, party.position.stepsWest, party.position.stepsUp, party.position.direction, getTileTypeFromString(this.parameters.tileTypeStr), this.parameters.materialID);
		dr.renderTile(tile);
		$.post("ghobok.php", { method: "save_tile", mapID:map.mapID, tile_json:tile.getJSON() }, function (data) { editorTileSaved(data) } );
	}
	
	this.editTile = function (tile) {
		this.reset();
		
		this.parameters = {
			tile: tile,
			saveTile: function() { editor.saveTile() },
			cancel: function() { editor.mainMenu() },
		};
		
		this.gui.add( this.parameters.tile, 'tileID' ).name('Tile ID');
		this.gui.add( this.parameters.tile, 'stepsSouth' ).name('Steps South');
		this.gui.add( this.parameters.tile, 'stepsWest' ).name('Steps West');
		this.gui.add( this.parameters.tile, 'stepsUp' ).name('Steps Up');
		this.gui.add( this.parameters.tile, 'direction' ).name('Direction');
		this.gui.add( this.parameters.tile, 'type' ).name('Type');
		this.gui.add( this.parameters.tile, 'materialID' ).name('Material');
		this.gui.add( this.parameters, 'saveTile' ).name('Save');
		this.gui.add( this.parameters, 'cancel' ).name('Cancel');
		this.gui.open();
	}
	
	this.saveTile = function () {
		dr.renderTile(this.parameters.tile);
		$.post("ghobok.php", { method: "save_tile", tile_json:this.parameters.tile.getJSON() }, function (data) { console.log("Tile saved:" + data); } );
		this.addTile();
	}
	
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