function ghobokWater( params ) {
	this.startX = _coalesce( params.startX, 0 );
	this.startY = _coalesce( params.startY, 0 );
	this.startZ = _coalesce( params.startZ, 0 );
	this.tilesX = _coalesce( params.tilesX, 10 );
	this.tilesZ = _coalesce( params.tilesZ, 10 );
	this.scale = _coalesce( params.scale, 1000 );
	this.color = _coalesce( params.color, 0x333366 );
	this.wrapper = new THREE.Object3D();
	this.wrapper.position.set( this.startX, this.startY, this.startZ );
	var noiseTexture = params.noiseTexture;
	noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping; 
	
	// MIRORR plane
	this.verticalMirror = new THREE.FlatMirror(renderer, camera, {
		clipBias: 0.003, 
		textureWidth: 800, textureHeight: 600, 
		color:this.color, 
		baseTexture:params.mirrorTexture,
		baseSpeed: 1.15,
		noiseTexture: noiseTexture,
		noiseScale: 0.2,
		alpha: 	0.2,
		time: 	0.0,
	});
	
    var geometry = new THREE.PlaneGeometry(this.scale, this.scale, 100, 100);
	var mesh = new THREE.Mesh( geometry, this.verticalMirror.material );
	mesh.add( this.verticalMirror );
	mesh.rotation.x = Math.PI/2;
	this.verticalMirror.material.side = THREE.DoubleSide;
	var v2;	
	
	for ( var xi = 0; xi < this.tilesX; xi++ ) {
		for ( var zi = 0; zi < this.tilesZ; zi++ ) {
			v2 = mesh.clone();
			v2.position.set( this.scale + xi * this.scale, 0, this.scale + zi * this.scale );
			this.wrapper.add( v2 );
		}
	}	
	
}


ghobokWater.prototype.animationFrame = function( delta ) {
	this.verticalMirror.render();
	this.verticalMirror.material.uniforms.time.value += delta;
}