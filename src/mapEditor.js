function mapEditor (enabled) {
	
	this.enabled = enabled;
	this.parameters = false;
	this.gui = false;
	
	this.reset = function () {
		if (this.gui) {
			this.gui.destroy();
			this.gui = false;
		}
		this.gui = new dat.GUI();
	}
	
	this.mainMenu = function () {
		this.parameters = {
			enabled: this.enabled, 
			addMaterial: function() { editor.addMaterial() },
			addTile: function() { editor.addTile() },
		};
		this.reset();
		
		var enableEditorMode = this.gui.add( this.parameters, 'enabled' ).name('EditorMode');
		enableEditorMode.onChange(function(value) { editor.enabled = value; } );
		
		this.gui.add( this.parameters, 'addMaterial' ).name('Add new material');
		this.gui.add( this.parameters, 'addTile' ).name("Add tile");
		
		this.gui.open();
	}
	
	this.addMaterial = function () {
		this.parameters = {
			saveMaterial: function() { editor.saveMaterial() },
		};
		this.reset();
		this.gui.add( this.parameters, 'saveMaterial' ).name('Save');
		this.gui.open();
	}
		
	this.addTile = function () {
		var tile = new dungeonTile();
		this.tileDetail(tile);
	}

	this.tileDetail = function (tile) {
		this.parameters = {
			saveTile: function() { editor.saveTile() },
		};
		this.reset();
		this.gui.add( this.parameters, 'saveTile' ).name('Save');
		this.gui.open();
	}
	
	if (this.enabled) this.mainMenu();
	
}