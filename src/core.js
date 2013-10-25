/* GLOBALS */
var map;
var dr;
var party;
var hud;
var mouse;

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
	dr.renderDungeon(map, party);
	var loader = new THREE.JSONLoader();	
	loader.load( "src/horse.js", function( geometry ) {
		dr.addMorph( geometry, 550, 500, -230, -250, 1000);
	} );
	
	var loader2 = new THREE.JSONLoader();	
	loader2.load( "objects/octo_black.js?v=1", function( geometry, materials ) { dr.animated.addModelToScene(geometry, materials) });
	
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
		dr.syncWithPartyPosition(party);
		hud.refreshHUB(party);
		return false;
	} else if (key == 97) {
		party.position.turn(1);
		dr.syncWithPartyPosition(party);
		hud.refreshHUB(party);
		return false;
	}  else if (key == 115) {
		party.position.backward();
		dr.syncWithPartyPosition(party);
		hud.refreshHUB(party);
		return false;
	}   else if (key == 100) {
		party.position.turn(-1);
		dr.syncWithPartyPosition(party);
		hud.refreshHUB(party);
		return false;
	}
}
		
/* INIT */	
$( function () {

	dr = new dungeonRenderer('#container');
	mouse = new mouseSelect();
	map = new dungeonMap();
	party = new adventurersParty(0, 0, DIRECTION_SOUTH);
	hud = new ghobokHUD('#hud');
	hud.refreshHUB(party);

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
		document.addEventListener( 'keypress', keypress, false );
	
	startLoadingMap(1);	
			
	}	
);




				