function ghobokHUD(container) {
	var $container = $(container);
	this.WIDTH = $container.width();
	this.HEIGHT = $( window ).height();

	this.refreshHUB = function (party) {
		var html = "<p class=\"hud-text\">";
		html += "South: <b>" + party.position.stepsSouth + "</b><br/>";
		html += "West: <b>" + party.position.stepsWest + "</b><br/>";
		html += "Direction: <b>" + this.getDirectionName(party.position.direction) + "</b><br/>";
		html += "</p>";
		$container.html( html );
	}
	
	this.getDirectionName = function (direction) {
		switch(direction) {
			case DIRECTION_NORTH:
				return "North";
				break;
			case DIRECTION_EAST:
				return "East";
				break;
			case DIRECTION_SOUTH:
				return "South";
				break;
			case DIRECTION_WEST:
				return "West";
				break;	
		}
	}
	
	this.enableEditorMode = false;
	
	this.parameters = {
		stepsSouth: 0,
		stepsWest: 0,
		enableEditorMode: this.enableEditorMode, 
		c: "Hello, GUI!", // string
		e: "#ff8800", // color (hex)
		f: function() { alert("Hello!") },
		g: function() { alert( parameters.c ) },
		v : 0,    // dummy value, only type is important
		w: "...", // dummy value, only type is important
		x: 0, y: 0, z: 0
	};
		
	this.renderGUI = function () {
	
		this.gui = new dat.GUI();
		
		var enableEditorMode = this.gui.add( this.parameters, 'enableEditorMode' ).name('EditorMode');
		this.gui.add( this.parameters, 'stepsSouth' ).min(-50).max(50).step(1).listen();
		this.gui.add( this.parameters, 'stepsWest' ).min(-50).max(50).step(1).listen();
		this.gui.add( this.parameters, 'c' ).name('String');
		
		enableEditorMode.onChange(function(value) 
		{   hud.enableEditorMode = value;   });
		
		this.gui.addColor( this.parameters, 'e' ).name('Color');
		
		var numberList = [1, 2, 3];
		this.gui.add( this.parameters, 'v', numberList ).name('List');
		
		var stringList = [];
		if (map.materials) {
			if (map.materials.length > 0) stringList = [ map.materials[2].texture_image, map.materials[1].texture_image ];
		}
		this.gui.add( this.parameters, 'w', stringList ).name('Material').listen();
		
		this.gui.add( this.parameters, 'f' ).name('Say "Hello!"');
		this.gui.add( this.parameters, 'g' ).name("Alert Message");
		
		var folder1 = this.gui.addFolder('Coordinates');
		folder1.add( this.parameters, 'x' );
		folder1.add( this.parameters, 'y' );
		folder1.close();
		this.gui.open();
	}
	
	this.renderGUI();
}