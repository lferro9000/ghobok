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
	
	var loader2 = new THREE.JSONLoader();	
	loader2.load( "models/gator.js?v=2", function( geometry, materials ) { dr.animated.addModelToScene(geometry, materials) });
	
	animationFrame();
}

function onDocumentMouseMove(event) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onDocumentMouseDown( event ) {
	mouse.mouseDown();
}
	
function keypress(e) {
	var key = e.keyCode ? e.keyCode : e.charCode;
	if (key == 119) {
		party.position.forward();
	} else if (key == 97) {
		party.position.turn(1);
	} else if (key == 115) {
		party.position.backward();
	} else if (key == 100) {
		party.position.turn(-1);
	}
	
	dr.syncWithPartyPosition();
	hud.refresh();
	return false;
}
		
/* INIT */	
$( function () {

	dr = new dungeonRenderer('#container');
	mouse = new mouseSelect();
	map = new dungeonMap();
	party = new adventurersParty(0, 0, 0, DIRECTION_SOUTH);
	hud = new ghobokHUD('#hud');
	editor = new mapEditor();

	document.addEventListener( 'keypress', keypress, false );
	
	var container = document.getElementById('container');
	container.addEventListener( 'mousemove', onDocumentMouseMove, false );
	container.addEventListener( 'mousedown', onDocumentMouseDown, false );
	
	startLoadingMap(1);	
			
});




				