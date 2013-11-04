function weatherEffect(effect_json) {
	
	this.effectType = effect_json.effect_type;
	
	this.stepsWest = parseInt(effect_json.steps_west);
	this.stepsSouth = parseInt(effect_json.steps_south);
	this.stepsUp = parseInt(effect_json.steps_up);
	
	this.sizeWest = parseInt(effect_json.size_west);
	this.sizeSouth = parseInt(effect_json.size_south);
	this.sizeUp = parseInt(effect_json.size_up);
	
	this.intensity = parseInt(effect_json.intensity);
	this.visibility = parseInt(effect_json.visibility);
	
	this.addToScene = function (scene) {
		this.engine = new ParticleEngine();
		this.engine.loadPreset( this.effectType );
		var posX = ((this.stepsWest+(this.sizeWest/2)) * TILE_SIZE) - TILE_SIZE_HALF;
		var posZ = ((this.stepsSouth-1) + (this.sizeSouth/2)) * TILE_SIZE;
		var posY = ((this.stepsUp+this.sizeUp) * TILE_SIZE) - TILE_SIZE_HALF;
		this.engine.positionBase = new THREE.Vector3( posX, posY, posZ );
		this.engine.positionSpread = new THREE.Vector3( this.sizeWest * TILE_SIZE, 0, this.sizeSouth * TILE_SIZE );
		this.engine.particlesPerSecond = this.intensity * 100;
		this.engine.initialize(scene);
		
	}
	
	this.animationFrame = function (clock) {

		var dt = clock.getDelta();
		this.engine.update( dt * 0.5 );	

	}
	
}