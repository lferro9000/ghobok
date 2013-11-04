function dungeonRenderer($container) {

	this.NEAR = 1;
	this.FAR = 50000;
	
	this.clock = new THREE.Clock();
	
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.shadowMapEnabled = true;
	this.renderer.shadowMapSoft = true;
	
	this.renderer.setSize(this.WIDTH, this.HEIGHT);
	$container.append(this.renderer.domElement);
	
	this.scene = new THREE.Scene();
	
	this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, this.ASPECT, this.NEAR, this.FAR );
	this.camera.position.x = 0;
	this.camera.position.y = 0;
	this.camera.position.z = 500;
	this.camera.rotation.y = - DOUBLE_RIGHT_ANGLE;		
	this.scene.add(this.camera);	
	
	this.tileGeometry = new THREE.PlaneGeometry( TILE_SIZE, TILE_SIZE );

	this.getMaterial = function (material) {
		var texture = THREE.ImageUtils.loadTexture( "images/textures/" + material.texture_image );
		return new THREE.MeshLambertMaterial( { color: 0xffffff, map: texture } );
	}
	
	this.getTileMesh = function (material) {
		return new THREE.Mesh( this.tileGeometry, material );
	}
	
	this.renderTile = function (tile) {
		var mesh = this.getTileMesh(map.materials[tile.materialID]);
		var meshPosition = new tileMeshPosition(tile);
		mesh.position.set( meshPosition.positionX, meshPosition.positionY, meshPosition.positionZ);
		mesh.rotation.x = meshPosition.rotationX;
		mesh.rotation.y = meshPosition.rotationY;
		
		//mesh.material.side = THREE.DoubleSide;
		if (tile.tileType == TILE_TYPE_FLOOR) {
			//mesh.receiveShadow = true;
		} else {
			mesh.castShadow = true;
		}
		
		mesh.tile = tile;
		tile.mesh = mesh;
		this.scene.add(mesh);
	}
	
	this.renderDungeon = function () {
				
		var imagePrefix = "images/sky/dawnmountain-";
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
		this.sun = new THREE.PointLight( 0xffffff, 1, 55500 );
		this.sun.position.set(-20000, 25000, -20000);
		//this.sun.castShadow = true;
		this.scene.add(this.sun);
		
		this.sun2 = new THREE.PointLight( 0xffffff, 1 , 55000);
		this.sun2.position.set(20000, 25000, 20000);
		this.scene.add(this.sun2);
		
		for(tileID in map.tiles) 
		{ 
			this.renderTile(map.tiles[tileID]);
		}
		
		for(weather_effect_id in map.weather_effects) 
		{ 
			map.weather_effects[weather_effect_id].addToScene(this.scene);
		}
		
		this.createHUDSprites();
		hud.render(this.scene);
		this.animated = new animatedObject();
		
		this.syncWithPartyPosition(party);
	}
	
	this.addMorph = function ( geometry, speed, duration, x, y, z ) {

		var material2 = map.materials[1];
		
		var meshAnim = new THREE.MorphAnimMesh( geometry, material2 );

		meshAnim.speed = speed;
		meshAnim.duration = duration;
		meshAnim.time = 600 * Math.random();

		meshAnim.position.set( x, y, z );
		meshAnim.rotation.y = DOUBLE_RIGHT_ANGLE;

		meshAnim.castShadow = true;
		meshAnim.receiveShadow = true;

		meshAnim.scale.set( 1, 2, 2 );
		
		this.scene.add( meshAnim );
	}
			
	this.syncWithPartyPosition = function () {
		this.camera.position.x = (party.position.stepsWest * TILE_SIZE);
		this.camera.position.y = (party.position.stepsUp * TILE_SIZE) - 150;
		this.camera.position.z = (party.position.stepsSouth * TILE_SIZE) - TILE_SIZE_HALF;
		this.camera.rotation.y = party.position.getDirectionInRads();
		this.partyLight.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
	}
	
	this.animationFrame = function () {
		this.animated.animate();
		
		for(weather_effect_id in map.weather_effects) 
		{ 
			map.weather_effects[weather_effect_id].animationFrame(this.clock);
		}
		
		this.renderer.render( this.scene, this.camera );
	}
	
	/* HUD */
	this.mapA = THREE.ImageUtils.loadTexture( "images/sprite0.png", undefined/* function() { this.createHUDSprites() }*/ );
		
	this.createHUDSprites = function() {
		var scaleX = this.mapA.image.width;
		var scaleY = this.mapA.image.height;

		var materialA1 = new THREE.SpriteMaterial( { map: this.mapA, alignment: THREE.SpriteAlignment.topLeft, opacity: 0.25 } );

		var sprite = new THREE.Sprite( materialA1 );
		sprite.position.set( 20, 20, 0 );
		sprite.scale.set( scaleX, scaleY, 1 );
		this.scene.add( sprite );

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