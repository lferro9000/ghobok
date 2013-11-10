function adventurersParty(stepsSouth, stepsEast, stepsUp, direction) {
	this.position = new mapPosition(stepsSouth, stepsEast, stepsUp, direction);
	this.requestedPosition = this.position.clone();
}