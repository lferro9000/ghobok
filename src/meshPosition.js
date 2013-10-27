function tileMeshPosition(tile) {

	if (tile.tileType == TILE_TYPE_FLOOR) {
		this.positionX = tile.stepsWest * TILE_SIZE;
		this.positionY = - TILE_SIZE_HALF;
		this.positionZ = (tile.stepsSouth * TILE_SIZE) - TILE_SIZE_HALF;		
		this.rotationX = - RIGHT_ANGLE;
		this.rotationY = 0;
		this.rotationZ = 0;
	} else if (tile.tileType == TILE_TYPE_CEILING) {
		this.positionX = tile.stepsWest * TILE_SIZE;
		this.positionY = TILE_SIZE_HALF;
		this.positionZ = (tile.stepsSouth * TILE_SIZE) - TILE_SIZE_HALF;		
		this.rotationX = RIGHT_ANGLE;
		this.rotationY = 0;
		this.rotationZ = 0;
	} else {
	
		switch(tile.direction) {
			case DIRECTION_NORTH:
				this.positionX = tile.stepsWest * TILE_SIZE;
				this.positionY = 0;
				this.positionZ = ((tile.stepsSouth-1) * TILE_SIZE);
				this.rotationX = 0;
				this.rotationY = DIRECTION_NORTH_RADS;	
				this.rotationZ = 0;
			break;
			case DIRECTION_EAST:
				this.positionX = (tile.stepsWest * TILE_SIZE) - TILE_SIZE_HALF;
				this.positionY = 0;
				this.positionZ = (tile.stepsSouth * TILE_SIZE) - TILE_SIZE_HALF;
				this.rotationX = 0;
				this.rotationY = DIRECTION_EAST_RADS;	
				this.rotationZ = 0;
			break;
			case DIRECTION_SOUTH:
				this.positionX = tile.stepsWest * TILE_SIZE;
				this.positionY = 0;
				this.positionZ = (tile.stepsSouth * TILE_SIZE);
				this.rotationX = 0;
				this.rotationY = DIRECTION_SOUTH_RADS;
 				this.rotationZ = 0;
			break;
			case DIRECTION_WEST:
				this.positionX = (tile.stepsWest * TILE_SIZE) + TILE_SIZE_HALF;
				this.positionY = 0;
				this.positionZ = (tile.stepsSouth * TILE_SIZE) - TILE_SIZE_HALF
				this.rotationX = 0;
				this.rotationY = DIRECTION_WEST_RADS;
				this.rotationZ = 0;
			break;	
		}
		
	}	
	
}