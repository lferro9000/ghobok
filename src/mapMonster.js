function mapMonster(monsters, map_monster_json) {

	this.mapMonsterID = 0;	
	this.monsterID = 0;
	this.scale = 1;
	this.position = new mapPosition(0, 0, 0, 0);
	
	this.loadFromJSON = function(monsters, map_monster_json) {
		this.mapMonsterID = parseInt(map_monster_json.map_monster_id);
		this.monster = monsters[parseInt(map_monster_json.monster_id)];
		this.scale = parseFloat(map_monster_json.scale);
		this.position = new mapPosition(parseInt(map_monster_json.steps_south), parseInt(map_monster_json.steps_east), parseInt(map_monster_json.steps_up), parseInt(map_monster_json.direction));
	}
	
	if (monsters && map_monster_json) {
		this.loadFromJSON(monsters, map_monster_json);
	}
	
	this.updatePosition = function() {
		var meshPosition = this.position.getWebGLPosition();
		this.mesh.position.set( meshPosition.x + parseInt(this.monster.defaultPositionX), meshPosition.y + parseInt(this.monster.defaultPositionY), meshPosition.z + parseInt(this.monster.defaultPositionZ));
		this.mesh.rotation.x = meshPosition.rotationX + parseFloat(this.monster.defaultRotationX);
		this.mesh.rotation.y = meshPosition.rotationY + parseFloat(this.monster.defaultRotationY);
		this.mesh.rotation.z = meshPosition.rotationZ + parseFloat(this.monster.defaultRotationZ);		
	}
	
	this.update = function() {
		if (this.mesh) {
			this.updatePosition();
			this.scale = parseFloat(this.scale);
			this.mesh.scale.set( this.scale, this.scale, this.scale );
		}
	}
	
	this.addToScene = function (scene) {
	
		this.mesh = new THREE.MorphAnimMesh( this.monster.model.geometry, new THREE.MeshLambertMaterial( { color: 0xffffff, morphTargets: true, vertexColors: THREE.FaceColors } ) );
		this.mesh.duration = this.monster.animationDuration;
		this.update();
		this.mesh.receiveShadow = false;
		this.mesh.castShadow = true;
		this.mesh.map_monster = this;
		scene.add(this.mesh);

	}

	this.animationFrame = function(delta) {
		if (this.mesh) {
			this.mesh.updateAnimation(delta);
		}
	}
	
	this.getJSON = function () {
		return JSON.stringify( {map_monster_id: this.mapMonsterID, scale: this.scale, monster_id : this.monsterID, steps_south:this.position.stepsSouth, steps_east:this.position.stepsEast, steps_up:this.position.stepsUp, direction:this.position.direction } );
	}
		
}

