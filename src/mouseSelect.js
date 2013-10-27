function mouseSelect()
{
	this.x = 0;
	this.y = 0;
	this.projector = new THREE.Projector();
	this.intersected = null;

	
	this.getCustomMaterial = function (position) {
		var material = new THREE.ShaderMaterial( 
						{
							uniforms: 
							{ 
								"c":   { type: "f", value: 1.0 },
								"p":   { type: "f", value: 1.4 },
								glowColor: { type: "c", value: new THREE.Color(0xff0000) },
								viewVector: { type: "v3", value: position }
							},
							vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
							fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
							side: THREE.DoubleSide,
							blending: THREE.AdditiveBlending,
							transparent: true
						}   );
		return material;
	}
						
	this.animationFrame = function (camera, scene) {

		if (editor.tileDeleteEnabled || editor.tileEditEnabled) {
			var vector = new THREE.Vector3( this.x, this.y, 1 );
			this.projector.unprojectVector( vector, camera );
			var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

			var intersects = ray.intersectObjects( scene.children );
			
			if ( intersects.length > 0 )
			{

				if ( ( intersects[ 0 ] != this.intersected ) && ( intersects[ 0 ].object != this.moonGlow ) )
				{

					if ( this.intersected ) dr.scene.remove(this.moonGlow);
					
					this.intersected = intersects[ 0 ];
					
					if (this.intersected && this.intersected.object.tile) {
			
						if (this.intersected.object.geometry) {
							var customMaterial = this.getCustomMaterial(camera.position);
							var cubeGeometry = new THREE.CubeGeometry( TILE_SIZE, TILE_SIZE, 10 );
							this.moonGlow = new THREE.Mesh( cubeGeometry, customMaterial );
							this.moonGlow.position.x = this.intersected.object.position.x;
							this.moonGlow.position.y = this.intersected.object.position.y ;
							this.moonGlow.position.z = this.intersected.object.position.z;
							this.moonGlow.rotation.x = this.intersected.object.rotation.x;
							this.moonGlow.rotation.y = this.intersected.object.rotation.y;
							this.moonGlow.rotation.z = this.intersected.object.rotation.z;
							this.moonGlow.scale = this.intersected.object.scale;
							dr.scene.add( this.moonGlow );
						}
					}
				}
			} 
			else // there are no intersections
			{
				this.clearSelection()
			}
		} else {
			if (this.intersected) {
				this.clearSelection()
			}
		}
	}

	this.clearSelection = function() {
		this.intersected = null;
		dr.scene.remove(this.moonGlow);
	}
	
	this.mouseDown = function () {	
		
		if ((editor.tileDeleteEnabled || editor.tileEditEnabled) && (this.intersected))
		{
			if (this.intersected.object.tile) {
				editor.deleteTile(this.intersected.object.tile);
				this.clearSelection()
			}			
		}
		
	}
	
}


