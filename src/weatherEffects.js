function weatherEffect(effect_json) {
	
	this.weatherEffectID = effect_json.weather_effect_id;
	
	this.effectType = effect_json.effect_type;
	
	this.stepsEast = parseInt(effect_json.steps_east);
	this.stepsSouth = parseInt(effect_json.steps_south);
	this.stepsUp = parseInt(effect_json.steps_up);
	
	this.sizeEast = parseInt(effect_json.size_east);
	this.sizeSouth = parseInt(effect_json.size_south);
	this.sizeUp = parseInt(effect_json.size_up);
	
	this.intensity = parseInt(effect_json.intensity);
	this.visibility = parseInt(effect_json.visibility);
	
	this.addToScene = function (scene) {
		this.engine = new ParticleEngine();
		this.engine.loadPreset( this.effectType );
		var posX = ((this.stepsEast+(this.sizeEast/2)) * TILE_SIZE) - TILE_SIZE_HALF;
		var posZ = ((this.stepsSouth-1) + (this.sizeSouth/2)) * TILE_SIZE;
		var posY = ((this.stepsUp+this.sizeUp) * TILE_SIZE) - TILE_SIZE_HALF;
		this.engine.positionBase = new THREE.Vector3( posX, posY, posZ );
		this.engine.positionSpread = new THREE.Vector3( this.sizeEast * TILE_SIZE, 0, this.sizeSouth * TILE_SIZE );
		this.engine.particlesPerSecond = this.intensity * 100;
		this.engine.initialize(scene);		
	}
	
	this.animationFrame = function (delta) {
		if (this.engine) {			
			this.engine.update( delta * 0.5 );	
		}
	}
	
}