var KEYS = { moveForward: 119, moveBackward: 115, strideLeft: 97, strideRight: 100, turnLeft: 113, turnRight: 101 };

function processKeyPress(key) {

	switch (key) {
		case KEYS.moveForward:
			if (!dr.webGLPositionDiff.anythingToMove) {
				party.position.forward();
			}
			break;
		case KEYS.turnLeft:
			if (!dr.webGLPositionDiff.anythingToMove) {
				party.position.turn(TURN_LEFT);
			}
			break;
		case KEYS.moveBackward:
			if (!dr.webGLPositionDiff.anythingToMove) {
				party.position.backward();
			}
			break;
		case KEYS.turnRight:
			if (!dr.webGLPositionDiff.anythingToMove) {
				party.position.turn(TURN_RIGHT);
			}
			break;
		case KEYS.strideLeft:
			if (!dr.webGLPositionDiff.anythingToMove) {
				party.position.strideLeft();
			}
			break;
		case KEYS.strideRight:
			if (!dr.webGLPositionDiff.anythingToMove) {
				party.position.strideRight();
			}
			break;
	}

	dr.startMovingParty();
	hud.refresh();
	
}