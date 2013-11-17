function ghobokMonster(monster_json) {

	this.monsterID = 0;
	
	this.loadFromJSON = function(loader, monster_json) {
		this.monsterID = parseInt(monster_json.monster_id);
		this.defaultScale = parseInt(monster_json.default_scale);
		this.animationDuration = parseInt(monster_json.animation_duration);
		this.defaultPositionX = parseInt(monster_json.default_position_x);
		this.defaultPositionY = parseInt(monster_json.default_position_y);
		this.defaultPositionZ = parseInt(monster_json.default_position_z);
		this.defaultRotationX = parseFloat(monster_json.default_rotation_x);
		this.defaultRotationY = parseFloat(monster_json.default_rotation_y);
		this.defaultRotationZ = parseFloat(monster_json.default_rotation_z);
		
		if (monster_json.model_json) {
			this.model = loader.parse(JSON.parse(monster_json.model_json));
			//morphColorsToFaceColors( this.model.geometry );
		}
		
	}
	
	if (monster_json) {
		this.loadFromJSON(monster_json);
	}
			
}
