/* Outside JQuery */
	var query = new Object();
		window.location.search.replace(
		new RegExp( "([^?=&]+)(=([^&]*))?", 'g' ),
			function( $0, $1, $2, $3 ){
				query[ $1 ] = $3;
			}
		);
		easing = query['e'] || 'Circ';
	