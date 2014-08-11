function ghobokHUD ( params ) {
    this.characterSlots = new characterSlots();
    this.activeItem = null;
    
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera( -100, 100, -100, 100, 1, 150 );
    this.camera.position.set( 0, 0, 100 );
    this.camera.lookAt( new THREE.Vector3(0, 0, 0) );
    this.scene.add( this.camera );
    this.light = new THREE.HemisphereLight(0xFFFFFF, 0x0A0A0A, 1);
    this.scene.add( this.light );
    //this.light = new THREE.AmbientLight( 0xAFAFAF );
    //this.scene.add( this.light );

    /* TEST SLOTS */
    var slotParams = new Object();
    slotParams.scene = this.scene;
    
    for (var x = 0, maxX = 4; x <= maxX; x++) {        
        slotParams.x = x * CHARACTER_SLOT_WIDTH;
        slotParams.y = 100;
        this.characterSlots.add( slotParams );        
    }
}

ghobokHUD.prototype.OnMouseDown = function ( clickX, clickY ) {
    var slot = this.characterSlots.click( clickX, clickY );
    
    if (slot) {
        this.activeItem = slot.acceptItem( this.activeItem );
        if (this.activeItem) {
            this.scene.add(this.activeItem);
            this.OnMouseMove();
        }
    }

};

ghobokHUD.prototype.OnMouseMove = function( mouseX, mouseY ) {
    if (this.activeItem) {
        this.activeItem.position.set(mouseX, mouseY, 50);
    }
};

ghobokHUD.prototype.OnWindowResize = function ( width, height ) {
    this.light.position.set(width / 2, height / 2, 60);
    this.camera.left = 0;
    this.camera.right = width;
    this.camera.top = 0;
    this.camera.bottom = height;   
    this.camera.updateProjectionMatrix();	
};