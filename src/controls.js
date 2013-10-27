var KEYS = { moveForward: 119, moveBackward: 115, strideLeft: 97, strideRight: 100, turnLeft: 113, turnRight: 101 };

function processKeyPress(key) {

	switch (key) {
		case KEYS.moveForward:
			party.position.forward();
			break;
		case KEYS.turnLeft:
			party.position.turn(TURN_LEFT);
			break;
		case KEYS.moveBackward:
			party.position.backward();
			break;
		case KEYS.turnRight:
			party.position.turn(TURN_RIGHT);
			break;
		case KEYS.strideLeft:
			party.position.strideLeft();
			break;
		case KEYS.strideRight:
			party.position.strideRight();
			break;
	}

	dr.syncWithPartyPosition();
	hud.refresh();
	
}