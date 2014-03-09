var CHARACTER_SLOT_WIDTH = 250;
var CHARACTER_SLOT_HEIGHT = 250;

var CHARACTER_SLOT_LEAF_MATERIAL;

var texture = THREE.ImageUtils.loadTexture( "../images/hud/leaf.png" );
texture.flipY = false;
CHARACTER_SLOT_LEAF_MATERIAL = new THREE.SpriteMaterial( { map: texture, opacity: 1, transparent:true } );
                        
function characterSlot( params ) {
    this.x = params.x;
    this.y = params.y;
   
    this.character = params.character;
    this.itemSlots = new itemSlots();
    this.wrapper = new THREE.Object3D();
    this.wrapper.position.set(this.x, this.y, 0);
    
    this.leaf = new THREE.Sprite( CHARACTER_SLOT_LEAF_MATERIAL );
    this.leaf.scale.x = CHARACTER_SLOT_WIDTH;
    this.leaf.scale.y = CHARACTER_SLOT_HEIGHT;
    this.leaf.position.x = CHARACTER_SLOT_WIDTH / 2;
    this.leaf.position.y = CHARACTER_SLOT_HEIGHT / 2;
    this.leaf.position.z = 0;
    this.wrapper.add( this.leaf );
    
    var itemSlotParams = new Object();
    itemSlotParams.scene = this.wrapper;
    
    itemSlotParams.x = 75;
    itemSlotParams.y = 100;
    this.itemSlots.add( itemSlotParams );
    
    itemSlotParams.x = 95 + ITEM_SLOT_WIDTH;
    itemSlotParams.y = 100;
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