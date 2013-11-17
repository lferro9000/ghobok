function ghobokObject(object_json) {

	this.objectID = 0;
	
	this.loadFromJSON = function(loader, object_json) {
		this.objectID = parseInt(object_json.object_id);
		this.materialID = parseInt(object_json.material_id);		
		this.defaultScale = parseInt(object_json.default_scale);
		this.objectType = parseInt(object_json.object_type);
		this.defaultPositionX = parseInt(object_json.default_position_x);
		this.defaultPositionY = parseInt(object_json.default_position_y);
		this.defaultPositionZ = parseInt(object_json.default_position_z);
		this.defaultRotationX = parseFloat(object_json.default_rotation_x);
		this.defaultRotationY = parseFloat(object_json.default_rotation_y);
		this.defaultRotationZ = parseFloat(object_json.default_rotation_z);
		
		if (object_json.model_json) {
			this.model = loader.parse(JSON.parse(object_json.model_json));
		}
		
	}
	
	if (object_json) {
		this.loadFromJSON(object_json);
	}
			
}
