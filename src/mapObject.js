function mapObject(map_object_json) {

	this.mapObjectID = 0;	
	
	this.loadFromJSON = function(map_object_json) {
		this.mapObjectID = parseInt(map_object_json.map_object_id);
		this.objectID = parseInt(map_object_json.object_id);
		this.materialID = parseInt(map_object_json.material_id);		
		this.scale = parseInt(map_object_json.scale);
		this.objectType = parseInt(map_object_json.object_type);
		this.position = new mapPosition(parseInt(map_object_json.steps_south), parseInt(map_object_json.steps_east), parseInt(map_object_json.steps_up), DIRECTION_NORTH);
		this.positionX = parseInt(map_object_json.position_x);
		this.positionY = parseInt(map_object_json.position_y);
		this.positionZ = parseInt(map_object_json.position_z);
		this.rotationX = parseFloat(map_object_json.rotation_x);
		this.rotationY = parseFloat(map_object_json.rotation_y);
		this.rotationZ = parseFloat(map_object_json.rotation_z);		
	}
	
	if (map_object_json) {
		this.loadFromJSON(map_object_json);
	}
	
	this.addToScene = function (scene, models, materials) {
		
		switch (this.objectType) {
		
			case OBJECT_TYPE_MODEL:
			
				var model;
				var geometry;
				var material;
				
				if (models[this.objectID]) {
					model = models[this.objectID];
					if (model.geometry) {
						geometry = model.geometry; 	
					}
					
					if (model.materials) {
						material = new THREE.MeshFaceMaterial( model.materials );
					}
				}
								
				if (this.materialID > 0) {
					material = materials[this.materialID];
				}
				
				this.mesh = new THREE.Mesh( geometry, material);
				var meshPosition = this.position.getWebGLPosition();
				this.mesh.position.set( meshPosition.x + this.positionX, meshPosition.y + this.positionY, meshPosition.z + this.positionZ);
				this.mesh.rotation.x = meshPosition.rotationX + this.rotationX;
				this.mesh.rotation.y = meshPosition.rotationY + this.rotationY;
				this.mesh.rotation.z = meshPosition.rotationY + this.rotationZ;
				this.mesh.scale.set( this.scale, this.scale, this.scale );
				this.mesh.receiveShadow = true;
				this.mesh.castShadow = true;
				this.mesh.tile = this;
				scene.add(this.mesh);
				
				break;
			case OBJECT_TYPE_FIRE:
				break;
		}
		
		
	}
	
	this.getJSON = function () {
		return JSON.stringify( {tileID: this.tileID, stepsSouth:this.stepsSouth, stepsEast:this.stepsEast, stepsUp:this.stepsUp, direction:this.direction, tileType:this.tileType, materialID:this.materialID } )
	}
		
}