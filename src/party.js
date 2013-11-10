function adventurersParty(stepsSouth, stepsWest, stepsUp, direction) {
	this.position = new mapPosition(stepsSouth, stepsWest, stepsUp, direction);
	this.requestedPosition = this.position.clone();
}