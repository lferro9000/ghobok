function dungeonMapRenderer() {
	this.map = [
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,1,0,1],
		[1,0,0,0,1],
		[1,1,1,1,1],
		];
	this.tileSize = 20;
		
	this.render=render;
	function render() {
		var mapDiv = "";
		for(var x = 0, lx = 5; x < lx; x++) {
			for(var y = 0, ly = 5; y < ly; y++) {
				if (this.map[x][y] == 1) {
					topPx = x * this.tileSize;
					leftPx = y * this.tileSize;
					mapDiv += "<div style=\"top:" + topPx + "px;left:" + leftPx + "px\"/>";
				}
			}
        }

		return "<div>" + mapDiv + "<canvas id=\"party\" width=\"50\" height=\"50\"/></div>";
    }
	
	this.updateParty = updatePartyPosition;
	function updatePartyPosition(canvas, partyPosition) {
		partyX = partyPosition.x * this.tileSize;
		partyY = partyPosition.y * this.tileSize;
		$("#party").css({top: partyX,left: partyY});
		var ctx=canvas.getContext("2d");
		var img=document.getElementById("partyimage");
		drawImg(ctx,img,0,0,25,25,50,50,partyPosition.direction);		
	}
}

function drawImg(context2D, img, pX, pY, oX, oY, w, h, rot) {
 context2D.save();
  context2D.translate(pX+oX, pY+oY);
  context2D.rotate(rot * Math.PI / 180);
  context2D.drawImage(img, 0, 0, w, h, -(oX), -(oY), w, h);
 context2D.restore();
}