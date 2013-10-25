function dungeonRenderer(container) {

	var $container = $(container);
	this.WIDTH = $( window ).width();
	this.HEIGHT = $( window ).height() - 5;
	this.VIEW_ANGLE = 60;
	this.ASPECT = this.WIDTH / this.HEIGHT;
	this.NEAR = 1;
	this.FAR = 25000;
	
	this.renderer = new THREE.WebGLRenderer();
	this.camera = new THREE.PerspectiveCamera( this.VIEW_ANGLE, this.ASPECT, this.NEAR, this.FAR );
	this.scene = new THREE.Scene();

	this.camera.position.x = 0;
	this.camera.position.y = 0;
	this.camera.position.z = 500;

	this.camera.rotation.y = -DOUBLE_RIGHT_ANGLE;
	
	this.scene.add(this.camera);
	this.renderer.setSize(this.WIDTH, this.HEIGHT);
	$container.append(this.renderer.domElement);
	
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
		this.scene.add(mesh);
	}
	
	this.renderDungeon = function (map, party) {
		this.partyLight = new THREE.PointLight( 0xf0a0a0 );
		this.partyLight.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
		this.scene.add(this.partyLight);		
		this.scene.fog = new THREE.Fog( 0x000000, 1500, 3000 ) ;
		
		for (var i=0; i<map.tiles.length; i++)
		{ 
			this.renderTile(map.tiles[i], map.materials[map.tiles[i].materialID] );
		}
		
		this.syncWithPartyPosition(party);
		this.createHUDSprites();
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
	
	this.animationFrame = function (mouseX, mouseY) {
		/*this.camera.position.x += ( mouseX - this.camera.position.x ) * .05;
		this.camera.position.y = THREE.Math.clamp( this.camera.position.y + ( - ( mouseY - 200 ) - this.camera.position.y ) * .05, 50, 1000 );
		this.partyLight.position.x = this.camera.position.x;
		this.partyLight.position.y = this.camera.position.y;
		*/
		this.renderer.render( this.scene, this.camera );
	}
	

		
	/* HUD */
	this.mapA = THREE.ImageUtils.loadTexture( "images/sprite0.png", undefined/* function() { this.createHUDSprites() }*/ );
		
	this.createHUDSprites = function() {
		var scaleX = this.mapA.image.width;
		var scaleY = this.mapA.image.height;

		var materialA1 = new THREE.SpriteMaterial( { map: this.mapA, alignment: THREE.SpriteAlignment.topLeft, opacity: 0.25 } );
		/*var materialA2 = new THREE.SpriteMaterial( { map: mapA, alignment: THREE.SpriteAlignment.topLeft, opacity: 0.5 } );
		var materialA3 = new THREE.SpriteMaterial( { map: mapA, alignment: THREE.SpriteAlignment.topLeft, opacity: 1 } );
*/
		var sprite = new THREE.Sprite( materialA1 );
		sprite.position.set( 20, 20, 0 );
		sprite.scale.set( scaleX, scaleY, 1 );
		this.scene.add( sprite );
/*
		sprite = new THREE.Sprite( materialA2 );
		sprite.position.set( 150, 150, 2 );
		sprite.scale.set( scaleX, scaleY, 1 );
		this.scene.add( sprite );

		sprite = new THREE.Sprite( materialA3 );
		sprite.position.set( 200, 200, 3 );
		sprite.scale.set( scaleX, scaleY, 1 );
		this.scene.add( sprite );
*/
	}
	
}