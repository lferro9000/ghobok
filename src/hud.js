function ghobokHUD(container) {
	var $container = $(container);
	this.WIDTH = $container.width();
	this.HEIGHT = $( window ).height();

	this.refresh = function () {
		var html = "<p class=\"hud-text\">";
		html += "Up: <b>" + party.position.stepsUp + "</b><br/>";
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

	this.render = function (scene) {
		
		var mapA = THREE.ImageUtils.loadTexture( "images/characters/gibri-woman.png");
		
		var scaleX = mapA.image.width;
		var scaleY = mapA.image.height;

		var materialA1 = new THREE.SpriteMaterial( { map: mapA, alignment: THREE.SpriteAlignment.topLeft, opacity: 1 } );

		var sprite = new THREE.Sprite( materialA1 );
		sprite.position.set( 500, (this.HEIGHT - 206), 0 );
		sprite.scale.set( 168, 206, 1 );
		scene.add( sprite );
		
		var mapB = THREE.ImageUtils.loadTexture( "images/characters/gibri-man.png");
		
		scaleX = mapB.image.width;
		scaleY = mapB.image.height;

		var materialB1 = new THREE.SpriteMaterial( { map: mapB, alignment: THREE.SpriteAlignment.topLeft, opacity: 1 } );

		sprite = new THREE.Sprite( materialB1 );
		sprite.position.set( 800, (this.HEIGHT - 206), 0 );
		sprite.scale.set( 168, 206, 1 );
		scene.add( sprite );
	}
	
	this.refresh();
}