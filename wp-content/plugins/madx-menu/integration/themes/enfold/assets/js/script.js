( function( $ ) {
	jQuery( '.madx-menu' ).on( 'madxMenuCreated', function() {
		$( this ).closest( '.main_menu' ).removeClass( 'main_menu' ).addClass( 'madx_main_menu' );
		$( this ).closest( '.avia-menu' ).removeClass( 'avia-menu av-main-nav-wrap' );
	} );
}( jQuery ) );