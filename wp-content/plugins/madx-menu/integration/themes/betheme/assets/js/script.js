( function( $ ) {
	jQuery( '.madx-menu' ).on( 'madxMenuCreated', function() {
		$( this ).closest( '#menu' ).removeAttr( 'id' ).removeAttr( 'class' );
		$( '.responsive-menu-toggle ' ).css( 'display', 'none' );
	} );
}( jQuery ) );