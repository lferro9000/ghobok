function dungeonMap() {
	
	this.mapID = false;
	this.materials = new Array();
	this.tiles = new Array();
	this.particles = new Array();

	this.getMaterial = function (material) {
		var texture = THREE.ImageUtils.loadTexture( "images/textures/" + material.texture_image );
		return new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture } );
	}
	
	this.loadMapFromJSON = function (map_json) {
		
		this.mapID = map_json.mapID;
		
		var material;		
		for (var i=0; i<map_json.materials.length; i++) { 
			material = this.getMaterial(map_json.materials[i]);
			this.materials[parseInt(map_json.materials[i].material_id)] = material ;
		}
		
		var tile;
		for (var i=0; i<map_json.tiles.length; i++) { 
			tile = map_json.tiles[i];
			this.tiles[parseInt(tile.tile_id)] = new dungeonTile(tile.tile_id, tile.steps_south, tile.steps_west, tile.steps_up, tile.direction, tile.tile_type, tile.material_id);
		}
		
		var particle;
		for (var i=0; i<map_json.particles.length; i++) { 
			particle = map_json.particles[i];
			this.particles[parseInt(particle.particle_id)] = new particlesRenderer(particle);
		}
	}		
}

function dungeonTile(tileID, stepsSouth, stepsWest, stepsUp, direction, tileType, materialID) {
	
	this.tileID = parseInt(tileID);
	this.stepsSouth = parseInt(stepsSouth);
	this.stepsWest = parseInt(stepsWest);
	this.stepsUp = parseInt(stepsUp);
	this.direction = parseInt(direction);
	this.tileType = parseInt(tileType);
	this.materialID = parseInt(materialID);
	
	this.getJSON = function () {
		return JSON.stringify( {tileID: this.tileID, stepsSouth:this.stepsSouth, stepsWest:this.stepsWest, stepsUp:this.stepsUp, direction:this.direction, tileType:this.tileType, materialID:this.materialID } )
	}
}


function mapPosition(stepsSouth, stepsWest, stepsUp, direction) {
	this.stepsSouth = stepsSouth;
	this.stepsWest = stepsWest;
	this.stepsUp = stepsUp;
	this.direction = direction;
	
	this.move = function (direction) {
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
	
	this.forward = function () {
		this.move(this.direction);
	}
	
	this.backward = function () {
		this.move(directionTurn(this.direction, TURN_BACK));
	}
	
	this.strideLeft = function () {
		this.move(directionTurn(this.direction, TURN_LEFT));
	}
	
	this.strideRight = function () {
		this.move(directionTurn(this.direction, TURN_RIGHT));
	}
	
	this.turn =	function (step)	{
		this.direction = directionTurn (this.direction, step);
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

function directionTurn (direction, turn_steps) {

	direction = direction + turn_steps;
	
	if (direction > DIRECTION_WEST) {
		direction = direction % 4;
	} else if (direction < DIRECTION_NORTH) {
		direction = DIRECTION_WEST + 1 + (direction % -4);
	}
	
	return direction;
}