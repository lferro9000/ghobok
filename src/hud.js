var _golden = 0.62;

function ghobokHUD( params ) {

	this.container = _coalesce(params.container,$("#hud"));
	this.scale = _coalesce(params.scale, 100);
	this.characterSlots = new Array();
	
	this.addCharacterSlot = function( params ) {		
		var slot = new characterSlot( this, params.character );		
		this.characterSlots.push( slot );
		slot.update();
	}

	this.update = function () {
		for (var i = 0, max = this.characterSlots.length; i < max; i++) {
			this.characterSlots[i].update();
		}
	}
	this.refresh = this.update;
        
	this.getDirectionName = function (direction) {
		switch(direction) {
			case DIRECTION_NORTH:
				return "North";
				break;
			case DIRECTION_EAST:
				return "East";
				break;
			case DIRECTION_SOUTH:
				return "South";
				break;
			case DIRECTION_WEST:
				return "West";
				break;	
		}
	}

	this.windowResized = function( event ) {		
            var width = event.x;
            var height = event.y;
            this.container.css( {width:width+"px", height:height+"px"});

            this.scale = Math.round(width/26);		
            var margin = Math.round(this.scale/7);
            var chSlotHeightPX = (this.scale * _golden * 2) + (2 * margin);
            var chSlotWidthPX = (this.scale * 4) + (2 * margin);
            var topPX = height - chSlotHeightPX;
            var leftPX;
            for (var i = 0, max = this.characterSlots.length; i < max; i++) {			
                    leftPX = i * chSlotWidthPX;
                    this.characterSlots[i].container.css( { top:topPX+"px", left:leftPX+"px", width:chSlotWidthPX+"px", height:chSlotHeightPX+"px" } );
                    this.characterSlots[i].resize( this.scale, this.scale * _golden, margin );
            }
	}
	
}

function characterSlot( hud, character ) {	
	this.hud = hud;
	this.container = $("#characterslot-template",hud.container).clone();
	hud.container.append( this.container );
	this.character = character;
}

characterSlot.prototype.update = function() {
	if (this.character) {
		$(".character-portrait",this.container).css( {background:"url('" + this.character.portrait + "')"} 	);
		$(".character-name",this.container).html( this.character.name );
	}	
}

characterSlot.prototype.resize = function( width, height, margin) {
	if (this.character) {
		//$(".character-portrait-wrapper",this.container).css( { } );
		$(".character-portrait",this.container).css( {backgroundSize: "" + width+"px " + height+"px",width:width+"px", height:height+"px", top:margin+"px", left:margin+"px"});
	}	
}