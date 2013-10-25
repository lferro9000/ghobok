function dungeonRenderer(container) {

	var $container = $(container);
	this.WIDTH = window.innerWidth;
	this.HEIGHT = window.innerHeight;
	this.VIEW_ANGLE = 60;
	this.ASPECT = this.WIDTH / this.HEIGHT;
	this.NEAR = 1;
	this.FAR = 50000;
	
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize(this.WIDTH, this.HEIGHT);
	$container.append(this.renderer.domElement);
	
	this.scene = new THREE.Scene();
	
	this.camera = new THREE.PerspectiveCamera( this.VIEW_ANGLE, this.ASPECT, this.NEAR, this.FAR );
	this.camera.position.x = 0;
	this.camera.position.y = 0;
	this.camera.position.z = 500;
	this.camera.rotation.y = -DOUBLE_RIGHT_ANGLE;		
	this.scene.add(this.camera);	
	
	THREEx.WindowResize(this.renderer, this.camera);
	
	this.tileGeometry = new THREE.PlaneGeometry( TILE_SIZE, TILE_SIZE );

	this.getMaterial = function (material) {
		var texture = THREE.ImageUtils.loadTexture( "images/" + material.texture_image );
		return new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture } );
	}
	
	this.getTileMesh = function (material) {
		return new THREE.Mesh( this.tileGeometry, material );
	}
	
	this.renderTile = function (tile, material) {
		var mesh = this.getTileMesh(material);
		mesh.position.set( tile.positionX, tile.positionY, tile.positionZ);
		mesh.rotation.x = tile.rotationX;
		mesh.rotation.y = tile.rotationY;
		mesh.tile = tile;
		this.scene.add(mesh);
	}
	
	this.renderDungeon = function (map, party) {
				
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
			
		this.partyLight = new THREE.PointLight( 0xf0a0a0 );
		this.partyLight.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
		this.scene.add(this.partyLight);		
		//this.scene.fog = new THREE.Fog( 0x000000, 1500, 3000 ) ;
		
		for (var i=0; i<map.tiles.length; i++)
		{ 
			this.renderTile(map.tiles[i], map.materials[map.tiles[i].materialID] );
		}
		
		this.syncWithPartyPosition(party);
		this.createHUDSprites();
		
		var sphereGeom = new THREE.SphereGeometry(100, 32, 16);
    
		/* moon */
		var moonTexture = THREE.ImageUtils.loadTexture( 'images/moon.jpg' );
		var moonMaterial = new THREE.MeshBasicMaterial( { map: moonTexture } );
		var moon = new THREE.Mesh(sphereGeom, moonMaterial);
		moon.position.set(550,150,550);
		this.scene.add(moon);

		// create custom material from the shader code above
		//   that is within specially labeled script tags
		var customMaterial = new THREE.ShaderMaterial( 
		{
			uniforms: 
			{ 
				"c":   { type: "f", value: 1.0 },
				"p":   { type: "f", value: 1.4 },
				glowColor: { type: "c", value: new THREE.Color(0x00a000) },
				viewVector: { type: "v3", value: this.camera.position }
			},
			vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
			fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
			side: THREE.FrontSide,
			blending: THREE.AdditiveBlending,
			transparent: true
		}   );
		
		this.moonGlow = new THREE.Mesh( sphereGeom.clone(), customMaterial.clone() );
		this.moonGlow.position = moon.position;
		this.moonGlow.scale.multiplyScalar(1.2);
		this.scene.add( this.moonGlow );
		
		this.animated = new animatedObject();
		
	}
	
	this.addMorph = function ( geometry, speed, duration, x, y, z ) {

		//var material = new THREE.MeshLambertMaterial( { color: 0xa0a0a0, morphTargets: false, vertexColors: THREE.FaceColors } );

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
			
	this.syncWithPartyPosition = function (party) {
		this.camera.position.x = (party.position.stepsWest * TILE_SIZE);
		this.camera.position.y = -150;
		this.camera.position.z = (party.position.stepsSouth * TILE_SIZE) - TILE_SIZE_HALF;
		this.camera.rotation.y = party.position.getDirectionInRads();
		this.partyLight.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
	}
	
	this.animationFrame = function () {
		this.animated.animate();
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
	
}