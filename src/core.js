/* GLOBALS */
var map;
var dr;
var party;
var hud;
var mouse;
var editor;

/* CORE FUNCTIONS */
function animationFrame() {
	requestAnimationFrame(animationFrame);
	dr.animationFrame();
	mouse.animationFrame(dr.camera, dr.scene);
};
				
function startLoadingMap (mapID) {
	$.getJSON( 'ghobok.php', {method: "load_map",map_id: mapID }).done(function( map_json ) { finishLoadingMap(map_json); });
}
	
function finishLoadingMap(map_json) {
	map.loadMapFromJSON(map_json);
	dr.renderDungeon();
	var loader = new THREE.JSONLoader();	
	loader.load( "models/horse.js", function( geometry ) {
		dr.addMorph( geometry, 550, 500, -230, -250, 1000);
	} );
	
	var loader3 = new THREE.JSONLoader();	
	loader3.load( "models/woman.js?v=5", function( geometry, materials ) {
		
		var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ));

		mesh.position.set( 500, -250, 500 );
		mesh.rotation.y = DOUBLE_RIGHT_ANGLE;

		mesh.scale.set( 15, 15, 15 );
		
		dr.scene.add( mesh );
	} );
	
	var loader2 = new THREE.JSONLoader();	
	loader2.load( "models/gator.js?v=2", function( geometry, materials ) { dr.animated.addModelToScene(geometry, materials) });
	
	animationFrame();
}

function OnDocumentMouseMove(event) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function OnDocumentMouseDown( event ) {
	mouse.mouseDown();
}

function OnWindowResize() {
	dr.WindowResize();
}

function OnKeyPress(e) {
	var key = e.keyCode ? e.keyCode : e.charCode;
	processKeyPress(key);
	return false;
}
		
/* INIT */	
$( function () {

	var $container = $('#container');
	
	dr = new dungeonRenderer($container);
	mouse = new mouseSelect();
	map = new dungeonMap();
	party = new adventurersParty(0, 0, 0, DIRECTION_SOUTH);
	hud = new ghobokHUD('#hud');
	editor = new mapEditor();

	window.addEventListener('resize', OnWindowResize, false);
	document.addEventListener( 'keypress', OnKeyPress, false );
	$container.bind( 'mousemove', OnDocumentMouseMove );
	$container.bind( 'mousedown', OnDocumentMouseDown );
		
	startLoadingMap(1);	
			
});




				