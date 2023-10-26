( function( $ ) {
	jQuery( '.madx-menu' ).on( 'madxMenuCreated', function() {
		$( this ).closest( '.main-navigation' ).removeClass( 'main-navigation' );
	} );
}( jQuery ) );