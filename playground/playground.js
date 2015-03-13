var MAX_ANISOTROPY;
var WIDTH, HEIGHT, ASPECT, DELTA;
var renderer, scene, camera, clock, light;

var hud;
        
function animationFrame() {	
    requestAnimationFrame(animationFrame);	
    DELTA = clock.getDelta();	
   // renderer.clearDepth();
    renderer.render( scene, camera );	
    
    
    renderer.render( hud.scene, hud.camera );
};
	
function OnWindowResize() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight - 5;
    ASPECT = WIDTH / HEIGHT;
    renderer.setSize( WIDTH, HEIGHT );
    light.position.set(WIDTH / 2, HEIGHT / 2, 60);
    camera.aspect = ASPECT;   
    camera.updateProjectionMatrix();
    
    hud.OnWindowResize( WIDTH, HEIGHT );
}

function OnMouseMove( event ) {
    mouseX = event.clientX;
    mouseY = event.clientY;    
    hud.OnMouseMove( mouseX, mouseY );
}

function OnMouseDown( event ) {
    mouseX = event.clientX;
    mouseY = event.clientY;    
    hud.OnMouseDown( mouseX, mouseY );
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
	renderer = new THREE.WebGLRenderer({alpha:true});   
        renderer.setClearColor(0xFF0000, 0);
        renderer.autoClear = false;
	MAX_ANISOTROPY = renderer.getMaxAnisotropy();
	$container.append(renderer.domElement);
	
	window.addEventListener('resize', OnWindowResize, false);
	document.addEventListener( 'keypress', OnKeyPress, false );
        $container.bind( 'mousemove', OnMouseMove );
        $container.bind( 'mousedown', OnMouseDown );
        
        hud = new ghobokHUD();
        
	scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 40, 1, 1, -100, 10000 );
	camera.position.set( 0, 0, 100 );
        camera.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(camera);
	
	light = new THREE.PointLight(0xFFFFFF);
	scene.add(light);

	var loader = new THREE.JSONLoader();
	loader.load('../models/items/flint.js', function(geometry, materials) {
		flint = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
		flint.scale.set(10,10,10);
		flint.position.set(0,0,50);
		scene.add( flint );
		hud.scene.add( flint );
		hud.activeItem = flint;
	});               
	
	var loader2 = new THREE.JSONLoader();
	loader2.load('../models/items/spear.js', function(geometry, materials) {
		spear = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
		spear.scale.set(10,10,10);
		spear.position.set(0,0,50);
		scene.add( spear );
		hud.scene.add( spear );
		hud.activeItem = spear;
	});      
	
	var material = new THREE.MeshLambertMaterial({color:0xffffff});        
	var ball = new THREE.SphereGeometry(5);
	
	for (var x = -10, maxX = 10; x <= maxX; x++) {
		for (var y = -10, maxY = 10; y <= maxY; y++) {
			mesh = new THREE.Mesh(ball, material);
			mesh.position.set(x * 10, y * 10, x+y+25);            
			scene.add(mesh);
		}
	}
        
	OnWindowResize();
	clock = new THREE.Clock(true);
	animationFrame();
		
});




				