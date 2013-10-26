function mouseSelect()
{
	this.x = 0;
	this.y = 0;
	this.projector = new THREE.Projector();
	this.intersected = null;

	
	this.customMaterial = new THREE.ShaderMaterial( 
						{
							uniforms: 
							{ 
								"c":   { type: "f", value: 1.0 },
								"p":   { type: "f", value: 1.4 },
								glowColor: { type: "c", value: new THREE.Color(0xff0000) },
								viewVector: { type: "v3", value: dr.camera.position }
							},
							vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
							fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
							side: THREE.FrontSide,
							blending: THREE.AdditiveBlending,
							transparent: true
						}   );
						
	this.animationFrame = function (camera, scene) {

		if (editor.enabled) {
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
					
					if (this.intersected) {
			
						if (this.intersected.object.geometry) {
							this.moonGlow = new THREE.Mesh( this.intersected.object.geometry.clone(), this.customMaterial );
							this.moonGlow.position.x = this.intersected.object.position.x;
							this.moonGlow.position.y = this.intersected.object.position.y;
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
				dr.scene.remove(this.moonGlow);
				this.intersected = null;
			}
		} else {
			if (this.intersected) {
				this.intersected = null;
				dr.scene.remove(this.moonGlow);
			}
		}
	}

	this.mouseDown = function () {	

		// the following line would stop any other event handler from firing
		// (such as the mouse's TrackballControls)
		// event.preventDefault();
		
		console.log("Click.");
		
		
		// if there is one (or more) intersections
		if ((editor.enabled) && (this.intersected))
		{
			console.log("Hit @ " + toString( this.intersected.point ) );
			// change the color of the closest face.
			//this.intersected.face.color.setRGB( 1, 0, 0 ); 
			this.intersected.object.geometry.colorsNeedUpdate = true;
			if (this.intersected.object.tile) {
				hud.parameters.stepsSouth = this.intersected.object.tile.stepsSouth;
				hud.parameters.stepsWest = this.intersected.object.tile.stepsWest;
			}
		}

	}
	
}


