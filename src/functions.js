function morphColorsToFaceColors ( geometry ) {
	if ( geometry.morphColors && geometry.morphColors.length ) {
		var colorMap = geometry.morphColors[ 0 ];
		for ( var i = 0; i < colorMap.colors.length; i ++ ) {
			geometry.faces[ i ].color = colorMap.colors[ i ];
		}
	}
}