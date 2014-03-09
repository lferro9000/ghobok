var ITEM_SLOT_WIDTH = 150;
var ITEM_SLOT_HEIGHT = 200;

var ITEM_SLOT_MATERIAL = new THREE.MeshLambertMaterial({color:0xfaf5f0});        
var ITEM_SLOT_GEOMETRY = new THREE.TorusGeometry(25, 5, 24, 50);
                
function itemSlot( params ) {
    
    this.x = params.x;
    this.y = params.y;
    this.scene = params.scene;
    
    this.item = null;
    
    this.mesh = new THREE.Mesh(ITEM_SLOT_GEOMETRY, ITEM_SLOT_MATERIAL);
    this.mesh.position.set(this.x, this.y, 0);
    
    if (this.scene) {
        this.scene.add(this.mesh);    
    }
}

itemSlot.prototype.acceptItem = function ( item ) {
    var old_item = this.item;
    this.item = item;
    if (this.item) {
        this.scene.add(this.item);
        this.item.position.set(this.x, this.y, 0);
    }
    return old_item;
};

/* SLOTS ARRAY */

function itemSlots() {
    this.slots = new Array();
}

itemSlots.prototype.add = function ( params ) {    
    this.slots.push( new itemSlot(params) );
};

itemSlots.prototype.click = function ( clickX, clickY ) {    
    for (var i = 0, max = this.slots.length; i < max; i++) {
        if ( ( (this.slots[i].x < clickX) && ((clickX - this.slots[i].x) < ITEM_SLOT_WIDTH) )
            && ( (this.slots[i].y < clickY) && ((clickY - this.slots[i].y) < ITEM_SLOT_HEIGHT) )
            ) {
                return this.slots[i];
            } 
    }
};
