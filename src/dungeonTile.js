function dungeonTile(tile_json) {
	
	this.tileID = 0;
	
	this.loadFromJSON = function(tile_json) {
		this.tileID = parseInt(tile_json.tile_id);
		this.stepsSouth = parseInt(tile_json.steps_south);
		this.stepsWest = parseInt(tile_json.steps_west);
		this.stepsUp = parseInt(tile_json.steps_up);
		this.direction = parseInt(tile_json.direction);
		this.tileType = parseInt(tile_json.tile_type);
		this.materialID = parseInt(tile_json.material_id);
	}
	
	if (tile_json) {
		this.loadFromJSON(tile_json);
	}
	
	this.addToScene = function (scene, geometry, materials) {
		this.mesh = new THREE.Mesh( geometry, materials[this.materialID]);
		var meshPosition = new tileMeshPosition(this);
		this.mesh.position.set( meshPosition.positionX, meshPosition.positionY, meshPosition.positionZ);
		this.mesh.rotation.x = meshPosition.rotationX;
		this.mesh.rotation.y = meshPosition.rotationY;

		this.mesh.receiveShadow = true;
		this.mesh.castShadow = true;
		
		//mesh.material.side = THREE.DoubleSide;

		this.mesh.tile = this;
		
		scene.add(this.mesh);
	}
	
	this.getJSON = function () {
		return JSON.stringify( {tileID: this.tileID, stepsSouth:this.stepsSouth, stepsWest:this.stepsWest, stepsUp:this.stepsUp, direction:this.direction, tileType:this.tileType, materialID:this.materialID } )
	}
		
}

/* calculate exact position and rotation of mesh for given tile */ 
function tileMeshPosition(tile) {

	if (tile.tileType == TILE_TYPE_FLOOR) {
		this.positionX = tile.stepsWest * TILE_SIZE;
		this.positionY = (tile.stepsUp * TILE_SIZE) - TILE_SIZE_HALF;
		this.positionZ = (tile.stepsSouth * TILE_SIZE) - TILE_SIZE_HALF;		
		this.rotationX = - RIGHT_ANGLE;
		this.rotationY = 0;
		this.rotationZ = 0;
	} else if (tile.tileType == TILE_TYPE_CEILING) {
		this.positionX = tile.stepsWest * TILE_SIZE;
		this.positionY = (tile.stepsUp * TILE_SIZE) + TILE_SIZE_HALF;
		this.positionZ = (tile.stepsSouth * TILE_SIZE) - TILE_SIZE_HALF;		
		this.rotationX = RIGHT_ANGLE;
		this.rotationY = 0;
		this.rotationZ = 0;
	} else {
	
		switch(tile.direction) {
			case DIRECTION_NORTH:
				this.positionX = tile.stepsWest * TILE_SIZE;
				this.positionY = tile.stepsUp * TILE_SIZE;
				this.positionZ = ((tile.stepsSouth-1) * TILE_SIZE);
				this.rotationX = 0;
				this.rotationY = DIRECTION_NORTH_RADS;	
				this.rotationZ = 0;
			break;
			case DIRECTION_EAST:
				this.positionX = (tile.stepsWest * TILE_SIZE) - TILE_SIZE_HALF;
				this.positionY = tile.stepsUp * TILE_SIZE;
				this.positionZ = (tile.stepsSouth * TILE_SIZE) - TILE_SIZE_HALF;
				this.rotationX = 0;
				this.rotationY = DIRECTION_EAST_RADS;	
				this.rotationZ = 0;
			break;
			case DIRECTION_SOUTH:
				this.positionX = tile.stepsWest * TILE_SIZE;
				this.positionY = tile.stepsUp * TILE_SIZE;
				this.positionZ = (tile.stepsSouth * TILE_SIZE);
				this.rotationX = 0;
				this.rotationY = DIRECTION_SOUTH_RADS;
 				this.rotationZ = 0;
			break;
			case DIRECTION_WEST:
				this.positionX = (tile.stepsWest * TILE_SIZE) + TILE_SIZE_HALF;
				this.positionY = tile.stepsUp * TILE_SIZE;
				this.positionZ = (tile.stepsSouth * TILE_SIZE) - TILE_SIZE_HALF
				this.rotationX = 0;
				this.rotationY = DIRECTION_WEST_RADS;
				this.rotationZ = 0;
			break;	
		}
		
	}	
	
}