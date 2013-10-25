function dungeonMap() {
	
	this.materials = new Array();
	this.tiles = [];

	this.getMaterial = function (material) {
		var texture = THREE.ImageUtils.loadTexture( "images/" + material.texture_image );
		return new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture } );
	}
	
	this.loadMapFromJSON = function (map_json) {
		
		var material;		
		for (var i=0; i<map_json.materials.length; i++) { 
			material = this.getMaterial(map_json.materials[i]);
			this.materials[map_json.materials[i].material_id] = material ;
		}
		
		var tile;
		for (var i=0; i<map_json.tiles.length; i++) { 
			tile = map_json.tiles[i];
			this.tiles.push( new dungeonTile(tile.tile_id, tile.steps_south,tile.steps_west,tile.direction,tile.tile_type,tile.material_id) );
		}
	}		
}

/*
	stepsSouth - distance from top edge of map
	stepsWest - distance from left edge of map
	direction - 0 = north, 1 = east, 2 = south, 3 = west
	type - 0 = floor, 1 = ceiling, 2 = wall
	texture - texture identifier
*/
function dungeonTile(tileID, stepsSouth, stepsWest, direction, type, materialID) {
	
	this.tileID = parseInt(tileID);
	this.stepsSouth = parseInt(stepsSouth);
	this.stepsWest = parseInt(stepsWest);
	this.direction = parseInt(direction);
	this.type = parseInt(type);
	this.materialID = parseInt(materialID);
	
	if (this.type == TILE_TYPE_FLOOR) {
		this.positionX = stepsWest * TILE_SIZE;
		this.positionY = - TILE_SIZE_HALF;
		this.positionZ = (stepsSouth * TILE_SIZE) - TILE_SIZE_HALF;		
		this.rotationX = - RIGHT_ANGLE;
		this.rotationY = 0;
		this.rotationZ = 0;
	} else if (this.type == TILE_TYPE_CEILING) {
		this.positionX = stepsWest * TILE_SIZE;
		this.positionY = TILE_SIZE_HALF;
		this.positionZ = (stepsSouth * TILE_SIZE) - TILE_SIZE_HALF;		
		this.rotationX = RIGHT_ANGLE;
		this.rotationY = 0;
		this.rotationZ = 0;
	} else {
	
		switch(this.direction) {
			case DIRECTION_NORTH:
				this.positionX = stepsWest * TILE_SIZE;
				this.positionY = 0;
				this.positionZ = (stepsSouth * TILE_SIZE) - TILE_SIZE;
				this.rotationX = 0;
				this.rotationY = DIRECTION_SOUTH_RADS;	
				this.rotationZ = 0;
			break;
			case DIRECTION_EAST:
				this.positionX = (stepsWest * TILE_SIZE) + TILE_SIZE_HALF;
				this.positionY = 0;
				this.positionZ = (stepsSouth * TILE_SIZE) - TILE_SIZE_HALF;
				this.rotationX = 0;
				this.rotationY = DIRECTION_EAST_RADS;	
				this.rotationZ = 0;
			break;
			case DIRECTION_SOUTH:
				this.positionX = stepsWest * TILE_SIZE;
				this.positionY = 0;
				this.positionZ = (stepsSouth * TILE_SIZE);
				this.rotationX = 0;
				this.rotationY = DIRECTION_NORTH_RADS;
 				this.rotationZ = 0;
			break;
			case DIRECTION_WEST:
				this.positionX = (stepsWest * TILE_SIZE) - TILE_SIZE_HALF;
				this.positionY = 0;
				this.positionZ = (stepsSouth * TILE_SIZE) - TILE_SIZE_HALF
				this.rotationX = 0;
				this.rotationY = DIRECTION_WEST_RADS;
				this.rotationZ = 0;
			break;	
		}		
	}	
}


function mapPosition(stepsSouth, stepsWest, direction) {
	this.stepsSouth = stepsSouth;
	this.stepsWest = stepsWest;
	this.direction = direction;
	
	this.move = function (direction)
	{
		switch(direction) {
			case DIRECTION_NORTH:
				this.stepsSouth -= 1;
				break;
			case DIRECTION_EAST:
				this.stepsWest -= 1;
				break;
			case DIRECTION_SOUTH:
				this.stepsSouth += 1;
				break;
			case DIRECTION_WEST:
				this.stepsWest += 1;
				break;	
		}
	}
	
	this.forward = function ()
	{
		this.move(this.direction);
	}
	
	this.backward = function ()
	{
		this.move(this.reverseDirection(this.direction));
	}
	
	this.reverseDirection = function (direction) {
		switch(direction) {
			case DIRECTION_NORTH:
				return DIRECTION_SOUTH;
				break;
			case DIRECTION_WEST:
				return DIRECTION_EAST;
				break;
			case DIRECTION_SOUTH:
				return DIRECTION_NORTH;
				break;
			case DIRECTION_EAST:
				return DIRECTION_WEST;
				break;
		}
	}
	
	this.turn =	function (step)
	{
		this.direction += step;
		if (this.direction > DIRECTION_WEST) this.direction = DIRECTION_NORTH;
		if (this.direction < DIRECTION_NORTH) this.direction = DIRECTION_WEST;
	}
	
	this.getDirectionInRads = function () {
		switch(this.direction) {
			case DIRECTION_NORTH:
				return DIRECTION_NORTH_RADS;
				break;
			case DIRECTION_WEST:
				return DIRECTION_WEST_RADS;
				break;
			case DIRECTION_SOUTH:
				return DIRECTION_SOUTH_RADS;
				break;
			case DIRECTION_EAST:
				return DIRECTION_EAST_RADS;
				break;
		}
	}
	
}
