function mapEditor () {
	
	this.editorModeEnabled = false;
	this.parameters = null;
	this.gui = false;
	
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
			editorModeEnabled: this.editorModeEnabled, 
			addMaterial: function() { editor.addMaterial() },
			addTiles: function() { editor.addTiles() },
		};
		
		var enableEditorMode = this.gui.add( this.parameters, 'editorModeEnabled' ).name('Editor Mode');
		enableEditorMode.onChange(function(value) { editor.editorModeEnabled = value; } );
		
		this.gui.add( this.parameters, 'addMaterial' ).name('Add new material');
		this.gui.add( this.parameters, 'addTiles' ).name("Add tiles");
		
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
			direction: DIRECTION_NORTH,
			type: TILE_TYPE_FLOOR,
			materialID: 0,
			addTile: function() { editor.addTile() },
			cancel: function() { editor.mainMenu() },
		};
		
		this.gui.add( this.parameters, 'direction' ).name('Direction');
		this.gui.add( this.parameters, 'type' ).name('Type');
		this.gui.add( this.parameters, 'materialID' ).name('Material');
		this.gui.add( this.parameters, 'addTile' ).name('Save');
		this.gui.add( this.parameters, 'cancel' ).name('Cancel');
		this.gui.open();
	}
	
	this.addTile = function () {
		var tile = new dungeonTile(0, party.position.stepsSouth, party.position.stepsWest, party.position.stepsUp, party.position.reverseDirection(), this.parameters.type, this.parameters.materialID);
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
		$.post("ghobok.php", { method: "save_tile", tile_json:this.parameters.tile.getJSON() }, function (data) { editorTileSaved(data) } );
		this.addTile();
	}
	
	this.mainMenu();
	
}

function editorTileSaved(data) {
	console.log("Tile saved. Result:" + data);
}