var CHARACTER_SLOT_WIDTH = 350;
var CHARACTER_SLOT_HEIGHT = 250;

function characterSlot( params ) {
    this.x = params.x;
    this.y = params.y;
   
    this.character = params.character;
    this.itemSlots = new itemSlots();
    this.wrapper = new THREE.Object3D();
    this.wrapper.position.set(this.x, this.y, 0);
    
    var itemSlotParams = new Object();
    itemSlotParams.scene = this.wrapper;
    
    itemSlotParams.x = 0;
    itemSlotParams.y = 0;
    this.itemSlots.add( itemSlotParams );
    
    itemSlotParams.x = ITEM_SLOT_WIDTH;
    itemSlotParams.y = 0;
    this.itemSlots.add( itemSlotParams );
    
    if (params.scene) {
        params.scene.add(this.wrapper);    
    }
}

/* SLOTS ARRAY */

function characterSlots() {
    this.slots = new Array();
}

characterSlots.prototype.add = function ( params ) {    
    this.slots.push( new characterSlot(params) );
};

characterSlots.prototype.click = function ( clickX, clickY ) {    
    for (var i = 0, max = this.slots.length; i < max; i++) {
        if ( ( (this.slots[i].x < clickX) && ((clickX - this.slots[i].x) < CHARACTER_SLOT_WIDTH) )
            && ( (this.slots[i].y < clickY) && ((clickY - this.slots[i].y) < CHARACTER_SLOT_HEIGHT) )
            ) {
                var slot = this.slots[i];
                return slot.itemSlots.click(clickX - slot.x, clickY - slot.y);
            } 
    }
};