function mapObject(map_object_json) {

	this.mapObjectID = 0;	
	this.objectID = 0;
	this.scale = 1;
	this.position = new mapPosition(0, 0, 0, 0);
	this.positionX = 0;
	this.positionY = 0;
	this.positionZ = 0;
	this.rotationX = 0;
	this.rotationY = 0;
	this.rotationZ = 0;
	
	this.loadFromJSON = function(map_object_json) {
		this.mapObjectID = parseInt(map_object_json.map_object_id);
		this.objectID = parseInt(map_object_json.object_id);
		this.scale = parseInt(map_object_json.scale);
		this.position = new mapPosition(parseInt(map_object_json.steps_south), parseInt(map_object_json.steps_east), parseInt(map_object_json.steps_up), 0);
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
	
	this.updatePosition = function() {
		var meshPosition = this.position.getWebGLPosition();
		this.mesh.position.set( meshPosition.x + parseInt(this.positionX), meshPosition.y + parseInt(this.positionY), meshPosition.z + parseInt(this.positionZ));
		this.mesh.rotation.x = meshPosition.rotationX + parseFloat(this.rotationX);
		this.mesh.rotation.y = meshPosition.rotationY + parseFloat(this.rotationY);
		this.mesh.rotation.z = meshPosition.rotationZ + parseFloat(this.rotationZ);		
	}
	
	this.update = function() {
		this.updatePosition();
		this.scale = parseFloat(this.scale);
		this.mesh.scale.set( this.scale, this.scale, this.scale );
	}
	
	this.addToScene = function (scene, objects, materials) {
		
		var object = objects[parseInt(this.objectID)];
		
		switch (object.objectType) {
		
			case OBJECT_TYPE_MODEL:
			
				var geometry;
				var material;
				
				if (object.model.geometry) {
					geometry = object.model.geometry; 	
				}
								
				if (object.materialID > 0) {
					material = materials[object.materialID];
				} else if (object.model.materials) {
					material = new THREE.MeshFaceMaterial(object.model.materials );
				}
				
				this.mesh = new THREE.Mesh( geometry, material);
				
				this.update();
				this.mesh.receiveShadow = false;
				this.mesh.castShadow = true;
				this.mesh.map_object = this;
				scene.add(this.mesh);
				
				break;
				
			case OBJECT_TYPE_ANIMATED:
			
				var geometry;
				var material;
				
				if (object.model.geometry) {
					geometry = object.model.geometry; 	
				}
								
				if (object.materialID > 0) {
					material = materials[object.materialID];
				} else if (object.model.materials) {
					material = new THREE.MeshLambertMaterial( { color: 0xffaa55, morphTargets: true, vertexColors: THREE.FaceColors } );
				}
				morphColorsToFaceColors( geometry );
				this.mesh = new THREE.MorphAnimMesh( geometry, material );
				//this.mesh.speed = 1550;
				this.mesh.duration = 600;
				//this.mesh.time = 1600 ;
								
				this.update();
				this.mesh.receiveShadow = false;
				this.mesh.castShadow = true;
				this.mesh.map_object = this;
				scene.add(this.mesh);
				
				break;
				
			case OBJECT_TYPE_FIRE:
				break;
		}
		
		
	}

	this.getJSON= function () {
		return JSON.stringify( {map_object_id: this.mapObjectID, scale: this.scale, object_id : this.objectID, steps_south:this.position.stepsSouth, steps_east:this.position.stepsEast, steps_up:this.position.stepsUp, direction:this.direction, position_x: this.positionX,position_y: this.positionY, position_z: this.positionZ, rotation_x: this.rotationX, rotation_y: this.rotationY, rotation_z: this.rotationZ } )
	}
		
}

