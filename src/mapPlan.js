function mapPlan() {
	
	this.squares = new Array();
	
	this.addSquare = function(stepsUp, stepsEast, stepsSouth) {
		if (!this.squares[stepsUp]) {
			this.squares[stepsUp] = new Array();
		}	
		
		if (!this.squares[stepsUp][stepsEast]) {
			this.squares[stepsUp][stepsEast] = new Array();
		}
		
		if (!this.squares[stepsUp][stepsEast][stepsSouth]) {
			this.squares[stepsUp][stepsEast][stepsSouth] = new mapSquare();
		}
	}
	
	this.addTile = function(tile) {
		this.addSquare(tile.stepsUp, tile.stepsEast, tile.stepsSouth);
		
		switch(tile.tileType) {
			case TILE_TYPE_FLOOR:
				this.squares[tile.stepsUp][tile.stepsEast][tile.stepsSouth].walkable = true
				this.squares[tile.stepsUp][tile.stepsEast][tile.stepsSouth].floor = tile;
				break;
			case TILE_TYPE_WALL:
				this.squares[tile.stepsUp][tile.stepsEast][tile.stepsSouth].walls[tile.direction] = tile
				break;				
		}			
	}
	
	this.canWalk = function(stepsUp, stepsEast, stepsSouth, direction) {
		if (editor.skywalker) {
			return true;
		} else {		
			if (this.squares[stepsUp][stepsEast][stepsSouth].walls[direction]) {
				return false;
			} else {
				return true;
			}
		}
	}
}

function mapSquare() {
	this.walkable = false;
	this.floor = null;
	this.walls = [null, null, null, null];
}