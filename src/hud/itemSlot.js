var ITEM_SLOT_WIDTH = 50;
var ITEM_SLOT_HEIGHT = 50;

var ITEM_SLOT_MATERIAL = new THREE.MeshLambertMaterial({color:0x0aff0a, transparent:false, opacity:1});        
var ITEM_SLOT_GEOMETRY = new THREE.TorusGeometry(ITEM_SLOT_WIDTH / 2, 5, 24, 50);
                
function itemSlot( params ) {
    
    this.x = params.x;
    this.y = params.y;
    this.scene = params.scene;
    
    this.item = null;
    
    this.mesh = new THREE.Mesh(ITEM_SLOT_GEOMETRY, ITEM_SLOT_MATERIAL);
    this.mesh.position.x = this.x + (ITEM_SLOT_WIDTH / 2);
    this.mesh.position.y = this.y + (ITEM_SLOT_HEIGHT / 2);
    this.mesh.position.z = 25;
    
    if (this.scene) {
        this.scene.add(this.mesh);    
    }
}

itemSlot.prototype.acceptItem = function ( item ) {
    var old_item = this.item;
    this.item = item;
    if (this.item) {
        this.scene.add(this.item);
        this.item.position.x = this.x + (ITEM_SLOT_WIDTH / 2);
        this.item.position.y = this.y + (ITEM_SLOT_HEIGHT / 2);
        this.item.position.z = 45;
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

