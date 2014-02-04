var MAX_ANISOTROPY;
var WIDTH, HEIGHT, ASPECT, DELTA;
var renderer, scene, camera, controls, clock, stats, light;

var animated = [];

function animationFrame() {	
	stats.begin();	
	requestAnimationFrame(animationFrame);	
	DELTA = clock.getDelta();	
	controls.update(DELTA);	
	for(var i = 0, max = animated.length; i < max; i ++ ) { 
		animated[i].animationFrame( DELTA );
	}	
	renderer.render( scene, camera );	
	stats.end();
};
	
function OnWindowResize() {
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight - 5;
	ASPECT = WIDTH / HEIGHT;
	renderer.setSize( WIDTH, HEIGHT );
	hud.windowResized( WIDTH, HEIGHT )
	camera.aspect = ASPECT;
	camera.updateProjectionMatrix();	
	controls.handleResize();
}

function onDocumentMouseMove( event ) {
/*
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
	*/
}
			
function OnKeyPress(e) {
	var key = e.keyCode ? e.keyCode : e.charCode;
	
	//console.log("key:" + key);
	
	switch ( key ) {

		case 102 /* F */: controls.freeze=!controls.freeze;break;
		case 108 /* L */: light.visible = !light.visible;break;
		case 114 /* R */: multiplayer.resetGame();break;
	}
	
	return false;
}

/* INIT */	
$( function () {

	var $container = $('#container');	
	renderer = new THREE.WebGLRenderer();
	MAX_ANISOTROPY = renderer.getMaxAnisotropy();
	$container.append(renderer.domElement);
	
	window.addEventListener('resize', OnWindowResize, false);
	document.addEventListener( 'keypress', OnKeyPress, false );
	//document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 45, 1, 1, 100000 );
	camera.position.set( 500, 500, 0 );
	scene.add(camera);
	
	light = new THREE.PointLight(0xFFFFFF);
	light.position.set( 0, 1000, 0 );
	scene.add(light);
	
	light = new THREE.AmbientLight(0xf0f0f0);
	scene.add(light);
	
	controls = new THREE.FirstPersonControls( camera, renderer.domElement, new THREE.Vector3(0,0,0) );
	controls.movementSpeed = 3600;
	controls.lookSpeed = 0.45;
	/*
	controls.constrainVertical = true;
	controls.verticalMin = 1.1;
	controls.verticalMax = 2.0;
	*/
	
	hud = new ghobokHUD({});
	
	var kaya = {
			name: "Kaya",
			portrait:"../images/characters/gibri-woman.png",			
		}
	hud.addCharacterSlot( {character:kaya} );
	var balim = {
			name: "Balim",
			portrait:"../images/characters/gibri-man.png",			
		}
	hud.addCharacterSlot( {character:balim} );
	
	var texture = THREE.ImageUtils.loadTexture( "../images/textures/bark2.jpg" );
	var material = new THREE.MeshLambertMaterial( { color: 0xffffff, map: texture, side:THREE.DoubleSide } );		
		
	var tile = new dungeonTile( 
		{ 	tile_id:1,
			steps_south:0,
			steps_east:3,
			steps_up: 1,
			direction: DIRECTION_WEST,
			tile_type: TILE_TYPE_WALL, 
			material_id:0
		}
	);
	
	tile.addToScene(scene, new THREE.PlaneGeometry( TILE_SIZE, TILE_SIZE ), [material] ); 
	
	/* stats */
	stats = new Stats();
	stats.setMode(0); // 0: fps, 1: ms

	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild( stats.domElement );
		
	OnWindowResize();
	clock = new THREE.Clock(true);
	animationFrame();
		
});




				