function particlesRenderer(particle_json) {
	
	this.particleMaterial = new THREE.ParticleBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/particles/' + particle_json.particle_image) } );
	this.particles = []; 
		
	this.render = function (scene) {
		this.geometry = new THREE.Geometry();

		sprite1 = THREE.ImageUtils.loadTexture( "images/particles/snowflake1.png" );
		sprite2 = THREE.ImageUtils.loadTexture( "images/particles/snowflake2.png" );
		sprite3 = THREE.ImageUtils.loadTexture( "images/particles/snowflake3.png" );
		sprite4 = THREE.ImageUtils.loadTexture( "images/particles/snowflake4.png" );
		sprite5 = THREE.ImageUtils.loadTexture( "images/particles/snowflake5.png" );

		for ( i = 0; i < 10000; i ++ ) {

			var vertex = new THREE.Vector3();
			vertex.x = Math.random() * 2000 - 1000;
			vertex.y = Math.random() * -2000;
			vertex.z = Math.random() * 2000 - 1000;

			this.geometry.vertices.push( vertex );

		}

		parameters = [ [ [1.0, 0.2, 0.5], sprite2, 20 ],
					   [ [0.95, 0.1, 0.5], sprite3, 15 ],
					   [ [0.90, 0.05, 0.5], sprite1, 10 ],
					   [ [0.85, 0, 0.5], sprite5, 8 ],
					   [ [0.80, 0, 0.5], sprite4, 5 ],
					   ];

		var particle, color, sprite, size, material;
		
		for ( i = 0; i < parameters.length; i ++ ) {

			color  = parameters[i][0];
			sprite = parameters[i][1];
			size   = parameters[i][2];

			material = new THREE.ParticleSystemMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent : true } );
			material.color.setHSL( color[0], color[1], color[2] );

			particle = new THREE.ParticleSystem( this.geometry, material);

			particle.rotation.x = Math.random() * 6;
			particle.rotation.y = Math.random() * 6;
			particle.rotation.z = Math.random() * 6;

			particle.position.x = - 5500;
			
			scene.add( particle );
			this.particles.push( particle );

		}
	}
	
	this.animate = function() {

		var time = Date.now() * 0.00005;
		
		for ( i = 0; i < this.particles.length; i ++ ) {
			this.particles[i].rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
		}

	}
	
}