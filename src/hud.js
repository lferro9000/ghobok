function ghobokHUD(container) {
	this.container = $(container);

	this.refresh = function () {
		var html = "<p class=\"hud-text\">";
		html += "Up: <b>" + party.position.stepsUp + "</b><br/>";
		html += "South: <b>" + party.position.stepsSouth + "</b><br/>";
		html += "East: <b>" + party.position.stepsEast + "</b><br/>";
		html += "Direction: <b>" + this.getDirectionName(party.position.direction) + "</b><br/>";
		html += "</p>";
		this.container.html( html );
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

	this.windowResized = function() {
		this.WIDTH = this.container.width();
		this.HEIGHT = $( window ).height();
		
		this.woman.position.set( 500, (this.HEIGHT - 130), 0 );			
		this.man.position.set( 800, (this.HEIGHT - 130), 0 );		
		this.info.position.set( 20, 20, 0 );				
	}
	
	this.addToScene = function (scene) {
		
		var mapA = THREE.ImageUtils.loadTexture( "images/characters/gibri-woman.png");
		
		var materialA = new THREE.SpriteMaterial( { map: mapA, alignment: THREE.SpriteAlignment.topLeft, opacity: 1 } );
		this.woman = new THREE.Sprite( materialA );	
		this.woman.scale.set( 100, 130, 1 );		
		scene.add( this.woman );
		
		mapA = THREE.ImageUtils.loadTexture( "images/characters/gibri-man.png");
		materialA = new THREE.SpriteMaterial( { map: mapA, alignment: THREE.SpriteAlignment.topLeft, opacity: 1 } );
		this.man = new THREE.Sprite( materialA );
		this.man.scale.set( 100, 130, 1 );		
		scene.add( this.man );
		
		mapA = THREE.ImageUtils.loadTexture( "images/sprite0.png");
		var materialA = new THREE.SpriteMaterial( { map: mapA, alignment: THREE.SpriteAlignment.topLeft, opacity: 0.25 } );
		this.info = new THREE.Sprite( materialA );	
		this.info.scale.set( 150, 150, 1 );		
		scene.add( this.info );

		this.windowResized();
	}
	
	this.refresh();
}