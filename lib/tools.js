/*
	Return first of the arguments that is not null;
*/
function _coalesce( value1, value2 ) {
	if (value1 == null)	return value2;
	return value1;
}

/*
	Remove element from an array.
*/
function _remove( arr, el ) {
	arr.splice( arr.indexOf( el ), 1 );
}

/*
	Copy elements from second array into the first.
*/
function _append( arr1, arr2 ) {
	for ( var i = 0, max = arr2.length; i < max; i++) {
		arr1.push(arr2[i]);
	} 
}

function _dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}