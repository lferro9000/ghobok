function animatedObject() {
	this.animOffset = 0;
	this.walking = false;
	this.duration = 2000;
	this.keyframes = 26;
	this.interpolation = this.duration / this.keyframes;
	this.lastKeyframe = 0;
	this.currentKeyframe = 0;
	
	this.android = false;
	
	this.addModelToScene = function ( geometry, materials ) 
	{
		// for preparing animation
		for (var i = 0; i < materials.length; i++)
			materials[i].morphTargets = true;
			
		var material = new THREE.MeshFaceMaterial( materials );
		var android = new THREE.Mesh( geometry, material );
		android.scale.set(2,2,2);
		android.position.set (550,-280,1250);
		android.rotation.y = DIRECTION_SOUTH_RADS;
		dr.scene.add( android );
		this.android = android;
	}

	this.animate = function () {
		if ( this.android ) {
			time = new Date().getTime() % this.duration;
			keyframe = Math.floor( time / this.interpolation ) + this.animOffset;
			if ( keyframe != this.currentKeyframe ) {
				this.android.morphTargetInfluences[ this.lastKeyframe ] = 0;
				this.android.morphTargetInfluences[ this.currentKeyframe ] = 1;
				this.android.morphTargetInfluences[ keyframe ] = 0;
				this.lastKeyframe = this.currentKeyframe;
				this.currentKeyframe = keyframe;
			}
			this.android.morphTargetInfluences[ keyframe ] = ( time % this.interpolation ) / this.interpolation;
			this.android.morphTargetInfluences[ this.lastKeyframe ] = 1 - this.android.morphTargetInfluences[ keyframe ];
		}
	}
		
}