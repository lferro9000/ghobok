function mapPosition(stepsSouth, stepsEast, stepsUp, direction) {
	this.stepsSouth = stepsSouth;
	this.stepsEast = stepsEast;
	this.stepsUp = stepsUp;
	this.direction = direction;
	
	this.move = function (direction) {
		switch(direction) {
			case DIRECTION_NORTH:
				this.stepsSouth -= 1;
				break;
			case DIRECTION_WEST:
				this.stepsEast -= 1;
				break;
			case DIRECTION_SOUTH:
				this.stepsSouth += 1;
				break;
			case DIRECTION_EAST:
				this.stepsEast += 1;
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
	
	this.getWebGLPosition = function() {
		var x = (party.position.stepsEast * TILE_SIZE);
		var y = (party.position.stepsUp * TILE_SIZE) - 150;
		var z = (party.position.stepsSouth * TILE_SIZE) - TILE_SIZE_HALF;
		var rotationY = this.getDirectionInRads();
		return new webGLPosition(x, y, z, 0, rotationY, 0);
	}
	
	this.clone = function() {
		return new mapPosition(this.stepsSouth, this.stepsEast, this.stepsUp, this.direction);
	}
	
}

function directionTurn (direction, turn_steps) {

	direction = direction + turn_steps;
	
	if (direction > DIRECTION_EAST) {
		direction = direction % 4;
	} else if (direction < DIRECTION_NORTH) {
		direction = DIRECTION_EAST + 1 + (direction % -4);
	}
	
	return direction;
}

function webGLPosition(x, y, z, rotationX, rotationY, rotationZ) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.rotationX = rotationX;
	this.rotationY = rotationY;
	this.rotationZ = rotationZ;
	
	this.anythingToMove = (!((x + y + z + rotationX + rotationY + rotationZ) == 0));
	
	this.processTransition = function(current, requested, step) {
		if (current > requested) {
			current -= step;
			if (current < requested) {
				current = requested;
			}
		} else if (current < requested) {
			current += step;
			if (current > requested) {
				current = requested;
			}
		}
		return current;
	}
	
	this.processMoveStep = function (requested) {
		this.x = this.processTransition(this.x, requested.x, MOVEMENT_STEP);
		this.y = this.processTransition(this.y, requested.y, MOVEMENT_STEP);
		this.z = this.processTransition(this.z, requested.z, MOVEMENT_STEP);
		this.rotationX = this.processTransition(this.rotationX, requested.rotationX, MOVEMENT_TURN);
		if ((this.rotationY == DIRECTION_SOUTH_RADS) && (requested.rotationY == DIRECTION_EAST_RADS)) {
			this.rotationY = - DIRECTION_SOUTH_RADS;
		} else if ((this.rotationY == DIRECTION_EAST_RADS) && (requested.rotationY == DIRECTION_SOUTH_RADS)) {
			this.rotationY = 3 * RIGHT_ANGLE;
		}
		this.rotationY = this.processTransition(this.rotationY, requested.rotationY, MOVEMENT_TURN);
		this.rotationZ = this.processTransition(this.rotationZ, requested.rotationZ, MOVEMENT_TURN);		
	}
}
