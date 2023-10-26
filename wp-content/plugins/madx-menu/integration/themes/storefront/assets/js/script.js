( function( $ ) {
	jQuery( '.madx-menu' ).on( 'madxMenuCreated', function() {
		$( this )
			.removeClass( 'nav-menu' )
			.closest( '.main-navigation' ).removeClass( 'main-navigation' )
			.find( '> .menu' ).css( 'display', 'none' );
	} );
}( jQuery ) );