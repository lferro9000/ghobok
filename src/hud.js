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
}