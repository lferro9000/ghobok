function dungeonRenderer($container) {

	this.NEAR = 1;
	this.FAR = 50000;
	
	this.clock = new THREE.Clock();
	
	this.renderer = new THREE.WebGLRenderer();
	
	// shading
	this.renderer.gammaInput = true;
	this.renderer.gammaOutput = true;
	this.renderer.physicallyBasedShading = true;
	this.renderer.shadowMapCullFace = THREE.CullFaceBack;
	this.renderer.shadowMapEnabled = true;
	//this.renderer.shadowMapSoft = true;
	
	this.renderer.setSize(this.WIDTH, this.HEIGHT);
	$container.append(this.renderer.domElement);
	
	this.scene = new THREE.Scene();
	
	this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, this.ASPECT, this.NEAR, this.FAR );
		
	this.scene.add(this.camera);	
	
	this.tileGeometry = new THREE.PlaneGeometry( TILE_SIZE, TILE_SIZE );

	this.getMaterial = function (material) {
		var texture = THREE.ImageUtils.loadTexture( "images/textures/" + material.texture_image );
		return new THREE.MeshLambertMaterial( { color: 0xffffff, map: texture } );		
	}
	
	this.renderDungeon = function () {
				
		//var imagePrefix = "images/sky/dawnmountain-";
		var imagePrefix = "images/sky/abovesea-";
		var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
		var imageSuffix = ".png";
		var skyGeometry = new THREE.CubeGeometry( 50000, 50000, 50000 );	
		var materialArray = [];
		for (var i = 0; i < 6; i++)
			materialArray.push( new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
				side: THREE.BackSide
			}));
		var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
		var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
		skyBox.position.y = 0;
		this.scene.add( skyBox );
			
		this.partyLight = new THREE.PointLight( 0xa0a0a0, 1, 5000 );
		this.partyLight.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
		this.scene.add(this.partyLight);
		//this.scene.fog = new THREE.Fog( 0x000000, 1500, 3000 ) ;
		
		// SUN
		light = new THREE.SpotLight( 0xffffff, 1, 0, Math.PI, 1 );
		light.position.set( 0, 0, 0 );
		light.target.position.set( 500, 0, 1000 );
		light.castShadow = true;
		light.shadowCameraNear = 700;
		light.shadowCameraFar = this.camera.far;
		light.shadowCameraFov = 50;
		light.shadowBias = 0.0001;
		light.shadowDarkness = 0.5;
		var SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 1024;
		light.shadowMapWidth = SHADOW_MAP_WIDTH;
		light.shadowMapHeight = SHADOW_MAP_HEIGHT;
		this.scene.add( light );
				
		this.sun = new THREE.PointLight( 0xffffff, 1, 55500 );
		this.sun.position.set(-20000, 25000, -20000);
		//this.sun.castShadow = true;
		//this.scene.add(this.sun);
		
		this.sun2 = new THREE.PointLight( 0xffffff, 1 , 55000);
		this.sun2.position.set(20000, 25000, 20000);
		//this.scene.add(this.sun2);
		
		/* TILES */
		for(tileID in map.tiles) { 
			map.tiles[tileID].addToScene(this.scene, this.tileGeometry, map.materials) ;
		}
		
		/* OBJECTS */
		for(mapObjectID in map.map_objects) { 
			map.map_objects[mapObjectID].addToScene(this.scene, map.object_models, map.materials) ;
		}
		
		/* WEATHER EFFECTS */
		for(weather_effect_id in map.weather_effects) { 
			map.weather_effects[weather_effect_id].addToScene(this.scene);
		}
		
		/* HUD */
		hud.addToScene(this.scene);
		
		this.animated = new animatedObject();
		
		/* MOVE CAMERA TO PARTY POSITION */
		this.syncWithPartyPosition(party);
	}
	
	this.syncWithPartyPosition = function () {
		var pos = party.position.getWebGLPosition();
		this.syncWebGLPosition(pos.x, pos.y, pos.z, pos.rotationX, pos.rotationY, pos.rotationZ);
		this.requestedWebGLPosition = pos;
		this.webGLPositionDiff = new webGLPosition(0,0,0,0,0,0,0);
	}
	
	this.syncWebGLPosition = function (x, y, z, rotationX, rotationY, rotationZ) {
		this.camera.position.x = x;
		this.camera.position.y = y;
		this.camera.position.z = z;
		this.camera.rotation.y = rotationY;
		this.partyLight.position.set(x, y, z);
	}
	
	this.startMovingParty = function () {
		this.requestedWebGLPosition = party.position.getWebGLPosition();
		this.webGLPositionDiff = new webGLPosition(this.camera.position.x - this.requestedWebGLPosition.x, this.camera.position.y - this.requestedWebGLPosition.y, this.camera.position.z - this.requestedWebGLPosition.z, 0, this.camera.rotation.y - this.requestedWebGLPosition.rotationY, 0);
	}
	
	this.animationFrame = function () {
		this.animated.animate();
		
		/* animate weather effects */
		for(weather_effect_id in map.weather_effects) { 
			map.weather_effects[weather_effect_id].animationFrame(this.clock);
		}
		
		/* animate party movement */
		if (this.webGLPositionDiff.anythingToMove) {
			var newPosition = new webGLPosition(this.camera.position.x, this.camera.position.y, this.camera.position.z, this.camera.rotation.x, this.camera.rotation.y, this.camera.rotation.z);
			newPosition.processMoveStep(this.requestedWebGLPosition);			
			this.syncWebGLPosition(newPosition.x, newPosition.y, newPosition.z, newPosition.rotationX, newPosition.rotationY, newPosition.rotationZ);
			this.webGLPositionDiff = new webGLPosition(this.camera.position.x - this.requestedWebGLPosition.x, this.camera.position.y - this.requestedWebGLPosition.y, this.camera.position.z - this.requestedWebGLPosition.z, 0, this.camera.rotation.y - this.requestedWebGLPosition.rotationY, 0);
		}
		
		this.renderer.render( this.scene, this.camera );
	}
	
	this.WindowResize = function() {
		this.WIDTH = window.innerWidth;
		this.HEIGHT = window.innerHeight - 5;
		this.ASPECT = this.WIDTH / this.HEIGHT;
		this.renderer.setSize( this.WIDTH, this.HEIGHT );
		this.camera.aspect = this.ASPECT;
		this.camera.updateProjectionMatrix();		
	}
	
	this.WindowResize();
	
}