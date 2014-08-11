var CHARACTER_SLOT_WIDTH = 335;
var CHARACTER_SLOT_HEIGHT = 226;

var CHARACTER_SLOT_LEAF_TEXTURE = THREE.ImageUtils.loadTexture( "../images/hud/leaf.png" );
CHARACTER_SLOT_LEAF_TEXTURE.flipY = false;
var CHARACTER_SLOT_LEAF_MATERIAL = new THREE.SpriteMaterial( { map: CHARACTER_SLOT_LEAF_TEXTURE, opacity: 1, transparent:false } );

var GIBRI_TEXTURE = THREE.ImageUtils.loadTexture( "../images/characters/gibri-woman-port.png" );
GIBRI_TEXTURE.flipY = false;
var GIBRI_MATERIAL = new THREE.SpriteMaterial( { map: GIBRI_TEXTURE, opacity: 1, transparent:false } );

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
    
    this.portrait = new THREE.Sprite( GIBRI_MATERIAL );
    this.portrait.scale.x = ITEM_SLOT_WIDTH;
    this.portrait.scale.y = ITEM_SLOT_HEIGHT;
    this.portrait.position.x = 80;
    this.portrait.position.y = 50;
    this.portrait.position.z = 1;
    this.wrapper.add( this.portrait );
    
    var itemSlotParams = new Object();
    itemSlotParams.scene = this.wrapper;
    
    itemSlotParams.x = 105;
    itemSlotParams.y = 50;
    this.itemSlots.add( itemSlotParams );
    
    itemSlotParams.x = 125 + ITEM_SLOT_WIDTH;
    itemSlotParams.y = 50;
    this.itemSlots.add( itemSlotParams );
    
    itemSlotParams.x = 105;
    itemSlotParams.y = 70 + ITEM_SLOT_HEIGHT;
    this.itemSlots.add( itemSlotParams );
    
    itemSlotParams.x = 125 + ITEM_SLOT_WIDTH;
    itemSlotParams.y = 70 + ITEM_SLOT_HEIGHT;
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